# Operational BPMN models: justification

Group 51, Bristol Regional Food Network (Use Case 2). Sprint 2.

| Model | Process ID | File |
|---|---|---|
| M7, Functionality 1: Place multi-vendor order | `place-multivendor-order` | models/operational/m7-place-multivendor-order.bpmn |
| M8, Functionality 2: Process payment and commission | `process-payment-commission` | models/operational/m8-process-payment-commission.bpmn |

Both models were drawn in Camunda 8 Web Modeler and are executable. They pass the Camunda 8.10 checks with no errors and were deployed to the module cluster (UWE Frenchay 2026, Camunda 8.9). Forms are in camunda/forms/, the job worker is in workers/, variable names are in docs/process-variables.md and test results are in docs/test-results.md.

## 1. Link to the strategic model

Each model refines one collapsed sub-process of models/strategic/strategic-bpmn-v1.bpmn:

- Place multi-vendor order is refined by M7.
- Process payment and commission is refined by M8.

In the strategic model a sequence flow goes from the first process to the second. In the operational models that hand-off is the call activity at the end of M7, which starts M8 with a confirmed order split into one part per producer (D2). M8 keeps the strategic interface: Payment request and Payment result with the Payment Provider, and the order notification to Producers.

## 2. Pools and lanes

Each model is one pool, the BRFN Marketplace, with two lanes: Customer and Marketplace platform. Customer tasks (forms) sit in the Customer lane and automated steps in the platform lane. The customer is a lane and not a separate pool because the customer acts through the platform's own forms, and those tasks have to be part of the platform's process for Camunda to run them.

Payment Provider (simulated) and Producers are collapsed pools in M8, linked by message flows. They show who the platform exchanges messages with. The actual call is made by the job worker behind each service task.

## 3. M7: Place multi-vendor order

| Element | BPMN type | Implementation | Why |
|---|---|---|---|
| Basket submitted at checkout | None start event | Start variables `orderId`, `basketItems` (test-data/) | Browsing and filling the basket belong to the Browse and search catalogue process, so Functionality 1 starts at checkout |
| Review basket and enter details | User task | Form `f1-review-basket` | The customer sees the basket and gives a name and email. Only those two personal details are collected (L1) |
| Merge gateway | Exclusive gateway | | Joins the first pass and the return from Amend quantities, so Check stock has one incoming flow |
| Check stock | Service task | Job type `check-stock` | FR18. The worker compares each line with the stock levels and returns `stockOk` and `shortItems` |
| Enough stock? | Exclusive gateway | Yes: `stockOk = true`. No: default flow | |
| Amend quantities | User task | Form `f1-amend-order`, input and output mappings (section 5) | Shows the short items and lets the customer lower the quantities. A quantity of 0 removes the line. The flow returns to Check stock because the new quantities have to be checked again |
| Split order by producer and work out total | Script task (FEEL) | Result variable `producerParts` | Groups the lines by `producerId` (D16), works out each producer's subtotal, and sets an earliest date two days ahead so producers get 48 hours' notice (FR3, D17). It is a script task because it is a calculation on process data and needs no outside system |
| Choose delivery or collection and confirm order | User task | Form `f1-confirm-order`, input and output mappings (section 5) | Delivery or collection for each producer (D18), the order total and a confirm tick box |
| 30 minutes | Interrupting timer boundary event, `PT30M` | | Stock is not reserved while the customer decides (Q7), so an order left unconfirmed is closed at Order abandoned |
| Order confirmed? | Exclusive gateway | Yes: `orderConfirmed = true`. No: default flow | Leaving the box unticked ends at Order cancelled by customer |
| Process payment and commission | Call activity | Process ID `process-payment-commission` | Starts M8. Variable propagation is switched off in both directions and the hand-off is listed explicitly (section 5), so only the agreed data crosses. M8 can also be deployed and tested on its own |
| Payment approved? | Exclusive gateway | Yes: `orderStatus = "CONFIRMED"`. No: default flow | |
| Order placed, Order not placed (unpaid), Order cancelled by customer, Order abandoned | End events | | Every outcome has its own end event, so the result of any order can be read in Operate |

## 4. M8: Process payment and commission

| Element | BPMN type | Implementation | Why |
|---|---|---|---|
| Payment requested | None start event | | Started by the call activity in M7, or on its own with test data |
| Merge gateway | Exclusive gateway | | Joins the first entry and the return from Try again? |
| Enter payment details | User task | Form `f2-enter-payment` | Name on card, a made-up card number and, for testing, the simulated provider's response |
| Merge gateway | Exclusive gateway | | Joins the first attempt and the automatic retry after an unavailable service |
| Count payment attempt | Script task (FEEL) | `paymentAttempts = if paymentAttempts = null then 1 else paymentAttempts + 1` | Counted before every attempt, so declined payments and unavailable-service retries count towards the same limit of 3 (Q8) |
| Take payment | Service task | Job type `take-payment`. Outputs `paymentStatus`, `testCardNumber = null` | The worker simulates the provider (D13) and returns APPROVED or DECLINED. The card number is cleared as soon as the attempt has been made (D20) |
| Payment service unavailable | Error boundary event, code `PAYMENT_UNAVAILABLE` | Output `testCardNumber = null` | An unavailable service is a technical failure, not an answer from the provider, so the worker throws a BPMN error instead of returning a status. FR19 and NFR7 require a retry or exception path instead of stopping |
| Unavailable: attempts left? | Exclusive gateway | Yes: `paymentAttempts < 3`. No: default flow to Not paid: service unavailable | |
| Wait 10 seconds | Timer intermediate event | `if retryDelay = null then duration("PT10S") else duration(retryDelay)` | Gives the service time to recover, then retries without asking the customer to enter the details again. The delay can be passed in as `retryDelay`; test F2-e uses one second |
| Payment result? | Exclusive gateway | Approved: `paymentStatus = "APPROVED"`. Declined: default flow | |
| Declined: attempts left? | Exclusive gateway | Yes: `paymentAttempts < 3`. No: default flow to Not paid: declined 3 times | |
| Retry payment | User task | Form `f2-retry-payment` | After a decline the customer chooses whether to try again (D19). A decline is the customer's decision; an unavailable service is retried automatically |
| Try again? | Exclusive gateway | Yes: `retryPayment = true`, back to Enter payment details. No: default flow to Not paid: customer stopped | |
| Update inventory | Service task | Job type `update-inventory` | Only after an approved payment, as Use Case 2 says. A failed attempt never changes stock |
| Calculate commission | Script task (FEEL) | Result variable `producerShares` | 5% per producer, rounded half up to whole pence; the producer's net amount is gross minus commission (A2) |
| Notify producer | Service task, multi-instance over `producerParts`, input element `producerPart` | Job type `notify-producer` | One notification per producer in the order (FR3, D14) |
| Order paid | End event | Outputs `orderStatus = "CONFIRMED"`, `commissionTotalPence = sum(producerShares.commissionPence)` | |
| Not paid: service unavailable, Not paid: declined 3 times, Not paid: customer stopped | End events | Output `orderStatus = "UNPAID"` | Each failure has its own end event |

Inventory is updated before the commission and the notifications, so stock is correct before producers are told about the order.

## 5. Data and mappings

All money is in whole pence. Variable names follow docs/process-variables.md.

A Camunda form with a dynamic list only returns the fields shown on the form. Two user tasks therefore merge the customer's answer back into the full records. Both list forms stop the customer adding or removing rows, so the rows match by position.

Amend quantities:

- input `originalItems` = `basketItems`
- output `basketItems`:

```
(for i in 1..count(originalItems) return context put(originalItems[i], "quantity", basketItems[i].quantity))[item.quantity > 0]
```

Choose delivery or collection and confirm order:

- inputs `splitParts` = `producerParts`, `orderTotalPence` = `sum(producerParts.subtotalPence)`
- outputs `orderTotalPence`, `orderConfirmed`, and `producerParts`:

```
for i in 1..count(splitParts) return context put(splitParts[i], "fulfilmentMethod", producerParts[i].fulfilmentMethod)
```

Split order by producer and work out total:

```
for pid in distinct values(basketItems.producerId) return {
  producerId: pid,
  producerName: (basketItems[item.producerId = pid])[1].producerName,
  fulfilmentMethod: "delivery",
  earliestDate: string(today() + duration("P2D")),
  subtotalPence: sum(for i in basketItems[item.producerId = pid] return i.quantity * i.unitPricePence)
}
```

Calculate commission:

```
for part in producerParts return {
  producerId: part.producerId,
  grossPence: part.subtotalPence,
  commissionPence: round half up(part.subtotalPence * 0.05, 0),
  netPence: part.subtotalPence - round half up(part.subtotalPence * 0.05, 0)
}
```

Call activity hand-off:

| Direction | Variables |
|---|---|
| M7 to M8 | `orderId`, `customerName`, `customerEmail`, `basketItems`, `producerParts`, `orderTotalPence` |
| M8 back to M7 | `paymentStatus`, `paymentAttempts`, `producerShares`, `commissionTotalPence`, `orderStatus` |

Card details never go back to M7.

## 6. Exception paths

| Situation | Handling | Ends at | Test |
|---|---|---|---|
| Not enough stock | Amend quantities, then checked again | Continues to Split order | T2 |
| Customer does not confirm | Default flow from Order confirmed? | Order cancelled by customer | T3 |
| No answer within 30 minutes | Timer boundary event | Order abandoned | T4 |
| Payment declined | Retry form, up to 3 attempts in total | Order paid, or Not paid: declined 3 times | F2-b, F2-c |
| Customer gives up after a decline | Default flow from Try again? | Not paid: customer stopped | F2-d |
| Payment service unavailable | BPMN error, 10 second wait, automatic retry, up to 3 attempts | Not paid: service unavailable | F2-e |
| Payment fails when called from M7 | Payment approved? takes its default flow | Order not placed (unpaid) | Payment failures are covered by F2-b to F2-e |

## 7. Human and automated steps

- **Human, through forms:** Review basket and enter details, Amend quantities, Choose delivery or collection and confirm order, Enter payment details, Retry payment.
- **Automated:** stock check, order split and totals, payment call, attempt counting, automatic retry, inventory update, commission, producer notifications, and both timers.

## 8. Changes since Sprint 1

- Q7 decided: stock is not reserved. The 30-minute timer closes unconfirmed orders instead.
- Q8 decided: 3 payment attempts in total, for both declined payments and an unavailable service (Ella, issue #28, 13 November).
- D13: the simulated payment service is the `take-payment` job worker.
- D14: producer notification is the last step of Functionality 2.
- D20: `testCardNumber` is cleared after every attempt, including when the service is unavailable.

## 9. Limits, carried into Sprint 3

- `update-inventory` and `notify-producer` write log lines only. There is no stock database or email yet, and stock levels come from a fixed file (test-data/stock.json).
- Every producer offers both delivery and collection; each producer's own options (D18) are not stored yet.
- `earliestDate` is always today plus two days.
- In Web Modeler Test mode, the payment form inside the called M8 instance is completed in Tasklist.

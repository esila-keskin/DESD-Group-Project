# Process variables: the data contract

Group 51, Bristol Regional Food Network (Use Case 2). These variables are shared by the Camunda forms, the two executable BPMN processes and the job workers. Every form key, FEEL expression and worker must use these exact names.

## Rules

- Money is stored in whole pence. Commission is 5% per producer, rounded half up.
- `testCardNumber` is set to null by the output mapping on Take payment, so it is not kept in the process data after the payment step.

| Variable | Type | Set by | Example |
|---|---|---|---|
| `orderId` | text | Functionality 1, when the marketplace order is created | `"ORD-1001"` |
| `customerName` | text | form `f1-review-basket` | `"Test Customer"` |
| `customerEmail` | text | form `f1-review-basket` | `"test.customer@example.com"` |
| `basketItems` | list of `{productId, productName, producerId, producerName, quantity, unitPricePence}` | start variables (`test-data/`); quantity changed by form `f1-amend-order` | see `test-data/basket-two-producers.json` |
| `stockOk` | true / false | worker `check-stock` | `true` |
| `shortItems` | list of `{productId, productName, requested, available}` | worker `check-stock` | `[{"productId":"P1","productName":"Free-range eggs (6)","requested":4,"available":3}]` |
| `producerParts` | list of `{producerId, producerName, fulfilmentMethod, earliestDate, subtotalPence}` | Functionality 1, when the order is split by producer; `fulfilmentMethod` chosen on form `f1-confirm-order` | `[{"producerId":"PR1","producerName":"Hillside Farm","fulfilmentMethod":"delivery","earliestDate":"2026-11-18","subtotalPence":640}]` |
| `orderTotalPence` | whole number | Functionality 1, when the order is split | `1090` |
| `orderConfirmed` | true / false | form `f1-confirm-order` | `true` |
| `cardholderName` | text | form `f2-enter-payment` | `"Test Customer"` |
| `testCardNumber` | text, 16 digits | form `f2-enter-payment`; set to null by Take payment | `"1234123412341234"` |
| `paymentScenario` | `approve` / `decline` / `unavailable` | form `f2-enter-payment`; read by worker `take-payment` | `"approve"` |
| `paymentStatus` | `APPROVED` / `DECLINED` | worker `take-payment` | `"APPROVED"` |
| `paymentAttempts` | whole number, maximum 3 | Functionality 2, counted on each attempt | `1` |
| `retryPayment` | true / false | form `f2-retry-payment` | `true` |
| `retryDelay` | ISO 8601 duration, optional | start variables; default `PT10S` when not set | `"PT1S"` (test F2-e) |
| `producerShares` | list of `{producerId, grossPence, commissionPence, netPence}` | Functionality 2, commission calculation | `[{"producerId":"PR1","grossPence":640,"commissionPence":32,"netPence":608}]` |
| `commissionTotalPence` | whole number | Functionality 2, end event Order paid | `55` |
| `orderStatus` | `CONFIRMED` / `UNPAID` | Functionality 2, at the end | `"CONFIRMED"` |

## Hand-off between the processes

Functionality 1 passes `orderId`, `customerName`, `customerEmail`, `basketItems`, `producerParts` and `orderTotalPence` to Functionality 2 through the call activity. Functionality 2 returns `paymentStatus`, `paymentAttempts`, `producerShares`, `commissionTotalPence` and `orderStatus`. An unavailable payment service is not a status: the worker throws the BPMN error `PAYMENT_UNAVAILABLE`, which the error boundary event on Take payment catches.

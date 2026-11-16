# Payment scenarios and commission: Functionality 2
Group 51, Bristol Regional Food Network (Use Case 2). This file lists the paths through the payment
process (Functionality 2) and the result each one must produce. It is the checklist for testing the process
in Camunda and matches docs/test-plan-outline.md.
The simulated payment service answers according to `paymentScenario`, chosen on the payment form
for testing: `approve`, `decline` or `unavailable`. Only made-up test data is used, because the case
study forbids live payment systems and real financial data.
The limit is 3 payment attempts in total (1 try and 2 retries), for both a declined payment and an
unavailable service (Q8, issue #28).
## Scenarios
| Scenario | paymentScenario on each attempt | Path through the process | Expected end state |
|---|---|---|---|
| (a) Approved first time | approve | Enter payment details, take payment, approved, order confirmed,
inventory updated, each producer notified, commission calculated | orderStatus CONFIRMED;
paymentAttempts 1; inventory updated once; one notification per producer |
| (b) Declined, then approved | decline, approve | Take payment, declined, customer ticks Try again on the
Payment declined form, enter payment details again, take payment, approved, then as (a) | orderStatus
CONFIRMED; paymentAttempts 2; inventory updated once; one notification per producer |
| (c) Declined three times | decline, decline, decline | Declined, retry, declined, retry, declined, limit of 3
reached, customer told the payment failed | orderStatus UNPAID; paymentAttempts 3; inventory not
changed; no producer notified |
| (d) Declined, customer stops | decline | Declined, customer leaves Try again empty on the Payment
declined form, customer told the order was not placed | orderStatus UNPAID; paymentAttempts 1;
inventory not changed; no producer notified |
| (e) Payment service unavailable | unavailable on each attempt | Take payment, error
PAYMENT_UNAVAILABLE, short wait, automatic retry up to 3 attempts in total, customer told the service is
unavailable | orderStatus UNPAID; paymentAttempts 3; inventory not changed; no producer notified |
A failed attempt must never update inventory, notify a producer or create a second payment.
## Commission worked examples
Rule: the 5% commission is calculated for each producer separately, rounded half up to a whole number
of pence, and then added up for the marketplace (assumption A2). All money is in whole pence.
### Two producers (basket-two-producers test data)
| Producer | Items | Gross (pence) | 5% exact | Commission (pence) | Producer receives (pence) |
|---|---|---|---|---|---|
| Hillside Farm | 2 x Free-range eggs (6) at 320 | 640 | 32.0 | 32 | 608 |
| Old Mill Bakery | 1 x Sourdough loaf at 450 | 450 | 22.5 | 23 (rounded half up) | 427 |
| Total | | 1090 | | 55 | 1035 |
### One producer (basket-one-producer test data)
| Producer | Items | Gross (pence) | 5% exact | Commission (pence) | Producer receives (pence) |
|---|---|---|---|---|---|
| Hillside Farm | 2 x Free-range eggs (6) at 320, 1 x Wildflower honey (340 g) at 650 | 1290 | 64.5 | 65
(rounded half up) | 1225 |
Check: the commission plus what the producers receive always equals what the customer paid (55 +
1035 = 1090; 65 + 1225 = 1290). 

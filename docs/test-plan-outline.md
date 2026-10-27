# Test plan outline

## Happy path: order placed and paid

Starting situation: the customer has items from two producers in their basket, and all items are in stock. Steps: check availability, choose delivery or collection, confirm the order and complete the payment. Expected result: the system creates the main order, separates it into two producer-specific orders, updates the inventory and notifies both producers.

## Insufficient stock

Starting situation: the customer requests a larger quantity of an item than the producer has in stock. Steps: begin checkout, inform the customer which item has insufficient stock, allow them to amend the basket and check availability again. Expected result: the order and payment only proceed when all items are available, using the revised quantities and total.

## Payment declined, then retried

Starting situation: the order is ready, but the simulated payment service is configured to decline the first payment and approve the second. Steps: submit the first payment, inform the customer that it was declined and allow them to retry. Expected result: the order remains unpaid after the first attempt. The successful retry pays the order once, updates the inventory once and sends one notification to each producer.

## Payment service unavailable

Starting situation: the order is ready, but the simulated payment service is unavailable. Steps: submit the payment and allow the process to retry twice. Expected result: after the second retry, the customer receives a clear error message and the order remains unpaid. The inventory must not change, and the producers must not receive an order notification.

## Test data we need

We need one basket containing items from a single producer and another containing items from two producers. The test data should include product IDs, producer IDs, quantities, prices, starting stock and delivery or collection details. The simulated payment service must support approved, declined and unavailable responses. Only fictional test data will be used, with no real payment details.

## How we will know each test passed

We will check the completed process path and its final variables, followed by the saved order, producer-specific order elements, payment status, 5% commission and inventory values. We will also check the number of retries and notifications. A failed attempt must not create a duplicate payment, inventory update or producer notification.

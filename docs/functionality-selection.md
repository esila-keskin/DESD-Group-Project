# Functionality selection: Sprint 1

## Chosen use case
**Use Case 2: Customer Multi-Vendor Order, Checkout and Payment** (Bristol Regional Food Network, case study v2). It is proposed as the source of the two candidate major functionalities for Sprint 1.

## Why Use Case 2
The brief requires each functionality to offer user interaction, automated processing, business decisions, service interaction, data processing and alternative or exceptional flows. It also requires the functionalities to be "sufficiently substantial to demonstrate an end-to-end business process".

| Brief criterion | Where Use Case 2 provides it |
|---|---|
| User interaction | Customer reviews and confirms the order, amends it when stock is short, retries after a decline |
| Automated processing | Availability check, order split, per-producer amounts, commission |
| Business decisions | Stock sufficient? Delivery or collection? Payment approved, declined or unavailable? |
| Service interaction | External or simulated payment service; inventory |
| Data processing | "calculate the amount attributable to each producer and calculate the marketplace's 5% commission" |
| Alternative and exception flows | "If the payment service is temporarily unavailable, the process should follow an appropriate exception or retry path rather than simply terminating." |

The brief names "external interactions" and "exception handling" among the marks of a high-performing group, and Use Case 2 states both as requirements.

## Alternatives considered
Our own assessment of how strongly each use case, as written, supports each criterion:

| Criterion | Use Case 1 (listing) | Use Case 2 (order and payment) | Use Case 3 (quality incident) |
|---|---|---|---|
| User interaction | High: producer submits and corrects details | High: customer amends, confirms, retries | High: reporter, producer, administrator |
| Automated processing | Medium: validation, stock-zero rule | High: availability, order split, amounts | Medium: affected orders, notifications |
| Business decisions | Medium: valid? certified? in stock? | High: stock, delivery or collection, payment outcome | High: close, escalate, suspend |
| Service interaction | Medium: certification service | High: payment service, inventory | Low: notification channels only |
| Data processing | Low: validation only | High: per-producer split and 5% commission | Medium: link orders to the affected product |
| Alternative and exception flows | Medium: verification unavailable or fails | High: decline, retry, service unavailable | Medium: notification failure |

- **Use Case 1:** strong forms and an external certification check with a failure path, but no multi-party data splitting or financial calculation.
- **Use Case 3:** strong human roles and a notification-failure path, with less external service interaction and no calculation.
- **Use Case 2** is the only one that is strong on every criterion.

## Functionality 1: Basket to order
Scope, from Use Case 2:
- customer adds products from one or more producers to a basket
- checkout checks that "all selected products are still available in the requested quantities"
- if not, the customer "is informed and asked to amend the order"
- the system identifies the producers involved and determines delivery or collection arrangements
- the customer reviews and confirms
- the system creates the overall marketplace order and separates it into producer-specific order elements

Paths to model end to end:
1. Main path: basket, availability confirmed, producers identified, delivery or collection decided, customer confirms, order created and split.
2. Alternative path: insufficient stock, customer informed, order amended, availability checked again.
3. Alternative path: delivery or collection chosen per producer.

Planned split of activities (to be refined in the Sprint 2 operational model):
- **User tasks:** build the basket, amend the order, review and confirm.
- **Automated:** availability check, identify the producers involved, determine delivery or collection arrangements, create the marketplace order and split it into producer-specific elements.

Out of scope: product listing and search (Use Case 1 territory).

## Functionality 2: Payment and commission
Scope, from Use Case 2:
- payment is submitted to a sandbox or simulated payment service
- success: the order is confirmed, inventory quantities are updated, producers are notified
- declined: the customer is informed and may retry
- service unavailable: an exception or retry path is followed
- per-producer amounts and the 5% commission are calculated

Paths to model end to end:
1. Main path: payment submitted, approved, order confirmed, inventory updated, producers notified.
2. Exception path: payment declined, customer informed, retry offered.
3. Exception path: payment service unavailable, retry or exception handling instead of simply terminating.
4. Data path: amount attributable to each producer and 5% commission calculated for single-vendor and multi-vendor orders.

Planned split of activities:
- **User task:** the customer's decision to retry after a decline.
- **Automated:** submit the payment (service task to the simulated payment service), handle the result, update inventory, notify the relevant producers, calculate per-producer amounts and commission.

Constraint (case study): test environments only. "Under no circumstances should live payment systems or real financial data be used."

Out of scope: weekly producer settlement. The case study mentions it, but Use Case 2 asks only for the amount attributable to each producer and the 5% commission. It stays in the strategic model as the separate process *Settle producer payments weekly*.

## Hand-off between the two
Functionality 1 produces a confirmed marketplace order with producer-specific elements. Functionality 2 consumes it and returns payment status and the calculated amounts. On success, Functionality 2 ends with the order confirmed, inventory updated and the relevant producers notified, as Use Case 2 states. What producers do after being notified (preparing within the 48-hour lead time, confirming fulfilment) belongs to the separate process *Coordinate producer fulfilment*.

| Passed from Functionality 1 to Functionality 2 | Returned by Functionality 2 |
|---|---|
| Marketplace order identifier | Payment status: approved, declined or unavailable |
| Producer-specific order elements and their amounts | Amount due to each producer |
| Customer and delivery or collection details needed for the order | 5% commission, per producer and in total |

## Traceability
Strategic BPMN: *Place multi-vendor order* is Functionality 1 and *Process payment and commission* is Functionality 2. Message flows involved: Basket and checkout details, Order confirmation, Payment request, Payment result.

In the strategic model the *Order notification (48-hour lead time)* message flow leaves *Coordinate producer fulfilment*, which follows *Process payment and commission* on success. The operational model of Functionality 2 (Sprint 2) will include the step "notify the relevant producers" so that Use Case 2 is covered end to end.

Backlog: the user stories US1 to US7, T1 and M7 belong to Functionality 1; US8 to US15, T2, T4 and M8 belong to Functionality 2. The full links from stakeholder goals to processes, requirements and backlog items are in `docs/traceability-matrix.md`.

## Scope decisions taken from the provided materials
1. Producer notification is part of Functionality 2. Use Case 2: "If payment is successful, the order is confirmed, the appropriate inventory quantities are updated and the relevant producers are notified."
2. Weekly settlement is out of scope for the two functionalities (see above).
3. Payment sandbox: the case study allows a test sandbox, a mock payment service or a simulated gateway, and Use Case 2 says "sandbox or simulated payment service". We plan to use a local simulated service so that declined and unavailable responses can be triggered on demand. This is our choice, not a requirement.

## Assumptions and risks
- Each producer fulfils its own part of an order; the case study names no courier.
- Commission is calculated per producer and then summed for the marketplace.
- A simulated payment service is enough for Task 1.
- Risk: the module team may want the notification boundary drawn differently. Mitigation: the operational model keeps notification as one clearly separable step, so it can move between the two functionalities without redesign.
- Both functionalities must later be integrated into the Task 2 product, so process variables and the hand-off data above are kept explicit.

Further assumptions and decisions are recorded in `docs/decisions-and-assumptions.md`.

## Agreement status
Proposed as the two candidate functionalities for Sprint 1. To be confirmed with the module team before Sprint 2 implementation begins.

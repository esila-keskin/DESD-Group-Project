# Functionality selection: Sprint 1

## Chosen use case
**Use Case 2: Customer Multi-Vendor Order, Checkout and Payment** (Bristol Regional Food Network, case study v2).

## Why Use Case 2
The brief requires each functionality to offer user interaction, automated processing, business decisions, service interaction, data processing and alternative or exceptional flows.

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
- **Use Case 1 (listing):** strong forms and an external certification check with a failure path, but no multi-party data splitting or financial calculation.
- **Use Case 3 (quality incident):** strong human roles and a notification-failure path, with less external service interaction.

## Functionality 1: Basket to order
Scope, from Use Case 2:
- customer adds products from one or more producers to a basket
- checkout checks that "all selected products are still available in the requested quantities"
- if not, the customer "is informed and asked to amend the order"
- the system identifies the producers involved and determines delivery or collection arrangements
- the customer reviews and confirms
- the system creates the overall marketplace order and separates it into producer-specific order elements

Out of scope: product listing and search (Use Case 1 territory).

## Functionality 2: Payment and commission
Scope, from Use Case 2:
- payment is submitted to a sandbox or simulated payment service
- success: the order is confirmed, inventory quantities are updated, producers are notified
- declined: the customer is informed and may retry
- service unavailable: an exception or retry path is followed
- per-producer amounts and the 5% commission are calculated

Constraint (case study): test environments only. "Under no circumstances should live payment systems or real financial data be used."

Out of scope: weekly producer settlement, which comes from the case study rather than this use case.

## Hand-off between the two
Functionality 1 produces a confirmed marketplace order with producer-specific elements. Functionality 2 consumes it and returns payment status and the calculated amounts.

## Traceability
Strategic BPMN: *Place multi-vendor order* is Functionality 1 and *Process payment and commission* is Functionality 2. Message flows involved: Basket and checkout details, Order confirmation, Payment request, Payment result.

## Questions for the module team
1. Does Functionality 2 include producer notification, or does it stop at the hand-off to *Coordinate producer fulfilment*?
2. Confirm weekly settlement is out of scope.
3. Preferred payment sandbox: Stripe test mode, or a local mock service?

## Agreement status
Proposed. Agreement date: [to be confirmed at the 26 October practical].

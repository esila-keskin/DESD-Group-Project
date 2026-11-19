# Traceability matrix

Group 51, Bristol Regional Food Network (Use Case 2). Sections 1 to 6: Sprint 1, 28 October 2026. Sections 7 to 9: Sprint 2, 19 November 2026.

This document shows how each stakeholder goal is carried through the strategic BPMN model, the requirements and the product backlog. It answers the brief's requirement for "clear alignment between the strategic process model and the stakeholder goals and dependencies". The i* Strategic Dependency and Rationale models are assessed in Sprint 2; this matrix is the Sprint 1 starting point for them.

Sources: Case Study v2, the Task 1 use cases, docs/strategic-bpmn-justification.md, docs/case-study-analysis.md (requirement IDs FR1 to FR20 and NFR1 to NFR7), docs/functionality-selection.md, and the project board (backlog IDs).

## 1. Stakeholder goals to strategic processes

| Stakeholder | Goal (from the case study) | Strategic process | Requirements | Backlog items | Task 1 scope |
|---|---|---|---|---|---|
| Producers | List and update products without training | Manage product listings and inventory | FR1, FR2, FR11, FR16, FR17, NFR1 | none | Not selected (Use Case 1) |
| Customers | Find local produce quickly and see where it comes from | Browse and search catalogue | FR5, FR6, FR7 | none | Feeds the basket |
| Customers, producers | One checkout across several producers with clear responsibility for each part | Place multi-vendor order | FR8, FR9, FR18 | US1 to US7, T1, M7 | **Functionality 1** |
| The network, customers, producers | Automatic commission, secure and compliant payment, a correct share for each producer | Process payment and commission | FR10 (payment and commission part), FR19, NFR2, NFR3, NFR4, NFR7 | US8 to US15, T2, T4, M8 | **Functionality 2** |
| Producers, customers | Time to prepare an order; clear delivery or collection | Coordinate producer fulfilment | FR3 | US11 (the notification trigger is in Functionality 2) | Later steps are outside the two functionalities |
| Producers | Predictable weekly income and records for tax | Settle producer payments weekly | FR4, FR10 (distribution part), NFR5 | W1 | Not selected |
| Customers, producers | Prompt, fair action on quality and safety concerns | Handle quality and safety concerns | FR11 (part), FR12, FR20 | W2 | Not selected (Use Case 3) |
| The network | Sustainability objectives | Report food miles | FR13 | none | Not selected |
| The network, community | Reduce food waste, strengthen community links | Publish surplus offers and community content | FR14, FR15 | W3 | Not selected |

Cross-cutting requirements that apply to every process: NFR3 (data protection and financial regulation), NFR4 (test environments only for payment) and NFR6 (the 20-mile service area).

**Coverage check.** All 20 functional requirements (FR1 to FR20) and all 7 non-functional requirements (NFR1 to NFR7) appear in this table, so none of them has been dropped between the case study and the model.

## 2. Strategic processes to interfaces (message flows)

| Process | Messages in | Messages out |
|---|---|---|
| Manage product listings and inventory | Listing and stock updates (Producers); Certification result (Certification Service) | Certification check request (Certification Service) |
| Browse and search catalogue | Search and browse request (Customers) | Product information (Customers) |
| Place multi-vendor order | Basket and checkout details (Customers) | Order confirmation (Customers) |
| Process payment and commission | Payment result (Payment Provider) | Payment request (Payment Provider) |
| Coordinate producer fulfilment | Fulfilment confirmation (Producers) | Order notification, 48-hour lead time (Producers) |
| Settle producer payments weekly | none | Settlement statement (Producers) |
| Handle quality and safety concerns | Quality concern report (Customers); Producer response (Producers) | Safety notification (Customers); Information request (Producers) |
| Report food miles | none (internal report fed by order postcodes) | none |
| Publish surplus offers and community content | Surplus stock and content (Producers) | Surplus offers and community content (Customers) |

The model has 18 message flows in total. The sequence flows between processes are: Handle quality and safety concerns to Manage product listings and inventory; Manage product listings to Browse and search; Browse and search to Place multi-vendor order; Place multi-vendor order to Process payment and commission; Place multi-vendor order to Report food miles; Process payment and commission to Coordinate producer fulfilment; Coordinate producer fulfilment to Settle producer payments weekly.

## 3. Requirements to backlog items for the two functionalities

| Requirement | Backlog items that deliver it | Where it is modelled |
|---|---|---|
| FR8 checkout handles single-vendor and multi-vendor orders with clear supplier responsibility, delivery and collection | US1, US5, US6, US7, T1 | Place multi-vendor order; operational model M7 |
| FR9 multi-vendor orders aggregated, each supplier's responsibilities shown | US4, US7 | Place multi-vendor order; M7 |
| FR18 stock check, customer amends if short | US2, US3 | Place multi-vendor order; M7 |
| FR19 declined payment retried; unavailable service follows a retry or exception path | US8, US12, US13, T2, T4 | Process payment and commission; M8 |
| FR10 payment and commission (amount per producer, 5%) | US14, US15 | Process payment and commission; M8 |
| FR3 producers see incoming orders in good time (notification trigger only) | US11 | Process payment and commission, then Coordinate producer fulfilment; M8 |
| Order confirmed and stock updated after successful payment (Use Case 2) | US9, US10 | Process payment and commission; M8 |
| NFR4 test environments only | US8 (sandbox or simulated service) | Payment Provider pool; M8 |
| NFR7 payment flow must not simply stop when the service is unavailable | US13 | Process payment and commission; M8 |
| NFR2, NFR3 secure, compliant payment | applied as design constraints in M8 and T2 (no card data held; see L2) | Process payment and commission |
| Happy path and exception paths can be tested end to end (FR18, FR19) | T4. The outline is in docs/test-plan-outline.md: order placed and paid, insufficient stock, payment declined then retried, payment service unavailable | M7 and M8 |

## 4. Stakeholder dependencies (the starting point for the i* Strategic Dependency model)

These are drawn from the case study. They are our first reading and will be refined into the i* SD model in Sprint 2.

| Depender | Dependee | Dependum (what is depended on) | Kind |
|---|---|---|---|
| Customers | Marketplace platform | A multi-vendor order is placed and confirmed | Task |
| Customers | Marketplace platform | Clear supplier responsibility, delivery and collection information | Resource |
| Customers | Producers | Products as described, ready on time | Goal |
| Producers | Marketplace platform | Incoming orders visible with at least 48 hours' notice | Resource |
| Producers | Marketplace platform | Correct share of each payment, with an audit trail | Goal |
| Marketplace platform | Payment Provider | Payment is processed in a test or simulated environment | Task |
| Marketplace platform | Certification Service | Organic certification is verified | Task |
| Marketplace platform | Producers | Accurate listings and stock levels | Resource |
| Marketplace platform | Customers | Payment for the order | Resource |

The 5% commission is not in this table, because an i\* dependency links two actors and the commission calculation is not an actor. It is an internal goal of the Marketplace platform, inside its Payments and Settlement function, and it will appear in the i\* Strategic Rationale model (M6) inside the platform's boundary. The dependency between actors that relies on it, producers depending on the platform for the correct share of each payment with an audit trail, is already in the table.

Softgoals from the case study that the i* SR model will develop: ease of use for producers (NFR1), secure payment (NFR2), regulatory compliance (NFR3), trust in the money calculations, food-waste reduction, sustainability.

## 5. Legal, ethical, social and professional items to model elements

| LESP item | Model element it affects |
|---|---|
| L1 personal data in orders | Basket and checkout details; Order confirmation; Place multi-vendor order |
| L2 payment data and regulation | Payment request; Payment result; Process payment and commission; Payment Provider |
| L3 holding money for producers | Settle producer payments weekly; Settlement statement |
| L4 allergen and best-before information | Manage product listings and inventory; Listing and stock updates |
| L5 organic claims | Certification check request; Certification result; Certification Service |
| L6 traceability and recall | Handle quality and safety concerns and its four messages |
| L7 online selling to consumers | Place multi-vendor order; Order confirmation |
| L8 marketing messages | Publish surplus offers and community content |
| E1 fair treatment of small producers | Browse and search catalogue; Process payment and commission |
| E2 accuracy of food-miles claims | Report food miles |
| E3 vulnerable customers | Safety notification; Handle quality and safety concerns |
| E4 trust in money calculations | Settle producer payments weekly; Process payment and commission |
| E5 safe food-waste discounts | Publish surplus offers and community content |
| S1 accessibility | Camunda Forms (Sprint 2); Basket and checkout details; Order confirmation |
| S2 producers with limited digital skill | Manage product listings and inventory; Producers pool |
| S3 local economy and trust | Whole model |

## 6. How this feeds Sprint 2

- The **i\* Strategic Dependency model** (M5) will take its actors from the five pools and its dependencies from the message flows in section 2 and the dependency table in section 4.
- The **i\* Strategic Rationale model** (M6) will take its goals and softgoals from the "Goal" column in section 1, and the platform's internal goals, such as the 5% commission calculation (see the note under section 4).
- The **operational BPMN models** for Functionality 1 (M7) and Functionality 2 (M8) will each refine one strategic process and keep the same message flows as their external interface, so the strategic and operational models stay consistent.
- The matrix is updated whenever the backlog or the model changes, and the version in the repository at each sprint submission is the one that counts.

## 7. i* Strategic Rationale elements to operational BPMN, forms, job types and tests (Sprint 2)

| Actor | SR element | Operational element | Form or job type | Test |
|---|---|---|---|---|
| Customer | Review and confirm the order | M7: Review basket and enter details; Choose delivery or collection and confirm order | `f1-review-basket`, `f1-confirm-order` | T1, T3 |
| Customer | Pay for the order | M8: Enter payment details | `f2-enter-payment` | F2-a |
| Customer | Card details kept safe (quality) | M8: `testCardNumber = null` on Take payment and on the error boundary event | | F2-a, F2-e |
| Platform | Take basket to confirmed order | M7 as a whole | | T1 |
| Platform | Check stock at checkout | M7: Check stock, Enough stock?, Amend quantities | `check-stock`, `f1-amend-order` | T1, T2 |
| Platform | Reserve stock with a timer | Not chosen (Q7). The 30 minutes timer closes unconfirmed orders instead | | T4 |
| Platform | Split order by producer | M7: Split order by producer and work out total | FEEL script | T1, T5 |
| Platform | Order and producer records (resource) | Variables `basketItems`, `producerParts` | | T1 |
| Platform | Take payment and calculate commission | M8 as a whole, started by the call activity in M7 | | T1 |
| Platform | Submit payment to simulated provider | M8: Take payment; message flows Payment request and Payment result | `take-payment` | F2-a to F2-e |
| Platform | Payment failure handled; Retry payment up to 3 attempts | M8: Count payment attempt, error boundary event, Wait 10 seconds, Retry payment, Try again? | `f2-retry-payment` | F2-b, F2-c, F2-d, F2-e |
| Platform | Cancel the order at once | Not chosen | | |
| Platform | Calculate 5% commission per producer | M8: Calculate commission | FEEL script | F2-a (55), T5 (65) |
| Platform | Notify producers of their order part | M8: Notify producer, multi-instance; message flow New order notification | `notify-producer` | F2-a |
| Platform | Orders not lost (quality) | Retry paths, and a named end event for every outcome | | F2-b, F2-e |
| Platform | Simple checkout process (quality) | Stock check without reservation; three forms in Functionality 1 | | T1 |
| Platform | Regulatory compliance (quality) | Simulated provider only; card number not kept | | F2-a |
| Producer | Prepare order part within 48 hours | `earliestDate` two days ahead in Split order; producer notification | | T1 |

## 8. i* Strategic Dependency dependencies to operational models (Sprint 2)

| Dependency | Where it is met | Test |
|---|---|---|
| Customer depends on Platform: Multi-vendor order placed | M7 end event Order placed | T1 |
| Platform depends on Customer: Review and confirm order | M7 user tasks with `f1-review-basket` and `f1-confirm-order` | T1, T3 |
| Platform depends on Customer: Payment for the order | M8 Enter payment details | F2-a |
| Platform depends on Payment Provider: Process test payment; Payment result | M8 Take payment, message flows Payment request and Payment result | F2-a to F2-e |
| Producer depends on Platform: Order notification (48 h notice) | M8 Notify producer, message flow New order notification | F2-a |
| Producer depends on Platform: Correct share of payment received | M8 Calculate commission, `producerShares` | F2-a, T5 |
| Customer depends on Platform: Delivery and collection details | `f1-confirm-order`: `fulfilmentMethod`, `earliestDate` | T1 |
| Customer depends on Platform: Product information | `f1-review-basket` table from `basketItems` | T1 |
| Platform depends on Producer: Accurate listings and stock | Stock levels read by `check-stock` | T2 |
| Customer depends on Platform: Secure payment | Simulated provider; card number cleared after each attempt | F2-a, F2-e |
| Platform depends on Producer: Prepare and fulfil order part | Outside the two functionalities (Coordinate producer fulfilment); started by the notification | |
| Quality concern resolved, Weekly settlement statement, Verify organic certification, Easy listing without training | Outside Task 1 scope (sections 1 and 4) | |

## 9. Backlog items in Sprint 2

| Item | Delivered by | Test |
|---|---|---|
| M5, M6 | models/istar/; docs/istar-rationale.md | |
| M7, M8 | models/operational/; docs/operational-bpmn-justification.md | T1 to T5, F2-a to F2-e |
| T1 | camunda/forms/ (five forms) | All |
| T2 | workers/ (`check-stock`, `take-payment`, `update-inventory`, `notify-producer`) | All; unit tests with `npm test` |
| T3 | docs/process-variables.md; test-data/ | All |
| US2, US3 | Check stock, Enough stock?, Amend quantities | T2 |
| US4, US7 | Split order by producer and work out total | T1, T5 |
| US5, US6 | Choose delivery or collection and confirm order | T1, T3 |
| US8, US9 | Take payment, Payment result?, Order paid | F2-a |
| US10 | Update inventory (logged only) | F2-a |
| US11 | Notify producer (logged only) | F2-a |
| US12 | Retry payment loop | F2-b, F2-c, F2-d |
| US13 | Error boundary event and automatic retry | F2-e |
| US14, US15 | Calculate commission | F2-a, T5 |

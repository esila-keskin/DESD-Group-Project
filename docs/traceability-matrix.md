# Traceability matrix: Sprint 1

Group 51, Bristol Regional Food Network (Use Case 2). Status as of 27 October 2026.

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
| Marketplace platform (the network) | Payment calculation | The 5% commission is calculated correctly | Goal |

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
- The **i\* Strategic Rationale model** (M6) will take its goals and softgoals from the "Goal" column in section 1.
- The **operational BPMN models** for Functionality 1 (M7) and Functionality 2 (M8) will each refine one strategic process and keep the same message flows as their external interface, so the strategic and operational models stay consistent.
- The matrix is updated whenever the backlog or the model changes, and the version in the repository at each sprint submission is the one that counts.
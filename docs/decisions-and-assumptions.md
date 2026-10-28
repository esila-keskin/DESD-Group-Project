# Decisions, assumptions, open questions and risks: Sprint 1

Group 51, Bristol Regional Food Network (Use Case 2). Status as of 28 October 2026.

This record explains the choices made in Sprint 1 and what we have not yet confirmed, so that a reader can see the reasoning without asking. Each decision gives its source, the alternative we rejected, and its status. "Candidate" means proposed for Sprint 1 and to be confirmed with the module team before Sprint 2 implementation begins, as the brief requires.

## 1. Decisions

| ID | Decision | Reason and source | Alternative considered | Status |
|---|---|---|---|---|
| D1 | Use Case 2 (multi-vendor order, checkout and payment) | It combines user interaction, automation, business decisions, an external service, a financial calculation and exception paths, which the brief names as the qualities of substantial functionalities (see docs/functionality-selection.md for the comparison of the three use cases) | Use Case 1 (no money calculation or multi-party split); Use Case 3 (less interaction with an external service, no calculation) | Candidate, to be confirmed before Sprint 2 |
| D2 | Split Use Case 2 into two functionalities at the hand-off: a confirmed order with producer-specific parts | Each half is substantial and the hand-off is clear and testable | One large functionality; a split at payment submission | Candidate, to be confirmed before Sprint 2 |
| D3 | Model the nine processes as collapsed sub-processes with no start or end events | This is a strategic abstraction. Detailed flow belongs to the operational models in Sprint 2 | Expanding each process now | Adopted in the Sprint 1 model |
| D4 | One platform pool with five lanes | Lanes show organisational functions inside one organisation; pools are for separate participants | A separate pool for each department | Adopted |
| D5 | Payment Provider and Certification Service as external pools | The network does not control them, so the model shows requests out and results back (Use Cases 1 and 2 describe "external or simulated" services) | Treating them as lanes of the platform | Adopted |
| D6 | No courier participant | The case study never names a courier. Delivery is handled by producers inside fulfilment | A separate courier pool | Adopted |
| D7 | Food miles as an internal process with no external messages | It is a report built from order postcodes | A message flow to an external distance service | Adopted |
| D8 | Weekly settlement is a separate process and out of scope for the two functionalities | The case study mentions it, but Use Case 2 asks only for the amount attributable to each producer and the 5% commission | Including it in Functionality 2 | Adopted |
| D9 | Quality and safety concerns link to listings in the process chain | A confirmed concern withdraws the affected listing | Leaving it unlinked | Adopted |
| D10 | MoSCoW priorities and story points relative to the smallest finished item (2 points) | Simple and consistent for a new team | Hours-based estimates | Adopted, estimates to be reviewed by the whole group |
| D11 | One branch per item, one pull request, a reviewer who is not the author | Gives visible review and contribution evidence | Committing directly to main | Adopted. A few early edits were committed directly while the group was forming (see CONTRIBUTIONS.md); changes now go through pull requests |
| D12 | Test or sandbox payment services only | The case study forbids live payment systems and real financial data | Any live service | Required by the case study |
| D13 | Use a local simulated payment service, not a hosted sandbox | The case study allows a test sandbox, mock services or simulated gateways. A local service lets us trigger declined and unavailable responses on demand, which Use Case 2 requires us to handle | Stripe test mode (declines possible with test cards, but an unavailable service is hard to reproduce) | Candidate, to be confirmed before Sprint 2 |
| D14 | Producer notification on payment success is part of Functionality 2 | Use Case 2: "If payment is successful, the order is confirmed, the appropriate inventory quantities are updated and the relevant producers are notified." Preparation and fulfilment confirmation stay in Coordinate producer fulfilment | Placing notification entirely in fulfilment | Candidate, to be confirmed before Sprint 2 |
| D15 | When a customer adds a product that is already in the basket, increase the quantity on the existing line | Proposed by Mahtab on issue #10 (US1). The stock check at checkout then compares one line per product | Allowing duplicate lines | Proposed, to be confirmed at Sprint 2 planning |
| D16 | Group the basket items by producer ID at checkout to find the producers involved and give each one its own part of the order | Proposed by Mahtab on issue #12 (US4) and in docs/f1-open-questions.md. US4 and US7 then use the same key | Matching items to producers by name | Proposed, to be confirmed at Sprint 2 planning |
| D17 | Show the earliest possible delivery or collection date on the order review screen | Proposed by Mahtab on issue #13 (US6). Producers need at least 48 hours' notice (FR3), so the customer should know what they are agreeing to | Showing the date only after confirmation | Proposed, to be confirmed at Sprint 2 planning |
| D18 | Each producer offers delivery, collection or both, and the customer chooses from that at checkout | Proposed by Mahtab in docs/f1-open-questions.md. It fits assumption A1, that each producer fulfils its own part of an order | The system or the producer choosing for the customer | Proposed, to be confirmed at Sprint 2 planning |
| D19 | After a declined payment the customer returns to the payment page with an error message and may retry. The number of attempts is limited, and after the limit the order stays unconfirmed. A successful retry continues exactly as a first-time success | Proposed by Ella on issue #28 (US12). Limiting attempts is a security measure | Unlimited retries | Proposed. The number of attempts is open (Q8) |
| D20 | The customer's name and card details are passed to the simulated payment service only to simulate the payment and are not stored by the platform. The service's confirmation message is relayed to the customer with the order confirmation | Proposed by Ella on issue #14 (US8). Only fictional test data is used (docs/test-plan-outline.md). As a design constraint for T3, process variables must not keep card details after the payment is submitted | Storing card details in the process data | Proposed, to be confirmed at Sprint 2 planning |

D15 to D20 come from comments on the backlog issues and from docs/f1-open-questions.md. They are proposals from the members who lead those areas, recorded here so that they can be traced, and are confirmed at Sprint 2 planning.

## 2. Assumptions

| ID | Assumption | Why it was needed | Impact if wrong |
|---|---|---|---|
| A1 | Each producer fulfils its own part of an order | The case study mentions delivery arrangements and collection procedures but does not say who delivers | A courier participant would be added to the model and to the fulfilment process |
| A2 | The 5% commission is calculated per producer and then summed | The case study does not give a rounding rule | The rounding rule in US15 would change; the calculation structure would not |
| A3 | Weekly settlement is separate from Use Case 2 | Use Case 2 does not mention it | Settlement would need its own backlog items and move into Functionality 2 |
| A4 | Producer notification on payment success belongs to Functionality 2; later fulfilment steps do not | Use Case 2 lists it on the payment success path; the case study's 48-hour order visibility belongs to fulfilment | The notification step would move to fulfilment (US11 would change owner process, not content) |
| A5 | A simulated payment service is enough for Task 1 | The case study allows sandbox, mock or simulated services | Service tasks would call a hosted sandbox instead; the process model would not change |

## 3. Open questions and points to confirm with the module team

| ID | Question | Status |
|---|---|---|
| Q1 | Does Functionality 2 include producer notification? | Resolved from Use Case 2: yes (see D14). To be confirmed with the module team before Sprint 2 |
| Q2 | Is weekly settlement out of scope for Task 1? | Resolved from Use Case 2: yes (see D8). To be confirmed with the module team before Sprint 2 |
| Q3 | Which payment sandbox? | The case study allows any test sandbox, mock or simulated gateway. Our choice is a local simulated service (D13). To be confirmed with the module team before Sprint 2 |
| Q4 | Does the signed Contribution Matrix apply to the Sprint 1 submission? | Open. The brief lists a signed matrix among the repository evidence and says it is submitted through the group repository, but does not state a deadline for it. We will ask, and will keep it up to date in the repository |
| Q5 | Is our declared use of generative AI acceptable under the brief's rule that AI-generated models and diagrams are treated as plagiarism? | Open. The use is described in the README and in R6 |
| Q6 | Which GitHub usernames should be given access to the private repository and board? | Open. The brief makes the group responsible for access for the module team |
| Q7 | Should stock be reserved for a short time (Mahtab suggests 8 to 10 minutes) while the customer checks out, and released if they do not buy? | Open. Use Case 2 says only that availability is checked at checkout and inventory is updated after payment. A reservation would add a timer and a release step to the Functionality 1 model (issue #11) and adds work to Sprint 2. To be decided inside the group at Sprint 2 planning |
| Q8 | How many payment attempts are allowed after a decline (D19)? | Open. Ella asks for a limit (issue #28). The test plan outline assumes two retries when the payment service is unavailable. To be decided with Ella and Bruno before US12 and T4 start |

The module team will be contacted about Q1 to Q6 together, after the Sprint 1 submission and before Sprint 2 implementation begins. Q7 and Q8 are decided inside the group.

## 4. Risks

| ID | Risk | Effect | Action | Owner |
|---|---|---|---|---|
| R1 | One registered member did not take part | Work would fall to the other members | Closed: the module team removed that member from the group, so the group has four members and the work is shared among them | Esila |
| R2 | The module team may draw the notification boundary differently (Q1) | The scope could be adjusted | Notification is kept as one separable step in the model, so it can move between functionalities without redesign. Confirmation before Sprint 2 | Esila |
| R3 | The payment sandbox is our choice and not yet confirmed (Q3) | Affects the Sprint 2 service tasks | A local simulated service lets us trigger declined and unavailable responses. Confirmation before Sprint 2 | Ella |
| R4 | Sprint 2 is planned at 67 points, more than Sprints 1 and 3 | The plan could be unrealistic | Rebalance at the start of Sprint 2 using the real Sprint 1 speed | Esila |
| R5 | The i\* models are not started | They are assessed in Sprint 2 | Sprint 2 backlog items M5 and M6 are assigned; the traceability matrix, including its dependency table, is the starting point | Esila |
| R6 | Generative AI was used in Sprint 1 | Academic integrity: the brief treats AI-generated models and diagrams as plagiarism and allows AI in code only if declared and understood | The use is declared in the README: an AI assistant was used to discuss the case study, and help draft the documents in docs/. The model was drawn by hand in Camunda, and its structure and every shape and documentation block were checked and are justified against the case study. Every member must be able to explain the work. Question Q5 asks the module team | Esila |
| R7 | The candidate functionalities are not yet confirmed | If the module team changes the scope, Sprint 2 work would need to be redone | Detailed operational modelling starts only after confirmation, as the brief requires. The functionality document and the hand-off are kept short and explicit | Esila |
| R8 | Modelling, repository administration and project coordination are held by one person | A single point of failure for Sprint 2 | Every backlog item has a named owner; each pull request is reviewed by someone else; the board and this record are visible to all members | Group |
| R9 | The team's proposals add work to Sprint 2, which is already planned at 67 points | R4 gets worse, and a feature such as a stock reservation timer could crowd out the Must items | Record proposals as proposals (D15 to D20, Q7, Q8), decide them at Sprint 2 planning, and take them only if the rebalanced plan allows | Esila |

Last updated: 28 October 2026.
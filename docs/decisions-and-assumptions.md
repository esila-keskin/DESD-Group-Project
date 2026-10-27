# Decisions, assumptions, open questions and risks: Sprint 1

Group 51, Bristol Regional Food Network (Use Case 2). Status as of 27 October 2026.

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
| D11 | One branch per item, one pull request, a reviewer who is not the author | Gives visible review and contribution evidence | Committing directly to main | Adopted |
| D12 | Test or sandbox payment services only | The case study forbids live payment systems and real financial data | Any live service | Required by the case study |
| D13 | Use a local simulated payment service, not a hosted sandbox | The case study allows a test sandbox, mock services or simulated gateways. A local service lets us trigger declined and unavailable responses on demand, which Use Case 2 requires us to handle | Stripe test mode (declines possible with test cards, but an unavailable service is hard to reproduce) | Candidate, to be confirmed before Sprint 2 |
| D14 | Producer notification on payment success is part of Functionality 2 | Use Case 2: "If payment is successful, the order is confirmed, the appropriate inventory quantities are updated and the relevant producers are notified." Preparation and fulfilment confirmation stay in Coordinate producer fulfilment | Placing notification entirely in fulfilment | Candidate, to be confirmed before Sprint 2 |

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

The module team will be contacted about Q1 to Q6 together, after the Sprint 1 submission and before Sprint 2 implementation begins.

## 4. Risks

| ID | Risk | Effect | Action | Owner |
|---|---|---|---|---|
| R1 | One member has not responded to any message | Work falls to the other members | Dated attempts to make contact are recorded in CONTRIBUTIONS.md, as the brief asks. The module team will be informed in the email under Q1 to Q6 | Esila |
| R2 | The module team may draw the notification boundary differently (Q1) | The scope could be adjusted | Notification is kept as one separable step in the model, so it can move between functionalities without redesign. Confirmation before Sprint 2 | Esila |
| R3 | The payment sandbox is our choice and not yet confirmed (Q3) | Affects the Sprint 2 service tasks | A local simulated service lets us trigger declined and unavailable responses. Confirmation before Sprint 2 | Ella |
| R4 | Sprint 2 is planned at 67 points, more than Sprints 1 and 3 | The plan could be unrealistic | Rebalance at the start of Sprint 2 using the real Sprint 1 speed | Esila |
| R5 | The i\* models are not started | They are assessed in Sprint 2 | Sprint 2 backlog items M5 and M6 are assigned; the traceability matrix, including its dependency table, is the starting point | Esila |
| R6 | Generative AI was used in Sprint 1 | Academic integrity: the brief treats AI-generated models and diagrams as plagiarism and allows AI in code only if declared and understood | The use is declared in the README: an AI assistant was used to discuss the case study, and help draft the documents in docs/. The model was drawn by hand in Camunda, and its structure and every shape and documentation block were checked and are justified against the case study. Every member must be able to explain the work. Question Q5 asks the module team | Esila |
| R7 | The candidate functionalities are not yet confirmed | If the module team changes the scope, Sprint 2 work would need to be redone | Detailed operational modelling starts only after confirmation, as the brief requires. The functionality document and the hand-off are kept short and explicit | Esila |
| R8 | Modelling, repository administration and project coordination are held by one person | A single point of failure for Sprint 2 | Every backlog item has a named owner; each pull request is reviewed by someone else; the board and this record are visible to all members | Group |

Last updated: 27 October 2026.
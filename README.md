# DESD Group Project: Bristol Regional Food Network (Group 51)

UFCFTR-30-3 Distributed and Enterprise Software Development, 2026-27, Task 1.

## What this project is
An automated business process for the fictional Bristol Regional Food Network, a community marketplace linking about 40 local producers with customers within 20 miles of Bristol. We model it (i*, strategic BPMN, operational BPMN) and then make two processes executable in Camunda 8.

## Chosen use case
**Use Case 2: Customer Multi-Vendor Order, Checkout and Payment.**

Major functionalities:
1. **Basket to order:** availability check with amend loop, delivery or collection decision, customer confirmation, order creation and per-producer split.
2. **Payment and commission:** payment via a simulated service with approved, declined-with-retry and unavailable paths; inventory update; producer notification; per-producer amounts and 5% commission.

## Group
| Student | ID | Role |
|---|---|---|
| Esila Keskin | 24064432 | Project lead, project coordination, modelling lead, repository administrator |
| Mahtab Bin Lokman | 24038250 | Functionality 1 lead (basket to order) |
| Dylan (Ella) Morgan | 24030018 | Functionality 2 lead (payment and commissions) |
| Bruno Pedro | 22074709 | Implementation, testing |

## Sprint 2 deliverables
- i* Strategic Dependency model: [`models/istar/istar-sd.png`](models/istar/istar-sd.png) (piStar file `istar-sd.txt`)
- i* Strategic Rationale model: [`models/istar/istar-sr.png`](models/istar/istar-sr.png) (piStar file `istar-sr.txt`)
- Rationale for both i* models: [`docs/istar-rationale.md`](docs/istar-rationale.md)
- Operational BPMN, Functionality 1: [`models/operational/m7-place-multivendor-order.bpmn`](models/operational/m7-place-multivendor-order.bpmn)
- Operational BPMN, Functionality 2: [`models/operational/m8-process-payment-commission.bpmn`](models/operational/m8-process-payment-commission.bpmn)
- Justification of the operational models: [`docs/operational-bpmn-justification.md`](docs/operational-bpmn-justification.md)
- Camunda forms: [`camunda/forms/`](camunda/forms/)
- Saved Camunda Test mode cases: [`camunda/tests/`](camunda/tests/)
- Job worker: [`workers/`](workers/)
- Process variables: [`docs/process-variables.md`](docs/process-variables.md)
- Test data: [`test-data/`](test-data/)
- Test results and evidence: [`docs/test-results.md`](docs/test-results.md), [`docs/test-evidence/`](docs/test-evidence/)
- Traceability matrix, updated for Sprint 2: [`docs/traceability-matrix.md`](docs/traceability-matrix.md)
- Sprint 2 plan and review: [`docs/sprint-2-plan.md`](docs/sprint-2-plan.md)
- Payment scenarios and commission examples: [`docs/payment-scenarios.md`](docs/payment-scenarios.md)

![Functionality 1](models/operational/m7-place-multivendor-order.png)

![Functionality 2](models/operational/m8-process-payment-commission.png)

## Sprint 1 deliverables
- Strategic BPMN: [`models/strategic/strategic-bpmn-v1.bpmn`](models/strategic/strategic-bpmn-v1.bpmn) ([SVG](models/strategic/strategic-bpmn-v1.svg))
- Justification with case-study evidence: [`docs/strategic-bpmn-justification.md`](docs/strategic-bpmn-justification.md)
- Case study analysis: [`docs/case-study-analysis.md`](docs/case-study-analysis.md)
- Functionality selection: [`docs/functionality-selection.md`](docs/functionality-selection.md)
- Legal, ethical, social and professional considerations: [`docs/lesp-considerations.md`](docs/lesp-considerations.md)
- Sprint 1 plan: [`docs/sprint-1-plan.md`](docs/sprint-1-plan.md)
- Traceability matrix: [`docs/traceability-matrix.md`](docs/traceability-matrix.md)
- Decisions, assumptions, open questions and risks: [`docs/decisions-and-assumptions.md`](docs/decisions-and-assumptions.md)
- Open questions for Functionality 1: [`docs/f1-open-questions.md`](docs/f1-open-questions.md)
- Test plan outline: [`docs/test-plan-outline.md`](docs/test-plan-outline.md)
- Contributions log: [`CONTRIBUTIONS.md`](CONTRIBUTIONS.md)
- Project board: https://github.com/users/esila-keskin/projects/1 

![Strategic BPMN](models/strategic/strategic-bpmn-v1.svg)

## Running the processes
1. Import the five `.form` files and the two operational `.bpmn` files into a Camunda 8 Web Modeler project.
2. Deploy the forms and both processes to a cluster. Deploy `process-payment-commission` before `place-multivendor-order`, since the second calls the first.
3. Start the worker: see [`workers/README.md`](workers/README.md).
4. Start `place-multivendor-order` with one of the basket files in `test-data/` plus an `orderId`, or start `process-payment-commission` on its own with the start variables in `docs/test-results.md`.
5. Complete the forms in Web Modeler Test mode or in Tasklist, and follow the instance in Operate.

## Validation notes
The strategic BPMN is deliberately non-executable. Camunda's Implement-mode checks flag its pools as non-executable and the collapsed sub-processes as lacking start and end events, which is expected at the strategic level.

Both operational models pass the Camunda 8.10 checks with no errors. The only notice left is Test mode's warning that it cannot fast-forward timers.

## Working agreement
Everyone commits under their own account. Work on a branch and open a pull request. Commit messages name the task. Every pull request is reviewed by someone other than its author.

## Use of generative AI
Each member declares their own use, and each can explain the work they present.
- Esila Keskin used an AI assistant (Claude) to discuss and analyse the case study, and to help draft the written documents in docs/. The strategic BPMN model was drawn by hand in Camunda Web Modeler. Its structure and every shape and documentation entry were checked and adjusted against the case study, and no diagram file was generated by AI. All text was reviewed before it was committed.
- Mahtab Bin Lokman: Mahtab Bin Lokman have used Claude AI (an AI chatbot) to help in understanding the tasks more accurately and to tidy the grammar and structure the issue comments and f1-open-questions.md. The questions, suggestions and choices are from own thought, and  haven’t used it to create any models or code
- Ella Morgan: No use of generative AI for current tasks.
- Bruno Pedro used OpenAI Codex to help interpret the Sprint 2 requirements, draft the process-variable and test-data documentation, and implement and test the Node.js Camunda workers. All outputs were reviewed against the project requirements and official Camunda documentation, and no live credentials or payment data were provided.


# Contributions log

Group 51, Bristol Regional Food Network (Use Case 2)

This log records who did what, with links to the evidence in this repository. It is kept up to date through the sprints. Student IDs and roles are in the README.

## 1. Work completed

Evidence is the commit history, pull requests and issues in this repository, and the Camunda projects "Bristol Food Network - Task 1" (Sprint 1) and "Group 51 Sprint 2" (Sprint 2).

### Esila Keskin (GitHub: esila-keskin)

| Date | Work | Evidence |
|---|---|---|
| 21 October 2026 | Created the repository | Initial commit |
| 22 to 23 October 2026 | Wrote the strategic BPMN justification | docs/strategic-bpmn-justification.md |
| 23 October 2026 | Built the strategic BPMN model in Camunda Web Modeler and exported it | models/strategic/strategic-bpmn-v1.bpmn and .svg; issue #2 |
| 23 October 2026 | Wrote the README | README.md; issue #6 |
| 23 October 2026 | Wrote the functionality selection document | docs/functionality-selection.md; pull request #1; issue #4 |
| 23 October 2026 | Created the product backlog: 34 issues with acceptance criteria, priorities, estimates and sprints, and the project board with three views | Issues #2 to #35; project board "Task 1 backlog" |
| 24 October 2026 | Wrote and merged the Sprint 1 plan | docs/sprint-1-plan.md; pull request #36; issue #7 |
| 24 October 2026 | Wrote and merged the case study analysis | docs/case-study-analysis.md; pull request #37; issue #3 |
| 25 October 2026 | Wrote the legal, ethical, social and professional considerations | docs/lesp-considerations.md; issue #5 |
| 27 October 2026 | Added the roles, board link and generative AI declaration to the README, and updated the functionality selection document and the Sprint 1 plan | Commits 24e78f2, b1fab91, 7f06ad6 and 7b6349f |
| 27 October 2026 | Wrote the traceability matrix and the decisions, assumptions, open questions and risks record | docs/traceability-matrix.md; docs/decisions-and-assumptions.md; pull request #40 |
| 28 October 2026 | Revised the traceability matrix after the review comment on the i\* dependency table | Pull request #40 |

### Mahtab Bin Lokman (GitHub: justmahtab)

| Date | Work | Evidence |
|---|---|---|
| 27 to 28 October 2026 | Commented on the user stories US1, US2, US4 and US6 with open questions and suggestions | Comments on issues #10, #11, #12 and #13 |
| 28 October 2026 | Reviewed and approved the traceability matrix and decisions record, with a question about the i\* dependency table | Review on pull request #40 |
| 28 October 2026 | Wrote the open questions and suggestions for Functionality 1 | docs/f1-open-questions.md; pull request #43 |
| 28 October 2026 | Wrote his generative AI statement in the README | Commit 46d27d0 |

### Dylan (Ella) Morgan (GitHub: SxyIronGolem)

| Date | Work | Evidence |
|---|---|---|
| 27 October 2026 | Commented on US12 (exception case, a limit on payment attempts, the order after a successful retry) and on US8 (what is passed to the simulated payment service) | Comments on issues #28 and #14 |

### Bruno Pedro (GitHub: brunopedro2910)

| Date | Work | Evidence |
|---|---|---|
| 27 October 2026 | Wrote the test plan outline for the happy path and three exception paths | docs/test-plan-outline.md; pull request #42 |

## 1a. Sprint 2 work

### Esila Keskin (GitHub: esila-keskin)

| Date | Work | Evidence |
|---|---|---|
| 12 November 2026 | Agreed the new Sprint 2 split with the group and wrote step-by-step task instructions for each member | Group chat |
| 13 November 2026 | Built the i* Strategic Dependency model in piStar | models/istar/istar-sd.txt and .png; pull request #49 |
| 13 to 15 November 2026 | Built the i* Strategic Rationale model in piStar | models/istar/istar-sr.txt and .png; pull request #51 |
| 15 to 16 November 2026 | Drew the operational BPMN models M7 and M8 in Camunda Web Modeler | Camunda project "Group 51 Sprint 2"; docs/test-evidence/versions-m7.png, versions-m8.png |
| 16 to 18 November 2026 | Made M8 executable (forms, job types, conditions, error event, timers, mappings) and ran tests F2-a to F2-e | models/operational/m8-process-payment-commission.bpmn; docs/test-results.md; docs/test-evidence/ |
| 18 November 2026 | Created the cluster API client and ran Bruno's worker against both models | docs/test-evidence/F2-e-worker-terminal.png |
| 19 November 2026 | Built the three Functionality 1 forms (task moved from Mahtab, see section 3) | camunda/forms/f1-review-basket.form, f1-amend-order.form, f1-confirm-order.form |
| 19 November 2026 | Made M7 executable and ran tests T1 to T5 | models/operational/m7-place-multivendor-order.bpmn; camunda/tests/m7-test-cases.json; docs/test-results.md |
| 19 November 2026 | Added the models, forms, test cases, evidence and the i* rationale, operational BPMN justification, test results and Sprint 2 plan | Pull requests #55 and #56 |
| 19 November 2026 | Updated the traceability matrix, README and process variables, and trimmed documents after tutor feedback | Branch sprint2-docs-update |

### Mahtab Bin Lokman (GitHub: justmahtab)

| Date | Work | Evidence |
|---|---|---|
| 18 November 2026 | Reviewed and approved the i* Strategic Dependency model | Review on pull request #49 |
| 18 November 2026 | Removed the duplicate Q5 from the Functionality 1 open questions | Commit 0764e75; pull request #54 |
| 18 November 2026 | Recorded the Q7 decision (no stock reservation in Task 1) | Comment on issue #11 |

### Dylan (Ella) Morgan (GitHub: SxyIronGolem)

| Date | Work | Evidence |
|---|---|---|
| 13 November 2026 | Recorded the Q8 decision: 3 payment attempts in total | Comment on issue #28 |
| 14 to 16 November 2026 | Built the two Functionality 2 forms and wrote the payment scenarios with commission worked examples | camunda/forms/f2-enter-payment.form, f2-retry-payment.form; docs/payment-scenarios.md; pull request #50 |

### Bruno Pedro (GitHub: brunopedro2910)

| Date | Work | Evidence |
|---|---|---|
| 15 to 16 November 2026 | Wrote the process variable contract and the test data | docs/process-variables.md; test-data/; pull request #52 |
| 16 November 2026 | Wrote the Node.js job worker with unit tests | workers/; pull request #53 |
| 15 November 2026 | Wrote his generative AI statement in the README | Commit 4293bf9 |

## 2. Communication with the group

Each attempt to contact a member or the module team is recorded here with its date and method.

| Date | Method | To | What was sent | Reply |
|---|---|---|---|---|

## 3. Agreed ownership of backlog items

Owners are agreed at group meetings and recorded here with the date. Until then the Sprint 1 items are owned by Esila Keskin, as shown on the project board.

| Date agreed | Item | Owner |
|---|---|---|
| 12 November 2026 | M5, M6, M7, M8 (i* and operational models) | Esila Keskin |
| 12 November 2026 | T1, forms for Functionality 1; fix to the duplicate Q5; Q7 decision | Mahtab Bin Lokman |
| 12 November 2026 | T1, forms for Functionality 2; payment scenarios; Q8 decision | Dylan (Ella) Morgan |
| 12 November 2026 | T2, job worker; T3, process variable contract and test data | Bruno Pedro |
| 19 November 2026 | T1, forms for Functionality 1, moved because Mahtab could not use his Camunda account | Esila Keskin |

## 4. Roles and membership

The group has four members: Esila Keskin, Mahtab Bin Lokman, Dylan (Ella) Morgan and Bruno Pedro. Harry Baldrian was removed from the group by the module team.

Roles are recorded in the README (commit 24e78f2). Project coordination is held by Esila Keskin, who is also the repository administrator. Bruno Pedro's role is implementation and testing.

# Sprint 2 plan and review: 2 to 22 November 2026

Group 51, Bristol Regional Food Network (Use Case 2)

Board: https://github.com/users/esila-keskin/projects/1

## Sprint goal

By the Sprint 2 review, the group has the i* Strategic Dependency and Strategic Rationale models, an operational BPMN model for each of the two functionalities, and both models running in Camunda with forms, a job worker and saved test cases for the main path and the exception paths.

## Items and owners

The split was agreed on 12 November 2026.

| ID | Item | Owner | Status |
|---|---|---|---|
| M5 | i* Strategic Dependency model | Esila Keskin | Done, pull request #49, approved by Mahtab |
| M6 | i* Strategic Rationale model | Esila Keskin | Done, merged in #51 |
| M7 | Operational BPMN, Functionality 1, executable | Esila Keskin | Done, tests T1 to T5 pass |
| M8 | Operational BPMN, Functionality 2, executable | Esila Keskin | Done, tests F2-a to F2-e pass |
| T1 | Forms for Functionality 1 | Mahtab Bin Lokman, moved to Esila Keskin on 19 November | Done |
| T1 | Forms for Functionality 2 and payment scenarios | Dylan (Ella) Morgan | Done, merged in #50 |
| Q8 | Number of payment attempts | Dylan (Ella) Morgan | Decided on issue #28: 3 in total |
| T3 | Process variable contract and test data | Bruno Pedro | Done, merged in #52 |
| T2 | Job worker with unit tests | Bruno Pedro | Done, merged in #53 |
| Q7 | Stock reservation | Mahtab Bin Lokman | Decided on issue #11: no reservation in Task 1 |
| | Duplicate Q5 in docs/f1-open-questions.md | Mahtab Bin Lokman | Done, commit 0764e75 |
| | Traceability matrix v2, test results, this plan, model justifications | Esila Keskin | Done |

The executable models also cover user stories planned for Sprint 3, because the models needed them to run end to end: US3, US5, US7 and US9 to US15. Some are in a basic form only. The limits are listed in docs/operational-bpmn-justification.md, section 9.

## Changes to the plan

- **12 November.** No Sprint 2 item had been started. The work was split again: Esila Keskin took the four models so that they stay consistent with each other, and the other members took the forms, the data contract, the test data and the worker.
- **19 November.** The Functionality 1 forms moved from Mahtab Bin Lokman to Esila Keskin, because Mahtab could not use his Camunda account. Mahtab took review and GitHub tasks instead (see CONTRIBUTIONS.md).
- **Tutor feedback at the 16 November stand-up.** Some documents stated the obvious. Those lines were removed from docs/process-variables.md, test-data/README.md, workers/README.md and the model annotations.

## Working agreement: what happened

- One branch and one pull request per item was followed.
- Pull requests #50 to #56 were merged without a recorded GitHub review, because of the deadline; #49 was approved by Mahtab before it was merged. The duplicate Q5 fix was committed straight to main, and pull request #54 repeated it. From now on, no pull request is merged without an approval, and reviews of the merged pull requests are being added as comments.
- The worker's cluster credentials are kept in workers/.env, which Git ignores, and were shared privately.

## Review demo

1. The SD and SR models in piStar.
2. M7 and M8 in Web Modeler.
3. Live run of T1 from basket to Order placed, then F2-e to show the automatic retry.
4. The saved test cases and Operate.
5. The repository: pull requests, reviews, CONTRIBUTIONS.md.

## Risks for Sprint 3

| Risk | Effect | Action |
|---|---|---|
| The module cluster is a trial cluster | It may be paused or removed | Models and forms are exported to the repository; test evidence is kept as screenshots |
| One person built all four models | Others may struggle to explain them at the review | Walkthrough call for the whole group before the review |
| Inventory and notifications are only logged | Use Case 2 is met in the process logic, not with real storage or email | Planned for Sprint 3 |

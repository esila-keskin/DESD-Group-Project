# Sprint 1 plan: 12 October to 1 November 2026

Group 51, Bristol Regional Food Network (Use Case 2)

Board: https://github.com/users/esila-keskin/projects/1

## Sprint goal

By the Sprint 1 review on Thursday 29 October 2026 at 14:00, the group has a strategic BPMN model of the whole network, a justified choice of two candidate functionalities from Use Case 2, a prioritised and estimated product backlog for Sprints 1 to 3, and a repository that shows who contributed what.

## Sprint 1 scope

| ID | Item | Points | Owner | Status on 27 October |
|---|---|---|---|---|
| M1 | Strategic BPMN model | 8 | Esila Keskin | Done |
| M2 | Case study analysis document | 3 | Esila Keskin | Done |
| M3 | Functionality selection document | 2 | Esila Keskin | Done |
| M4 | Legal, ethical, social and professional considerations | 5 | Esila Keskin | Done |
| P1 | Repository structure and README | 2 | Esila Keskin | Done |
| P2 | Board and sprint plan | 3 | Esila Keskin | Done |
| P3 | Sprint 1 video and ZIP submission | 5 | Group, led by Esila Keskin | In progress |
| P4 | Contribution log | 2 | Esila Keskin | Done |

Total planned: 30 points. Done on 27 October: 25 points (M1, M2, M3, M4, P1, P2, P4). P3 (video and ZIP) is in progress.

Sprint 1 items were completed by Esila Keskin while the group was forming. Mahtab Bin Lokman, Dylan (Ella) Morgan and Bruno Pedro each own Sprint 2 and Sprint 3 items, assigned on the board, and review each other's pull requests. Any change of owner is recorded in CONTRIBUTIONS.md with the date.

## How the backlog was prioritised and estimated

Items are ranked with MoSCoW. Must means the brief cannot be met without it. Should means it improves quality but the brief can be met without it. Won't means it is out of scope for Task 1 and revisited in Task 2.

Estimates use story points (2, 3, 5, 8), compared against M3, the smallest finished item, which is 2 points. The estimates were first proposed by Esila Keskin and will be reviewed with the whole group at the start of Sprint 2.

The planned load is 30 points in Sprint 1, 67 in Sprint 2 and 51 in Sprint 3, 148 in total. Sprint 2 and Sprint 3 will be rebalanced at the start of each sprint once the group knows how many points it actually completes.

## Plan for Sprints 2 and 3

| Sprint | Points | Items |
|---|---|---|
| Sprint 2 (from 2 November) | 67 | i* models (M5, M6); operational BPMN for both functionalities (M7, M8); first user stories US1, US2, US4, US6 and US8; Camunda Forms (T1); service-task workers (T2); process variable data contract (T3) |
| Sprint 3 (from 23 November) | 51 | Remaining user stories US3, US5, US7, US9 to US15 (amend order, delivery or collection, order split, confirmation, inventory, producer notification, declined payment, unavailable service, amounts, commission); test cases for happy and exception paths (T4) |
| Out of scope for Task 1 | 0 | Weekly settlement (W1), quality incident handling (W2), surplus offers and community content (W3) |

Sprint 2 is the heaviest sprint on purpose, because it carries both operational models and the i* models. It will be reviewed at the start of Sprint 2 (see Risks).

## Definition of Done

An item is done when:

1. The work is merged to main through a pull request.
2. It can be traced to the case study or the brief.
3. Its issue is closed with a link to the pull request or file.
4. Its card is in the Done column.

## Working agreements

- One branch per item and one pull request, with "closes #n" in the description.
- Every pull request is reviewed by someone other than its author before it is merged.
- Stand-ups are held regularly and recorded in the repository.
- Contributions are recorded in CONTRIBUTIONS.md as work is done, not afterwards.
- Esila Keskin coordinates the project and administers the repository; each member owns the items assigned to them on the board.

## Sprint 1 review

The review on Thursday 29 October is a video of ten minutes or less, with every member introducing themselves. It will show the strategic BPMN model in Camunda, the analysis and the choice of two candidate functionalities, the backlog and this plan, and the repository evidence: pull requests, reviews, the board and CONTRIBUTIONS.md.

## Risks

| Risk | Effect | Action |
|---|---|---|
| One member (Harry Baldrian) has not replied to messages | Work falls to the other members | Attempts to contact are recorded with dates in CONTRIBUTIONS.md. The module team will be informed, as the brief asks |
| The module team may draw the notification boundary differently | Scope could be adjusted | Notification is kept as one separable step; confirmation with the module team before Sprint 2 implementation |
| Payment service choice not yet confirmed | Affects the Sprint 2 service tasks | Using a local simulated payment service; confirmation with the module team before Sprint 2 |
| The two candidate functionalities are not yet confirmed | If the scope changes, Sprint 2 modelling would be redone | Detailed operational modelling starts only after confirmation, as the brief requires |
| Sprint 2 is planned at 67 points, more than Sprints 1 and 3 | The plan could be unrealistic | Rebalance at the start of Sprint 2 using the real Sprint 1 speed |

The decisions, assumptions and open questions behind these risks are recorded in docs/decisions-and-assumptions.md.

## Beyond Sprint 1

Sprint 2 covers the i* models, the two operational BPMN models and the first runnable Camunda processes. Sprint 3 covers completion, exception paths, integration, legal and ethical considerations and testing. Details are on the board.

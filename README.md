# DESD Group Project: Bristol Regional Food Network (Group 51)

UFCFTR-30-3 Distributed and Enterprise Software Development, 2026-27, Task 1.

## What this project is
An automated business process for the fictional Bristol Regional Food Network, a community marketplace linking about 40 local producers with customers within 20 miles of Bristol. We model it (i*, strategic BPMN, operational BPMN) and then make two processes executable in Camunda 8.

## Chosen use case
**Use Case 2: Customer Multi-Vendor Order, Checkout and Payment.**

Proposed major functionalities (pending module-team agreement):
1. **Basket to order:** availability check with amend loop, delivery or collection decision, customer confirmation, order creation and per-producer split.
2. **Payment and commission:** payment via a sandbox service with approved, declined-with-retry and unavailable paths; inventory update; producer notification; per-producer amounts and 5% commission.

## Group
| Student | ID | Role |
|---|---|---|
| Esila Keskin | 24064432 | [] |
| Mahtab Bin Lokman | 24038250 | [] |
| Dylan (Ella) Morgan | 24030018 | [] |
| Harry Baldrian | 23049911 | [] |
| Bruno Pedro | 22074709 | [] |

## Sprint 1 deliverables
- Strategic BPMN: [`models/strategic/strategic-bpmn-v1.bpmn`](models/strategic/strategic-bpmn-v1.bpmn) ([SVG](models/strategic/strategic-bpmn-v1.svg))
- Justification with case-study evidence: [`docs/strategic-bpmn-justification.md`](docs/strategic-bpmn-justification.md)
- Functionality selection, case study analysis, LESP: `docs/` (in progress)
- Project board: [link]

![Strategic BPMN](models/strategic/strategic-bpmn-v1.svg)

## Opening the models
Import the `.bpmn` file into Camunda 8 Web Modeler, or view the SVG directly.

## Validation notes
The strategic BPMN is deliberately non-executable. Camunda's Implement-mode checks flag the pools as non-executable and the collapsed sub-processes as lacking start and end events. This is expected at the strategic level; the two selected functionalities become executable operational models in Sprint 2.

## Working agreement
Everyone commits under their own account. Work on a branch and open a pull request. Commit messages name the task.

## Use of generative AI
[]

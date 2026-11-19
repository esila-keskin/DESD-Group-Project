# i* models: rationale

Group 51, Bristol Regional Food Network (Use Case 2). Sprint 2.

| Model | Files | Pull request |
|---|---|---|
| Strategic Dependency (SD), M5 | models/istar/istar-sd.txt, models/istar/istar-sd.png | #49 |
| Strategic Rationale (SR), M6 | models/istar/istar-sr.txt, models/istar/istar-sr.png | #51 |

Both models were drawn in piStar 2.1 using i* 2.0. The `.txt` files are the piStar save files and can be reopened with "Load model" at https://www.cin.ufpe.br/~jhcp/pistar/tool/. The starting point was section 4 of docs/traceability-matrix.md.

## 1. Actors

| Actor | Kind | Why |
|---|---|---|
| BRFN Marketplace Platform | Agent | It is the one specific system we are designing, so it is a concrete actor, not a position |
| Customer | Role | Any person or organisation can take this position |
| Household customer, Restaurant or café, Community group | Roles, each is-a Customer | The case study names these three customer groups. Each wants something different from the platform, so each has its own dependency. Dependencies they share are drawn once, on Customer |
| Producer | Role | About 40 producers fill the same position |
| Payment Provider (simulated) | Role | The provider can be swapped without changing the model. For Task 1 it is a simulated service (D13) |
| Certification Service | Role | An outside body that checks organic claims; we do not design it |

There is no courier actor, because the case study never mentions one and producers deliver their own part of an order (A1, D6).

## 2. Strategic Dependency model

Each dependency is drawn depender, then dependum, then dependee. The type says how much freedom the dependee has:

- **Goal**: the depender wants an outcome and the dependee chooses how to reach it.
- **Task**: the depender prescribes how the work is done.
- **Resource**: something is handed over (data, money, a document).
- **Quality**: how well something is done, with no clear point where it is fully met.

| Depender | Dependum | Type | Dependee | Why this type |
|---|---|---|---|---|
| Customer | Multi-vendor order placed | Goal | Platform | The customer cares that one order covering several producers goes through, not how the platform does it |
| Customer | Product information | Resource | Platform | Product details, origin and price are data the platform supplies |
| Customer | Delivery and collection details | Resource | Platform | Each producer's option and date are information handed to the customer |
| Customer | Secure payment | Quality | Platform | There is no point at which payment is "fully" secure; it is judged by degree (NFR2) |
| Customer | Quality concern resolved | Goal | Platform | The customer wants the outcome; the platform decides the procedure (Use Case 3, outside Task 1) |
| Customer | Order part ready as described | Goal | Producer | Each producer is responsible for its own produce, so this dependency goes straight to the producer even though the platform passes the order on |
| Producer | Order notification (48 h notice) | Resource | Platform | A notification with enough lead time is information the platform delivers (FR3) |
| Producer | Correct share of payment received | Goal | Platform | The producer wants the right amount after the 5% commission; how it is calculated is the platform's choice |
| Producer | Weekly settlement statement | Resource | Platform | A document the producer receives (outside Task 1, D8) |
| Producer | Easy listing without training | Quality | Platform | Judged by degree (NFR1) |
| Platform | Accurate listings and stock | Resource | Producer | The stock check depends on figures only producers can supply |
| Platform | Review and confirm order | Task | Customer | The platform prescribes the step: the customer reviews the basket and confirms on the platform's forms |
| Platform | Payment for the order | Resource | Customer | Money handed over |
| Platform | Process test payment | Task | Payment Provider | The platform prescribes how payment is done: a test or simulated payment only (NFR4) |
| Platform | Payment result | Resource | Payment Provider | Approved or declined is data returned to the platform |
| Platform | Prepare and fulfil order part | Task | Producer | The platform tells each producer what to prepare and by when |
| Platform | Verify organic certification | Task | Certification Service | The check follows a set procedure (FR16) |
| Household customer | Buy from several producers at once | Goal | Platform | The main reason a household uses the marketplace |
| Restaurant or café | Low-effort ordering from many suppliers | Quality | Platform | Businesses judge the service by how little effort ordering takes |
| Community group | Reliable local supply | Quality | Platform | Judged by degree over time |

Twenty dependencies in total. Some (quality concerns, weekly settlement, certification, easy listing) are outside the two functionalities. They stay in the SD model because it describes the whole network; the SR model then narrows to Use Case 2.

## 3. Strategic Rationale model

Three actors are opened: Customer, Producer and the Platform. Payment Provider and Certification Service stay closed because their internal reasoning is not ours to design. The three customer types stay closed because their reasoning is the same as Customer's.

### Customer

- Main goal **Local food bought**, Or-refined into two alternatives: **Order from several producers at once** and **Visit each producer separately**.
- Ordering through the marketplace is And-refined into **Review and confirm the order** and **Pay for the order**. Both are needed.
- Qualities: ordering at once helps **Time saved**; visiting each producer hurts Time saved but helps **Knows where the food comes from**. That is the trade-off the marketplace has to answer with good product information.
- **Pay for the order** hurts **Card details kept safe**, since any card entry is a risk. This is why the operational model clears the card number straight after the payment attempt.

### Producer

- Main goal **Produce sold beyond farmers' markets**, Or-refined into **Sell through the marketplace** and **Sell at farmers' markets and farm gate**.
- Selling through the marketplace is And-refined into **Keep listings and stock up to date** and **Prepare order part within 48 hours**.
- The marketplace helps **Little time spent on admin** and **Predictable weekly income**. Keeping listings up to date hurts the admin quality, which is the honest cost of the marketplace for a producer. Farmers' markets also hurt it.

### Platform

- Main goal **Multi-vendor orders handled**, Or-refined into **Handle orders online through the platform** and **Pass orders to producers by email and phone**, the manual way the case study describes. Email and phone hurt **Orders not lost**.
- The online alternative is And-refined into the three parts of Use Case 2:
  - **Take basket to confirmed order** (Functionality 1), And-refined into the goal **Overselling avoided** and the task **Split order by producer**. Splitting needs the resource **Order and producer records** (Needed-By link).
  - **Take payment and calculate commission** (Functionality 2), And-refined into **Submit payment to simulated provider**, **Calculate 5% commission per producer** and the goal **Payment failure handled**.
  - **Notify producers of their order part**.
- **Overselling avoided** has two alternatives: **Check stock at checkout**, which helps **Simple checkout process**, and **Reserve stock with a timer**, which hurts it.
- **Payment failure handled** has two alternatives: **Retry payment up to 3 attempts**, which makes **Orders not lost**, and **Cancel the order at once**, which breaks it.
- **Submit payment to simulated provider** helps **Regulatory compliance**.
- **Calculate 5% commission per producer** helps **Sustainable network income** and hurts **Fair treatment of small producers**. The 5% rate is fixed by the case study. The hurt link records that the commission costs small producers money, and calculating it per producer with a clear rounding rule is how the network keeps that cost visible and fair.

## 4. Choices between alternatives and where they lead

| Alternative chosen | Rejected | Reason | Where it appears in the operational models |
|---|---|---|---|
| Handle orders online | Email and phone | Breaks less often; the whole point of the platform | M7 and M8 |
| Check stock at checkout | Reserve stock with a timer | Keeps checkout simple, and Use Case 2 only asks for a check at checkout (Q7, issue #11) | M7: Check stock, Enough stock?, Amend quantities. Because stock is not reserved, an unconfirmed order is closed after 30 minutes |
| Retry payment up to 3 attempts | Cancel at once | Makes "Orders not lost"; the limit of 3 was agreed by Ella on issue #28 (Q8) | M8: Count payment attempt, the decline loop and the automatic retry after an unavailable service |
| Order from several producers at once | Visit each producer | The customer goal the platform exists for | M7 starts from one basket with several producers |

## 5. Notation used

- Refinement links point from the child element to its parent. And means all children are needed; Or means any one alternative is enough.
- Contribution links (make, help, hurt, break) go from a task or goal to a quality.
- The Needed-By link goes from a resource to the task that uses it.
- Is-a links go from a specialised role to the general one.

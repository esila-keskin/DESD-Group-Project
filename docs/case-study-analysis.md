# Case study analysis

Group 51, Bristol Regional Food Network (Use Case 2)

Sources: Case Study v2 (Bristol Regional Food Network, Digital Marketplace), the Task 1 Use Cases document, and the Task 1 brief. Section names in brackets are the headings in the case study.

## 1. The enterprise

The Bristol Regional Food Network connects local food producers with consumers within a twenty-mile radius of Bristol city centre. Forty small-to-medium enterprises (SMEs) in the network find it hard to reach customers beyond farmers' markets and direct farm gate sales [Background]. The project is a digital marketplace that lets those producers sell to customers through one platform, and the network calculates a five percent commission on sales [System Requirements, Core Functionality].

## 2. Stakeholders and their needs

| Stakeholder | Who they are | What they need | Source |
|---|---|---|---|
| Producers | The forty SMEs. Technical skill varies: some use only email and telephone and spend about fifteen hours a week on customer communication | Simple ways to list products and update seasonal stock without training; visibility of incoming orders with at least 48 hours' notice; weekly payment with an audit trail for tax and accounting | Stakeholder Requirements > Producers |
| Customers: young professionals and families | People who want local produce but cannot visit several farm shops in their restricted opening hours | One place to browse and buy from several producers | Background |
| Customers: community groups | Educational institutions, care facilities and voluntary organisations that need local suppliers for catering | Reliable and consistent sources of local supply | Background |
| Customers: independent restaurants and cafes | Businesses that want local ingredients but find managing many small suppliers too time-consuming | Less administrative overhead when ordering from many suppliers | Background |
| The network and its marketplace administrators | The organisation running the platform and taking the commission | Automatic commission calculation, traceability records, food-miles reporting and tools for reducing food waste | System Requirements; Use Case 3 |
| Payment provider (external) | The service that processes payments | Payment requests; in this project a sandbox or simulated service only | Important Disclaimers; Use Case 2 |
| Certification service (external) | The source used to check organic certification | Certification check requests | Use Case 1 |

## 3. Major business processes and who is responsible

These are the nine processes in the strategic BPMN model (models/strategic/strategic-bpmn-v1.bpmn), with the lane that owns each one.

| Process | Lane | Who else is involved | Source |
|---|---|---|---|
| Manage product listings and inventory | Catalogue & Listings | Producers, certification service | Stakeholder Requirements > Producers; Use Case 1 |
| Browse and search catalogue | Catalogue & Listings | Customers | Stakeholder Requirements > Customers |
| Place multi-vendor order | Order Management | Customers | Stakeholder Requirements > Customers; Use Case 2 |
| Process payment and commission | Payments & Settlement | Customers, payment provider | System Requirements > Core Functionality; Use Case 2 |
| Coordinate producer fulfilment | Order Management | Producers | Stakeholder Requirements > Producers |
| Settle producer payments weekly | Payments & Settlement | Producers | Stakeholder Requirements > Producers |
| Handle quality and safety concerns | Quality & Traceability | Customers, producers | Quality Assurance and Community Features; Use Case 3 |
| Report food miles | Community & Sustainability | none | Quality Assurance and Community Features |
| Publish surplus offers and community content | Community & Sustainability | Customers, producers | Quality Assurance and Community Features |

## 4. Organisational responsibilities

Producers: list and update their own products; prepare orders using at least 48 hours' notice; provide further information when a quality issue is raised; share recipes, storage guidance and farm stories.

The marketplace: provide the platform; aggregate orders from several producers while keeping each supplier's responsibilities clear; calculate the commission; pay producers on the agreed schedule; keep records linking customers, products and producers; report food miles.

Customers: browse and order; review and confirm the purchase; pay; report a quality or safety concern.

External services: the payment provider handles payment requests; the certification service answers certification checks.

## 5. Functional requirements

| ID | Requirement | Strategic process | Source |
|---|---|---|---|
| FR1 | Producers can list products with name, description, price and availability timeframe | Manage product listings and inventory | Producers |
| FR2 | Producers can update seasonal inventory without technical training | Manage product listings and inventory | Producers |
| FR3 | Producers can see incoming orders with at least 48 hours' lead time | Coordinate producer fulfilment | Producers |
| FR4 | Producers are paid weekly with an audit trail suitable for tax reporting | Settle producer payments weekly | Producers |
| FR5 | Customers can browse by category: vegetables, dairy, bakery, preserves, seasonal specialities | Browse and search catalogue | Customers |
| FR6 | Customers can search for specific items | Browse and search catalogue | Customers |
| FR7 | Product pages show harvest date, farm origin and seasonal availability | Browse and search catalogue | Customers |
| FR8 | Checkout handles single-vendor and multi-vendor orders and states each supplier's responsibilities, delivery arrangements and collection procedures | Place multi-vendor order | Customers |
| FR9 | Multi-vendor orders are aggregated while showing each supplier's responsibilities and delivery commitments | Place multi-vendor order | Core Functionality |
| FR10 | Payments work for single and multi-vendor orders, are distributed to producers on agreed timeframes, and the five percent commission is calculated automatically | Process payment and commission; Settle producer payments weekly | Core Functionality |
| FR11 | Producers can show organic certification status, allergen warnings and best-before dates | Manage product listings and inventory; Handle quality and safety concerns | Quality Assurance |
| FR12 | The system keeps records linking customers, products and producers so quality issues can be communicated quickly | Handle quality and safety concerns | Quality Assurance |
| FR13 | Food miles are calculated from postcode-based distances | Report food miles | Quality Assurance |
| FR14 | Surplus produce can be announced with last-minute discounts | Publish surplus offers and community content | Quality Assurance |
| FR15 | Producers can share seasonal recipes, storage guidance and farm stories | Publish surplus offers and community content | Quality Assurance |

Requirements that come from the use cases and not from the case study text:

| ID | Requirement | Strategic process | Source |
|---|---|---|---|
| FR16 | Listings are validated, and organic claims are checked against an external or simulated service | Manage product listings and inventory | Use Case 1 |
| FR17 | A product with zero stock becomes unavailable and can return when restocked within its season | Manage product listings and inventory | Use Case 1 |
| FR18 | Checkout checks stock and asks the customer to amend the order if an item is short | Place multi-vendor order | Use Case 2 |
| FR19 | A declined payment lets the customer retry; an unavailable payment service follows a retry or exception path | Process payment and commission | Use Case 2 |
| FR20 | A reported quality incident is recorded, the producer is contacted, and affected customers are notified | Handle quality and safety concerns | Use Case 3 |

## 6. Non-functional requirements and constraints

| ID | Requirement | Source |
|---|---|---|
| NFR1 | Usable by producers with limited technical skill and no training | Producers |
| NFR2 | Payments are secure | Core Functionality |
| NFR3 | Financial transactions comply with current data protection and financial services regulations | Core Functionality |
| NFR4 | Test or sandbox payment environments only; live payment systems and real financial data must never be used | Important Disclaimers; Use Case 2 |
| NFR5 | Payments to producers have a transparent audit trail | Producers |
| NFR6 | The network serves producers and consumers within a twenty-mile radius of Bristol city centre | Background |
| NFR7 | The payment flow must not simply stop when the payment service is temporarily unavailable | Use Case 2 |

## 7. Analysis

The hardest part of this business is that it has to work for two very different kinds of user. Producers range from businesses that only use email and telephone to ones with a basic social media presence, so anything they use has to be simple, while customers expect an ordinary online shop. The second difficulty is the multi-vendor order. One customer payment has to be turned into several producer-specific parts, each with its own delivery or collection arrangement and its own share of the money, less the network's five percent. This makes the order and payment processes the point where the other requirements meet: weekly settlement, the audit trail and the commission all depend on them being correct. Finally, the data protection and financial services rules and the ban on live payments apply across the whole model and not only to payment, so they are treated as constraints on every functionality and are covered in the legal, ethical, social and professional considerations document.

## 8. Assumptions and open questions

1. The case study mentions delivery arrangements and collection procedures but does not say who delivers. Assumed: each producer fulfils its own part of an order.
2. The case study does not say how the five percent commission is rounded. Assumed: calculated per producer and summed.
3. Use Case 2 does not mention weekly settlement. It comes from the case study (Producers) and is treated as a separate process.
4. Whether producer notification belongs to payment processing or to fulfilment is unclear. The question is raised in docs/functionality-selection.md.

## 9. Scope for Task 1

The two functionalities chosen from Use Case 2 are Place multi-vendor order and Process payment and commission. The reasons are in docs/functionality-selection.md. Weekly settlement, quality incidents and surplus or community content are out of scope for Task 1 and recorded as Won't items on the board.

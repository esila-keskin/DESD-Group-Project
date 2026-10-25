# Legal, ethical, social and professional considerations

Group 51, Bristol Regional Food Network (Use Case 2)

This document lists the legal, ethical, social and professional issues raised by the case study, and ties each one to a named element of the strategic BPMN model (models/strategic/strategic-bpmn-v1.bpmn). Process names, message flow names and lane names are written exactly as they appear in the model. It is written in Sprint 1 and will be extended as the operational models and the Camunda implementation are built.

Requirement references (FR and NFR) are to docs/case-study-analysis.md.

## 1. Legal considerations

| ID | Issue | Model element affected | What the project must do | How Task 1 handles it |
|---|---|---|---|---|
| L1 | Personal data in orders (names, addresses, order history). The UK GDPR and the Data Protection Act 2018 apply, and the case study requires compliance with data protection regulations (NFR3) | Message flows "Basket and checkout details" and "Order confirmation"; process Place multi-vendor order | Collect only the data needed to complete the order; give each producer only the data it needs for its own part; state how long records are kept | The order is split into producer-specific elements, so each producer sees only its own items and the delivery or collection details it needs. Test data is synthetic |
| L2 | Payment data and financial regulation. The case study requires secure payments and compliance with financial services regulations (NFR2, NFR3) and bans live payments in development (NFR4) | Message flows "Payment request" and "Payment result"; process Process payment and commission; pool Payment Provider | Never hold card details on the platform; hand card data to a payment provider; use only sandbox or simulated services in this project | Payment is simulated. The simulated service can return approved, declined or unavailable, so all paths can be tested without real data |
| L3 | Holding and passing on money for producers. A marketplace that receives customer payments and pays producers later may be providing a payment service under the Payment Services Regulations 2017, which contain an exclusion for some commercial agents that depends on the facts | Process Settle producer payments weekly; message flow "Settlement statement" | In a real deployment, use a regulated payment provider and take legal advice on whether the exclusion applies | Out of scope for Task 1. Recorded as a risk |
| L4 | Allergen and best-before information. Food sold to consumers must carry the required allergen information; the Food Information Regulations 2014 apply. The case study requires allergen warnings and best-before dates (FR11) | Process Manage product listings and inventory; message flow "Listing and stock updates"; pool Producers | Make allergen and best-before fields mandatory when a product is listed, and show them to the customer | Listing validation is part of Use Case 1 and is not one of the two Task 1 functionalities. The fields are recorded as requirements for Task 2 |
| L5 | Organic claims. Organic claims must be backed by certification; the Organic Products Regulations 2009 (S.I. 2009/842) apply. The case study requires organic certification status to be shown (FR11) and Use Case 1 requires a check with an external or simulated service (FR16) | Message flows "Certification check request" and "Certification result"; pool Certification Service (external) | Show a product as organic only after a successful check. If the check service is unavailable, show the claim as unverified, never as confirmed | Outside the two chosen functionalities. Modelled at strategic level only |
| L6 | Traceability and food recall. Food businesses must be able to identify who supplied them and who they supplied (Article 18 of Regulation (EC) No 178/2002). The case study requires records linking customers, products and producers (FR12) | Process Handle quality and safety concerns; message flows "Quality concern report", "Safety notification", "Information request" and "Producer response"; lane Quality & Traceability | Keep order records that link customer, product and producer; record whether each safety notification was delivered | The order split in Functionality 1 produces the producer-specific records that traceability depends on |
| L7 | Online selling to consumers. The Consumer Contracts Regulations 2013 require clear information before purchase, and the Consumer Rights Act 2015 requires goods to be of satisfactory quality. Regulation 28(1)(c) of the 2013 Regulations exempts goods liable to deteriorate or expire rapidly from the right to cancel | Process Place multi-vendor order; message flow "Order confirmation" | Show the total price, each supplier's responsibilities, delivery or collection arrangements, and the cancellation position for perishable goods before the customer confirms | The review-and-confirm step in Functionality 1 shows the producer parts and arrangements before payment |
| L8 | Marketing messages. Electronic marketing needs consent under the Privacy and Electronic Communications Regulations 2003 and the UK GDPR | Process Publish surplus offers and community content; message flow "Surplus offers and community content" | Send surplus offers only to customers who have agreed, with an easy way to stop | Out of scope for Task 1 |

## 2. Ethical considerations

| ID | Issue | Model element affected | What the project must do | How Task 1 handles it |
|---|---|---|---|---|
| E1 | Fair treatment of small producers. Search order and the commission affect which producers get sales | Process Browse and search catalogue; message flow "Search and browse request"; process Process payment and commission | Show the commission rate openly; do not rank products in a way that favours some producers without saying so | The commission is a fixed 5 percent, calculated per producer, so each producer can check it |
| E2 | Accuracy of sustainability claims. Food miles calculated from postcode distance are an estimate, not a measured emission | Process Report food miles | Explain the method and do not present the figure as an exact environmental impact | Out of scope for Task 1 |
| E3 | Vulnerable customers. Community groups include care facilities, where an allergen mistake can cause serious harm | Message flow "Safety notification"; process Handle quality and safety concerns | Send safety notifications promptly and clearly, and record failures so a person follows up | Out of scope for Task 1, recorded for Task 2 |
| E4 | Trust in automated money calculations. Producers rely on the settlement figures for tax and accounting | Process Settle producer payments weekly; message flow "Settlement statement"; Functionality 2 calculation of producer amounts and commission | Make calculations repeatable and auditable, and keep an audit trail (NFR5) | Acceptance criteria on the board require the producer amounts and the commission to be checkable |
| E5 | Food waste discounts must not compromise safety | Process Publish surplus offers and community content | Treat best-before dates as a quality guide and use-by dates as a safety limit when discounting surplus | Out of scope for Task 1 |

## 3. Social considerations

| ID | Issue | Model element affected | What the project must do | How Task 1 handles it |
|---|---|---|---|---|
| S1 | Accessibility. Customers and producers include people with disabilities. The Equality Act 2010 applies to services offered to the public | Camunda Forms for the customer user tasks; message flows "Basket and checkout details" and "Order confirmation" | Build forms that can be used with a keyboard and a screen reader, with clear labels and error messages | Applied to the Camunda Forms in Sprint 2 and Sprint 3 |
| S2 | Producers with limited digital skill. The case study says technical capability varies a lot (NFR1) | Process Manage product listings and inventory; pool Producers | Keep producer-facing steps short and plain | Not part of the two Task 1 functionalities. Carried into the design of the Sprint 2 Forms |
| S3 | Local economy and trust. The network exists to help local producers reach customers | Whole model | Make sure origin and availability information shown to customers is accurate | Reflected in the stock check and the order split in Functionality 1 |

## 4. Professional considerations

| ID | Issue | What the project must do | How Task 1 handles it |
|---|---|---|---|
| P1 | BCS Code of Conduct: public interest, professional competence and integrity, duty to relevant authority, duty to the profession | Work honestly, state limits of the work, and take responsibility for quality | The documents state assumptions and open questions; tests are planned on the board (T4) |
| P2 | Safe testing | Use only simulated payments and synthetic data | Required by the case study and followed throughout |
| P3 | Honest authorship | Say who did the work and which tools were used. The brief treats AI-generated models and diagrams as plagiarism and allows AI in code only if declared and understood | The group's declaration of generative AI use will be added to the README before the Sprint 1 review. Models in this project are made by group members |
| P4 | Fair contribution | Record individual contributions accurately, including who did not respond | Recorded with dates in CONTRIBUTIONS.md |

## 5. What this means for the two chosen functionalities

Place multi-vendor order: data minimisation across producers (L1), clear price and arrangements before confirmation (L7), accessible forms (S1), and traceable order records (L6).

Process payment and commission: simulated payment only (L2), auditable calculations (E4), and a retry or exception path so an order is not lost when the payment service is unavailable.

## 6. Legislation and standards referred to

- UK General Data Protection Regulation and the Data Protection Act 2018
- Privacy and Electronic Communications (EC Directive) Regulations 2003 (S.I. 2003/2426)
- Consumer Rights Act 2015
- Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013, regulation 28(1)(c)
- Payment Services Regulations 2017, Schedule 1, Part 2
- Food Information Regulations 2014 (S.I. 2014/1855)
- Organic Products Regulations 2009 (S.I. 2009/842)
- Regulation (EC) No 178/2002, Article 18, as it applies in the UK
- Equality Act 2010
- BCS Code of Conduct

The titles, numbers and provisions of the consumer contracts, consumer rights, payment services, food information, organic products, privacy and electronic communications, and food traceability items above were checked against legislation.gov.uk on 24 October 2026. The UK GDPR, Data Protection Act 2018, Equality Act 2010 and BCS Code of Conduct were not re-checked in this pass. Statements about what each law requires are summaries, not legal advice, and the full text of each provision should be re-read before the Sprint 3 submission.

# Strategic BPMN justification - Group 51, Sprint 1

## Processes

### Manage product listings and inventory
Case study: "enabling producers to list items with seasonal availability updates and inventory management features"; "organic certification status, allergen warnings, and best-before dates".
Stakeholder goal: producers, who vary widely in technical skill, need to list and update products without training; customers need trustworthy product information.
Interfaces: receives Listing and stock updates from Producers; exchanges Certification check request and result with the Certification Service. Its output makes products browsable.
Scope note: this is Use Case 1 territory, not selected for Task 1.

### Browse and search catalogue
Case study: "robust product browsing capabilities organised by clearly defined categories"; "search functionality"; "display of harvest dates, farm origin information, and seasonal availability indicators".
Stakeholder goal: customers need to find local produce quickly and see where it comes from.
Interfaces: receives Search and browse request from Customers; returns Product information. Leads to checkout.

### Place multi-vendor order
Case study: "The checkout process must handle both single-vendor and multi-vendor orders seamlessly whilst maintaining clear communication about individual supplier responsibilities, delivery arrangements, and collection procedures."
Use Case 2: "the system checks that all selected products are still available in the requested quantities. If an item is unavailable or there is insufficient stock, the customer is informed and asked to amend the order." The system "identifies the producers involved and determines the relevant delivery or collection arrangements", then "creates the overall marketplace order and separates it into the relevant producer-specific order elements."
Stakeholder goal: customers want one checkout across several producers with clear responsibility for each part; producers receive only their own part of the order.
Interfaces: receives Basket and checkout details; returns Order confirmation; hands the order to payment; supplies postcodes to food-miles reporting.
Scope note: PROPOSED MAJOR FUNCTIONALITY 1, pending module-team agreement.

### Process payment and commission
Case study: "A secure payment system must process transactions for both single and multiple vendor orders, distribute payments to respective producers according to agreed timeframes, and calculate the network's five percent commission automatically."
Use Case 2: "Payment is submitted to an external or simulated payment service. If payment is successful, the order is confirmed, the appropriate inventory quantities are updated and the relevant producers are notified. If payment is declined, the customer is informed and given the opportunity to retry. If the payment service is temporarily unavailable, the process should follow an appropriate exception or retry path rather than simply terminating." The system "should calculate the amount attributable to each producer and calculate the marketplace's 5% commission."
Stakeholder goal: the network needs automatic commission; customers need secure, compliant payment; producers need the correct share.
Interfaces: sends Payment request to, and receives Payment result from, the Payment Provider (sandbox or simulated only). Success updates inventory and triggers producer fulfilment.
Scope note: PROPOSED MAJOR FUNCTIONALITY 2, pending module-team agreement.

## Coordinate producer fulfilment
Case study: "comprehensive visibility of incoming orders with adequate lead time (minimum 48 hours) to prepare products appropriately"; "delivery arrangements, and collection procedures".
Stakeholder goal: producers need time to prepare; customers need clear delivery or collection arrangements.
Interfaces: sends Order notification (48-hour lead time) to Producers; receives Fulfilment confirmation.
Design decision: delivery is handled inside this process and by producers. The case study does not name a courier, so no separate courier participant is modelled.

### Settle producer payments weekly
Case study: "weekly payment settlements with transparent audit trails suitable for tax reporting purposes and business accounting needs".
Stakeholder goal: producers need predictable weekly income and records for tax.
Interfaces: sends Settlement statement to Producers.

### Handle quality and safety concerns
Case study: "Comprehensive records linking customers, products, and producers must enable rapid communication channels should quality issues or food safety concerns arise."
Stakeholder goal: customers need prompt action on safety problems; producers need fair notice.
Interfaces: receives Quality concern report (Customers) and Producer response (Producers); sends Information request (Producers) and Safety notification (Customers). A confirmed concern withdraws the affected listing.
Scope note: Use Case 3 territory, not selected for Task 1.

### Report food miles
Case study: "food miles calculations through postcode-based distance measurements, supporting the network's sustainability objectives".
Stakeholder goal: the network's sustainability objectives.
Design decision: modelled as an internal reporting process fed by order postcodes, with no external message flows.

### Publish surplus offers and community content
Case study: "surplus produce communication systems with last-minute discount capabilities to reduce food waste"; producers can "share seasonal recipes, storage guidance, and farm stories".
Stakeholder goal: reduce food waste and strengthen community connection.
Interfaces: receives Surplus stock and content from Producers; sends Surplus offers and community content to Customers.

## Participants

### Marketplace Platform (expanded pool)
Case study: "The marketplace platform must provide…". Lanes group the platform's organisational functions: Quality & Traceability, Catalogue & Listings, Order Management, Payments & Settlement, Community & Sustainability.

### Customers
Three segments with stated barriers: young professionals and families (restricted farm-shop opening hours); community groups (finding reliable local suppliers); independent restaurants and cafés (admin overhead of multiple suppliers).

### Producers
"forty small-to-medium enterprises"; "technical capabilities amongst producers vary considerably"; some spend "approximately fifteen hours per week" on customer communication.

### Payment Provider
External. The case study requires test environments only: "Under no circumstances should live payment systems or real financial data be used".

### Certification Service
External. Organic certification status is a stated product attribute; Use Case 1 refers to an "external or simulated verification service".

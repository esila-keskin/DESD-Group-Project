# Functionality 1: open questions

Group 51, Bristol Regional Food Network (Use Case 2). Questions about "basket to order" that the case study and use case do not fully answer, each with a suggested answer.

# Basket

**Q1:** What happens if a customer adds the same product twice?
**Suggestion:** We can increase the quantity on the existing basket line instead of making a duplicate. Then the stock check at checkout only has one line to compare.

# Availability check

**Q2:** Do we reserve stock when checkout starts? Use case 2 only says availability is checked at checkout and inventory is updated after payment.
**Suggestion:** We can reserve the item for about 8-10 minutes during checkout. If the customer doesn't buy it, the item goes back into stock.
**Reason:** It would be frustrating if two customers try to buy the same item at the same time and one of them can't buy it during checkout.

# Delivery or collection

**Q3:** Producers need at least 48 hours' notice to prepare orders. Should the review screen show the earliest possible delivery or collection date?
**Suggestion:** Yes, so the customer knows what they are agreeing to when they confirm.

# Order split into producer elements

**Q4:** How do we link each basket item to its producer?
**Suggestion:** Each product has a producer ID. At checkout we group the basket items by producer ID, which shows which producers are involved and gives each one its own part of the order.

## Who decides what

**Q5:** Who decides whether each producer's part of the order is delivered or collected: the customer, the producer or the system?
**Suggestion:** Each producer sets what they offer like (delivery, collection or both) and the customers chooses from that at the time of checkout.

**Q5:** Who decides whether each producer's part of the order is delivered or collected: the customer, the producer or the system?
**Suggestion:** *(your choice, see below)*

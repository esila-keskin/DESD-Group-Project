# Test data

These files contain the start variables used to run the two processes in Camunda. They match the scenarios in `docs/test-plan-outline.md`. Paste the contents of one basket file as the start variables when starting `place-multivendor-order`.

| File | Test case | Expected result at the stock check |
|---|---|---|
| `basket-one-producer.json` | Single-producer order (1290p gross and 65p commission) | In stock |
| `basket-two-producers.json` | Happy path split between two producers (1090p gross and 55p commission) | In stock |
| `basket-short-stock.json` | Insufficient stock: four egg boxes requested and three available | Customer is asked to amend the order |
| `stock.json` | Available stock per product, read by the `check-stock` worker | Reference data |

The payment outcome is selected on the payment form through `paymentScenario` (`approve`, `decline` or `unavailable`).

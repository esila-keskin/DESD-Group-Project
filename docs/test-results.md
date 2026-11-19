# Test results: Sprint 2

Group 51, Bristol Regional Food Network (Use Case 2).

## Setup

- Camunda 8 SaaS, cluster UWE Frenchay 2026 (Camunda 8.9), Web Modeler Test mode.
- Job worker from workers/ running locally with `npm start`.
- Stock levels from test-data/stock.json: P1 = 3, P2 = 10, P3 = 5.
- Each test case was saved in Web Modeler Test mode with its start variables, the expected end event and the recorded form steps. "Run all test cases" replays them.
- Screenshots are in docs/test-evidence/. The saved M7 test cases are in camunda/tests/m7-test-cases.json.

## Functionality 2 (M8) on its own

Start variables (F2-e also adds `"retryDelay": "PT1S"`):

```json
{
  "orderId": "ORD-2001",
  "customerName": "Test Customer",
  "customerEmail": "test.customer@example.com",
  "basketItems": [],
  "producerParts": [
    {"producerId": "PR1", "producerName": "Hillside Farm", "fulfilmentMethod": "delivery", "earliestDate": "2026-11-20", "subtotalPence": 640},
    {"producerId": "PR2", "producerName": "Old Mill Bakery", "fulfilmentMethod": "delivery", "earliestDate": "2026-11-20", "subtotalPence": 450}
  ],
  "orderTotalPence": 1090
}
```

| ID | Response chosen on the form | Expected | Actual | Result | Evidence |
|---|---|---|---|---|---|
| F2-a | approve | Order paid; paymentAttempts 1; commission 32 + 23 = 55; orderStatus CONFIRMED; testCardNumber null | As expected | Pass | F2-a-happy-path.png, F2-a-variables.png, F2-a-commission.png |
| F2-b | decline, then approve | Order paid; paymentAttempts 2; retryPayment true; commission 55; orderStatus CONFIRMED | As expected | Pass | F2-b-declined-then-approved.png, F2-b-variables.png, F2-b-retry-and-card.png |
| F2-c | decline three times | Not paid: declined 3 times; paymentAttempts 3; orderStatus UNPAID; Update inventory not run | As expected | Pass | F2-c-declined-three-times.png, F2-c-variables.png |
| F2-d | decline, then Try again left empty | Not paid: customer stopped; paymentAttempts 1; orderStatus UNPAID | As expected | Pass | F2-d-customer-stops.png, F2-d-variables.png |
| F2-e | unavailable | Not paid: service unavailable; two automatic retries; paymentAttempts 3; orderStatus UNPAID; testCardNumber null | As expected | Pass | F2-e-service-unavailable.png, F2-e-variables.png, F2-e-worker-terminal.png |

"Run all test cases" on 18 November 2026: all five Completed, with 100% of M8's elements covered (F2-all-test-cases.png). Web Modeler keeps one test file per project, so the M8 test cases were replaced when the M7 cases were saved; the screenshots are the evidence for them.

## Functionality 1 (M7), calling M8

The payment form inside the called M8 instance was completed in Tasklist, because Test mode cannot open forms in a called process.

| ID | Start data | Steps | Expected | Actual | Result | Evidence |
|---|---|---|---|---|---|---|
| T1 | basket-two-producers.json plus `"orderId": "ORD-1001"` | Enter name and email; Hillside Farm delivery, Old Mill Bakery collection; confirm; payment approve | Order placed; stockOk true; producerParts 640 and 450; orderTotalPence 1090; commissionTotalPence 55; orderStatus CONFIRMED | As expected | Pass | T1-happy-path.png, T1-variables.png, T1-called-payment-process-operate.png |
| T2 | basket-short-stock.json (4 egg boxes) plus `"orderId": "ORD-1002"` | Enter details; stock short, change eggs to 3; confirm; payment approve | First check: stockOk false, shortItems eggs requested 4, available 3. Second check: stockOk true. Order placed; orderTotalPence 1410 (960 + 450); commission 48 + 23 = 71 | As expected | Pass | T2-short-stock.png, T2-diagram.png, T2-variables.png |
| T3 | basket-two-producers.json plus `"orderId": "ORD-1003"` | Enter details; choose delivery or collection; leave "I confirm this order" unticked | Order cancelled by customer; orderConfirmed false; M8 not started | As expected | Pass | T3-cancelled.png |
| T4 | basket-two-producers.json plus `"orderId": "ORD-1004"`; timer set to `PT1M` for this run | Enter details; do not complete the confirm form | After one minute: confirm task cancelled, Order abandoned. Timer set back to `PT30M` afterwards | As expected | Pass | T4-timeout.png |
| T5 | basket-one-producer.json plus `"orderId": "ORD-1005"` | Enter details; confirm; payment approve | One producer part, 1290; commission 65 (64.5 rounded half up); Order placed | As expected | Pass | T5-one-producer.png, T5-variables.png, T5-order-status.png |

T1, T2, T3 and T5 are saved as Test mode cases, covering 81% of M7's elements (M7-all-test-cases.png). T1, T2 and T5 are not replayed with "Run all", because the replay cannot complete the payment form inside the called process. T4 is not saved as a Test mode case, because the runner cannot advance timers; the screenshot is the evidence.

## Problems found and fixed during testing

| Problem | Cause | Fix | Evidence |
|---|---|---|---|
| Incident: "Expected to find a form with id 'f2-enter-payment'" | M8 was deployed without its linked forms | Deployed both forms to the cluster, then retried the incident | fix-1-form-not-found-incident.png |
| F2-e marked failed by the test runner although the instance completed | Test mode cannot advance timers, and two 10-second waits took longer than the runner waits | Made the wait configurable with `retryDelay` (default 10 seconds); F2-e passes 1 second | fix-2-f2e-runner-timeout.png |
| Card number not cleared when the service was unavailable | Take payment's output mapping only runs when the job completes, not when it throws an error | Added `testCardNumber = null` as an output mapping on the error boundary event | F2-e-variables.png |
| Form text inside dynamic lists showed blanks | Inside a list, the current row's fields need the `this.` prefix | Changed the text views to `{{this.productName}}` and so on | |
| A test took the "not enough stock" path with an in-stock basket | Check stock was completed by hand without `stockOk`, so the default flow was taken | Not a model fault. The worker must be running so that it decides | |

## Versions

Saved versions in Web Modeler: "M7 drawn, not yet executable", "M7 executable v1", "M7 executable v1, tested"; "M8 drawn, not yet executable", "M8 executable v1", "M8 executable v2, all tests pass" (versions-m7.png, versions-m8.png).

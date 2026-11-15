# Job workers (T2)

This folder contains a Node.js job worker for the two Camunda 8 processes, using the official `@camunda8/sdk` package.

| Job type | Used by | What it does |
|---|---|---|
| `check-stock` | Functionality 1, stock check | Compares `basketItems` with `test-data/stock.json` and returns `stockOk` and `shortItems` |
| `take-payment` | Functionality 2, payment | Simulates `approve` -> `APPROVED`, `decline` -> `DECLINED`, or raises BPMN error `PAYMENT_UNAVAILABLE` |
| `update-inventory` | Functionality 2, after approval | Logs each stock reduction; a persistent inventory update is planned for Sprint 3 |
| `notify-producer` | Functionality 2, once per producer | Logs the notification for that producer's part of the order |

## Run

1. Install Node.js LTS.
2. Run `npm install` in this folder.
3. Copy `.env.example` to `.env` and paste the cluster credentials supplied privately by the project lead. Never commit `.env`.
4. Run `npm start`.

The program prints `Workers started: check-stock, take-payment, update-inventory, notify-producer`, followed by one line for each job. Stop it with Ctrl+C.

## Test

Run `npm test`. The tests check the available-stock and insufficient-stock baskets, all three payment outcomes, and the inventory and notification messages. They do not require Camunda credentials.

## Notes

- No real payment service is called. Only a simulated payment service is permitted for this project.
- Variable names follow `docs/process-variables.md`.
- Credentials belong only in `workers/.env`, which is ignored by Git.

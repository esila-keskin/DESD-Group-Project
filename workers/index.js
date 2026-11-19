import 'dotenv/config'
import { readFileSync } from 'node:fs'
import { Camunda8 } from '@camunda8/sdk'

import {
  checkStock,
  inventoryMessages,
  paymentResult,
  producerNotificationMessage,
} from './worker-logic.js'

const stock = JSON.parse(
  readFileSync(new URL('../test-data/stock.json', import.meta.url), 'utf8'),
)

const zeebe = new Camunda8().getZeebeGrpcApiClient()

zeebe.createWorker({
  taskType: 'check-stock',
  taskHandler: (job) => {
    const result = checkStock(job.variables.basketItems, stock)
    console.log(`check-stock: ${result.shortItems.length} short item(s)`)
    return job.complete(result)
  },
})

zeebe.createWorker({
  taskType: 'take-payment',
  taskHandler: (job) => {
    const result = paymentResult(job.variables.paymentScenario)
    console.log(
      `take-payment: scenario ${job.variables.paymentScenario ?? 'approve'}, attempt ${job.variables.paymentAttempts ?? 1}`,
    )

    if (result.kind === 'error') {
      return job.error({
        errorCode: result.errorCode,
        errorMessage: result.errorMessage,
      })
    }

    return job.complete({ paymentStatus: result.paymentStatus })
  },
})

zeebe.createWorker({
  taskType: 'update-inventory',
  taskHandler: (job) => {
    for (const message of inventoryMessages(job.variables.basketItems)) {
      console.log(message)
    }
    return job.complete()
  },
})

zeebe.createWorker({
  taskType: 'notify-producer',
  taskHandler: (job) => {
    console.log(
      producerNotificationMessage(
        job.variables.producerPart,
        job.variables.orderId,
      ),
    )
    return job.complete()
  },
})

console.log(
  'Workers started: check-stock, take-payment, update-inventory, notify-producer',
)

import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

import {
  checkStock,
  inventoryMessages,
  paymentResult,
  producerNotificationMessage,
} from './worker-logic.js'

const stock = JSON.parse(
  readFileSync(new URL('../test-data/stock.json', import.meta.url), 'utf8'),
)

const loadBasket = (name) =>
  JSON.parse(
    readFileSync(new URL(`../test-data/${name}`, import.meta.url), 'utf8'),
  ).basketItems

test('check-stock accepts the happy-path basket', () => {
  assert.deepEqual(checkStock(loadBasket('basket-two-producers.json'), stock), {
    stockOk: true,
    shortItems: [],
  })
})

test('check-stock reports the item with insufficient stock', () => {
  assert.deepEqual(checkStock(loadBasket('basket-short-stock.json'), stock), {
    stockOk: false,
    shortItems: [
      {
        productId: 'P1',
        productName: 'Free-range eggs (6)',
        requested: 4,
        available: 3,
      },
    ],
  })
})

test('take-payment supports approved, declined and unavailable outcomes', () => {
  assert.deepEqual(paymentResult('approve'), {
    kind: 'complete',
    paymentStatus: 'APPROVED',
  })
  assert.deepEqual(paymentResult('decline'), {
    kind: 'complete',
    paymentStatus: 'DECLINED',
  })
  assert.deepEqual(paymentResult('unavailable'), {
    kind: 'error',
    errorCode: 'PAYMENT_UNAVAILABLE',
    errorMessage: 'Simulated payment service is unavailable',
  })
})

test('inventory and notification workers produce the expected messages', () => {
  const basket = loadBasket('basket-two-producers.json')
  assert.deepEqual(inventoryMessages(basket), [
    'update-inventory: reduce P1 by 2',
    'update-inventory: reduce P2 by 1',
  ])
  assert.equal(
    producerNotificationMessage({ producerName: 'Hillside Farm' }, 'ORD-1001'),
    'notify-producer: tell Hillside Farm about order ORD-1001',
  )
})

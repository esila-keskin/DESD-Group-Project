export function checkStock(basketItems = [], stock = {}) {
  const shortItems = basketItems
    .filter((item) => item.quantity > (stock[item.productId] ?? 0))
    .map((item) => ({
      productId: item.productId,
      productName: item.productName,
      requested: item.quantity,
      available: stock[item.productId] ?? 0,
    }))

  return {
    stockOk: shortItems.length === 0,
    shortItems,
  }
}

export function paymentResult(paymentScenario = 'approve') {
  if (paymentScenario === 'unavailable') {
    return {
      kind: 'error',
      errorCode: 'PAYMENT_UNAVAILABLE',
      errorMessage: 'Simulated payment service is unavailable',
    }
  }

  if (paymentScenario === 'decline') {
    return { kind: 'complete', paymentStatus: 'DECLINED' }
  }

  return { kind: 'complete', paymentStatus: 'APPROVED' }
}

export function inventoryMessages(basketItems = []) {
  return basketItems.map(
    (item) => `update-inventory: reduce ${item.productId} by ${item.quantity}`,
  )
}

export function producerNotificationMessage(producerPart = {}, orderId = '') {
  return `notify-producer: tell ${producerPart.producerName ?? 'producer'} about order ${orderId}`
}

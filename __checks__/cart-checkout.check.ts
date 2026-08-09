import { ApiCheck, AssertionBuilder, Frequency } from 'checkly/constructs'

// Isolates "checkout logic broken" from "frontend rendering broken".
// Hits the cart backend directly, bypassing the UI.
// Product 0PUK6V6EV0 (Solar System Color Imager) is a stable catalog fixture.
new ApiCheck('cart-add-item', {
  name: 'Cart — Add Item (backend direct)',
  activated: true,
  locations: ['us-east-1', 'eu-west-1'],
  frequency: Frequency.EVERY_5M,
  request: {
    url: 'http://206.189.232.100:8080/api/cart',
    method: 'POST',
    headers: [
      { key: 'Content-Type', value: 'application/json' },
    ],
    body: JSON.stringify({
      userId: 'checkly-synthetic',
      item: { productId: '0PUK6V6EV0', quantity: 1 },
    }),
    assertions: [
      AssertionBuilder.statusCode().equals(200),
      AssertionBuilder.responseTime().lessThan(3000),
      // Confirms the cart service accepted the item and echoed it back
      AssertionBuilder.jsonBody('$.items[0].productId').equals('0PUK6V6EV0'),
    ],
  },
})

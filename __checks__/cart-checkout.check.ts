import { ApiCheck, AssertionBuilder, Frequency } from 'checkly/constructs'

// Isolates "checkout logic broken" from "frontend rendering broken".
// Hits the cart backend directly, bypassing the UI.
new ApiCheck('cart-add-item', {
  name: 'Cart — Add Item (backend direct)',
  activated: true,
  locations: ['us-east-1', 'eu-west-1'],
  frequency: Frequency.EVERY_5M,
  request: {
    // TODO: confirm exact path and payload after inspecting network traffic
    // e.g. POST /api/cart  or  /cartservice/cart
    url: 'http://206.189.232.100:8080/TODO_ADD_TO_CART_PATH',
    method: 'POST',
    headers: [
      { key: 'Content-Type', value: 'application/json' },
    ],
    // TODO: replace with real product ID and quantity from network inspection
    body: JSON.stringify({
      // item: { product_id: 'TODO_PRODUCT_ID', quantity: 1 },
      // user_id: 'checkly-synthetic-user',
    }),
    assertions: [
      // TODO: confirm success status code (200 or 201)
      AssertionBuilder.statusCode().equals(200),
      AssertionBuilder.responseTime().lessThan(3000),
    ],
  },
})

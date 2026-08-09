import { test, expect } from '@playwright/test'

// Full revenue path: browse → add to cart → checkout → confirm.
// Written as a standard @playwright/test spec — runs unmodified outside Checkly.
// baseURL is set to http://206.189.232.100:8080 via playwright.config / checkly.config.

test('complete purchase flow', async ({ page }) => {
  // 1. Browse to the storefront
  await page.goto('/')
  await expect(page).toHaveTitle(/.+/) // TODO: confirm expected title text

  // 2. Navigate to a product
  // TODO: replace selector with the actual product link observed in network/DOM inspection
  // e.g. await page.click('[data-cy="product-card"]:first-child')
  await page.click('TODO_PRODUCT_LINK_SELECTOR')
  await expect(page).toHaveURL(/TODO_PRODUCT_URL_PATTERN/)

  // 3. Add to cart
  // TODO: replace selector with the actual add-to-cart button
  // e.g. await page.click('[data-cy="add-to-cart"]')
  await page.click('TODO_ADD_TO_CART_SELECTOR')

  // 4. Proceed to cart / checkout
  // TODO: replace selector with cart icon or "View Cart" link
  await page.click('TODO_VIEW_CART_SELECTOR')
  await expect(page).toHaveURL(/TODO_CART_URL_PATTERN/)

  // 5. Fill checkout form
  // TODO: fill in shipping/payment fields with the selectors observed in the app
  // await page.fill('[data-cy="email"]', 'synthetic@checkly.io')
  // await page.fill('[data-cy="street"]', '123 Test St')
  // ...

  // 6. Submit order
  // TODO: replace selector with the Place Order / Checkout button
  await page.click('TODO_PLACE_ORDER_SELECTOR')

  // 7. Confirm success
  // TODO: assert on the order confirmation page — URL pattern or success message
  await expect(page).toHaveURL(/TODO_CONFIRMATION_URL_PATTERN/)
  // e.g. await expect(page.locator('TODO_SUCCESS_MESSAGE_SELECTOR')).toBeVisible()
})

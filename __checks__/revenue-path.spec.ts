import { test, expect } from '@playwright/test'

// Full revenue path: browse → product → add to cart → checkout → confirm.
// Written as a standard @playwright/test spec — runs unmodified outside Checkly.
// baseURL resolves to http://206.189.232.100:8080 via checkly.config.ts playwrightConfig.
//
// Selectors are data-cy attributes sourced from the app's CypressFields enum.
// The checkout form is reached via /cart after adding an item; the confirmation
// page is at /cart/checkout/<orderId> (client-side routed with ?order=... query).

test('complete purchase flow', async ({ page }) => {
  // 1. Land on the storefront and wait for the product list to hydrate
  await page.goto('/')
  await expect(page.locator('[data-cy="product-list"]')).toBeVisible()

  // 2. Click the first product card
  await page.locator('[data-cy="product-card"]').first().click()
  await expect(page.locator('[data-cy="product-detail"]')).toBeVisible()

  // 3. Add to cart
  await page.locator('[data-cy="product-add-to-cart"]').click()

  // 4. Open the cart dropdown and navigate to the full cart page
  await page.locator('[data-cy="cart-icon"]').click()
  await page.goto('/cart')

  // 5. Fill the checkout form
  //    All field ids are sourced from the CheckoutForm component in the JS bundle.
  await page.fill('#email', 'synthetic@checkly.io')
  await page.fill('#street_address', '1 Checkly Lane')
  await page.fill('#zip_code', '90210')
  await page.fill('#city', 'Testville')
  await page.fill('#state', 'CA')
  await page.fill('#country', 'US')
  await page.fill('#credit_card_number', '4432-8015-6152-0454')
  await page.selectOption('#credit_card_expiration_month', '1')
  await page.selectOption('#credit_card_expiration_year', '2030')
  await page.fill('#credit_card_cvv', '672')

  // 6. Place the order
  await page.locator('[data-cy="checkout-place-order"]').click()

  // 7. Confirm success — the app routes to /cart/checkout/<orderId>
  //    The page title is "Otel Demo - Checkout" and shows product-price cards
  await expect(page).toHaveURL(/\/cart\/checkout\/[0-9a-f-]+/)
  await expect(page.locator('[data-cy="product-price"]').first()).toBeVisible()
})

import { ApiCheck, AssertionBuilder, Frequency } from 'checkly/constructs'

// Canary: fast, cheap signal for backend health.
// Runs every 1 min so it beats customer discovery and Grafana alerting latency.
new ApiCheck('product-catalog-list', {
  name: 'Product Catalog — List Products',
  activated: true,
  locations: ['us-east-1', 'eu-west-1'],
  frequency: Frequency.EVERY_1M,
  request: {
    // TODO: confirm exact path after inspecting network traffic
    // e.g. '/api/products' or '/productcatalogservice/products'
    url: 'http://206.189.232.100:8080/TODO_LIST_PRODUCTS_PATH',
    method: 'GET',
    assertions: [
      AssertionBuilder.statusCode().equals(200),
      AssertionBuilder.responseTime().lessThan(2000),
      // TODO: confirm JSONPath for the products array once route is known
      // e.g. AssertionBuilder.jsonBody('$.products').notEmpty()
    ],
  },
})

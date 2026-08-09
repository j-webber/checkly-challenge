import { ApiCheck, AssertionBuilder, Frequency } from 'checkly/constructs'

// Canary: fast, cheap signal for backend health.
// Runs every 1 min so it beats customer discovery and Grafana alerting latency.
new ApiCheck('product-catalog-list', {
  name: 'Product Catalog — List Products',
  activated: true,
  locations: ['us-east-1', 'eu-west-1'],
  frequency: Frequency.EVERY_1M,
  request: {
    url: 'http://206.189.232.100:8080/api/products',
    method: 'GET',
    assertions: [
      AssertionBuilder.statusCode().equals(200),
      AssertionBuilder.responseTime().lessThan(2000),
      // First item must have an id — proves the catalog returned real data, not an empty array
      AssertionBuilder.jsonBody('$[0].id').notEmpty(),
    ],
  },
})

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Plaza from '@plazafyi/sdk';

const client = new Plaza({ apiKey: 'My API Key', baseURL: process.env["TEST_API_BASE_URL"] ?? 'http://127.0.0.1:4010' });

describe('resource tiles', () => {
  test('get: required and optional params', async () => {
    const response = await client.tiles.get(0, { z: 0, x: 0 });
  });
});

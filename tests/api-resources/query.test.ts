// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Plaza from '@plazafyi/sdk';

const client = new Plaza({ apiKey: 'My API Key', baseURL: process.env["TEST_API_BASE_URL"] ?? 'http://127.0.0.1:4010' });

describe('resource query', () => {
  test('execute: only required params', async () => {
    const responsePromise = client.query.execute({ data: '$$ = search(node, amenity: "cafe").around(distance: 500, geometry: point(48.8566, 2.3522));' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('execute: required and optional params', async () => {
    const response = await client.query.execute({ data: '$$ = search(node, amenity: "cafe").around(distance: 500, geometry: point(48.8566, 2.3522));', format: 'format' });
  });
});

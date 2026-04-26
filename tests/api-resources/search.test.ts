// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Plaza from '@plazafyi/sdk';

const client = new Plaza({ apiKey: 'My API Key', baseURL: process.env["TEST_API_BASE_URL"] ?? 'http://127.0.0.1:4010' });

describe('resource search', () => {
  test('query: only required params', async () => {
    const responsePromise = client.search.query({ q: 'q' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('query: required and optional params', async () => {
    const response = await client.search.query({
    q: 'q',
    cursor: 'cursor',
    format: 'format',
    limit: 0,
    'output[fields]': 'output[fields]',
    'output[include]': 'output[include]',
    'output[precision]': 0,
    'output[sort]': 'output[sort]',
  });
  });
});

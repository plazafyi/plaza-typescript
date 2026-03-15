// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Plaza from 'plaza';

const client = new Plaza({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource elements', () => {
  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.v1.elements.retrieve(0, { type: 'type' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieve: required and optional params', async () => {
    const response = await client.v1.elements.retrieve(0, { type: 'type' });
  });

  // Mock server tests are disabled
  test.skip('fetchBatch: only required params', async () => {
    const responsePromise = client.v1.elements.fetchBatch({ elements: [{ id: 0, type: 'node' }] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('fetchBatch: required and optional params', async () => {
    const response = await client.v1.elements.fetchBatch({ elements: [{ id: 0, type: 'node' }] });
  });

  // Mock server tests are disabled
  test.skip('query', async () => {
    const responsePromise = client.v1.elements.query();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('query: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.v1.elements.query(
        {
          bbox: 'bbox',
          cursor: 'cursor',
          h3: 'h3',
          limit: 0,
          type: 'type',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Plaza.NotFoundError);
  });
});

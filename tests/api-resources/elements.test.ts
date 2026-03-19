// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Plaza from '@plazafyi/sdk';

const client = new Plaza({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource elements', () => {
  // Mock server doesn't support callbacks yet
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.elements.retrieve(0, { type: 'type' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server doesn't support callbacks yet
  test.skip('retrieve: required and optional params', async () => {
    const response = await client.elements.retrieve(0, { type: 'type' });
  });

  // Mock server doesn't support callbacks yet
  test.skip('batch: only required params', async () => {
    const responsePromise = client.elements.batch({ elements: [{ id: 0, type: 'node' }] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server doesn't support callbacks yet
  test.skip('batch: required and optional params', async () => {
    const response = await client.elements.batch({ elements: [{ id: 0, type: 'node' }] });
  });

  // Mock server doesn't support callbacks yet
  test.skip('nearby: only required params', async () => {
    const responsePromise = client.elements.nearby({ lat: 0, lng: 0 });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server doesn't support callbacks yet
  test.skip('nearby: required and optional params', async () => {
    const response = await client.elements.nearby({
      lat: 0,
      lng: 0,
      limit: 0,
      radius: 0,
    });
  });

  // Mock server doesn't support callbacks yet
  test.skip('query', async () => {
    const responsePromise = client.elements.query();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server doesn't support callbacks yet
  test.skip('query: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.elements.query(
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

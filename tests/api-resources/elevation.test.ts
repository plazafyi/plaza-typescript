// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Plaza from '@plazafyi/sdk';

const client = new Plaza({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource elevation', () => {
  // Mock server doesn't support callbacks yet
  test.skip('batch: only required params', async () => {
    const responsePromise = client.elevation.batch({ geometry: { coordinates: [0], type: 'Point' } });
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
    const response = await client.elevation.batch({ geometry: { coordinates: [0], type: 'Point' } });
  });

  // Mock server doesn't support callbacks yet
  test.skip('lookup', async () => {
    const responsePromise = client.elevation.lookup();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server doesn't support callbacks yet
  test.skip('lookup: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.elevation.lookup(
        {
          lat: 0,
          lng: 0,
          locations: 'locations',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Plaza.NotFoundError);
  });

  // Mock server doesn't support callbacks yet
  test.skip('profile: only required params', async () => {
    const responsePromise = client.elevation.profile({ geometry: { coordinates: [0], type: 'Point' } });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server doesn't support callbacks yet
  test.skip('profile: required and optional params', async () => {
    const response = await client.elevation.profile({ geometry: { coordinates: [0], type: 'Point' } });
  });
});

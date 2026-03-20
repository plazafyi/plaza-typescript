// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Plaza from '@plazafyi/sdk';

const client = new Plaza({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource optimize', () => {
  test('create: only required params', async () => {
    const responsePromise = client.optimize.create({ waypoints: { coordinates: [0], type: 'Point' } });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.optimize.create({
      waypoints: { coordinates: [0], type: 'Point' },
      mode: 'auto',
      roundtrip: true,
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.optimize.retrieve('job_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});

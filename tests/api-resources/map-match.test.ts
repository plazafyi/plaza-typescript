// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Plaza from '@plazafyi/sdk';

const client = new Plaza({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource mapMatch', () => {
  // Mock server doesn't support callbacks yet
  test.skip('match: only required params', async () => {
    const responsePromise = client.mapMatch.match({ trace: { coordinates: [0], type: 'Point' } });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server doesn't support callbacks yet
  test.skip('match: required and optional params', async () => {
    const response = await client.mapMatch.match({
      trace: { coordinates: [0], type: 'Point' },
      radiuses: [0],
    });
  });
});

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Plaza from '@plazafyi/sdk';

const client = new Plaza({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource mapMatch', () => {
  test('match: only required params', async () => {
    const responsePromise = client.mapMatch.match({
      coordinates: [
        { lat: 48.8566, lng: 2.3522 },
        { lat: 48.857, lng: 2.353 },
        { lat: 48.8575, lng: 2.354 },
      ],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('match: required and optional params', async () => {
    const response = await client.mapMatch.match({
      coordinates: [
        { lat: 48.8566, lng: 2.3522 },
        { lat: 48.857, lng: 2.353 },
        { lat: 48.8575, lng: 2.354 },
      ],
      radiuses: [0],
    });
  });
});

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Plaza from '@plazafyi/sdk';

const client = new Plaza({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource features', () => {
  test('retrieve: only required params', async () => {
    const responsePromise = client.features.retrieve(0, { type: 'type' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: required and optional params', async () => {
    const response = await client.features.retrieve(0, { type: 'type' });
  });

  test('batch: only required params', async () => {
    const responsePromise = client.features.batch({
      elements: [
        { id: 21154906, type: 'node' },
        { id: 4589123, type: 'way' },
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

  test('batch: required and optional params', async () => {
    const response = await client.features.batch({
      elements: [
        { id: 21154906, type: 'node' },
        { id: 4589123, type: 'way' },
      ],
    });
  });

  test('query', async () => {
    const responsePromise = client.features.query();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('query: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.features.query(
        {
          cursor: 'cursor',
          format: 'format',
          h3: 'h3',
          limit: 0,
          type: 'type',
          around: { coordinates: [2.3522, 48.8566], type: 'Point' },
          contains: { coordinates: [2.3522, 48.8566], type: 'Point' },
          crosses: { coordinates: [2.3522, 48.8566], type: 'Point' },
          intersects: { coordinates: [2.3522, 48.8566], type: 'Point' },
          not_contains: { coordinates: [2.3522, 48.8566], type: 'Point' },
          not_intersects: { coordinates: [2.3522, 48.8566], type: 'Point' },
          not_within: { coordinates: [2.3522, 48.8566], type: 'Point' },
          radius: 500,
          touches: { coordinates: [2.3522, 48.8566], type: 'Point' },
          within: { coordinates: [2.3522, 48.8566], type: 'Point' },
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Plaza.NotFoundError);
  });
});

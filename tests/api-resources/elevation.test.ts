// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Plaza from '@plazafyi/sdk';

const client = new Plaza({ apiKey: 'My API Key', baseURL: process.env["TEST_API_BASE_URL"] ?? 'http://127.0.0.1:4010' });

describe('resource elevation', () => {
  test('lookup: only required params', async () => {
    const responsePromise = client.elevation.lookup({ geometry: { coordinates: [2.3522, 48.8566], type: 'Point' } });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('lookup: required and optional params', async () => {
    const response = await client.elevation.lookup({
    geometry: { coordinates: [2.3522, 48.8566], type: 'Point' },
    format: 'format',
  });
  });

  test('profile: only required params', async () => {
    const responsePromise = client.elevation.profile({ geometry: { coordinates: [[2.3522, 48.8566], [2.34, 48.858], [2.2945, 48.8584]], type: 'LineString' } });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('profile: required and optional params', async () => {
    const response = await client.elevation.profile({ geometry: { coordinates: [[2.3522, 48.8566], [2.34, 48.858], [2.2945, 48.8584]], type: 'LineString' } });
  });
});

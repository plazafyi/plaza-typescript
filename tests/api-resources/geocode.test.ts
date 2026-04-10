// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Plaza from '@plazafyi/sdk';

const client = new Plaza({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource geocode', () => {
  test('autocomplete: only required params', async () => {
    const responsePromise = client.geocode.autocomplete({ q: '221B Bak' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('autocomplete: required and optional params', async () => {
    const response = await client.geocode.autocomplete({
      q: '221B Bak',
      format: 'format',
      country_code: 'xx',
      focus: { coordinates: [2.3522, 48.8566], type: 'Point' },
      lang: 'lang',
      layer: 'layer',
      limit: 1,
    });
  });

  test('batch: only required params', async () => {
    const responsePromise = client.geocode.batch({ addresses: ['string'] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('batch: required and optional params', async () => {
    const response = await client.geocode.batch({ addresses: ['string'] });
  });

  test('forward: only required params', async () => {
    const responsePromise = client.geocode.forward({ q: '221B Baker Street, London' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('forward: required and optional params', async () => {
    const response = await client.geocode.forward({
      q: '221B Baker Street, London',
      format: 'format',
      country_code: 'xx',
      focus: { coordinates: [2.3522, 48.8566], type: 'Point' },
      lang: 'lang',
      layer: 'layer',
      limit: 1,
    });
  });

  test('reverse: only required params', async () => {
    const responsePromise = client.geocode.reverse({
      geometry: { coordinates: [2.3522, 48.8566], type: 'Point' },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('reverse: required and optional params', async () => {
    const response = await client.geocode.reverse({
      geometry: { coordinates: [2.3522, 48.8566], type: 'Point' },
      format: 'format',
      lang: 'lang',
      limit: 1,
      radius: 1,
    });
  });
});

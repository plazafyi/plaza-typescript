// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Plaza from '@plazafyi/sdk';

const client = new Plaza({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource geocode', () => {
  // Mock server doesn't support callbacks yet
  test.skip('autocomplete: only required params', async () => {
    const responsePromise = client.geocode.autocomplete({ q: 'q' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server doesn't support callbacks yet
  test.skip('autocomplete: required and optional params', async () => {
    const response = await client.geocode.autocomplete({
      q: 'q',
      country_code: 'country_code',
      lang: 'lang',
      lat: 0,
      layer: 'layer',
      limit: 0,
      lng: 0,
    });
  });

  // Mock server doesn't support callbacks yet
  test.skip('batch: only required params', async () => {
    const responsePromise = client.geocode.batch({ addresses: ['string'] });
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
    const response = await client.geocode.batch({ addresses: ['string'] });
  });

  // Mock server doesn't support callbacks yet
  test.skip('forward: only required params', async () => {
    const responsePromise = client.geocode.forward({ q: 'q' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server doesn't support callbacks yet
  test.skip('forward: required and optional params', async () => {
    const response = await client.geocode.forward({
      q: 'q',
      bbox: 'bbox',
      country_code: 'country_code',
      lang: 'lang',
      lat: 0,
      layer: 'layer',
      limit: 0,
      lng: 0,
    });
  });

  // Mock server doesn't support callbacks yet
  test.skip('reverse: only required params', async () => {
    const responsePromise = client.geocode.reverse({ lat: 0, lng: 0 });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server doesn't support callbacks yet
  test.skip('reverse: required and optional params', async () => {
    const response = await client.geocode.reverse({
      lat: 0,
      lng: 0,
      lang: 'lang',
      layer: 'layer',
      limit: 0,
      radius: 0,
    });
  });
});

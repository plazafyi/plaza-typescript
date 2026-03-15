// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Plaza from 'plaza-js';

const client = new Plaza({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource geocode', () => {
  // Mock server tests are disabled
  test.skip('autocomplete: only required params', async () => {
    const responsePromise = client.v1.geocode.autocomplete({ q: 'q' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('autocomplete: required and optional params', async () => {
    const response = await client.v1.geocode.autocomplete({
      q: 'q',
      lat: 0,
      limit: 0,
      lng: 0,
    });
  });

  // Mock server tests are disabled
  test.skip('forward: only required params', async () => {
    const responsePromise = client.v1.geocode.forward({ q: 'q' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('forward: required and optional params', async () => {
    const response = await client.v1.geocode.forward({
      q: 'q',
      lat: 0,
      limit: 0,
      lng: 0,
    });
  });

  // Mock server tests are disabled
  test.skip('reverse: only required params', async () => {
    const responsePromise = client.v1.geocode.reverse({ lat: 0, lng: 0 });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('reverse: required and optional params', async () => {
    const response = await client.v1.geocode.reverse({
      lat: 0,
      lng: 0,
      radius: 0,
    });
  });
});

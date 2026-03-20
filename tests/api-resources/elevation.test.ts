// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Plaza from '@plazafyi/sdk';

const client = new Plaza({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource elevation', () => {
  test('batch: only required params', async () => {
    const responsePromise = client.elevation.batch({
      coordinates: [
        { lat: 48.8566, lng: 2.3522 },
        { lat: 45.764, lng: 4.8357 },
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
    const response = await client.elevation.batch({
      coordinates: [
        { lat: 48.8566, lng: 2.3522 },
        { lat: 45.764, lng: 4.8357 },
      ],
      format: 'format',
    });
  });

  test('lookup', async () => {
    const responsePromise = client.elevation.lookup();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('lookup: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.elevation.lookup(
        {
          format: 'format',
          lat: 0,
          lng: 0,
          locations: 'locations',
          'output[fields]': 'output[fields]',
          'output[include]': 'output[include]',
          'output[precision]': 0,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Plaza.NotFoundError);
  });

  test('lookupPost', async () => {
    const responsePromise = client.elevation.lookupPost();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('lookupPost: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.elevation.lookupPost(
        {
          format: 'format',
          lat: 0,
          lng: 0,
          locations: 'locations',
          'output[fields]': 'output[fields]',
          'output[include]': 'output[include]',
          'output[precision]': 0,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Plaza.NotFoundError);
  });

  test('profile: only required params', async () => {
    const responsePromise = client.elevation.profile({
      coordinates: [
        { lat: 48.8566, lng: 2.3522 },
        { lat: 48.858, lng: 2.34 },
        { lat: 48.8584, lng: 2.2945 },
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

  test('profile: required and optional params', async () => {
    const response = await client.elevation.profile({
      coordinates: [
        { lat: 48.8566, lng: 2.3522 },
        { lat: 48.858, lng: 2.34 },
        { lat: 48.8584, lng: 2.2945 },
      ],
    });
  });
});

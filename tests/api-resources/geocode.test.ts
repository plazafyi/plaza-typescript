// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Plaza from '@plazafyi/sdk';

const client = new Plaza({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource geocode', () => {
  test('autocomplete: only required params', async () => {
    const responsePromise = client.geocode.autocomplete({ q: 'q' });
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
      q: 'q',
      country_code: 'country_code',
      lang: 'lang',
      lat: 0,
      layer: 'layer',
      limit: 0,
      lng: 0,
    });
  });

  test('autocompletePost: only required params', async () => {
    const responsePromise = client.geocode.autocompletePost({ q: 'q' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('autocompletePost: required and optional params', async () => {
    const response = await client.geocode.autocompletePost({
      q: 'q',
      country_code: 'country_code',
      lang: 'lang',
      lat: 0,
      layer: 'layer',
      limit: 0,
      lng: 0,
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
    const responsePromise = client.geocode.forward({ q: 'q' });
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

  test('forwardPost: only required params', async () => {
    const responsePromise = client.geocode.forwardPost({ q: 'q' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('forwardPost: required and optional params', async () => {
    const response = await client.geocode.forwardPost({
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

  test('reverse', async () => {
    const responsePromise = client.geocode.reverse();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('reverse: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.geocode.reverse(
        {
          lang: 'lang',
          lat: 0,
          layer: 'layer',
          limit: 0,
          lng: 0,
          near: 'near',
          radius: 0,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Plaza.NotFoundError);
  });

  test('reversePost', async () => {
    const responsePromise = client.geocode.reversePost();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('reversePost: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.geocode.reversePost(
        {
          lang: 'lang',
          lat: 0,
          layer: 'layer',
          limit: 0,
          lng: 0,
          near: 'near',
          radius: 0,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Plaza.NotFoundError);
  });
});

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Plaza from '@plazafyi/sdk';

const client = new Plaza({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource elements', () => {
  test('retrieve: only required params', async () => {
    const responsePromise = client.elements.retrieve(0, { type: 'type' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: required and optional params', async () => {
    const response = await client.elements.retrieve(0, { type: 'type' });
  });

  test('batch: only required params', async () => {
    const responsePromise = client.elements.batch({
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
    const response = await client.elements.batch({
      elements: [
        { id: 21154906, type: 'node' },
        { id: 4589123, type: 'way' },
      ],
    });
  });

  test('lookup', async () => {
    const responsePromise = client.elements.lookup();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('nearby', async () => {
    const responsePromise = client.elements.nearby();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('nearby: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.elements.nearby(
        {
          lat: 0,
          limit: 0,
          lng: 0,
          near: 'near',
          'output[buffer]': 0,
          'output[centroid]': true,
          'output[fields]': 'output[fields]',
          'output[geometry]': true,
          'output[include]': 'output[include]',
          'output[precision]': 0,
          'output[simplify]': 0,
          'output[sort]': 'output[sort]',
          radius: 0,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Plaza.NotFoundError);
  });

  test('nearbyPost', async () => {
    const responsePromise = client.elements.nearbyPost();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('nearbyPost: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.elements.nearbyPost(
        {
          lat: 0,
          limit: 0,
          lng: 0,
          near: 'near',
          'output[buffer]': 0,
          'output[centroid]': true,
          'output[fields]': 'output[fields]',
          'output[geometry]': true,
          'output[include]': 'output[include]',
          'output[precision]': 0,
          'output[simplify]': 0,
          'output[sort]': 'output[sort]',
          radius: 0,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Plaza.NotFoundError);
  });

  test('query', async () => {
    const responsePromise = client.elements.query();
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
      client.elements.query(
        {
          bbox: 'bbox',
          contains: 'contains',
          crosses: 'crosses',
          cursor: 'cursor',
          h3: 'h3',
          intersects: 'intersects',
          limit: 0,
          near: 'near',
          'output[buffer]': 0,
          'output[centroid]': true,
          'output[fields]': 'output[fields]',
          'output[geometry]': true,
          'output[include]': 'output[include]',
          'output[precision]': 0,
          'output[simplify]': 0,
          'output[sort]': 'output[sort]',
          radius: 0,
          touches: 'touches',
          type: 'type',
          within: 'within',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Plaza.NotFoundError);
  });

  test('queryPost', async () => {
    const responsePromise = client.elements.queryPost();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('queryPost: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.elements.queryPost(
        {
          bbox: 'bbox',
          contains: 'contains',
          crosses: 'crosses',
          cursor: 'cursor',
          h3: 'h3',
          intersects: 'intersects',
          limit: 0,
          near: 'near',
          'output[buffer]': 0,
          'output[centroid]': true,
          'output[fields]': 'output[fields]',
          'output[geometry]': true,
          'output[include]': 'output[include]',
          'output[precision]': 0,
          'output[simplify]': 0,
          'output[sort]': 'output[sort]',
          radius: 0,
          touches: 'touches',
          type: 'type',
          within: 'within',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Plaza.NotFoundError);
  });
});

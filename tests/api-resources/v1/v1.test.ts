// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Plaza from 'plaza';

const client = new Plaza({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource v1', () => {
  // Mock server tests are disabled
  test.skip('calculateDistanceMatrix: only required params', async () => {
    const responsePromise = client.v1.calculateDistanceMatrix({
      destinations: [{ lat: 0, lng: 0 }],
      origins: [{ lat: 0, lng: 0 }],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('calculateDistanceMatrix: required and optional params', async () => {
    const response = await client.v1.calculateDistanceMatrix({
      destinations: [{ lat: 0, lng: 0 }],
      origins: [{ lat: 0, lng: 0 }],
      mode: 'auto',
    });
  });

  // Mock server tests are disabled
  test.skip('calculateIsochrone: only required params', async () => {
    const responsePromise = client.v1.calculateIsochrone({
      lat: 0,
      lng: 0,
      time: 0,
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('calculateIsochrone: required and optional params', async () => {
    const response = await client.v1.calculateIsochrone({
      lat: 0,
      lng: 0,
      time: 0,
      mode: 'mode',
    });
  });

  // Mock server tests are disabled
  test.skip('calculateRoute: only required params', async () => {
    const responsePromise = client.v1.calculateRoute({
      destination: { lat: 0, lng: 0 },
      origin: { lat: 0, lng: 0 },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('calculateRoute: required and optional params', async () => {
    const response = await client.v1.calculateRoute({
      destination: { lat: 0, lng: 0 },
      origin: { lat: 0, lng: 0 },
      mode: 'auto',
    });
  });

  // Mock server tests are disabled
  test.skip('executeOverpass: only required params', async () => {
    const responsePromise = client.v1.executeOverpass({ data: 'data' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('executeOverpass: required and optional params', async () => {
    const response = await client.v1.executeOverpass({ data: 'data' });
  });

  // Mock server tests are disabled
  test.skip('executeQuery', async () => {
    const responsePromise = client.v1.executeQuery();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('executeQuery: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.v1.executeQuery({ bbox: 'bbox', type: 'type' }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Plaza.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('executeSparql: only required params', async () => {
    const responsePromise = client.v1.executeSparql({ query: 'query' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('executeSparql: required and optional params', async () => {
    const response = await client.v1.executeSparql({ query: 'query' });
  });

  // Mock server tests are disabled
  test.skip('findNearby: only required params', async () => {
    const responsePromise = client.v1.findNearby({ lat: 0, lng: 0 });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('findNearby: required and optional params', async () => {
    const response = await client.v1.findNearby({
      lat: 0,
      lng: 0,
      limit: 0,
      radius: 0,
    });
  });

  // Mock server tests are disabled
  test.skip('getTile: required and optional params', async () => {
    const response = await client.v1.getTile(0, { z: 0, x: 0 });
  });

  // Mock server tests are disabled
  test.skip('reverseGeocode: only required params', async () => {
    const responsePromise = client.v1.reverseGeocode({ lat: 0, lng: 0 });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('reverseGeocode: required and optional params', async () => {
    const response = await client.v1.reverseGeocode({ lat: 0, lng: 0 });
  });

  // Mock server tests are disabled
  test.skip('searchFeatures: only required params', async () => {
    const responsePromise = client.v1.searchFeatures({ q: 'q' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('searchFeatures: required and optional params', async () => {
    const response = await client.v1.searchFeatures({
      q: 'q',
      cursor: 'cursor',
      limit: 0,
    });
  });

  // Mock server tests are disabled
  test.skip('snapToNearest: only required params', async () => {
    const responsePromise = client.v1.snapToNearest({ lat: 0, lng: 0 });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('snapToNearest: required and optional params', async () => {
    const response = await client.v1.snapToNearest({
      lat: 0,
      lng: 0,
      radius: 0,
    });
  });
});

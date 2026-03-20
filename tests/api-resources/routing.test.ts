// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Plaza from '@plazafyi/sdk';

const client = new Plaza({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource routing', () => {
  test('isochrone: only required params', async () => {
    const responsePromise = client.routing.isochrone({
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

  test('isochrone: required and optional params', async () => {
    const response = await client.routing.isochrone({
      lat: 0,
      lng: 0,
      time: 0,
      mode: 'mode',
    });
  });

  test('matrix: only required params', async () => {
    const responsePromise = client.routing.matrix({
      destinations: { coordinates: [0], type: 'Point' },
      origins: { coordinates: [0], type: 'Point' },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('matrix: required and optional params', async () => {
    const response = await client.routing.matrix({
      destinations: { coordinates: [0], type: 'Point' },
      origins: { coordinates: [0], type: 'Point' },
      mode: 'auto',
    });
  });

  test('nearest: only required params', async () => {
    const responsePromise = client.routing.nearest({ lat: 0, lng: 0 });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('nearest: required and optional params', async () => {
    const response = await client.routing.nearest({
      lat: 0,
      lng: 0,
      radius: 0,
    });
  });

  test('route: only required params', async () => {
    const responsePromise = client.routing.route({
      destination: { coordinates: [0], type: 'Point' },
      origin: { coordinates: [0], type: 'Point' },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('route: required and optional params', async () => {
    const response = await client.routing.route({
      destination: { coordinates: [0], type: 'Point' },
      origin: { coordinates: [0], type: 'Point' },
      mode: 'auto',
    });
  });
});

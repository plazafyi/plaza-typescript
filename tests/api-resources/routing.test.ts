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
      'output[fields]': 'output[fields]',
      'output[geometry]': true,
      'output[include]': 'output[include]',
      'output[precision]': 0,
      'output[simplify]': 0,
    });
  });

  test('isochronePost: only required params', async () => {
    const responsePromise = client.routing.isochronePost({
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

  test('isochronePost: required and optional params', async () => {
    const response = await client.routing.isochronePost({
      lat: 0,
      lng: 0,
      time: 0,
      mode: 'mode',
      'output[fields]': 'output[fields]',
      'output[geometry]': true,
      'output[include]': 'output[include]',
      'output[precision]': 0,
      'output[simplify]': 0,
    });
  });

  test('matrix: only required params', async () => {
    const responsePromise = client.routing.matrix({
      destinations: [{ lat: 48.8584, lng: 2.2945 }],
      origins: [
        { lat: 48.8566, lng: 2.3522 },
        { lat: 48.8606, lng: 2.3376 },
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

  test('matrix: required and optional params', async () => {
    const response = await client.routing.matrix({
      destinations: [{ lat: 48.8584, lng: 2.2945 }],
      origins: [
        { lat: 48.8566, lng: 2.3522 },
        { lat: 48.8606, lng: 2.3376 },
      ],
      annotations: 'annotations',
      fallback_speed: 1,
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
      'output[fields]': 'output[fields]',
      'output[include]': 'output[include]',
      'output[precision]': 0,
      radius: 0,
    });
  });

  test('nearestPost: only required params', async () => {
    const responsePromise = client.routing.nearestPost({ lat: 0, lng: 0 });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('nearestPost: required and optional params', async () => {
    const response = await client.routing.nearestPost({
      lat: 0,
      lng: 0,
      'output[fields]': 'output[fields]',
      'output[include]': 'output[include]',
      'output[precision]': 0,
      radius: 0,
    });
  });

  test('route: only required params', async () => {
    const responsePromise = client.routing.route({
      destination: { lat: 48.8584, lng: 2.2945 },
      origin: { lat: 48.8566, lng: 2.3522 },
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
      destination: { lat: 48.8584, lng: 2.2945 },
      origin: { lat: 48.8566, lng: 2.3522 },
      alternatives: 0,
      annotations: true,
      depart_at: '2019-12-27T18:11:19.117Z',
      ev: {
        battery_capacity_wh: 75000,
        connector_types: ['string'],
        initial_charge_pct: 0,
        min_charge_pct: 0,
        min_power_kw: 0,
      },
      exclude: 'exclude',
      geometries: 'geojson',
      mode: 'auto',
      overview: 'full',
      steps: true,
      traffic_model: 'best_guess',
      waypoints: [{ lat: 48.8566, lng: 2.3522 }],
    });
  });
});

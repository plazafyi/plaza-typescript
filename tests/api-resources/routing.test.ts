// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Plaza from '@plazafyi/sdk';

const client = new Plaza({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource routing', () => {
  test('isochrone: only required params', async () => {
    const responsePromise = client.routing.isochrone({
      geometry: { coordinates: [2.3522, 48.8566], type: 'Point' },
      time: [1],
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
      geometry: { coordinates: [2.3522, 48.8566], type: 'Point' },
      time: [1],
      format: 'format',
      mode: 'auto',
    });
  });

  test('matrix: only required params', async () => {
    const responsePromise = client.routing.matrix({
      destinations: [{ coordinates: [2.2945, 48.8584], type: 'Point' }],
      origins: [
        { coordinates: [2.3522, 48.8566], type: 'Point' },
        { coordinates: [2.3376, 48.8606], type: 'Point' },
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
      destinations: [{ coordinates: [2.2945, 48.8584], type: 'Point' }],
      origins: [
        { coordinates: [2.3522, 48.8566], type: 'Point' },
        { coordinates: [2.3376, 48.8606], type: 'Point' },
      ],
      annotations: 'annotations',
      fallback_speed: 1,
      mode: 'auto',
    });
  });

  test('nearest: only required params', async () => {
    const responsePromise = client.routing.nearest({
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

  test('nearest: required and optional params', async () => {
    const response = await client.routing.nearest({
      geometry: { coordinates: [2.3522, 48.8566], type: 'Point' },
      radius: 1,
    });
  });

  test('route: only required params', async () => {
    const responsePromise = client.routing.route({
      destination: { coordinates: [2.2945, 48.8584], type: 'Point' },
      origin: { coordinates: [2.3522, 48.8566], type: 'Point' },
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
      destination: { coordinates: [2.2945, 48.8584], type: 'Point' },
      origin: { coordinates: [2.3522, 48.8566], type: 'Point' },
      format: 'format',
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
      waypoints: [{ coordinates: [2.3522, 48.8566], type: 'Point' }],
    });
  });
});

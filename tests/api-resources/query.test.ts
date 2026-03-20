// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Plaza from '@plazafyi/sdk';

const client = new Plaza({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource query', () => {
  test('execute: only required params', async () => {
    const responsePromise = client.query.execute({ steps: [{ type: 'overpass' }] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('execute: required and optional params', async () => {
    const response = await client.query.execute({ steps: [{ type: 'overpass', query: 'query' }] });
  });

  test('overpass: only required params', async () => {
    const responsePromise = client.query.overpass({
      data: '[out:json];node[amenity=cafe](around:500,48.8566,2.3522);out body;',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('overpass: required and optional params', async () => {
    const response = await client.query.overpass({
      data: '[out:json];node[amenity=cafe](around:500,48.8566,2.3522);out body;',
    });
  });

  test('sparql: only required params', async () => {
    const responsePromise = client.query.sparql({
      query: 'SELECT ?s ?name WHERE { ?s osm:name ?name . ?s osm:amenity "cafe" } LIMIT 10',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('sparql: required and optional params', async () => {
    const response = await client.query.sparql({
      query: 'SELECT ?s ?name WHERE { ?s osm:name ?name . ?s osm:amenity "cafe" } LIMIT 10',
    });
  });
});

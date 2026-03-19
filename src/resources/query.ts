// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TopLevelAPI from './top-level';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Query extends APIResource {
  /**
   * Execute an Overpass QL query
   */
  overpass(body: QueryOverpassParams, options?: RequestOptions): APIPromise<TopLevelAPI.FeatureCollection> {
    return this._client.post('/api/v1/overpass', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: 'application/geo+json' }, options?.headers]),
    });
  }

  /**
   * Execute a SPARQL query
   */
  sparql(body: QuerySparqlParams, options?: RequestOptions): APIPromise<SparqlResult> {
    return this._client.post('/api/v1/sparql', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: 'application/geo+json' }, options?.headers]),
    });
  }
}

export interface OverpassQuery {
  /**
   * Overpass QL query string
   */
  data: string;
}

export interface SparqlQuery {
  /**
   * SPARQL query string
   */
  query: string;
}

/**
 * GeoJSON FeatureCollection of SPARQL query results
 */
export interface SparqlResult {
  /**
   * GeoJSON features from SPARQL query
   */
  features: Array<TopLevelAPI.GeoJsonFeature>;

  type: 'FeatureCollection';
}

export interface QueryOverpassParams {
  /**
   * Overpass QL query string
   */
  data: string;
}

export interface QuerySparqlParams {
  /**
   * SPARQL query string
   */
  query: string;
}

export declare namespace Query {
  export {
    type OverpassQuery as OverpassQuery,
    type SparqlQuery as SparqlQuery,
    type SparqlResult as SparqlResult,
    type QueryOverpassParams as QueryOverpassParams,
    type QuerySparqlParams as QuerySparqlParams,
  };
}

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TopLevelAPI from './top-level';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Query extends APIResource {
  /**
   * Execute a multi-step query pipeline
   *
   * @example
   * ```ts
   * const response = await client.query.execute({
   *   steps: [{ type: 'overpass' }],
   * });
   * ```
   */
  execute(body: QueryExecuteParams, options?: RequestOptions): APIPromise<QueryExecuteResponse> {
    return this._client.post('/api/v1/query', { body, ...options });
  }

  /**
   * Execute an Overpass QL query
   *
   * @example
   * ```ts
   * const featureCollection = await client.query.overpass({
   *   data: '[out:json];node[amenity=cafe](around:500,48.8566,2.3522);out body;',
   * });
   * ```
   */
  overpass(params: QueryOverpassParams, options?: RequestOptions): APIPromise<TopLevelAPI.FeatureCollection> {
    const { format, ...body } = params;
    return this._client.post('/api/v1/overpass', { query: { format }, body, ...options });
  }
}

/**
 * Overpass QL query request. The query is executed against Plaza's OSM database
 * and results are returned as GeoJSON.
 */
export interface OverpassQuery {
  /**
   * Overpass QL query string
   */
  data: string;
}

/**
 * Pipeline execution result containing the output of each step.
 */
export interface QueryExecuteResponse {
  /**
   * Results from each pipeline step in execution order
   */
  steps: Array<{ [key: string]: unknown }>;
}

export interface QueryExecuteParams {
  /**
   * Ordered list of query steps to execute
   */
  steps: Array<QueryExecuteParams.Step>;
}

export namespace QueryExecuteParams {
  /**
   * A single pipeline step
   */
  export interface Step {
    /**
     * Step type: `overpass`, `filter`, or `transform`
     */
    type: 'overpass' | 'filter' | 'transform';

    /**
     * Query string for this step (required for overpass steps)
     */
    query?: string;
  }
}

export interface QueryOverpassParams {
  /**
   * Body param: Overpass QL query string
   */
  data: string;

  /**
   * Query param: Response format: json (default), geojson, csv, ndjson
   */
  format?: string;
}

export declare namespace Query {
  export {
    type OverpassQuery as OverpassQuery,
    type QueryExecuteResponse as QueryExecuteResponse,
    type QueryExecuteParams as QueryExecuteParams,
    type QueryOverpassParams as QueryOverpassParams,
  };
}

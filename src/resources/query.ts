// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TopLevelAPI from './top-level';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Query extends APIResource {
  /**
   * Execute a PlazaQL query
   *
   * @example
   * ```ts
   * const featureCollection = await client.query.execute({
   *   data: '$$ = search(node, amenity: "cafe").around(distance: 500, geometry: point(48.8566, 2.3522));',
   * });
   * ```
   */
  execute(params: QueryExecuteParams, options?: RequestOptions): APIPromise<TopLevelAPI.FeatureCollection> {
    const { format, ...body } = params;
    return this._client.post('/api/v1/query', { query: { format }, body, ...options });
  }
}

/**
 * PlazaQL query request. The query is executed against Plaza's OSM database and
 * results are returned as GeoJSON.
 */
export interface PlazaqlQuery {
  /**
   * PlazaQL query string
   */
  data: string;
}

export interface QueryExecuteParams {
  /**
   * Body param: PlazaQL query string
   */
  data: string;

  /**
   * Query param: Response format: json (default), geojson, csv, ndjson
   */
  format?: string;
}

export declare namespace Query {
  export { type PlazaqlQuery as PlazaqlQuery, type QueryExecuteParams as QueryExecuteParams };
}

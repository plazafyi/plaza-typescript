// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TopLevelAPI from './top-level';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Search extends APIResource {
  /**
   * Search OSM features by name
   */
  query(params: SearchQueryParams, options?: RequestOptions): APIPromise<TopLevelAPI.FeatureCollection> {
    const {
      q,
      cursor,
      format,
      limit,
      'output[fields]': outputFields,
      'output[include]': outputInclude,
      'output[precision]': outputPrecision,
      'output[sort]': outputSort,
    } = params;
    return this._client.post('/api/v1/search', {
      query: {
        q,
        cursor,
        format,
        limit,
        'output[fields]': outputFields,
        'output[include]': outputInclude,
        'output[precision]': outputPrecision,
        'output[sort]': outputSort,
      },
      ...options,
    });
  }
}

export interface SearchQueryParams {
  /**
   * Search query string
   */
  q: string;

  /**
   * Cursor for pagination
   */
  cursor?: string;

  /**
   * Response format: json (default), geojson, csv, ndjson
   */
  format?: string;

  /**
   * Maximum results (default 25, max 100)
   */
  limit?: number;

  /**
   * Comma-separated property fields to include
   */
  'output[fields]'?: string;

  /**
   * Extra computed fields: bbox, distance, center
   */
  'output[include]'?: string;

  /**
   * Coordinate decimal precision (1-15, default 7)
   */
  'output[precision]'?: number;

  /**
   * Sort by: distance, name, osm_id
   */
  'output[sort]'?: string;
}

export declare namespace Search {
  export { type SearchQueryParams as SearchQueryParams };
}

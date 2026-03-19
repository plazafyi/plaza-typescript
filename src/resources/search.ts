// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TopLevelAPI from './top-level';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Search extends APIResource {
  /**
   * Search OSM features by name
   */
  query(query: SearchQueryParams, options?: RequestOptions): APIPromise<TopLevelAPI.FeatureCollection> {
    return this._client.get('/api/v1/search', {
      query,
      ...options,
      headers: buildHeaders([{ Accept: 'application/geo+json' }, options?.headers]),
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
   * Maximum results (default 25, max 100)
   */
  limit?: number;
}

export declare namespace Search {
  export { type SearchQueryParams as SearchQueryParams };
}

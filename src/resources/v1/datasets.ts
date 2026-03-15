// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ElementsAPI from './elements';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Datasets extends APIResource {
  /**
   * Create a new dataset (admin only)
   */
  create(body: DatasetCreateParams, options?: RequestOptions): APIPromise<DatasetResponse> {
    return this._client.post('/api/v1/datasets', { body, ...options });
  }

  /**
   * Get dataset by ID
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<DatasetResponse> {
    return this._client.get(path`/api/v1/datasets/${id}`, options);
  }

  /**
   * List all datasets
   */
  list(options?: RequestOptions): APIPromise<DatasetListResponse> {
    return this._client.get('/api/v1/datasets', options);
  }

  /**
   * Delete a dataset
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/api/v1/datasets/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Query features in a dataset
   */
  queryFeatures(
    id: string,
    query: DatasetQueryFeaturesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FeatureCollection> {
    return this._client.get(path`/api/v1/datasets/${id}/features`, { query, ...options });
  }
}

export interface DatasetResponse {
  /**
   * Dataset ID
   */
  id: string;

  /**
   * Creation timestamp
   */
  inserted_at: string;

  /**
   * Dataset name
   */
  name: string;

  /**
   * URL-friendly slug
   */
  slug: string;

  /**
   * Last update timestamp
   */
  updated_at: string;

  /**
   * Attribution text
   */
  attribution?: string | null;

  /**
   * Dataset description
   */
  description?: string | null;

  /**
   * License identifier
   */
  license?: string | null;

  /**
   * Source data URL
   */
  source_url?: string | null;
}

export interface FeatureCollection {
  features: Array<ElementsAPI.GeoJsonFeature>;

  type: 'FeatureCollection';

  pagination?: FeatureCollection.Pagination;
}

export namespace FeatureCollection {
  export interface Pagination {
    /**
     * Whether more results exist
     */
    has_more?: boolean;

    /**
     * Requested result limit
     */
    limit?: number;

    /**
     * Cursor for next page
     */
    next_cursor?: string | null;

    /**
     * Offset for next page
     */
    next_offset?: number | null;
  }
}

export interface DatasetListResponse {
  datasets: Array<DatasetResponse>;
}

export interface DatasetCreateParams {
  /**
   * Dataset name
   */
  name: string;

  /**
   * URL-friendly slug
   */
  slug: string;

  /**
   * Attribution text
   */
  attribution?: string | null;

  /**
   * Dataset description
   */
  description?: string | null;

  /**
   * License identifier
   */
  license?: string | null;

  /**
   * Source data URL
   */
  source_url?: string | null;
}

export interface DatasetQueryFeaturesParams {
  /**
   * Cursor for pagination
   */
  cursor?: string;

  /**
   * Maximum results
   */
  limit?: number;
}

export declare namespace Datasets {
  export {
    type DatasetResponse as DatasetResponse,
    type FeatureCollection as FeatureCollection,
    type DatasetListResponse as DatasetListResponse,
    type DatasetCreateParams as DatasetCreateParams,
    type DatasetQueryFeaturesParams as DatasetQueryFeaturesParams,
  };
}

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TopLevelAPI from './top-level';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Datasets extends APIResource {
  /**
   * Create a new dataset (admin only)
   */
  create(body: DatasetCreateParams, options?: RequestOptions): APIPromise<Dataset> {
    return this._client.post('/api/v1/datasets', { body, ...options });
  }

  /**
   * Get dataset by ID
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Dataset> {
    return this._client.get(path`/api/v1/datasets/${id}`, options);
  }

  /**
   * List all datasets
   */
  list(options?: RequestOptions): APIPromise<DatasetList> {
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
  features(
    id: string,
    query: DatasetFeaturesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TopLevelAPI.FeatureCollection> {
    return this._client.get(path`/api/v1/datasets/${id}/features`, {
      query,
      ...options,
      headers: buildHeaders([{ Accept: 'application/geo+json' }, options?.headers]),
    });
  }
}

export interface Dataset {
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

export interface DatasetList {
  datasets: Array<Dataset>;
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

export interface DatasetFeaturesParams {
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
    type Dataset as Dataset,
    type DatasetList as DatasetList,
    type DatasetCreateParams as DatasetCreateParams,
    type DatasetFeaturesParams as DatasetFeaturesParams,
  };
}

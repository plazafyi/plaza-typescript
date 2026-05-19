// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Datasets extends APIResource {
  /**
   * Create a new dataset
   *
   * @example
   * ```ts
   * const dataset = await client.datasets.create({
   *   name: 'NYC Bike Lanes',
   *   slug: 'nyc-bike-lanes',
   * });
   * ```
   */
  create(body: DatasetCreateParams, options?: RequestOptions): APIPromise<Dataset> {
    return this._client.post('/api/v1/datasets', { body, ...options });
  }

  /**
   * Get dataset by ID
   *
   * @example
   * ```ts
   * const dataset = await client.datasets.retrieve('id');
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Dataset> {
    return this._client.get(path`/api/v1/datasets/${id}`, options);
  }

  /**
   * List datasets
   *
   * @example
   * ```ts
   * const datasetList = await client.datasets.list();
   * ```
   */
  list(query: DatasetListParams | null | undefined = {}, options?: RequestOptions): APIPromise<DatasetList> {
    return this._client.get('/api/v1/datasets', { query, ...options });
  }

  /**
   * Delete a dataset
   *
   * @example
   * ```ts
   * await client.datasets.delete('id');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/api/v1/datasets/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * Metadata for a custom dataset. Datasets contain user-uploaded geospatial
 * features separate from the OSM data.
 */
export interface Dataset {
  /**
   * Dataset UUID
   */
  id: string;

  /**
   * Creation timestamp (UTC)
   */
  inserted_at: string;

  /**
   * Human-readable dataset name
   */
  name: string;

  /**
   * Dataset scope: plaza (managed by Plaza) or user (user-owned)
   */
  scope: 'plaza' | 'user';

  /**
   * URL-friendly identifier
   */
  slug: string;

  /**
   * Current processing status
   */
  status: 'pending' | 'processing' | 'ready' | 'error';

  /**
   * Last update timestamp (UTC)
   */
  updated_at: string;

  /**
   * Number of addresses in this dataset
   */
  address_count?: number;

  /**
   * Required attribution text
   */
  attribution?: string | null;

  /**
   * Dataset description
   */
  description?: string | null;

  /**
   * Number of routing edges in this dataset
   */
  edge_count?: number;

  /**
   * Error message if status is 'error'
   */
  error_message?: string | null;

  /**
   * Number of features in this dataset
   */
  feature_count?: number;

  /**
   * License identifier (e.g. CC-BY-4.0)
   */
  license?: string | null;

  /**
   * Detected or user-defined property schema
   */
  schema_definition?: unknown | null;

  /**
   * Data format (geojson)
   */
  source_format?: string | null;

  /**
   * URL of the original data source
   */
  source_url?: string | null;

  /**
   * Total storage consumed in bytes
   */
  storage_bytes?: number;

  /**
   * Whether strict schema validation is enabled
   */
  strict_mode?: boolean;
}

/**
 * List of datasets visible to the authenticated user.
 */
export interface DatasetList {
  /**
   * Array of dataset metadata objects
   */
  datasets: Array<Dataset>;
}

export interface DatasetCreateParams {
  /**
   * Human-readable dataset name
   */
  name: string;

  /**
   * URL-friendly identifier (lowercase, hyphens, no spaces)
   */
  slug: string;

  /**
   * Required attribution text
   */
  attribution?: string | null;

  /**
   * Dataset description
   */
  description?: string | null;

  /**
   * License identifier (e.g. CC-BY-4.0)
   */
  license?: string | null;

  /**
   * Source data URL
   */
  source_url?: string | null;

  /**
   * Enable strict schema validation (default true)
   */
  strict_mode?: boolean | null;
}

export interface DatasetListParams {
  /**
   * Filter by scope: plaza, user. Default shows user's own + plaza datasets.
   */
  scope?: string;
}

export declare namespace Datasets {
  export {
    type Dataset as Dataset,
    type DatasetList as DatasetList,
    type DatasetCreateParams as DatasetCreateParams,
    type DatasetListParams as DatasetListParams,
  };
}

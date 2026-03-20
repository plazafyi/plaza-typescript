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
   * List all datasets
   *
   * @example
   * ```ts
   * const datasetList = await client.datasets.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<DatasetList> {
    return this._client.get('/api/v1/datasets', options);
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

  /**
   * Query features in a dataset
   *
   * @example
   * ```ts
   * const featureCollection = await client.datasets.features(
   *   'id',
   * );
   * ```
   */
  features(
    id: string,
    query: DatasetFeaturesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TopLevelAPI.FeatureCollection> {
    return this._client.get(path`/api/v1/datasets/${id}/features`, { query, ...options });
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
   * URL-friendly identifier
   */
  slug: string;

  /**
   * Last update timestamp (UTC)
   */
  updated_at: string;

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
   * URL of the original data source
   */
  source_url?: string | null;
}

/**
 * List of all available datasets.
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

  /**
   * Buffer geometry by meters
   */
  'output[buffer]'?: number;

  /**
   * Replace geometry with centroid
   */
  'output[centroid]'?: boolean;

  /**
   * Comma-separated property fields to include
   */
  'output[fields]'?: string;

  /**
   * Include geometry (default true)
   */
  'output[geometry]'?: boolean;

  /**
   * Extra computed fields: bbox, distance, center
   */
  'output[include]'?: string;

  /**
   * Coordinate decimal precision (1-15, default 7)
   */
  'output[precision]'?: number;

  /**
   * Simplify geometry tolerance in meters
   */
  'output[simplify]'?: number;

  /**
   * Sort by: distance, name, osm_id
   */
  'output[sort]'?: string;
}

export declare namespace Datasets {
  export {
    type Dataset as Dataset,
    type DatasetList as DatasetList,
    type DatasetCreateParams as DatasetCreateParams,
    type DatasetFeaturesParams as DatasetFeaturesParams,
  };
}

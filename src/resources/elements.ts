// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TopLevelAPI from './top-level';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Elements extends APIResource {
  /**
   * Get feature by type and ID
   */
  retrieve(
    id: number,
    params: ElementRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<TopLevelAPI.GeoJsonFeature> {
    const { type } = params;
    return this._client.get(path`/api/v1/features/${type}/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: 'application/geo+json' }, options?.headers]),
    });
  }

  /**
   * Fetch multiple features by type and ID
   */
  batch(body: ElementBatchParams, options?: RequestOptions): APIPromise<TopLevelAPI.FeatureCollection> {
    return this._client.post('/api/v1/features/batch', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: 'application/geo+json' }, options?.headers]),
    });
  }

  /**
   * Find features near a geographic point
   */
  nearby(query: ElementNearbyParams, options?: RequestOptions): APIPromise<TopLevelAPI.FeatureCollection> {
    return this._client.get('/api/v1/features/nearby', {
      query,
      ...options,
      headers: buildHeaders([{ Accept: 'application/geo+json' }, options?.headers]),
    });
  }

  /**
   * Query features by bounding box or H3 cell
   */
  query(
    query: ElementQueryParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TopLevelAPI.FeatureCollection> {
    return this._client.get('/api/v1/features', {
      query,
      ...options,
      headers: buildHeaders([{ Accept: 'application/geo+json' }, options?.headers]),
    });
  }
}

export interface BatchRequest {
  elements: Array<BatchRequest.Element>;
}

export namespace BatchRequest {
  export interface Element {
    id: number;

    type: 'node' | 'way' | 'relation';
  }
}

export interface ElementRetrieveParams {
  /**
   * Element type (node, way, relation)
   */
  type: string;
}

export interface ElementBatchParams {
  elements: Array<ElementBatchParams.Element>;
}

export namespace ElementBatchParams {
  export interface Element {
    id: number;

    type: 'node' | 'way' | 'relation';
  }
}

export interface ElementNearbyParams {
  /**
   * Latitude (-90 to 90)
   */
  lat: number;

  /**
   * Longitude (-180 to 180)
   */
  lng: number;

  /**
   * Maximum results (default 20, max 100)
   */
  limit?: number;

  /**
   * Search radius in meters (default 500, max 10000)
   */
  radius?: number;
}

export interface ElementQueryParams {
  /**
   * Bounding box: south,west,north,east. At least one of bbox or h3 is required.
   */
  bbox?: string;

  /**
   * Cursor for pagination
   */
  cursor?: string;

  /**
   * H3 cell index. At least one of bbox or h3 is required.
   */
  h3?: string;

  /**
   * Maximum results (default 100, max 10000)
   */
  limit?: number;

  /**
   * Element types (comma-separated: node,way,relation)
   */
  type?: string;
}

export declare namespace Elements {
  export {
    type BatchRequest as BatchRequest,
    type ElementRetrieveParams as ElementRetrieveParams,
    type ElementBatchParams as ElementBatchParams,
    type ElementNearbyParams as ElementNearbyParams,
    type ElementQueryParams as ElementQueryParams,
  };
}

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TopLevelAPI from './top-level';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Elements extends APIResource {
  /**
   * Get feature by type and ID
   *
   * @example
   * ```ts
   * const geoJsonFeature = await client.elements.retrieve(0, {
   *   type: 'type',
   * });
   * ```
   */
  retrieve(
    id: number,
    params: ElementRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<TopLevelAPI.GeoJsonFeature> {
    const { type } = params;
    return this._client.get(path`/api/v1/features/${type}/${id}`, options);
  }

  /**
   * Fetch multiple features by type and ID
   *
   * @example
   * ```ts
   * const featureCollection = await client.elements.batch({
   *   elements: [
   *     { id: 21154906, type: 'node' },
   *     { id: 4589123, type: 'way' },
   *   ],
   * });
   * ```
   */
  batch(body: ElementBatchParams, options?: RequestOptions): APIPromise<TopLevelAPI.FeatureCollection> {
    return this._client.post('/api/v1/features/batch', { body, ...options });
  }

  /**
   * Get feature by type and ID
   *
   * @example
   * ```ts
   * const geoJsonFeature = await client.elements.lookup();
   * ```
   */
  lookup(options?: RequestOptions): APIPromise<TopLevelAPI.GeoJsonFeature> {
    return this._client.post('/api/v1/features/lookup', options);
  }

  /**
   * Find features near a geographic point
   *
   * @example
   * ```ts
   * const featureCollection = await client.elements.nearby();
   * ```
   */
  nearby(
    query: ElementNearbyParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TopLevelAPI.FeatureCollection> {
    return this._client.get('/api/v1/features/nearby', { query, ...options });
  }

  /**
   * Find features near a geographic point
   *
   * @example
   * ```ts
   * const featureCollection =
   *   await client.elements.nearbyPost();
   * ```
   */
  nearbyPost(
    params: ElementNearbyPostParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TopLevelAPI.FeatureCollection> {
    const {
      lat,
      limit,
      lng,
      near,
      'output[buffer]': outputBuffer,
      'output[centroid]': outputCentroid,
      'output[fields]': outputFields,
      'output[geometry]': outputGeometry,
      'output[include]': outputInclude,
      'output[precision]': outputPrecision,
      'output[simplify]': outputSimplify,
      'output[sort]': outputSort,
      radius,
    } = params ?? {};
    return this._client.post('/api/v1/features/nearby', {
      query: {
        lat,
        limit,
        lng,
        near,
        'output[buffer]': outputBuffer,
        'output[centroid]': outputCentroid,
        'output[fields]': outputFields,
        'output[geometry]': outputGeometry,
        'output[include]': outputInclude,
        'output[precision]': outputPrecision,
        'output[simplify]': outputSimplify,
        'output[sort]': outputSort,
        radius,
      },
      ...options,
    });
  }

  /**
   * Query features by spatial predicate, bounding box, or H3 cell
   *
   * @example
   * ```ts
   * const featureCollection = await client.elements.query();
   * ```
   */
  query(
    query: ElementQueryParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TopLevelAPI.FeatureCollection> {
    return this._client.get('/api/v1/features', { query, ...options });
  }

  /**
   * Query features by spatial predicate, bounding box, or H3 cell
   *
   * @example
   * ```ts
   * const featureCollection = await client.elements.queryPost();
   * ```
   */
  queryPost(
    params: ElementQueryPostParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TopLevelAPI.FeatureCollection> {
    const {
      bbox,
      contains,
      crosses,
      cursor,
      h3,
      intersects,
      limit,
      near,
      'output[buffer]': outputBuffer,
      'output[centroid]': outputCentroid,
      'output[fields]': outputFields,
      'output[geometry]': outputGeometry,
      'output[include]': outputInclude,
      'output[precision]': outputPrecision,
      'output[simplify]': outputSimplify,
      'output[sort]': outputSort,
      radius,
      touches,
      type,
      within,
    } = params ?? {};
    return this._client.post('/api/v1/features', {
      query: {
        bbox,
        contains,
        crosses,
        cursor,
        h3,
        intersects,
        limit,
        near,
        'output[buffer]': outputBuffer,
        'output[centroid]': outputCentroid,
        'output[fields]': outputFields,
        'output[geometry]': outputGeometry,
        'output[include]': outputInclude,
        'output[precision]': outputPrecision,
        'output[simplify]': outputSimplify,
        'output[sort]': outputSort,
        radius,
        touches,
        type,
        within,
      },
      ...options,
    });
  }
}

/**
 * Fetch multiple OSM elements by their type and ID in a single request. Maximum
 * 100 elements per batch.
 */
export interface BatchRequest {
  /**
   * Array of element references to fetch
   */
  elements: Array<BatchRequest.Element>;
}

export namespace BatchRequest {
  /**
   * Reference to a single OSM element
   */
  export interface Element {
    /**
     * OSM element ID
     */
    id: number;

    /**
     * OSM element type
     */
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
  /**
   * Array of element references to fetch
   */
  elements: Array<ElementBatchParams.Element>;
}

export namespace ElementBatchParams {
  /**
   * Reference to a single OSM element
   */
  export interface Element {
    /**
     * OSM element ID
     */
    id: number;

    /**
     * OSM element type
     */
    type: 'node' | 'way' | 'relation';
  }
}

export interface ElementNearbyParams {
  /**
   * Legacy shorthand. Latitude (-90 to 90). Use near param instead.
   */
  lat?: number;

  /**
   * Maximum results (default 20, max 100)
   */
  limit?: number;

  /**
   * Legacy shorthand. Longitude (-180 to 180). Use near param instead.
   */
  lng?: number;

  /**
   * Point geometry for proximity search (lat,lng or GeoJSON). Alternative to lat/lng
   * params.
   */
  near?: string;

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

  /**
   * Search radius in meters (default 500, max 10000)
   */
  radius?: number;
}

export interface ElementNearbyPostParams {
  /**
   * Legacy shorthand. Latitude (-90 to 90). Use near param instead.
   */
  lat?: number;

  /**
   * Maximum results (default 20, max 100)
   */
  limit?: number;

  /**
   * Legacy shorthand. Longitude (-180 to 180). Use near param instead.
   */
  lng?: number;

  /**
   * Point geometry for proximity search (lat,lng or GeoJSON). Alternative to lat/lng
   * params.
   */
  near?: string;

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

  /**
   * Search radius in meters (default 500, max 10000)
   */
  radius?: number;
}

export interface ElementQueryParams {
  /**
   * Legacy shorthand. Bounding box: south,west,north,east. Use spatial predicates
   * (near, within, intersects) instead.
   */
  bbox?: string;

  /**
   * Geometry that features must contain
   */
  contains?: string;

  /**
   * Geometry that features must cross
   */
  crosses?: string;

  /**
   * Cursor for pagination
   */
  cursor?: string;

  /**
   * Legacy shorthand. H3 cell index. Use spatial predicates instead.
   */
  h3?: string;

  /**
   * Geometry that features must intersect
   */
  intersects?: string;

  /**
   * Maximum results (default 100, max 10000)
   */
  limit?: number;

  /**
   * Point geometry for proximity search (lat,lng). Requires radius.
   */
  near?: string;

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

  /**
   * Search radius in meters (for near) or buffer distance (for other predicates)
   */
  radius?: number;

  /**
   * Geometry that features must touch
   */
  touches?: string;

  /**
   * Element types (comma-separated: node,way,relation)
   */
  type?: string;

  /**
   * Geometry that features must be within
   */
  within?: string;
}

export interface ElementQueryPostParams {
  /**
   * Legacy shorthand. Bounding box: south,west,north,east. Use spatial predicates
   * (near, within, intersects) instead.
   */
  bbox?: string;

  /**
   * Geometry that features must contain
   */
  contains?: string;

  /**
   * Geometry that features must cross
   */
  crosses?: string;

  /**
   * Cursor for pagination
   */
  cursor?: string;

  /**
   * Legacy shorthand. H3 cell index. Use spatial predicates instead.
   */
  h3?: string;

  /**
   * Geometry that features must intersect
   */
  intersects?: string;

  /**
   * Maximum results (default 100, max 10000)
   */
  limit?: number;

  /**
   * Point geometry for proximity search (lat,lng). Requires radius.
   */
  near?: string;

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

  /**
   * Search radius in meters (for near) or buffer distance (for other predicates)
   */
  radius?: number;

  /**
   * Geometry that features must touch
   */
  touches?: string;

  /**
   * Element types (comma-separated: node,way,relation)
   */
  type?: string;

  /**
   * Geometry that features must be within
   */
  within?: string;
}

export declare namespace Elements {
  export {
    type BatchRequest as BatchRequest,
    type ElementRetrieveParams as ElementRetrieveParams,
    type ElementBatchParams as ElementBatchParams,
    type ElementNearbyParams as ElementNearbyParams,
    type ElementNearbyPostParams as ElementNearbyPostParams,
    type ElementQueryParams as ElementQueryParams,
    type ElementQueryPostParams as ElementQueryPostParams,
  };
}

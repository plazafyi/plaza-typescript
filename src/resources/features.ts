// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TopLevelAPI from './top-level';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Features extends APIResource {
  /**
   * Get feature by type and ID
   *
   * @example
   * ```ts
   * const geoJsonFeature = await client.features.retrieve(0, {
   *   type: 'type',
   * });
   * ```
   */
  retrieve(
    id: number,
    params: FeatureRetrieveParams,
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
   * const featureCollection = await client.features.batch({
   *   elements: [
   *     { id: 21154906, type: 'node' },
   *     { id: 4589123, type: 'way' },
   *   ],
   * });
   * ```
   */
  batch(body: FeatureBatchParams, options?: RequestOptions): APIPromise<TopLevelAPI.FeatureCollection> {
    return this._client.post('/api/v1/features/batch', { body, ...options });
  }

  /**
   * Query features by spatial predicate, bounding box, or H3 cell
   *
   * @example
   * ```ts
   * const featureCollection = await client.features.query();
   * ```
   */
  query(
    params: FeatureQueryParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TopLevelAPI.FeatureCollection> {
    const { cursor, format, h3, limit, type, ...body } = params ?? {};
    return this._client.post('/api/v1/features', {
      query: { cursor, format, h3, limit, type },
      body,
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

/**
 * Spatial predicates for filtering features by geographic relationship. Predicates
 * are mutually exclusive — use exactly one per request. The parameter name is the
 * spatial operation, the value is a GeoJSON geometry to test against.
 *
 * | Predicate        | Meaning                                    |
 * | ---------------- | ------------------------------------------ |
 * | `around`         | Within radius meters (requires `radius`)   |
 * | `intersects`     | Feature overlaps the input geometry        |
 * | `within`         | Feature is fully inside the input geometry |
 * | `contains`       | Feature fully contains the input geometry  |
 * | `crosses`        | Feature crosses the input geometry         |
 * | `touches`        | Feature shares boundary but not interior   |
 * | `not_intersects` | Feature does not overlap                   |
 * | `not_within`     | Feature is not fully inside                |
 * | `not_contains`   | Feature does not fully contain             |
 */
export interface SpatialPredicate {
  /**
   * GeoJSON Geometry object per RFC 7946. Discriminated union — the `type` field
   * determines the coordinate structure.
   */
  around?: TopLevelAPI.Geometry;

  /**
   * GeoJSON Geometry object per RFC 7946. Discriminated union — the `type` field
   * determines the coordinate structure.
   */
  contains?: TopLevelAPI.Geometry;

  /**
   * GeoJSON Geometry object per RFC 7946. Discriminated union — the `type` field
   * determines the coordinate structure.
   */
  crosses?: TopLevelAPI.Geometry;

  /**
   * GeoJSON Geometry object per RFC 7946. Discriminated union — the `type` field
   * determines the coordinate structure.
   */
  intersects?: TopLevelAPI.Geometry;

  /**
   * GeoJSON Geometry object per RFC 7946. Discriminated union — the `type` field
   * determines the coordinate structure.
   */
  not_contains?: TopLevelAPI.Geometry;

  /**
   * GeoJSON Geometry object per RFC 7946. Discriminated union — the `type` field
   * determines the coordinate structure.
   */
  not_intersects?: TopLevelAPI.Geometry;

  /**
   * GeoJSON Geometry object per RFC 7946. Discriminated union — the `type` field
   * determines the coordinate structure.
   */
  not_within?: TopLevelAPI.Geometry;

  /**
   * Search radius in meters. Required for `around`, optional buffer for other
   * predicates.
   */
  radius?: number;

  /**
   * GeoJSON Geometry object per RFC 7946. Discriminated union — the `type` field
   * determines the coordinate structure.
   */
  touches?: TopLevelAPI.Geometry;

  /**
   * GeoJSON Geometry object per RFC 7946. Discriminated union — the `type` field
   * determines the coordinate structure.
   */
  within?: TopLevelAPI.Geometry;
}

export interface FeatureRetrieveParams {
  /**
   * Element type (node, way, relation)
   */
  type: string;
}

export interface FeatureBatchParams {
  /**
   * Array of element references to fetch
   */
  elements: Array<FeatureBatchParams.Element>;
}

export namespace FeatureBatchParams {
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

export interface FeatureQueryParams {
  /**
   * Query param: Cursor for pagination
   */
  cursor?: string;

  /**
   * Query param: Response format. json (default) returns paginated GeoJSON.
   * geojson/csv/ndjson stream via chunked transfer encoding.
   */
  format?: string;

  /**
   * Query param: Legacy shorthand. H3 cell index. Use spatial predicates instead.
   */
  h3?: string;

  /**
   * Query param: Maximum results (default 100, max 10000)
   */
  limit?: number;

  /**
   * Query param: Element types (comma-separated: node,way,relation)
   */
  type?: string;

  /**
   * Body param: GeoJSON Geometry object per RFC 7946. Discriminated union — the
   * `type` field determines the coordinate structure.
   */
  around?: TopLevelAPI.Geometry;

  /**
   * Body param: GeoJSON Geometry object per RFC 7946. Discriminated union — the
   * `type` field determines the coordinate structure.
   */
  contains?: TopLevelAPI.Geometry;

  /**
   * Body param: GeoJSON Geometry object per RFC 7946. Discriminated union — the
   * `type` field determines the coordinate structure.
   */
  crosses?: TopLevelAPI.Geometry;

  /**
   * Body param: GeoJSON Geometry object per RFC 7946. Discriminated union — the
   * `type` field determines the coordinate structure.
   */
  intersects?: TopLevelAPI.Geometry;

  /**
   * Body param: GeoJSON Geometry object per RFC 7946. Discriminated union — the
   * `type` field determines the coordinate structure.
   */
  not_contains?: TopLevelAPI.Geometry;

  /**
   * Body param: GeoJSON Geometry object per RFC 7946. Discriminated union — the
   * `type` field determines the coordinate structure.
   */
  not_intersects?: TopLevelAPI.Geometry;

  /**
   * Body param: GeoJSON Geometry object per RFC 7946. Discriminated union — the
   * `type` field determines the coordinate structure.
   */
  not_within?: TopLevelAPI.Geometry;

  /**
   * Body param: Search radius in meters. Required for `around`, optional buffer for
   * other predicates.
   */
  radius?: number;

  /**
   * Body param: GeoJSON Geometry object per RFC 7946. Discriminated union — the
   * `type` field determines the coordinate structure.
   */
  touches?: TopLevelAPI.Geometry;

  /**
   * Body param: GeoJSON Geometry object per RFC 7946. Discriminated union — the
   * `type` field determines the coordinate structure.
   */
  within?: TopLevelAPI.Geometry;
}

export declare namespace Features {
  export {
    type BatchRequest as BatchRequest,
    type SpatialPredicate as SpatialPredicate,
    type FeatureRetrieveParams as FeatureRetrieveParams,
    type FeatureBatchParams as FeatureBatchParams,
    type FeatureQueryParams as FeatureQueryParams,
  };
}

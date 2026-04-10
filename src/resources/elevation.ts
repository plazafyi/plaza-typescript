// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TopLevelAPI from './top-level';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Elevation extends APIResource {
  /**
   * Look up elevation at one or more points
   *
   * @example
   * ```ts
   * const elevationLookupResult = await client.elevation.lookup(
   *   {
   *     geometry: {
   *       coordinates: [2.3522, 48.8566],
   *       type: 'Point',
   *     },
   *   },
   * );
   * ```
   */
  lookup(params: ElevationLookupParams, options?: RequestOptions): APIPromise<ElevationLookupResult> {
    const { format, ...body } = params;
    return this._client.post('/api/v1/elevation', { query: { format }, body, ...options });
  }

  /**
   * Elevation profile along coordinates
   *
   * @example
   * ```ts
   * const elevationProfileResult =
   *   await client.elevation.profile({
   *     geometry: {
   *       coordinates: [
   *         [2.3522, 48.8566],
   *         [2.34, 48.858],
   *         [2.2945, 48.8584],
   *       ],
   *       type: 'LineString',
   *     },
   *   });
   * ```
   */
  profile(body: ElevationProfileParams, options?: RequestOptions): APIPromise<ElevationProfileResult> {
    return this._client.post('/api/v1/elevation/profile', { body, ...options });
  }
}

/**
 * Request body for elevation lookup. Accepts a single Point or a MultiPoint
 * geometry.
 */
export interface ElevationLookupRequest {
  /**
   * Point or MultiPoint geometry to look up elevations for
   */
  geometry: TopLevelAPI.PointGeometry | TopLevelAPI.MultiPointGeometry;
}

/**
 * GeoJSON Point Feature with a 3D coordinate [lng, lat, elevation] per RFC 7946
 * §3.1.1. The elevation is also available in `properties.elevation_m` for
 * convenience.
 */
export interface ElevationLookupResult {
  /**
   * GeoJSON Geometry object per RFC 7946. Discriminated union — the `type` field
   * determines the coordinate structure.
   */
  geometry: TopLevelAPI.Geometry;

  properties: ElevationLookupResult.Properties;

  type: 'Feature';
}

export namespace ElevationLookupResult {
  export interface Properties {
    /**
     * Elevation in meters above mean sea level (WGS84 EGM96 geoid)
     */
    elevation_m: number;
  }
}

/**
 * Request body for elevation profile along a path. Provide a GeoJSON LineString
 * geometry defining the path.
 */
export interface ElevationProfileRequest {
  /**
   * GeoJSON LineString geometry per RFC 7946. An ordered sequence of two or more
   * positions.
   */
  geometry: TopLevelAPI.LineStringGeometry;
}

/**
 * GeoJSON LineString Feature with 3D coordinates [lng, lat, elevation]
 * representing the elevation profile along the input path. Summary statistics are
 * in properties.
 */
export interface ElevationProfileResult {
  /**
   * GeoJSON Geometry object per RFC 7946. Discriminated union — the `type` field
   * determines the coordinate structure.
   */
  geometry: TopLevelAPI.Geometry;

  /**
   * Elevation profile summary statistics
   */
  properties: ElevationProfileResult.Properties;

  type: 'Feature';
}

export namespace ElevationProfileResult {
  /**
   * Elevation profile summary statistics
   */
  export interface Properties {
    /**
     * Average elevation along the profile in meters
     */
    avg_elevation_m: number;

    /**
     * Maximum elevation along the profile in meters
     */
    max_elevation_m: number;

    /**
     * Minimum elevation along the profile in meters
     */
    min_elevation_m: number;

    /**
     * Total cumulative elevation gain in meters
     */
    total_ascent_m: number;

    /**
     * Total cumulative elevation loss in meters
     */
    total_descent_m: number;
  }
}

export interface ElevationLookupParams {
  /**
   * Body param: Point or MultiPoint geometry to look up elevations for
   */
  geometry: TopLevelAPI.PointGeometry | TopLevelAPI.MultiPointGeometry;

  /**
   * Query param: Response format: json (default), geojson, csv, ndjson
   */
  format?: string;
}

export interface ElevationProfileParams {
  /**
   * GeoJSON LineString geometry per RFC 7946. An ordered sequence of two or more
   * positions.
   */
  geometry: TopLevelAPI.LineStringGeometry;
}

export declare namespace Elevation {
  export {
    type ElevationLookupRequest as ElevationLookupRequest,
    type ElevationLookupResult as ElevationLookupResult,
    type ElevationProfileRequest as ElevationProfileRequest,
    type ElevationProfileResult as ElevationProfileResult,
    type ElevationLookupParams as ElevationLookupParams,
    type ElevationProfileParams as ElevationProfileParams,
  };
}

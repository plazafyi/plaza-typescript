// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TopLevelAPI from './top-level';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Elevation extends APIResource {
  /**
   * Look up elevation for multiple coordinates
   *
   * @example
   * ```ts
   * const elevationBatchResult = await client.elevation.batch({
   *   coordinates: [
   *     { lat: 48.8566, lng: 2.3522 },
   *     { lat: 45.764, lng: 4.8357 },
   *   ],
   * });
   * ```
   */
  batch(body: ElevationBatchParams, options?: RequestOptions): APIPromise<ElevationBatchResult> {
    return this._client.post('/api/v1/elevation/batch', { body, ...options });
  }

  /**
   * Look up elevation at one or more points
   *
   * @example
   * ```ts
   * const elevationLookupResult =
   *   await client.elevation.lookup();
   * ```
   */
  lookup(
    query: ElevationLookupParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ElevationLookupResult> {
    return this._client.get('/api/v1/elevation', { query, ...options });
  }

  /**
   * Look up elevation at one or more points
   *
   * @example
   * ```ts
   * const elevationLookupResult =
   *   await client.elevation.lookupPost();
   * ```
   */
  lookupPost(
    params: ElevationLookupPostParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ElevationLookupResult> {
    const {
      lat,
      lng,
      locations,
      'output[fields]': outputFields,
      'output[include]': outputInclude,
      'output[precision]': outputPrecision,
    } = params ?? {};
    return this._client.post('/api/v1/elevation', {
      query: {
        lat,
        lng,
        locations,
        'output[fields]': outputFields,
        'output[include]': outputInclude,
        'output[precision]': outputPrecision,
      },
      ...options,
    });
  }

  /**
   * Elevation profile along coordinates
   *
   * @example
   * ```ts
   * const elevationProfileResult =
   *   await client.elevation.profile({
   *     coordinates: [
   *       { lat: 48.8566, lng: 2.3522 },
   *       { lat: 48.858, lng: 2.34 },
   *       { lat: 48.8584, lng: 2.2945 },
   *     ],
   *   });
   * ```
   */
  profile(body: ElevationProfileParams, options?: RequestOptions): APIPromise<ElevationProfileResult> {
    return this._client.post('/api/v1/elevation/profile', { body, ...options });
  }
}

/**
 * GeoJSON FeatureCollection of elevation Point Features with 3D coordinates. Order
 * matches the input coordinates array.
 */
export interface ElevationBatchResult {
  /**
   * Elevation results in the same order as input coordinates
   */
  features: Array<ElevationLookupResult>;

  type: 'FeatureCollection';
}

/**
 * GeoJSON Point Feature with a 3D coordinate [lng, lat, elevation] per RFC 7946
 * §3.1.1. The elevation is also available in `properties.elevation_m` for
 * convenience.
 */
export interface ElevationLookupResult {
  /**
   * GeoJSON Geometry object per RFC 7946. Coordinates use [longitude, latitude]
   * order. 3D coordinates [lng, lat, elevation] are used for elevation endpoints.
   */
  geometry: TopLevelAPI.GeoJsonGeometry;

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
 * Request body for elevation profile along a path. Provide at least 2 coordinates
 * defining the path. Maximum 50 coordinates per request.
 */
export interface ElevationProfileRequest {
  /**
   * Path coordinates in order of travel (min 2, max 50)
   */
  coordinates: Array<ElevationProfileRequest.Coordinate>;
}

export namespace ElevationProfileRequest {
  /**
   * Geographic coordinate as a JSON object with `lat` and `lng` fields.
   */
  export interface Coordinate {
    /**
     * Latitude in decimal degrees (-90 to 90)
     */
    lat: number;

    /**
     * Longitude in decimal degrees (-180 to 180)
     */
    lng: number;
  }
}

/**
 * GeoJSON LineString Feature with 3D coordinates [lng, lat, elevation]
 * representing the elevation profile along the input path. Summary statistics are
 * in properties.
 */
export interface ElevationProfileResult {
  /**
   * GeoJSON Geometry object per RFC 7946. Coordinates use [longitude, latitude]
   * order. 3D coordinates [lng, lat, elevation] are used for elevation endpoints.
   */
  geometry: TopLevelAPI.GeoJsonGeometry;

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

export interface ElevationBatchParams {
  /**
   * Coordinates to look up elevations for (max 50)
   */
  coordinates: Array<ElevationBatchParams.Coordinate>;
}

export namespace ElevationBatchParams {
  /**
   * Geographic coordinate as a JSON object with `lat` and `lng` fields.
   */
  export interface Coordinate {
    /**
     * Latitude in decimal degrees (-90 to 90)
     */
    lat: number;

    /**
     * Longitude in decimal degrees (-180 to 180)
     */
    lng: number;
  }
}

export interface ElevationLookupParams {
  /**
   * Latitude (single point)
   */
  lat?: number;

  /**
   * Longitude (single point)
   */
  lng?: number;

  /**
   * Pipe-separated lng,lat pairs (batch)
   */
  locations?: string;

  /**
   * Comma-separated property fields to include
   */
  'output[fields]'?: string;

  /**
   * Extra computed fields: bbox, center
   */
  'output[include]'?: string;

  /**
   * Coordinate decimal precision (1-15, default 7)
   */
  'output[precision]'?: number;
}

export interface ElevationLookupPostParams {
  /**
   * Latitude (single point)
   */
  lat?: number;

  /**
   * Longitude (single point)
   */
  lng?: number;

  /**
   * Pipe-separated lng,lat pairs (batch)
   */
  locations?: string;

  /**
   * Comma-separated property fields to include
   */
  'output[fields]'?: string;

  /**
   * Extra computed fields: bbox, center
   */
  'output[include]'?: string;

  /**
   * Coordinate decimal precision (1-15, default 7)
   */
  'output[precision]'?: number;
}

export interface ElevationProfileParams {
  /**
   * Path coordinates in order of travel (min 2, max 50)
   */
  coordinates: Array<ElevationProfileParams.Coordinate>;
}

export namespace ElevationProfileParams {
  /**
   * Geographic coordinate as a JSON object with `lat` and `lng` fields.
   */
  export interface Coordinate {
    /**
     * Latitude in decimal degrees (-90 to 90)
     */
    lat: number;

    /**
     * Longitude in decimal degrees (-180 to 180)
     */
    lng: number;
  }
}

export declare namespace Elevation {
  export {
    type ElevationBatchResult as ElevationBatchResult,
    type ElevationLookupResult as ElevationLookupResult,
    type ElevationProfileRequest as ElevationProfileRequest,
    type ElevationProfileResult as ElevationProfileResult,
    type ElevationBatchParams as ElevationBatchParams,
    type ElevationLookupParams as ElevationLookupParams,
    type ElevationLookupPostParams as ElevationLookupPostParams,
    type ElevationProfileParams as ElevationProfileParams,
  };
}

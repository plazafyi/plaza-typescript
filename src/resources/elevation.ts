// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TopLevelAPI from './top-level';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Elevation extends APIResource {
  /**
   * Look up elevation for multiple coordinates
   */
  batch(body: ElevationBatchParams, options?: RequestOptions): APIPromise<ElevationBatchResult> {
    return this._client.post('/api/v1/elevation/batch', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: 'application/geo+json' }, options?.headers]),
    });
  }

  /**
   * Look up elevation at one or more points
   */
  lookup(
    query: ElevationLookupParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ElevationLookupResult> {
    return this._client.get('/api/v1/elevation', {
      query,
      ...options,
      headers: buildHeaders([{ Accept: 'application/geo+json' }, options?.headers]),
    });
  }

  /**
   * Elevation profile along coordinates
   */
  profile(body: ElevationProfileParams, options?: RequestOptions): APIPromise<ElevationProfileResult> {
    return this._client.post('/api/v1/elevation/profile', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: 'application/geo+json' }, options?.headers]),
    });
  }
}

/**
 * GeoJSON FeatureCollection of elevation Point Features with 3D coordinates
 */
export interface ElevationBatchResult {
  /**
   * Elevation Point Features for each queried point
   */
  features: Array<ElevationLookupResult>;

  type: 'FeatureCollection';
}

/**
 * GeoJSON Point Feature with 3D coordinate [lng, lat, elevation] (RFC 7946 §3.1.1)
 */
export interface ElevationLookupResult {
  geometry: TopLevelAPI.GeoJsonGeometry;

  properties: ElevationLookupResult.Properties;

  type: 'Feature';
}

export namespace ElevationLookupResult {
  export interface Properties {
    /**
     * Elevation in meters above mean sea level
     */
    elevation_m?: number;
  }
}

/**
 * Request body for elevation profile
 */
export interface ElevationProfileRequest {
  /**
   * Path to profile (GeoJSON LineString geometry, minimum 2 points)
   */
  geometry: TopLevelAPI.GeoJsonGeometry;
}

/**
 * GeoJSON LineString Feature with 3D coordinates representing an elevation profile
 */
export interface ElevationProfileResult {
  geometry: TopLevelAPI.GeoJsonGeometry;

  properties: ElevationProfileResult.Properties;

  type: 'Feature';
}

export namespace ElevationProfileResult {
  export interface Properties {
    /**
     * Average elevation along profile
     */
    avg_elevation_m?: number;

    /**
     * Maximum elevation along profile
     */
    max_elevation_m?: number;

    /**
     * Minimum elevation along profile
     */
    min_elevation_m?: number;

    /**
     * Total elevation gain in meters
     */
    total_ascent_m?: number;

    /**
     * Total elevation loss in meters
     */
    total_descent_m?: number;
  }
}

export interface ElevationBatchParams {
  /**
   * Path to profile (GeoJSON LineString geometry, minimum 2 points)
   */
  geometry: TopLevelAPI.GeoJsonGeometry;
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
}

export interface ElevationProfileParams {
  /**
   * Path to profile (GeoJSON LineString geometry, minimum 2 points)
   */
  geometry: TopLevelAPI.GeoJsonGeometry;
}

export declare namespace Elevation {
  export {
    type ElevationBatchResult as ElevationBatchResult,
    type ElevationLookupResult as ElevationLookupResult,
    type ElevationProfileRequest as ElevationProfileRequest,
    type ElevationProfileResult as ElevationProfileResult,
    type ElevationBatchParams as ElevationBatchParams,
    type ElevationLookupParams as ElevationLookupParams,
    type ElevationProfileParams as ElevationProfileParams,
  };
}

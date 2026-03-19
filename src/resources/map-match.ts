// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TopLevelAPI from './top-level';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class MapMatch extends APIResource {
  /**
   * Match GPS coordinates to the road network
   */
  match(body: MapMatchMatchParams, options?: RequestOptions): APIPromise<MapMatchResult> {
    return this._client.post('/api/v1/map-match', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: 'application/geo+json' }, options?.headers]),
    });
  }
}

/**
 * GPS trace to match against the road network
 */
export interface MapMatchRequest {
  /**
   * GPS trace (GeoJSON LineString geometry)
   */
  trace: TopLevelAPI.GeoJsonGeometry;

  /**
   * Search radius per coordinate in meters (optional, default 50)
   */
  radiuses?: Array<number> | null;
}

/**
 * Map matching result with snapped geometry
 */
export interface MapMatchResult {
  geometry: TopLevelAPI.GeoJsonGeometry;

  properties: MapMatchResult.Properties;

  type: 'Feature';

  /**
   * Matched route legs between consecutive trace points
   */
  legs?: Array<{ [key: string]: unknown }>;
}

export namespace MapMatchResult {
  export interface Properties {
    /**
     * Match confidence score
     */
    confidence?: number;

    /**
     * Total matched distance in meters
     */
    distance?: number;

    /**
     * Estimated duration in seconds
     */
    duration?: number;
  }
}

export interface MapMatchMatchParams {
  /**
   * GPS trace (GeoJSON LineString geometry)
   */
  trace: TopLevelAPI.GeoJsonGeometry;

  /**
   * Search radius per coordinate in meters (optional, default 50)
   */
  radiuses?: Array<number> | null;
}

export declare namespace MapMatch {
  export {
    type MapMatchRequest as MapMatchRequest,
    type MapMatchResult as MapMatchResult,
    type MapMatchMatchParams as MapMatchMatchParams,
  };
}

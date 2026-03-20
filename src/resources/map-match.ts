// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TopLevelAPI from './top-level';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class MapMatch extends APIResource {
  /**
   * Match GPS coordinates to the road network
   *
   * @example
   * ```ts
   * const mapMatchResult = await client.mapMatch.match({
   *   coordinates: [
   *     { lat: 48.8566, lng: 2.3522 },
   *     { lat: 48.857, lng: 2.353 },
   *     { lat: 48.8575, lng: 2.354 },
   *   ],
   * });
   * ```
   */
  match(body: MapMatchMatchParams, options?: RequestOptions): APIPromise<MapMatchResult> {
    return this._client.post('/api/v1/map-match', { body, ...options });
  }
}

/**
 * GPS trace to snap to the road network. Provide an array of coordinate objects
 * representing the GPS points. Maximum 50 points per request.
 */
export interface MapMatchRequest {
  /**
   * GPS coordinates to match, in order of travel (max 50 points)
   */
  coordinates: Array<MapMatchRequest.Coordinate>;

  /**
   * Search radius per coordinate in meters. Must have the same length as
   * `coordinates` or be omitted entirely. Default: 50m per point.
   */
  radiuses?: Array<number> | null;
}

export namespace MapMatchRequest {
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
 * Map matching result as a GeoJSON FeatureCollection. Each Feature is a snapped
 * tracepoint. The top-level `matchings` array contains the matched sub-routes
 * connecting consecutive tracepoints.
 */
export interface MapMatchResult {
  /**
   * Snapped tracepoint Features in input order
   */
  features: Array<MapMatchResult.Feature>;

  /**
   * Matched sub-routes. Each matching connects a contiguous sequence of tracepoints
   * that could be matched to roads.
   */
  matchings: Array<{ [key: string]: unknown }>;

  type: 'FeatureCollection';
}

export namespace MapMatchResult {
  /**
   * GeoJSON Point Feature representing a GPS point snapped to the road network.
   */
  export interface Feature {
    /**
     * GeoJSON Geometry object per RFC 7946. Coordinates use [longitude, latitude]
     * order. 3D coordinates [lng, lat, elevation] are used for elevation endpoints.
     */
    geometry: TopLevelAPI.GeoJsonGeometry;

    properties: Feature.Properties;

    type: 'Feature';
  }

  export namespace Feature {
    export interface Properties {
      /**
       * Distance from the original GPS point to the snapped point in meters
       */
      distance_m?: number;

      /**
       * Road edge ID the point was snapped to
       */
      edge_id?: number;

      /**
       * Index into the `matchings` array indicating which matching sub-route this point
       * belongs to
       */
      matchings_index?: number;

      /**
       * Road name at the snapped point
       */
      name?: string | null;

      /**
       * Original GPS coordinate as [lng, lat]
       */
      original?: Array<number>;

      /**
       * Index of this tracepoint in the original `coordinates` array
       */
      waypoint_index?: number;
    }
  }
}

export interface MapMatchMatchParams {
  /**
   * GPS coordinates to match, in order of travel (max 50 points)
   */
  coordinates: Array<MapMatchMatchParams.Coordinate>;

  /**
   * Search radius per coordinate in meters. Must have the same length as
   * `coordinates` or be omitted entirely. Default: 50m per point.
   */
  radiuses?: Array<number> | null;
}

export namespace MapMatchMatchParams {
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

export declare namespace MapMatch {
  export {
    type MapMatchRequest as MapMatchRequest,
    type MapMatchResult as MapMatchResult,
    type MapMatchMatchParams as MapMatchMatchParams,
  };
}

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
   *   geometry: {
   *     coordinates: [
   *       [2.3522, 48.8566],
   *       [2.353, 48.857],
   *       [2.354, 48.8575],
   *     ],
   *     type: 'LineString',
   *   },
   * });
   * ```
   */
  match(body: MapMatchMatchParams, options?: RequestOptions): APIPromise<MapMatchResult> {
    return this._client.post('/api/v1/map-match', { body, ...options });
  }
}

/**
 * GPS trace to snap to the road network. Provide a GeoJSON LineString geometry
 * representing the GPS trace.
 */
export interface MapMatchRequest {
  /**
   * GeoJSON LineString geometry per RFC 7946. An ordered sequence of two or more
   * positions.
   */
  geometry: TopLevelAPI.LineStringGeometry;

  /**
   * Search radius per coordinate in meters. Must have the same length as the
   * geometry coordinates or be omitted entirely. Default: 50m per point.
   */
  radiuses?: Array<number> | null;
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
     * GeoJSON Geometry object per RFC 7946. Discriminated union — the `type` field
     * determines the coordinate structure.
     */
    geometry: TopLevelAPI.Geometry;

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
   * GeoJSON LineString geometry per RFC 7946. An ordered sequence of two or more
   * positions.
   */
  geometry: TopLevelAPI.LineStringGeometry;

  /**
   * Search radius per coordinate in meters. Must have the same length as the
   * geometry coordinates or be omitted entirely. Default: 50m per point.
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

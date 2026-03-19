// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TopLevelAPI from './top-level';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Routing extends APIResource {
  /**
   * Calculate an isochrone from a point
   */
  isochrone(query: RoutingIsochroneParams, options?: RequestOptions): APIPromise<TopLevelAPI.GeoJsonFeature> {
    return this._client.get('/api/v1/isochrone', {
      query,
      ...options,
      headers: buildHeaders([{ Accept: 'application/geo+json' }, options?.headers]),
    });
  }

  /**
   * Calculate a distance matrix between points
   */
  matrix(body: RoutingMatrixParams, options?: RequestOptions): APIPromise<MatrixResult> {
    return this._client.post('/api/v1/matrix', { body, ...options });
  }

  /**
   * Snap a coordinate to the nearest road
   */
  nearest(query: RoutingNearestParams, options?: RequestOptions): APIPromise<NearestResult> {
    return this._client.get('/api/v1/nearest', { query, ...options });
  }

  /**
   * Calculate a route between two points
   */
  route(body: RoutingRouteParams, options?: RequestOptions): APIPromise<RouteResult> {
    return this._client.post('/api/v1/route', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: 'application/geo+json' }, options?.headers]),
    });
  }
}

export interface MatrixRequest {
  /**
   * Destination points (GeoJSON MultiPoint geometry)
   */
  destinations: TopLevelAPI.GeoJsonGeometry;

  /**
   * Origin points (GeoJSON MultiPoint geometry)
   */
  origins: TopLevelAPI.GeoJsonGeometry;

  /**
   * Travel mode
   */
  mode?: 'auto' | 'foot' | 'bicycle';
}

export interface MatrixResult {
  /**
   * Distance matrix (meters), origins x destinations
   */
  distances: Array<Array<number | null>>;

  /**
   * Duration matrix (seconds), origins x destinations
   */
  durations: Array<Array<number | null>>;
}

/**
 * GeoJSON Point Feature snapped to the nearest road segment
 */
export interface NearestResult {
  geometry: TopLevelAPI.GeoJsonGeometry;

  properties: NearestResult.Properties;

  type: 'Feature';
}

export namespace NearestResult {
  export interface Properties {
    /**
     * Distance to nearest road in meters
     */
    distance_m?: number;

    /**
     * Road edge ID
     */
    edge_id?: number | null;
  }
}

export interface RouteRequest {
  /**
   * Destination point (GeoJSON Point geometry)
   */
  destination: TopLevelAPI.GeoJsonGeometry;

  /**
   * Origin point (GeoJSON Point geometry)
   */
  origin: TopLevelAPI.GeoJsonGeometry;

  mode?: 'auto' | 'foot' | 'bicycle';
}

export interface RouteResult {
  geometry: TopLevelAPI.GeoJsonGeometry;

  properties: RouteResult.Properties;

  type: 'Feature';
}

export namespace RouteResult {
  export interface Properties {
    /**
     * Total distance in meters
     */
    distance?: number;

    /**
     * Estimated duration in seconds
     */
    duration?: number;

    /**
     * Travel mode used
     */
    mode?: string;
  }
}

export interface RoutingIsochroneParams {
  /**
   * Latitude
   */
  lat: number;

  /**
   * Longitude
   */
  lng: number;

  /**
   * Travel time in seconds (1-7200)
   */
  time: number;

  /**
   * Travel mode (auto, foot, bicycle)
   */
  mode?: string;
}

export interface RoutingMatrixParams {
  /**
   * Destination points (GeoJSON MultiPoint geometry)
   */
  destinations: TopLevelAPI.GeoJsonGeometry;

  /**
   * Origin points (GeoJSON MultiPoint geometry)
   */
  origins: TopLevelAPI.GeoJsonGeometry;

  /**
   * Travel mode
   */
  mode?: 'auto' | 'foot' | 'bicycle';
}

export interface RoutingNearestParams {
  /**
   * Latitude
   */
  lat: number;

  /**
   * Longitude
   */
  lng: number;

  /**
   * Search radius in meters (default 500, max 5000)
   */
  radius?: number;
}

export interface RoutingRouteParams {
  /**
   * Destination point (GeoJSON Point geometry)
   */
  destination: TopLevelAPI.GeoJsonGeometry;

  /**
   * Origin point (GeoJSON Point geometry)
   */
  origin: TopLevelAPI.GeoJsonGeometry;

  mode?: 'auto' | 'foot' | 'bicycle';
}

export declare namespace Routing {
  export {
    type MatrixRequest as MatrixRequest,
    type MatrixResult as MatrixResult,
    type NearestResult as NearestResult,
    type RouteRequest as RouteRequest,
    type RouteResult as RouteResult,
    type RoutingIsochroneParams as RoutingIsochroneParams,
    type RoutingMatrixParams as RoutingMatrixParams,
    type RoutingNearestParams as RoutingNearestParams,
    type RoutingRouteParams as RoutingRouteParams,
  };
}

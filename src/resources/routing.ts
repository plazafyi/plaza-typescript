// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TopLevelAPI from './top-level';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Routing extends APIResource {
  /**
   * Calculate an isochrone from a point
   *
   * @example
   * ```ts
   * const response = await client.routing.isochrone({
   *   lat: 0,
   *   lng: 0,
   *   time: 0,
   * });
   * ```
   */
  isochrone(query: RoutingIsochroneParams, options?: RequestOptions): APIPromise<RoutingIsochroneResponse> {
    return this._client.get('/api/v1/isochrone', { query, ...options });
  }

  /**
   * Calculate an isochrone from a point
   *
   * @example
   * ```ts
   * const response = await client.routing.isochronePost({
   *   lat: 0,
   *   lng: 0,
   *   time: 0,
   * });
   * ```
   */
  isochronePost(
    params: RoutingIsochronePostParams,
    options?: RequestOptions,
  ): APIPromise<RoutingIsochronePostResponse> {
    const {
      lat,
      lng,
      time,
      format,
      mode,
      'output[fields]': outputFields,
      'output[geometry]': outputGeometry,
      'output[include]': outputInclude,
      'output[precision]': outputPrecision,
      'output[simplify]': outputSimplify,
    } = params;
    return this._client.post('/api/v1/isochrone', {
      query: {
        lat,
        lng,
        time,
        format,
        mode,
        'output[fields]': outputFields,
        'output[geometry]': outputGeometry,
        'output[include]': outputInclude,
        'output[precision]': outputPrecision,
        'output[simplify]': outputSimplify,
      },
      ...options,
    });
  }

  /**
   * Calculate a distance matrix between points
   *
   * @example
   * ```ts
   * const matrixResult = await client.routing.matrix({
   *   destinations: [{ lat: 48.8584, lng: 2.2945 }],
   *   origins: [
   *     { lat: 48.8566, lng: 2.3522 },
   *     { lat: 48.8606, lng: 2.3376 },
   *   ],
   * });
   * ```
   */
  matrix(body: RoutingMatrixParams, options?: RequestOptions): APIPromise<MatrixResult> {
    return this._client.post('/api/v1/matrix', { body, ...options });
  }

  /**
   * Snap a coordinate to the nearest road
   *
   * @example
   * ```ts
   * const nearestResult = await client.routing.nearest({
   *   lat: 0,
   *   lng: 0,
   * });
   * ```
   */
  nearest(query: RoutingNearestParams, options?: RequestOptions): APIPromise<NearestResult> {
    return this._client.get('/api/v1/nearest', { query, ...options });
  }

  /**
   * Snap a coordinate to the nearest road
   *
   * @example
   * ```ts
   * const nearestResult = await client.routing.nearestPost({
   *   lat: 0,
   *   lng: 0,
   * });
   * ```
   */
  nearestPost(params: RoutingNearestPostParams, options?: RequestOptions): APIPromise<NearestResult> {
    const {
      lat,
      lng,
      'output[fields]': outputFields,
      'output[include]': outputInclude,
      'output[precision]': outputPrecision,
      radius,
    } = params;
    return this._client.post('/api/v1/nearest', {
      query: {
        lat,
        lng,
        'output[fields]': outputFields,
        'output[include]': outputInclude,
        'output[precision]': outputPrecision,
        radius,
      },
      ...options,
    });
  }

  /**
   * Calculate a route between two points
   *
   * @example
   * ```ts
   * const routeResult = await client.routing.route({
   *   destination: { lat: 48.8584, lng: 2.2945 },
   *   origin: { lat: 48.8566, lng: 2.3522 },
   * });
   * ```
   */
  route(params: RoutingRouteParams, options?: RequestOptions): APIPromise<RouteResult> {
    const { format, ...body } = params;
    return this._client.post('/api/v1/route', { query: { format }, body, ...options });
  }
}

/**
 * Request body for distance matrix calculation. Computes travel durations (and
 * optionally distances) between every origin-destination pair. Maximum 2,500 pairs
 * (origins × destinations), each list capped at 50 coordinates.
 */
export interface MatrixRequest {
  /**
   * Array of destination coordinates (max 50)
   */
  destinations: Array<MatrixRequest.Destination>;

  /**
   * Array of origin coordinates (max 50)
   */
  origins: Array<MatrixRequest.Origin>;

  /**
   * Comma-separated list of annotations to include: `duration` (always included),
   * `distance`. Example: `duration,distance`.
   */
  annotations?: string;

  /**
   * Fallback speed in km/h for pairs where no route exists. When set, unreachable
   * pairs get estimated values instead of null.
   */
  fallback_speed?: number | null;

  /**
   * Travel mode (default: `auto`)
   */
  mode?: 'auto' | 'foot' | 'bicycle';
}

export namespace MatrixRequest {
  /**
   * Geographic coordinate as a JSON object with `lat` and `lng` fields.
   */
  export interface Destination {
    /**
     * Latitude in decimal degrees (-90 to 90)
     */
    lat: number;

    /**
     * Longitude in decimal degrees (-180 to 180)
     */
    lng: number;
  }

  /**
   * Geographic coordinate as a JSON object with `lat` and `lng` fields.
   */
  export interface Origin {
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
 * Distance matrix result. The exact response shape depends on the routing backend.
 * Contains duration (and optionally distance) data for all origin-destination
 * pairs. Null values indicate unreachable pairs.
 */
export type MatrixResult = { [key: string]: unknown };

/**
 * GeoJSON Point Feature representing the nearest point on the road network to the
 * input coordinate. Used for snapping GPS coordinates to roads.
 */
export interface NearestResult {
  /**
   * GeoJSON Geometry object per RFC 7946. Coordinates use [longitude, latitude]
   * order. 3D coordinates [lng, lat, elevation] are used for elevation endpoints.
   */
  geometry: TopLevelAPI.GeoJsonGeometry;

  /**
   * Snap result metadata
   */
  properties: NearestResult.Properties;

  type: 'Feature';
}

export namespace NearestResult {
  /**
   * Snap result metadata
   */
  export interface Properties {
    /**
     * Distance from the input coordinate to the snapped point in meters
     */
    distance_m?: number;

    /**
     * ID of the road network edge that was snapped to
     */
    edge_id?: number;

    /**
     * Length of the matched road edge in meters
     */
    edge_length_m?: number;

    /**
     * OSM highway tag value (e.g. `residential`, `primary`, `motorway`)
     */
    highway?: string | null;

    /**
     * OSM way ID of the matched road segment
     */
    osm_way_id?: number;

    /**
     * OSM surface tag value (e.g. `asphalt`, `gravel`, `paved`)
     */
    surface?: string | null;
  }
}

/**
 * Request body for route calculation. Origin and destination are lat/lng
 * coordinate objects. Supports optional waypoints, alternative routes,
 * turn-by-turn steps, and EV routing parameters.
 */
export interface RouteRequest {
  /**
   * Geographic coordinate as a JSON object with `lat` and `lng` fields.
   */
  destination: RouteRequest.Destination;

  /**
   * Geographic coordinate as a JSON object with `lat` and `lng` fields.
   */
  origin: RouteRequest.Origin;

  /**
   * Number of alternative routes to return (0-3, default 0). When > 0, response is a
   * FeatureCollection of route Features.
   */
  alternatives?: number;

  /**
   * Include per-edge annotations (speed, duration) on the route (default: false)
   */
  annotations?: boolean;

  /**
   * Departure time for traffic-aware routing (ISO 8601)
   */
  depart_at?: string | null;

  /**
   * Electric vehicle parameters for EV-aware routing
   */
  ev?: RouteRequest.Ev | null;

  /**
   * Comma-separated road types to exclude (e.g. `toll,motorway,ferry`)
   */
  exclude?: string | null;

  /**
   * Geometry encoding format. Default: `geojson`.
   */
  geometries?: 'geojson' | 'polyline' | 'polyline6';

  /**
   * Travel mode (default: `auto`)
   */
  mode?: 'auto' | 'foot' | 'bicycle';

  /**
   * Level of geometry detail: `full` (all points), `simplified` (Douglas-Peucker),
   * `false` (no geometry). Default: `full`.
   */
  overview?: 'full' | 'simplified' | 'false';

  /**
   * Include turn-by-turn navigation steps (default: false)
   */
  steps?: boolean;

  /**
   * Traffic prediction model (only used when `depart_at` is set)
   */
  traffic_model?: 'best_guess' | 'optimistic' | 'pessimistic' | null;

  /**
   * Intermediate waypoints to visit in order (maximum 25)
   */
  waypoints?: Array<RouteRequest.Waypoint> | null;
}

export namespace RouteRequest {
  /**
   * Geographic coordinate as a JSON object with `lat` and `lng` fields.
   */
  export interface Destination {
    /**
     * Latitude in decimal degrees (-90 to 90)
     */
    lat: number;

    /**
     * Longitude in decimal degrees (-180 to 180)
     */
    lng: number;
  }

  /**
   * Geographic coordinate as a JSON object with `lat` and `lng` fields.
   */
  export interface Origin {
    /**
     * Latitude in decimal degrees (-90 to 90)
     */
    lat: number;

    /**
     * Longitude in decimal degrees (-180 to 180)
     */
    lng: number;
  }

  /**
   * Electric vehicle parameters for EV-aware routing
   */
  export interface Ev {
    /**
     * Total battery capacity in watt-hours (required for EV routing)
     */
    battery_capacity_wh: number;

    /**
     * Acceptable connector types (e.g. `["ccs", "chademo"]`)
     */
    connector_types?: Array<string> | null;

    /**
     * Starting charge as a fraction 0-1 (default: 0.8)
     */
    initial_charge_pct?: number;

    /**
     * Minimum acceptable charge at destination as a fraction 0-1 (default: 0.10)
     */
    min_charge_pct?: number;

    /**
     * Minimum charger power in kilowatts
     */
    min_power_kw?: number | null;
  }

  /**
   * Geographic coordinate as a JSON object with `lat` and `lng` fields.
   */
  export interface Waypoint {
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
 * GeoJSON Feature representing a calculated route. The geometry is a LineString or
 * MultiLineString of the route path. When `alternatives > 0`, the response is a
 * FeatureCollection containing multiple route Features.
 */
export interface RouteResult {
  /**
   * GeoJSON Geometry object per RFC 7946. Coordinates use [longitude, latitude]
   * order. 3D coordinates [lng, lat, elevation] are used for elevation endpoints.
   */
  geometry: TopLevelAPI.GeoJsonGeometry;

  /**
   * Route metadata
   */
  properties: RouteResult.Properties;

  type: 'Feature';
}

export namespace RouteResult {
  /**
   * Route metadata
   */
  export interface Properties {
    /**
     * Total route distance in meters
     */
    distance_m: number;

    /**
     * Estimated travel duration in seconds
     */
    duration_s: number;

    /**
     * Per-edge annotations (present when `annotations: true` in request)
     */
    annotations?: { [key: string]: unknown } | null;

    /**
     * Battery charge level at route waypoints as [distance_fraction, charge_pct] pairs
     * (EV routes only)
     */
    charge_profile?: Array<Array<number>> | null;

    /**
     * Recommended charging stops along the route (EV routes only)
     */
    charging_stops?: Array<{ [key: string]: unknown }> | null;

    /**
     * Edge-level route details (present when `annotations: true`)
     */
    edges?: Array<{ [key: string]: unknown }> | null;

    /**
     * Total energy consumed in watt-hours (EV routes only)
     */
    energy_used_wh?: number | null;
  }
}

/**
 * GeoJSON Feature or FeatureCollection representing isochrone polygons — areas
 * reachable within the specified travel time(s). Single time value returns a
 * Feature; comma-separated times return a FeatureCollection with one polygon per
 * contour.
 */
export interface RoutingIsochroneResponse {
  /**
   * Array of isochrone polygon Features (multi-contour only)
   */
  features?: Array<TopLevelAPI.GeoJsonFeature> | null;

  /**
   * GeoJSON Geometry object per RFC 7946. Coordinates use [longitude, latitude]
   * order. 3D coordinates [lng, lat, elevation] are used for elevation endpoints.
   */
  geometry?: TopLevelAPI.GeoJsonGeometry | null;

  /**
   * Isochrone metadata
   */
  properties?: RoutingIsochroneResponse.Properties | null;

  /**
   * `Feature` for single contour, `FeatureCollection` for multiple contours
   */
  type?: 'Feature' | 'FeatureCollection';
}

export namespace RoutingIsochroneResponse {
  /**
   * Isochrone metadata
   */
  export interface Properties {
    /**
     * Area of the isochrone polygon in square meters (multi-contour features only)
     */
    area_m2?: number | null;

    /**
     * Maximum actual travel cost in seconds to the isochrone boundary (single contour
     * only)
     */
    max_cost_s?: number | null;

    /**
     * Travel mode used for the isochrone calculation
     */
    mode?: 'auto' | 'foot' | 'bicycle';

    /**
     * Travel time budget in seconds
     */
    time_seconds?: number;

    /**
     * Number of road network vertices within the isochrone
     */
    vertices_reached?: number;
  }
}

/**
 * GeoJSON Feature or FeatureCollection representing isochrone polygons — areas
 * reachable within the specified travel time(s). Single time value returns a
 * Feature; comma-separated times return a FeatureCollection with one polygon per
 * contour.
 */
export interface RoutingIsochronePostResponse {
  /**
   * Array of isochrone polygon Features (multi-contour only)
   */
  features?: Array<TopLevelAPI.GeoJsonFeature> | null;

  /**
   * GeoJSON Geometry object per RFC 7946. Coordinates use [longitude, latitude]
   * order. 3D coordinates [lng, lat, elevation] are used for elevation endpoints.
   */
  geometry?: TopLevelAPI.GeoJsonGeometry | null;

  /**
   * Isochrone metadata
   */
  properties?: RoutingIsochronePostResponse.Properties | null;

  /**
   * `Feature` for single contour, `FeatureCollection` for multiple contours
   */
  type?: 'Feature' | 'FeatureCollection';
}

export namespace RoutingIsochronePostResponse {
  /**
   * Isochrone metadata
   */
  export interface Properties {
    /**
     * Area of the isochrone polygon in square meters (multi-contour features only)
     */
    area_m2?: number | null;

    /**
     * Maximum actual travel cost in seconds to the isochrone boundary (single contour
     * only)
     */
    max_cost_s?: number | null;

    /**
     * Travel mode used for the isochrone calculation
     */
    mode?: 'auto' | 'foot' | 'bicycle';

    /**
     * Travel time budget in seconds
     */
    time_seconds?: number;

    /**
     * Number of road network vertices within the isochrone
     */
    vertices_reached?: number;
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
   * Response format: json (default), geojson, csv, ndjson
   */
  format?: string;

  /**
   * Travel mode (auto, foot, bicycle)
   */
  mode?: string;

  /**
   * Comma-separated property fields to include
   */
  'output[fields]'?: string;

  /**
   * Include geometry (default true)
   */
  'output[geometry]'?: boolean;

  /**
   * Extra computed fields: bbox, center
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
}

export interface RoutingIsochronePostParams {
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
   * Response format: json (default), geojson, csv, ndjson
   */
  format?: string;

  /**
   * Travel mode (auto, foot, bicycle)
   */
  mode?: string;

  /**
   * Comma-separated property fields to include
   */
  'output[fields]'?: string;

  /**
   * Include geometry (default true)
   */
  'output[geometry]'?: boolean;

  /**
   * Extra computed fields: bbox, center
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
}

export interface RoutingMatrixParams {
  /**
   * Array of destination coordinates (max 50)
   */
  destinations: Array<RoutingMatrixParams.Destination>;

  /**
   * Array of origin coordinates (max 50)
   */
  origins: Array<RoutingMatrixParams.Origin>;

  /**
   * Comma-separated list of annotations to include: `duration` (always included),
   * `distance`. Example: `duration,distance`.
   */
  annotations?: string;

  /**
   * Fallback speed in km/h for pairs where no route exists. When set, unreachable
   * pairs get estimated values instead of null.
   */
  fallback_speed?: number | null;

  /**
   * Travel mode (default: `auto`)
   */
  mode?: 'auto' | 'foot' | 'bicycle';
}

export namespace RoutingMatrixParams {
  /**
   * Geographic coordinate as a JSON object with `lat` and `lng` fields.
   */
  export interface Destination {
    /**
     * Latitude in decimal degrees (-90 to 90)
     */
    lat: number;

    /**
     * Longitude in decimal degrees (-180 to 180)
     */
    lng: number;
  }

  /**
   * Geographic coordinate as a JSON object with `lat` and `lng` fields.
   */
  export interface Origin {
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
   * Comma-separated property fields to include
   */
  'output[fields]'?: string;

  /**
   * Extra computed fields: bbox, distance, center
   */
  'output[include]'?: string;

  /**
   * Coordinate decimal precision (1-15, default 7)
   */
  'output[precision]'?: number;

  /**
   * Search radius in meters (default 500, max 5000)
   */
  radius?: number;
}

export interface RoutingNearestPostParams {
  /**
   * Latitude
   */
  lat: number;

  /**
   * Longitude
   */
  lng: number;

  /**
   * Comma-separated property fields to include
   */
  'output[fields]'?: string;

  /**
   * Extra computed fields: bbox, distance, center
   */
  'output[include]'?: string;

  /**
   * Coordinate decimal precision (1-15, default 7)
   */
  'output[precision]'?: number;

  /**
   * Search radius in meters (default 500, max 5000)
   */
  radius?: number;
}

export interface RoutingRouteParams {
  /**
   * Body param: Geographic coordinate as a JSON object with `lat` and `lng` fields.
   */
  destination: RoutingRouteParams.Destination;

  /**
   * Body param: Geographic coordinate as a JSON object with `lat` and `lng` fields.
   */
  origin: RoutingRouteParams.Origin;

  /**
   * Query param: Response format for alternatives: json (default), geojson, csv,
   * ndjson
   */
  format?: string;

  /**
   * Body param: Number of alternative routes to return (0-3, default 0). When > 0,
   * response is a FeatureCollection of route Features.
   */
  alternatives?: number;

  /**
   * Body param: Include per-edge annotations (speed, duration) on the route
   * (default: false)
   */
  annotations?: boolean;

  /**
   * Body param: Departure time for traffic-aware routing (ISO 8601)
   */
  depart_at?: string | null;

  /**
   * Body param: Electric vehicle parameters for EV-aware routing
   */
  ev?: RoutingRouteParams.Ev | null;

  /**
   * Body param: Comma-separated road types to exclude (e.g. `toll,motorway,ferry`)
   */
  exclude?: string | null;

  /**
   * Body param: Geometry encoding format. Default: `geojson`.
   */
  geometries?: 'geojson' | 'polyline' | 'polyline6';

  /**
   * Body param: Travel mode (default: `auto`)
   */
  mode?: 'auto' | 'foot' | 'bicycle';

  /**
   * Body param: Level of geometry detail: `full` (all points), `simplified`
   * (Douglas-Peucker), `false` (no geometry). Default: `full`.
   */
  overview?: 'full' | 'simplified' | 'false';

  /**
   * Body param: Include turn-by-turn navigation steps (default: false)
   */
  steps?: boolean;

  /**
   * Body param: Traffic prediction model (only used when `depart_at` is set)
   */
  traffic_model?: 'best_guess' | 'optimistic' | 'pessimistic' | null;

  /**
   * Body param: Intermediate waypoints to visit in order (maximum 25)
   */
  waypoints?: Array<RoutingRouteParams.Waypoint> | null;
}

export namespace RoutingRouteParams {
  /**
   * Geographic coordinate as a JSON object with `lat` and `lng` fields.
   */
  export interface Destination {
    /**
     * Latitude in decimal degrees (-90 to 90)
     */
    lat: number;

    /**
     * Longitude in decimal degrees (-180 to 180)
     */
    lng: number;
  }

  /**
   * Geographic coordinate as a JSON object with `lat` and `lng` fields.
   */
  export interface Origin {
    /**
     * Latitude in decimal degrees (-90 to 90)
     */
    lat: number;

    /**
     * Longitude in decimal degrees (-180 to 180)
     */
    lng: number;
  }

  /**
   * Electric vehicle parameters for EV-aware routing
   */
  export interface Ev {
    /**
     * Total battery capacity in watt-hours (required for EV routing)
     */
    battery_capacity_wh: number;

    /**
     * Acceptable connector types (e.g. `["ccs", "chademo"]`)
     */
    connector_types?: Array<string> | null;

    /**
     * Starting charge as a fraction 0-1 (default: 0.8)
     */
    initial_charge_pct?: number;

    /**
     * Minimum acceptable charge at destination as a fraction 0-1 (default: 0.10)
     */
    min_charge_pct?: number;

    /**
     * Minimum charger power in kilowatts
     */
    min_power_kw?: number | null;
  }

  /**
   * Geographic coordinate as a JSON object with `lat` and `lng` fields.
   */
  export interface Waypoint {
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

export declare namespace Routing {
  export {
    type MatrixRequest as MatrixRequest,
    type MatrixResult as MatrixResult,
    type NearestResult as NearestResult,
    type RouteRequest as RouteRequest,
    type RouteResult as RouteResult,
    type RoutingIsochroneResponse as RoutingIsochroneResponse,
    type RoutingIsochronePostResponse as RoutingIsochronePostResponse,
    type RoutingIsochroneParams as RoutingIsochroneParams,
    type RoutingIsochronePostParams as RoutingIsochronePostParams,
    type RoutingMatrixParams as RoutingMatrixParams,
    type RoutingNearestParams as RoutingNearestParams,
    type RoutingNearestPostParams as RoutingNearestPostParams,
    type RoutingRouteParams as RoutingRouteParams,
  };
}

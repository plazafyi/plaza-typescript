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
   *   geometry: {
   *     coordinates: [2.3522, 48.8566],
   *     type: 'Point',
   *   },
   *   time: [1],
   * });
   * ```
   */
  isochrone(params: RoutingIsochroneParams, options?: RequestOptions): APIPromise<RoutingIsochroneResponse> {
    const { format, ...body } = params
    return this._client.post('/api/v1/isochrone', { query: { format }, body, ...options });
  }

  /**
   * Calculate a distance matrix between points
   *
   * @example
   * ```ts
   * const matrixResult = await client.routing.matrix({
   *   destinations: [
   *     { coordinates: [2.2945, 48.8584], type: 'Point' },
   *   ],
   *   origins: [
   *     { coordinates: [2.3522, 48.8566], type: 'Point' },
   *     { coordinates: [2.3376, 48.8606], type: 'Point' },
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
   *   geometry: {
   *     coordinates: [2.3522, 48.8566],
   *     type: 'Point',
   *   },
   * });
   * ```
   */
  nearest(body: RoutingNearestParams, options?: RequestOptions): APIPromise<NearestResult> {
    return this._client.post('/api/v1/nearest', { body, ...options });
  }

  /**
   * Calculate a route between two points
   *
   * @example
   * ```ts
   * const routeResult = await client.routing.route({
   *   destination: {
   *     coordinates: [2.2945, 48.8584],
   *     type: 'Point',
   *   },
   *   origin: { coordinates: [2.3522, 48.8566], type: 'Point' },
   * });
   * ```
   */
  route(params: RoutingRouteParams, options?: RequestOptions): APIPromise<RouteResult> {
    const { format, ...body } = params
    return this._client.post('/api/v1/route', { query: { format }, body, ...options });
  }
}

/**
 * Request body for isochrone calculation. Computes areas reachable from a point
 * within the given travel time(s).
 */
export interface IsochroneRequest {
  /**
   * GeoJSON Point geometry per RFC 7946. Coordinates use [longitude, latitude]
   * order. Optional third element is altitude in meters.
   */
  geometry: TopLevelAPI.PointGeometry;

  /**
   * Travel time budgets in seconds. Each value produces one contour polygon.
   */
  time: Array<number>;

  /**
   * Travel mode (default: `auto`)
   */
  mode?: 'auto' | 'foot' | 'bicycle';
}

/**
 * Request body for distance matrix calculation. Computes travel durations (and
 * optionally distances) between every origin-destination pair. Maximum 2,500 pairs
 * (origins × destinations), each list capped at 50 coordinates.
 */
export interface MatrixRequest {
  /**
   * Array of destination coordinates as GeoJSON Points (max 50)
   */
  destinations: Array<TopLevelAPI.PointGeometry>;

  /**
   * Array of origin coordinates as GeoJSON Points (max 50)
   */
  origins: Array<TopLevelAPI.PointGeometry>;

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

/**
 * Distance matrix result. The exact response shape depends on the routing backend.
 * Contains duration (and optionally distance) data for all origin-destination
 * pairs. Null values indicate unreachable pairs.
 */
export type MatrixResult = { [key: string]: unknown }

/**
 * Request body for nearest-road-segment lookup. Snaps a point to the road network.
 */
export interface NearestRequest {
  /**
   * GeoJSON Point geometry per RFC 7946. Coordinates use [longitude, latitude]
   * order. Optional third element is altitude in meters.
   */
  geometry: TopLevelAPI.PointGeometry;

  /**
   * Maximum search radius in meters (default: 100)
   */
  radius?: number | null;
}

/**
 * GeoJSON Point Feature representing the nearest point on the road network to the
 * input coordinate. Used for snapping GPS coordinates to roads.
 */
export interface NearestResult {
  /**
   * GeoJSON Geometry object per RFC 7946. Discriminated union — the `type` field
   * determines the coordinate structure.
   */
  geometry: TopLevelAPI.Geometry;

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
 * Request body for route calculation. Origin and destination are GeoJSON Point
 * geometries. Supports optional waypoints, alternative routes, turn-by-turn steps,
 * and EV routing parameters.
 */
export interface RouteRequest {
  /**
   * GeoJSON Point geometry per RFC 7946. Coordinates use [longitude, latitude]
   * order. Optional third element is altitude in meters.
   */
  destination: TopLevelAPI.PointGeometry;

  /**
   * GeoJSON Point geometry per RFC 7946. Coordinates use [longitude, latitude]
   * order. Optional third element is altitude in meters.
   */
  origin: TopLevelAPI.PointGeometry;

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
  waypoints?: Array<TopLevelAPI.PointGeometry> | null;
}

export namespace RouteRequest {
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
}

/**
 * GeoJSON Feature representing a calculated route. The geometry is a LineString or
 * MultiLineString of the route path. When `alternatives > 0`, the response is a
 * FeatureCollection containing multiple route Features.
 */
export interface RouteResult {
  /**
   * GeoJSON Geometry object per RFC 7946. Discriminated union — the `type` field
   * determines the coordinate structure.
   */
  geometry: TopLevelAPI.Geometry;

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
 * GeoJSON FeatureCollection of isochrone polygons — areas reachable within the
 * specified travel time(s). Each Feature is a Polygon contour with travel time and
 * area metadata in properties.
 */
export interface RoutingIsochroneResponse {
  /**
   * Array of isochrone polygon Features, one per contour
   */
  features: Array<TopLevelAPI.GeoJsonFeature>;

  /**
   * Always `FeatureCollection`
   */
  type: 'FeatureCollection';
}

export interface RoutingIsochroneParams {
  /**
   * Body param: GeoJSON Point geometry per RFC 7946. Coordinates use [longitude,
   * latitude] order. Optional third element is altitude in meters.
   */
  geometry: TopLevelAPI.PointGeometry;

  /**
   * Body param: Travel time budgets in seconds. Each value produces one contour
   * polygon.
   */
  time: Array<number>;

  /**
   * Query param: Response format: json (default), geojson, csv, ndjson
   */
  format?: string;

  /**
   * Body param: Travel mode (default: `auto`)
   */
  mode?: 'auto' | 'foot' | 'bicycle';
}

export interface RoutingMatrixParams {
  /**
   * Array of destination coordinates as GeoJSON Points (max 50)
   */
  destinations: Array<TopLevelAPI.PointGeometry>;

  /**
   * Array of origin coordinates as GeoJSON Points (max 50)
   */
  origins: Array<TopLevelAPI.PointGeometry>;

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

export interface RoutingNearestParams {
  /**
   * GeoJSON Point geometry per RFC 7946. Coordinates use [longitude, latitude]
   * order. Optional third element is altitude in meters.
   */
  geometry: TopLevelAPI.PointGeometry;

  /**
   * Maximum search radius in meters (default: 100)
   */
  radius?: number | null;
}

export interface RoutingRouteParams {
  /**
   * Body param: GeoJSON Point geometry per RFC 7946. Coordinates use [longitude,
   * latitude] order. Optional third element is altitude in meters.
   */
  destination: TopLevelAPI.PointGeometry;

  /**
   * Body param: GeoJSON Point geometry per RFC 7946. Coordinates use [longitude,
   * latitude] order. Optional third element is altitude in meters.
   */
  origin: TopLevelAPI.PointGeometry;

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
  waypoints?: Array<TopLevelAPI.PointGeometry> | null;
}

export namespace RoutingRouteParams {
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
}

export declare namespace Routing {
  export {
    type IsochroneRequest as IsochroneRequest,
    type MatrixRequest as MatrixRequest,
    type MatrixResult as MatrixResult,
    type NearestRequest as NearestRequest,
    type NearestResult as NearestResult,
    type RouteRequest as RouteRequest,
    type RouteResult as RouteResult,
    type RoutingIsochroneResponse as RoutingIsochroneResponse,
    type RoutingIsochroneParams as RoutingIsochroneParams,
    type RoutingMatrixParams as RoutingMatrixParams,
    type RoutingNearestParams as RoutingNearestParams,
    type RoutingRouteParams as RoutingRouteParams
  };
}

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TopLevelAPI from './top-level';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Optimize extends APIResource {
  /**
   * Optimize route through waypoints
   *
   * @example
   * ```ts
   * const optimizeResult = await client.optimize.create({
   *   waypoints: [
   *     { lat: 48.8566, lng: 2.3522 },
   *     { lat: 48.8606, lng: 2.3376 },
   *     { lat: 48.8584, lng: 2.2945 },
   *   ],
   * });
   * ```
   */
  create(body: OptimizeCreateParams, options?: RequestOptions): APIPromise<OptimizeResult> {
    return this._client.post('/api/v1/optimize', { body, ...options });
  }

  /**
   * Get async optimization result
   *
   * @example
   * ```ts
   * const optimizeJobStatus = await client.optimize.retrieve(
   *   'job_id',
   * );
   * ```
   */
  retrieve(jobID: string, options?: RequestOptions): APIPromise<OptimizeJobStatus> {
    return this._client.get(path`/api/v1/optimize/${jobID}`, options);
  }
}

/**
 * Completed optimization result as a GeoJSON FeatureCollection. Each Feature is a
 * waypoint in optimized visit order. Top-level fields provide summary statistics.
 */
export interface OptimizeCompletedResult {
  /**
   * Waypoints in optimized visit order
   */
  features: Array<OptimizeCompletedResult.Feature>;

  /**
   * Optimization method used (e.g. `nearest_neighbor`, `2opt`)
   */
  optimization: string;

  /**
   * Whether the route returns to the starting waypoint
   */
  roundtrip: boolean;

  /**
   * Total travel time for the optimized route in seconds
   */
  total_cost_s: number;

  type: 'FeatureCollection';
}

export namespace OptimizeCompletedResult {
  /**
   * GeoJSON Point Feature representing an optimized waypoint with cost data.
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
       * Travel time in seconds from the previous waypoint to this one (0 for the first
       * waypoint)
       */
      cost_s: number;

      /**
       * Cumulative travel time in seconds from the start to this waypoint
       */
      cumulative_cost_s: number;

      /**
       * Position of this waypoint in the optimized visit order (0-based)
       */
      waypoint_index: number;
    }
  }
}

/**
 * Status of an async optimization job. When `completed`, the `result` field
 * contains the full OptimizeCompletedResult. When `processing`, the job is still
 * running — poll again. Failed jobs return a standard Error response (HTTP 422),
 * not this schema.
 */
export interface OptimizeJobStatus {
  /**
   * Current job state
   */
  status: 'completed' | 'processing';

  /**
   * Completed optimization result as a GeoJSON FeatureCollection. Each Feature is a
   * waypoint in optimized visit order. Top-level fields provide summary statistics.
   */
  result?: OptimizeCompletedResult | null;
}

/**
 * Async optimization in progress. Poll `GET /api/v1/optimize/{job_id}` until the
 * status changes to `completed` or `failed`.
 */
export interface OptimizeProcessingResult {
  /**
   * Job ID for polling the result
   */
  job_id: string;

  /**
   * Always `processing`
   */
  status: 'processing';
}

/**
 * Route optimization (Travelling Salesman) request. Finds the most efficient order
 * to visit a set of waypoints. Minimum 2 waypoints, maximum 50. For large inputs,
 * the request may be processed asynchronously.
 */
export interface OptimizeRequest {
  /**
   * Waypoints to visit in optimized order (2-50 points)
   */
  waypoints: Array<OptimizeRequest.Waypoint>;

  /**
   * Travel mode (default: `auto`)
   */
  mode?: 'auto' | 'foot' | 'bicycle';

  /**
   * Whether the route should return to the starting waypoint (default: true)
   */
  roundtrip?: boolean;
}

export namespace OptimizeRequest {
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
 * Optimization response — either a completed FeatureCollection with the optimized
 * route, or an async job reference to poll.
 */
export type OptimizeResult = OptimizeCompletedResult | OptimizeProcessingResult;

export interface OptimizeCreateParams {
  /**
   * Waypoints to visit in optimized order (2-50 points)
   */
  waypoints: Array<OptimizeCreateParams.Waypoint>;

  /**
   * Travel mode (default: `auto`)
   */
  mode?: 'auto' | 'foot' | 'bicycle';

  /**
   * Whether the route should return to the starting waypoint (default: true)
   */
  roundtrip?: boolean;
}

export namespace OptimizeCreateParams {
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

export declare namespace Optimize {
  export {
    type OptimizeCompletedResult as OptimizeCompletedResult,
    type OptimizeJobStatus as OptimizeJobStatus,
    type OptimizeProcessingResult as OptimizeProcessingResult,
    type OptimizeRequest as OptimizeRequest,
    type OptimizeResult as OptimizeResult,
    type OptimizeCreateParams as OptimizeCreateParams,
  };
}

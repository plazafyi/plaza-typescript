// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TopLevelAPI from './top-level';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Optimize extends APIResource {
  /**
   * Optimize route through waypoints
   */
  create(body: OptimizeCreateParams, options?: RequestOptions): APIPromise<OptimizeResult> {
    return this._client.post('/api/v1/optimize', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: 'application/geo+json' }, options?.headers]),
    });
  }

  /**
   * Get async optimization result
   */
  retrieve(jobID: string, options?: RequestOptions): APIPromise<OptimizeJobStatus> {
    return this._client.get(path`/api/v1/optimize/${jobID}`, options);
  }
}

/**
 * Completed optimization — GeoJSON Feature with optimized route
 */
export interface OptimizeCompletedResult {
  geometry: TopLevelAPI.GeoJsonGeometry;

  properties: OptimizeCompletedResult.Properties;

  /**
   * Job status
   */
  status: 'completed';

  type: 'Feature';
}

export namespace OptimizeCompletedResult {
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
     * Optimized waypoint ordering
     */
    waypoint_order?: Array<number>;
  }
}

/**
 * Status of an async optimization job
 */
export interface OptimizeJobStatus {
  /**
   * Job status
   */
  status: 'completed' | 'processing' | 'failed';

  /**
   * Error message when failed
   */
  error?: string | null;

  /**
   * Optimization result when completed
   */
  result?: unknown | null;
}

/**
 * Async optimization in progress — poll with the job_id
 */
export interface OptimizeProcessingResult {
  /**
   * Job ID for polling
   */
  job_id: string;

  /**
   * Job status
   */
  status: 'processing';
}

/**
 * Route optimization request through waypoints
 */
export interface OptimizeRequest {
  /**
   * Waypoints to visit (GeoJSON MultiPoint geometry, minimum 2 points)
   */
  waypoints: TopLevelAPI.GeoJsonGeometry;

  /**
   * Travel mode (default: auto)
   */
  mode?: 'auto' | 'foot' | 'bicycle';

  /**
   * Whether route returns to start (default: true)
   */
  roundtrip?: boolean;
}

/**
 * Optimization response — either a completed GeoJSON Feature route or an async job
 * reference
 */
export type OptimizeResult = OptimizeCompletedResult | OptimizeProcessingResult;

export interface OptimizeCreateParams {
  /**
   * Waypoints to visit (GeoJSON MultiPoint geometry, minimum 2 points)
   */
  waypoints: TopLevelAPI.GeoJsonGeometry;

  /**
   * Travel mode (default: auto)
   */
  mode?: 'auto' | 'foot' | 'bicycle';

  /**
   * Whether route returns to start (default: true)
   */
  roundtrip?: boolean;
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

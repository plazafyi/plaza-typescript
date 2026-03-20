// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TopLevelAPI from './top-level';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Query extends APIResource {
  /**
   * Execute a multi-step query pipeline
   *
   * @example
   * ```ts
   * const response = await client.query.execute({
   *   steps: [{ type: 'overpass' }],
   * });
   * ```
   */
  execute(body: QueryExecuteParams, options?: RequestOptions): APIPromise<QueryExecuteResponse> {
    return this._client.post('/api/v1/query', { body, ...options });
  }

  /**
   * Execute an Overpass QL query
   *
   * @example
   * ```ts
   * const featureCollection = await client.query.overpass({
   *   data: '[out:json];node[amenity=cafe](around:500,48.8566,2.3522);out body;',
   * });
   * ```
   */
  overpass(body: QueryOverpassParams, options?: RequestOptions): APIPromise<TopLevelAPI.FeatureCollection> {
    return this._client.post('/api/v1/overpass', { body, ...options });
  }

  /**
   * Execute a SPARQL query
   *
   * @example
   * ```ts
   * const sparqlResult = await client.query.sparql({
   *   query:
   *     'SELECT ?s ?name WHERE { ?s osm:name ?name . ?s osm:amenity "cafe" } LIMIT 10',
   * });
   * ```
   */
  sparql(body: QuerySparqlParams, options?: RequestOptions): APIPromise<SparqlResult> {
    return this._client.post('/api/v1/sparql', { body, ...options });
  }
}

/**
 * Overpass QL query request. The query is executed against Plaza's OSM database
 * and results are returned as GeoJSON.
 */
export interface OverpassQuery {
  /**
   * Overpass QL query string
   */
  data: string;
}

/**
 * SPARQL query request. Queries OSM data using SPARQL syntax. Results are returned
 * as a JSON object with a `results` array.
 */
export interface SparqlQuery {
  /**
   * SPARQL query string
   */
  query: string;
}

/**
 * SPARQL query result. Contains a `results` array of GeoJSON Feature objects.
 * Unlike REST feature endpoints, SPARQL results may omit `@type`, `@id`, and
 * compound `id` fields depending on the query shape.
 */
export interface SparqlResult {
  /**
   * Array of GeoJSON Features matching the SPARQL query. Features include `@type`
   * and `@id` metadata when the source element type is known, but may contain only
   * tags as properties for untyped results.
   */
  results: Array<SparqlResult.Result>;
}

export namespace SparqlResult {
  /**
   * GeoJSON Feature (may lack @type/@id metadata for untyped results)
   */
  export interface Result {
    /**
     * GeoJSON Geometry object per RFC 7946. Coordinates use [longitude, latitude]
     * order. 3D coordinates [lng, lat, elevation] are used for elevation endpoints.
     */
    geometry: TopLevelAPI.GeoJsonGeometry;

    /**
     * OSM tags as key-value pairs, optionally with `@type` and `@id` metadata
     */
    properties: { [key: string]: unknown };

    /**
     * Always `Feature`
     */
    type: 'Feature';

    /**
     * Compound identifier in `type/osm_id` format (present when element type is known)
     */
    id?: string | null;
  }
}

/**
 * Pipeline execution result containing the output of each step.
 */
export interface QueryExecuteResponse {
  /**
   * Results from each pipeline step in execution order
   */
  steps: Array<{ [key: string]: unknown }>;
}

export interface QueryExecuteParams {
  /**
   * Ordered list of query steps to execute
   */
  steps: Array<QueryExecuteParams.Step>;
}

export namespace QueryExecuteParams {
  /**
   * A single pipeline step
   */
  export interface Step {
    /**
     * Step type: `overpass`, `sparql`, `filter`, or `transform`
     */
    type: 'overpass' | 'sparql' | 'filter' | 'transform';

    /**
     * Query string for this step (required for overpass/sparql steps)
     */
    query?: string;
  }
}

export interface QueryOverpassParams {
  /**
   * Overpass QL query string
   */
  data: string;
}

export interface QuerySparqlParams {
  /**
   * SPARQL query string
   */
  query: string;
}

export declare namespace Query {
  export {
    type OverpassQuery as OverpassQuery,
    type SparqlQuery as SparqlQuery,
    type SparqlResult as SparqlResult,
    type QueryExecuteResponse as QueryExecuteResponse,
    type QueryExecuteParams as QueryExecuteParams,
    type QueryOverpassParams as QueryOverpassParams,
    type QuerySparqlParams as QuerySparqlParams,
  };
}

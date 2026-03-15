// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as DatasetsAPI from './datasets';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Elements extends APIResource {
  /**
   * Get element by type and ID
   */
  retrieve(id: number, params: ElementRetrieveParams, options?: RequestOptions): APIPromise<GeoJsonFeature> {
    const { type } = params;
    return this._client.get(path`/api/v1/elements/${type}/${id}`, options);
  }

  /**
   * Fetch multiple elements by type and ID
   */
  fetchBatch(
    body: ElementFetchBatchParams,
    options?: RequestOptions,
  ): APIPromise<DatasetsAPI.FeatureCollection> {
    return this._client.post('/api/v1/elements/batch', { body, ...options });
  }

  /**
   * Query elements by bounding box or H3 cell
   */
  query(
    query: ElementQueryParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DatasetsAPI.FeatureCollection> {
    return this._client.get('/api/v1/elements', { query, ...options });
  }
}

export interface GeoJsonFeature {
  geometry: GeoJsonGeometry;

  properties: { [key: string]: unknown };

  type: 'Feature';

  /**
   * Feature identifier (type/osm_id)
   */
  id?: string;

  /**
   * OpenStreetMap ID
   */
  osm_id?: number;
}

export interface GeoJsonGeometry {
  /**
   * GeoJSON coordinates array (nesting depth varies by geometry type)
   */
  coordinates:
    | Array<number>
    | Array<Array<number>>
    | Array<Array<Array<number>>>
    | Array<Array<Array<Array<number>>>>;

  type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon';
}

export interface ElementRetrieveParams {
  /**
   * Element type (node, way, relation)
   */
  type: string;
}

export interface ElementFetchBatchParams {
  elements: Array<ElementFetchBatchParams.Element>;
}

export namespace ElementFetchBatchParams {
  export interface Element {
    id: number;

    type: 'node' | 'way' | 'relation';
  }
}

export interface ElementQueryParams {
  /**
   * Bounding box: south,west,north,east. At least one of bbox or h3 is required.
   */
  bbox?: string;

  /**
   * Cursor for pagination
   */
  cursor?: string;

  /**
   * H3 cell index. At least one of bbox or h3 is required.
   */
  h3?: string;

  /**
   * Maximum results (default 100, max 10000)
   */
  limit?: number;

  /**
   * Element types (comma-separated: node,way,relation)
   */
  type?: string;
}

export declare namespace Elements {
  export {
    type GeoJsonFeature as GeoJsonFeature,
    type GeoJsonGeometry as GeoJsonGeometry,
    type ElementRetrieveParams as ElementRetrieveParams,
    type ElementFetchBatchParams as ElementFetchBatchParams,
    type ElementQueryParams as ElementQueryParams,
  };
}

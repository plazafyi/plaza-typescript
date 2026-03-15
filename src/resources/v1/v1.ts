// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as DatasetsAPI from './datasets';
import {
  DatasetCreateParams,
  DatasetListResponse,
  DatasetQueryFeaturesParams,
  DatasetResponse,
  Datasets,
  FeatureCollection,
} from './datasets';
import * as ElementsAPI from './elements';
import {
  ElementFetchBatchParams,
  ElementQueryParams,
  ElementRetrieveParams,
  Elements,
  GeoJsonFeature,
  GeoJsonGeometry,
} from './elements';
import * as GeocodeAPI from './geocode';
import {
  Geocode,
  GeocodeAutocompleteParams,
  GeocodeAutocompleteResponse,
  GeocodeForwardParams,
  GeocodeForwardResponse,
  GeocodeReverseParams,
  GeocodeReverseResponse,
} from './geocode';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class V1 extends APIResource {
  datasets: DatasetsAPI.Datasets = new DatasetsAPI.Datasets(this._client);
  elements: ElementsAPI.Elements = new ElementsAPI.Elements(this._client);
  geocode: GeocodeAPI.Geocode = new GeocodeAPI.Geocode(this._client);

  /**
   * Calculate a distance matrix between points
   */
  calculateDistanceMatrix(
    body: V1CalculateDistanceMatrixParams,
    options?: RequestOptions,
  ): APIPromise<V1CalculateDistanceMatrixResponse> {
    return this._client.post('/api/v1/matrix', { body, ...options });
  }

  /**
   * Calculate an isochrone from a point
   */
  calculateIsochrone(
    query: V1CalculateIsochroneParams,
    options?: RequestOptions,
  ): APIPromise<ElementsAPI.GeoJsonFeature> {
    return this._client.get('/api/v1/isochrone', { query, ...options });
  }

  /**
   * Calculate a route between two points
   */
  calculateRoute(
    body: V1CalculateRouteParams,
    options?: RequestOptions,
  ): APIPromise<V1CalculateRouteResponse> {
    return this._client.post('/api/v1/route', { body, ...options });
  }

  /**
   * Execute an Overpass QL query
   */
  executeOverpass(
    body: V1ExecuteOverpassParams,
    options?: RequestOptions,
  ): APIPromise<DatasetsAPI.FeatureCollection> {
    return this._client.post('/api/v1/overpass', { body, ...options });
  }

  /**
   * Execute a query via REST parameters
   */
  executeQuery(
    query: V1ExecuteQueryParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DatasetsAPI.FeatureCollection> {
    return this._client.get('/api/v1/query', { query, ...options });
  }

  /**
   * Execute a SPARQL query
   */
  executeSparql(body: V1ExecuteSparqlParams, options?: RequestOptions): APIPromise<V1ExecuteSparqlResponse> {
    return this._client.post('/api/v1/sparql', { body, ...options });
  }

  /**
   * Find elements near a point
   */
  findNearby(query: V1FindNearbyParams, options?: RequestOptions): APIPromise<DatasetsAPI.FeatureCollection> {
    return this._client.get('/api/v1/nearby', { query, ...options });
  }

  /**
   * Get a Mapbox Vector Tile
   */
  getTile(y: number, params: V1GetTileParams, options?: RequestOptions): APIPromise<Response> {
    const { z, x } = params;
    return this._client.get(path`/api/v1/tiles/${z}/${x}/${y}`, {
      ...options,
      headers: buildHeaders([{ Accept: 'application/vnd.mapbox-vector-tile' }, options?.headers]),
      __binaryResponse: true,
    });
  }

  /**
   * Reverse geocode a coordinate to the nearest named feature
   */
  reverseGeocode(
    query: V1ReverseGeocodeParams,
    options?: RequestOptions,
  ): APIPromise<ElementsAPI.GeoJsonFeature> {
    return this._client.get('/api/v1/reverse-geocode', { query, ...options });
  }

  /**
   * Search OSM features by name
   */
  searchFeatures(
    query: V1SearchFeaturesParams,
    options?: RequestOptions,
  ): APIPromise<DatasetsAPI.FeatureCollection> {
    return this._client.get('/api/v1/search', { query, ...options });
  }

  /**
   * Snap a coordinate to the nearest road
   */
  snapToNearest(query: V1SnapToNearestParams, options?: RequestOptions): APIPromise<V1SnapToNearestResponse> {
    return this._client.get('/api/v1/nearest', { query, ...options });
  }
}

export interface V1CalculateDistanceMatrixResponse {
  /**
   * Distance matrix (meters), origins x destinations
   */
  distances: Array<Array<number | null>>;

  /**
   * Duration matrix (seconds), origins x destinations
   */
  durations: Array<Array<number | null>>;
}

export interface V1CalculateRouteResponse {
  geometry: ElementsAPI.GeoJsonGeometry;

  properties: V1CalculateRouteResponse.Properties;

  type: 'Feature';
}

export namespace V1CalculateRouteResponse {
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

export interface V1ExecuteSparqlResponse {
  /**
   * Array of GeoJSON features from SPARQL query
   */
  results: Array<ElementsAPI.GeoJsonFeature>;
}

export interface V1SnapToNearestResponse {
  /**
   * Distance to nearest road in meters
   */
  distance: number;

  /**
   * Snapped latitude
   */
  lat: number;

  /**
   * Snapped longitude
   */
  lng: number;

  /**
   * Road edge ID
   */
  edge_id?: number | null;
}

export interface V1CalculateDistanceMatrixParams {
  /**
   * List of destination coordinates
   */
  destinations: Array<V1CalculateDistanceMatrixParams.Destination>;

  /**
   * List of origin coordinates
   */
  origins: Array<V1CalculateDistanceMatrixParams.Origin>;

  /**
   * Travel mode
   */
  mode?: 'auto' | 'foot' | 'bicycle';
}

export namespace V1CalculateDistanceMatrixParams {
  export interface Destination {
    lat: number;

    lng: number;
  }

  export interface Origin {
    lat: number;

    lng: number;
  }
}

export interface V1CalculateIsochroneParams {
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

export interface V1CalculateRouteParams {
  destination: V1CalculateRouteParams.Destination;

  origin: V1CalculateRouteParams.Origin;

  mode?: 'auto' | 'foot' | 'bicycle';
}

export namespace V1CalculateRouteParams {
  export interface Destination {
    lat: number;

    lng: number;
  }

  export interface Origin {
    lat: number;

    lng: number;
  }
}

export interface V1ExecuteOverpassParams {
  /**
   * Overpass QL query string
   */
  data: string;
}

export interface V1ExecuteQueryParams {
  /**
   * Bounding box filter
   */
  bbox?: string;

  /**
   * Element type filter
   */
  type?: string;
}

export interface V1ExecuteSparqlParams {
  /**
   * SPARQL query string
   */
  query: string;
}

export interface V1FindNearbyParams {
  /**
   * Latitude
   */
  lat: number;

  /**
   * Longitude
   */
  lng: number;

  /**
   * Maximum results (default 100, max 1000)
   */
  limit?: number;

  /**
   * Search radius in meters (default 500)
   */
  radius?: number;
}

export interface V1GetTileParams {
  /**
   * Zoom level (0-22)
   */
  z: number;

  /**
   * Tile X coordinate
   */
  x: number;
}

export interface V1ReverseGeocodeParams {
  /**
   * Latitude
   */
  lat: number;

  /**
   * Longitude
   */
  lng: number;
}

export interface V1SearchFeaturesParams {
  /**
   * Search query string
   */
  q: string;

  /**
   * Cursor for pagination
   */
  cursor?: string;

  /**
   * Maximum results (default 25, max 100)
   */
  limit?: number;
}

export interface V1SnapToNearestParams {
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

V1.Datasets = Datasets;
V1.Elements = Elements;
V1.Geocode = Geocode;

export declare namespace V1 {
  export {
    type V1CalculateDistanceMatrixResponse as V1CalculateDistanceMatrixResponse,
    type V1CalculateRouteResponse as V1CalculateRouteResponse,
    type V1ExecuteSparqlResponse as V1ExecuteSparqlResponse,
    type V1SnapToNearestResponse as V1SnapToNearestResponse,
    type V1CalculateDistanceMatrixParams as V1CalculateDistanceMatrixParams,
    type V1CalculateIsochroneParams as V1CalculateIsochroneParams,
    type V1CalculateRouteParams as V1CalculateRouteParams,
    type V1ExecuteOverpassParams as V1ExecuteOverpassParams,
    type V1ExecuteQueryParams as V1ExecuteQueryParams,
    type V1ExecuteSparqlParams as V1ExecuteSparqlParams,
    type V1FindNearbyParams as V1FindNearbyParams,
    type V1GetTileParams as V1GetTileParams,
    type V1ReverseGeocodeParams as V1ReverseGeocodeParams,
    type V1SearchFeaturesParams as V1SearchFeaturesParams,
    type V1SnapToNearestParams as V1SnapToNearestParams,
  };

  export {
    Datasets as Datasets,
    type DatasetResponse as DatasetResponse,
    type FeatureCollection as FeatureCollection,
    type DatasetListResponse as DatasetListResponse,
    type DatasetCreateParams as DatasetCreateParams,
    type DatasetQueryFeaturesParams as DatasetQueryFeaturesParams,
  };

  export {
    Elements as Elements,
    type GeoJsonFeature as GeoJsonFeature,
    type GeoJsonGeometry as GeoJsonGeometry,
    type ElementRetrieveParams as ElementRetrieveParams,
    type ElementFetchBatchParams as ElementFetchBatchParams,
    type ElementQueryParams as ElementQueryParams,
  };

  export {
    Geocode as Geocode,
    type GeocodeAutocompleteResponse as GeocodeAutocompleteResponse,
    type GeocodeForwardResponse as GeocodeForwardResponse,
    type GeocodeReverseResponse as GeocodeReverseResponse,
    type GeocodeAutocompleteParams as GeocodeAutocompleteParams,
    type GeocodeForwardParams as GeocodeForwardParams,
    type GeocodeReverseParams as GeocodeReverseParams,
  };
}

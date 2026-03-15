// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Geocode extends APIResource {
  /**
   * Autocomplete a partial address
   */
  autocomplete(
    query: GeocodeAutocompleteParams,
    options?: RequestOptions,
  ): APIPromise<GeocodeAutocompleteResponse> {
    return this._client.get('/api/v1/geocode/autocomplete', { query, ...options });
  }

  /**
   * Forward geocode an address
   */
  forward(query: GeocodeForwardParams, options?: RequestOptions): APIPromise<GeocodeForwardResponse> {
    return this._client.get('/api/v1/geocode', { query, ...options });
  }

  /**
   * Reverse geocode a coordinate
   */
  reverse(query: GeocodeReverseParams, options?: RequestOptions): APIPromise<GeocodeReverseResponse> {
    return this._client.get('/api/v1/geocode/reverse', { query, ...options });
  }
}

export interface GeocodeAutocompleteResponse {
  results: Array<GeocodeAutocompleteResponse.Result>;
}

export namespace GeocodeAutocompleteResponse {
  export interface Result {
    /**
     * Suggested address or place name
     */
    display_name: string;

    /**
     * Latitude
     */
    lat?: number | null;

    /**
     * Longitude
     */
    lng?: number | null;
  }
}

export interface GeocodeForwardResponse {
  results: Array<GeocodeForwardResponse.Result>;

  /**
   * Number of results
   */
  count?: number;
}

export namespace GeocodeForwardResponse {
  export interface Result {
    /**
     * Formatted address or place name
     */
    display_name: string;

    /**
     * Latitude
     */
    lat: number;

    /**
     * Longitude
     */
    lng: number;

    /**
     * OpenStreetMap ID
     */
    osm_id?: number | null;

    /**
     * OSM element type
     */
    osm_type?: string | null;

    /**
     * Match confidence score
     */
    score?: number | null;
  }
}

export interface GeocodeReverseResponse {
  /**
   * Formatted address
   */
  address: string;

  /**
   * Distance in meters from query point
   */
  distance: number;

  /**
   * Latitude
   */
  lat: number;

  /**
   * Longitude
   */
  lng: number;

  /**
   * OpenStreetMap ID
   */
  osm_id?: number | null;

  /**
   * OSM element type
   */
  osm_type?: string | null;
}

export interface GeocodeAutocompleteParams {
  /**
   * Partial address query
   */
  q: string;

  /**
   * Focus latitude
   */
  lat?: number;

  /**
   * Maximum results (default 10, max 20)
   */
  limit?: number;

  /**
   * Focus longitude
   */
  lng?: number;
}

export interface GeocodeForwardParams {
  /**
   * Address or place name
   */
  q: string;

  /**
   * Focus latitude
   */
  lat?: number;

  /**
   * Maximum results (default 20, max 100)
   */
  limit?: number;

  /**
   * Focus longitude
   */
  lng?: number;
}

export interface GeocodeReverseParams {
  /**
   * Latitude
   */
  lat: number;

  /**
   * Longitude
   */
  lng: number;

  /**
   * Search radius in meters (default 200, max 5000)
   */
  radius?: number;
}

export declare namespace Geocode {
  export {
    type GeocodeAutocompleteResponse as GeocodeAutocompleteResponse,
    type GeocodeForwardResponse as GeocodeForwardResponse,
    type GeocodeReverseResponse as GeocodeReverseResponse,
    type GeocodeAutocompleteParams as GeocodeAutocompleteParams,
    type GeocodeForwardParams as GeocodeForwardParams,
    type GeocodeReverseParams as GeocodeReverseParams,
  };
}

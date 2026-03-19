// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TopLevelAPI from './top-level';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Geocode extends APIResource {
  /**
   * Autocomplete a partial address
   */
  autocomplete(query: GeocodeAutocompleteParams, options?: RequestOptions): APIPromise<AutocompleteResult> {
    return this._client.get('/api/v1/geocode/autocomplete', {
      query,
      ...options,
      headers: buildHeaders([{ Accept: 'application/geo+json' }, options?.headers]),
    });
  }

  /**
   * Batch geocode multiple addresses
   */
  batch(body: GeocodeBatchParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/api/v1/geocode/batch', { body, ...options });
  }

  /**
   * Forward geocode an address
   */
  forward(query: GeocodeForwardParams, options?: RequestOptions): APIPromise<GeocodeResult> {
    return this._client.get('/api/v1/geocode', {
      query,
      ...options,
      headers: buildHeaders([{ Accept: 'application/geo+json' }, options?.headers]),
    });
  }

  /**
   * Reverse geocode a coordinate
   */
  reverse(query: GeocodeReverseParams, options?: RequestOptions): APIPromise<ReverseGeocodeResult> {
    return this._client.get('/api/v1/geocode/reverse', {
      query,
      ...options,
      headers: buildHeaders([{ Accept: 'application/geo+json' }, options?.headers]),
    });
  }
}

/**
 * GeoJSON FeatureCollection of autocomplete suggestions
 */
export interface AutocompleteResult {
  features: Array<GeocodingFeature>;

  type: 'FeatureCollection';
}

/**
 * GeoJSON FeatureCollection of geocoding results
 */
export interface GeocodeResult {
  features: Array<GeocodingFeature>;

  type: 'FeatureCollection';
}

export interface GeocodingFeature {
  geometry: TopLevelAPI.GeoJsonGeometry;

  properties: GeocodingFeature.Properties;

  type: 'Feature';
}

export namespace GeocodingFeature {
  export interface Properties {
    /**
     * ISO 3166-1 alpha-2 country code
     */
    country_code?: string | null;

    /**
     * Formatted address or place name
     */
    display_name?: string;

    /**
     * Distance in meters
     */
    distance_m?: number | null;

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

    /**
     * Result source (address, place, interpolation)
     */
    source?: string | null;
  }
}

/**
 * GeoJSON FeatureCollection of reverse geocoding results
 */
export interface ReverseGeocodeResult {
  features: Array<GeocodingFeature>;

  type: 'FeatureCollection';
}

export type GeocodeBatchResponse = unknown;

export interface GeocodeAutocompleteParams {
  /**
   * Partial address query
   */
  q: string;

  /**
   * ISO 3166-1 alpha-2 country code filter
   */
  country_code?: string;

  /**
   * Language code for localized names (e.g. en, de, fr)
   */
  lang?: string;

  /**
   * Focus latitude
   */
  lat?: number;

  /**
   * Filter by layer: address, poi, or admin
   */
  layer?: string;

  /**
   * Maximum results (default 10, max 20)
   */
  limit?: number;

  /**
   * Focus longitude
   */
  lng?: number;
}

export interface GeocodeBatchParams {
  addresses: Array<string>;
}

export interface GeocodeForwardParams {
  /**
   * Address or place name
   */
  q: string;

  /**
   * Bounding box filter: south,west,north,east
   */
  bbox?: string;

  /**
   * ISO 3166-1 alpha-2 country code filter
   */
  country_code?: string;

  /**
   * Language code for localized names (e.g. en, de, fr)
   */
  lang?: string;

  /**
   * Focus latitude
   */
  lat?: number;

  /**
   * Filter by layer: address, poi, or admin
   */
  layer?: string;

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
   * Language code for localized names (e.g. en, de, fr)
   */
  lang?: string;

  /**
   * Filter by layer: house or poi
   */
  layer?: string;

  /**
   * Maximum results (default 1, max 20)
   */
  limit?: number;

  /**
   * Search radius in meters (default 200, max 5000)
   */
  radius?: number;
}

export declare namespace Geocode {
  export {
    type AutocompleteResult as AutocompleteResult,
    type GeocodeResult as GeocodeResult,
    type GeocodingFeature as GeocodingFeature,
    type ReverseGeocodeResult as ReverseGeocodeResult,
    type GeocodeBatchResponse as GeocodeBatchResponse,
    type GeocodeAutocompleteParams as GeocodeAutocompleteParams,
    type GeocodeBatchParams as GeocodeBatchParams,
    type GeocodeForwardParams as GeocodeForwardParams,
    type GeocodeReverseParams as GeocodeReverseParams,
  };
}

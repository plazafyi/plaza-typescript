// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TopLevelAPI from './top-level';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Geocode extends APIResource {
  /**
   * Autocomplete a partial address
   */
  autocomplete(query: GeocodeAutocompleteParams, options?: RequestOptions): APIPromise<AutocompleteResult> {
    return this._client.get('/api/v1/geocode/autocomplete', { query, ...options });
  }

  /**
   * Autocomplete a partial address
   */
  autocompletePost(
    params: GeocodeAutocompletePostParams,
    options?: RequestOptions,
  ): APIPromise<AutocompleteResult> {
    const { q, country_code, format, lang, lat, layer, limit, lng } = params;
    return this._client.post('/api/v1/geocode/autocomplete', {
      query: { q, country_code, format, lang, lat, layer, limit, lng },
      ...options,
    });
  }

  /**
   * Batch geocode multiple addresses
   */
  batch(body: GeocodeBatchParams, options?: RequestOptions): APIPromise<GeocodeBatchResponse> {
    return this._client.post('/api/v1/geocode/batch', { body, ...options });
  }

  /**
   * Forward geocode an address
   */
  forward(query: GeocodeForwardParams, options?: RequestOptions): APIPromise<GeocodeResult> {
    return this._client.get('/api/v1/geocode', { query, ...options });
  }

  /**
   * Forward geocode an address
   */
  forwardPost(params: GeocodeForwardPostParams, options?: RequestOptions): APIPromise<GeocodeResult> {
    const { q, bbox, country_code, format, lang, lat, layer, limit, lng } = params;
    return this._client.post('/api/v1/geocode', {
      query: { q, bbox, country_code, format, lang, lat, layer, limit, lng },
      ...options,
    });
  }

  /**
   * Reverse geocode a coordinate
   */
  reverse(
    query: GeocodeReverseParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ReverseGeocodeResult> {
    return this._client.get('/api/v1/geocode/reverse', { query, ...options });
  }

  /**
   * Reverse geocode a coordinate
   */
  reversePost(
    params: GeocodeReversePostParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ReverseGeocodeResult> {
    const { format, lang, lat, layer, limit, lng, near, radius } = params ?? {};
    return this._client.post('/api/v1/geocode/reverse', {
      query: { format, lang, lat, layer, limit, lng, near, radius },
      ...options,
    });
  }
}

/**
 * GeoJSON FeatureCollection of autocomplete suggestions for partial address input.
 * Optimized for low-latency type-ahead UIs. Content-Type: `application/geo+json`.
 */
export interface AutocompleteResult {
  /**
   * Autocomplete suggestions ordered by relevance
   */
  features: Array<GeocodingFeature>;

  type: 'FeatureCollection';
}

/**
 * GeoJSON FeatureCollection of forward geocoding results, ordered by relevance.
 * Content-Type: `application/geo+json`.
 */
export interface GeocodeResult {
  /**
   * Geocoding results ordered by relevance score
   */
  features: Array<GeocodingFeature>;

  type: 'FeatureCollection';
}

/**
 * GeoJSON Feature representing a geocoding result. The geometry is always a Point.
 * Properties include the formatted display name, OSM metadata, confidence score,
 * and source type.
 */
export interface GeocodingFeature {
  /**
   * GeoJSON Geometry object per RFC 7946. Coordinates use [longitude, latitude]
   * order. 3D coordinates [lng, lat, elevation] are used for elevation endpoints.
   */
  geometry: TopLevelAPI.GeoJsonGeometry;

  /**
   * Geocoding result properties
   */
  properties: GeocodingFeature.Properties;

  type: 'Feature';
}

export namespace GeocodingFeature {
  /**
   * Geocoding result properties
   */
  export interface Properties {
    /**
     * Formatted address or place name
     */
    display_name: string;

    /**
     * POI category (e.g. restaurant, cafe, park). Present for place results.
     */
    category?: string | null;

    /**
     * City or town name. Present for address results.
     */
    city?: string | null;

    /**
     * Interpolation confidence (0-1). Present only for interpolated results.
     */
    confidence?: number | null;

    /**
     * Country name. Present for reverse geocode address results.
     */
    country?: string | null;

    /**
     * ISO 3166-1 alpha-2 country code
     */
    country_code?: string | null;

    /**
     * Distance from the query point in meters (reverse geocode / nearby only)
     */
    distance_m?: number | null;

    /**
     * Complete formatted address from the database. Present for reverse geocode
     * address results.
     */
    full_address?: string | null;

    /**
     * House or building number. Present for address and interpolated results.
     */
    house_number?: string | null;

    /**
     * Whether this result was estimated by address interpolation rather than an exact
     * database match.
     */
    interpolated?: boolean | null;

    /**
     * Place name (raw). Present for reverse geocode place results.
     */
    name?: string | null;

    /**
     * OpenStreetMap element ID (null for interpolated results)
     */
    osm_id?: number | null;

    /**
     * OSM element type (node, way, relation)
     */
    osm_type?: 'node' | 'way' | 'relation' | null;

    /**
     * Postal code. Present for reverse geocode address results.
     */
    postcode?: string | null;

    /**
     * Relevance score (higher is better). Incorporates text match quality, spatial
     * proximity boost, and popularity signals. Not bounded to 0-1.
     */
    score?: number | null;

    /**
     * Result source indicating how the result was found: structured (exact field
     * match), bm25 (full-text search), fuzzy (trigram similarity), address (reverse
     * geocode address), place (reverse geocode POI), interpolation (estimated from
     * neighboring addresses)
     */
    source?: 'structured' | 'bm25' | 'fuzzy' | 'address' | 'place' | 'interpolation' | null;

    /**
     * State or province name. Present for reverse geocode address results.
     */
    state?: string | null;

    /**
     * Street name. Present for address and interpolated results.
     */
    street?: string | null;

    /**
     * POI subcategory. Present for place results.
     */
    subcategory?: string | null;

    /**
     * Raw OSM tags. Present for place results.
     */
    tags?: { [key: string]: string } | null;

    /**
     * Wikipedia article reference (e.g. en:Eiffel Tower). Present for notable places.
     */
    wikipedia?: string | null;
  }
}

/**
 * GeoJSON FeatureCollection of reverse geocoding results, ordered by distance from
 * the query point. Content-Type: `application/geo+json`.
 */
export interface ReverseGeocodeResult {
  /**
   * Reverse geocoding results ordered by distance
   */
  features: Array<GeocodingFeature>;

  type: 'FeatureCollection';
}

/**
 * Batch geocoding result. Each entry in `results` is a FeatureCollection
 * corresponding to the input address at the same index. Order is preserved.
 */
export interface GeocodeBatchResponse {
  /**
   * Number of addresses processed (always equals length of results)
   */
  count: number;

  /**
   * Array of FeatureCollections, one per input address. Empty FeatureCollections
   * indicate no match.
   */
  results: Array<GeocodeResult>;
}

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
   * Response format: json (default), geojson, csv, ndjson
   */
  format?: string;

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

export interface GeocodeAutocompletePostParams {
  /**
   * Partial address query
   */
  q: string;

  /**
   * ISO 3166-1 alpha-2 country code filter
   */
  country_code?: string;

  /**
   * Response format: json (default), geojson, csv, ndjson
   */
  format?: string;

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
   * Response format: json (default), geojson, csv, ndjson
   */
  format?: string;

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

export interface GeocodeForwardPostParams {
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
   * Response format: json (default), geojson, csv, ndjson
   */
  format?: string;

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
   * Response format: json (default), geojson, csv, ndjson
   */
  format?: string;

  /**
   * Language code for localized names (e.g. en, de, fr)
   */
  lang?: string;

  /**
   * Legacy shorthand. Latitude. Use near param instead.
   */
  lat?: number;

  /**
   * Filter by layer: house or poi
   */
  layer?: string;

  /**
   * Maximum results (default 1, max 20)
   */
  limit?: number;

  /**
   * Legacy shorthand. Longitude. Use near param instead.
   */
  lng?: number;

  /**
   * Point geometry for reverse geocode (lat,lng or GeoJSON). Alternative to lat/lng
   * params.
   */
  near?: string;

  /**
   * Search radius in meters (default 200, max 5000)
   */
  radius?: number;
}

export interface GeocodeReversePostParams {
  /**
   * Response format: json (default), geojson, csv, ndjson
   */
  format?: string;

  /**
   * Language code for localized names (e.g. en, de, fr)
   */
  lang?: string;

  /**
   * Legacy shorthand. Latitude. Use near param instead.
   */
  lat?: number;

  /**
   * Filter by layer: house or poi
   */
  layer?: string;

  /**
   * Maximum results (default 1, max 20)
   */
  limit?: number;

  /**
   * Legacy shorthand. Longitude. Use near param instead.
   */
  lng?: number;

  /**
   * Point geometry for reverse geocode (lat,lng or GeoJSON). Alternative to lat/lng
   * params.
   */
  near?: string;

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
    type GeocodeAutocompletePostParams as GeocodeAutocompletePostParams,
    type GeocodeBatchParams as GeocodeBatchParams,
    type GeocodeForwardParams as GeocodeForwardParams,
    type GeocodeForwardPostParams as GeocodeForwardPostParams,
    type GeocodeReverseParams as GeocodeReverseParams,
    type GeocodeReversePostParams as GeocodeReversePostParams,
  };
}

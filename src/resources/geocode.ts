// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TopLevelAPI from './top-level';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Geocode extends APIResource {
  /**
   * Autocomplete a partial address
   *
   * @example
   * ```ts
   * const autocompleteResult =
   *   await client.geocode.autocomplete({ q: '221B Bak' });
   * ```
   */
  autocomplete(params: GeocodeAutocompleteParams, options?: RequestOptions): APIPromise<AutocompleteResult> {
    const { format, ...body } = params
    return this._client.post('/api/v1/geocode/autocomplete', { query: { format }, body, ...options });
  }

  /**
   * Batch geocode multiple addresses
   *
   * @example
   * ```ts
   * const response = await client.geocode.batch({
   *   addresses: ['string'],
   * });
   * ```
   */
  batch(body: GeocodeBatchParams, options?: RequestOptions): APIPromise<GeocodeBatchResponse> {
    return this._client.post('/api/v1/geocode/batch', { body, ...options });
  }

  /**
   * Forward geocode an address
   *
   * @example
   * ```ts
   * const geocodeResult = await client.geocode.forward({
   *   q: '221B Baker Street, London',
   * });
   * ```
   */
  forward(params: GeocodeForwardParams, options?: RequestOptions): APIPromise<GeocodeResult> {
    const { format, ...body } = params
    return this._client.post('/api/v1/geocode', { query: { format }, body, ...options });
  }

  /**
   * Reverse geocode a coordinate
   *
   * @example
   * ```ts
   * const reverseGeocodeResult = await client.geocode.reverse({
   *   geometry: {
   *     coordinates: [2.3522, 48.8566],
   *     type: 'Point',
   *   },
   * });
   * ```
   */
  reverse(params: GeocodeReverseParams, options?: RequestOptions): APIPromise<ReverseGeocodeResult> {
    const { format, ...body } = params
    return this._client.post('/api/v1/geocode/reverse', { query: { format }, body, ...options });
  }
}

/**
 * Request body for autocomplete suggestions. Optimized for low-latency type-ahead
 * UIs.
 */
export interface AutocompleteRequest {
  /**
   * Partial address or place name input
   */
  q: string;

  /**
   * ISO 3166-1 alpha-2 country code to restrict results
   */
  country_code?: string | null;

  /**
   * GeoJSON Point geometry per RFC 7946. Coordinates use [longitude, latitude]
   * order. Optional third element is altitude in meters.
   */
  focus?: TopLevelAPI.PointGeometry | null;

  /**
   * Preferred response language (ISO 639-1)
   */
  lang?: string | null;

  /**
   * Filter by result layer (e.g. `address`, `place`, `poi`)
   */
  layer?: string | null;

  /**
   * Maximum number of suggestions (default: 5, max: 20)
   */
  limit?: number | null;
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
 * Request body for forward geocoding. Converts an address or place name to
 * coordinates.
 */
export interface GeocodeForwardRequest {
  /**
   * Address or place name to geocode
   */
  q: string;

  /**
   * ISO 3166-1 alpha-2 country code to restrict results
   */
  country_code?: string | null;

  /**
   * GeoJSON Point geometry per RFC 7946. Coordinates use [longitude, latitude]
   * order. Optional third element is altitude in meters.
   */
  focus?: TopLevelAPI.PointGeometry | null;

  /**
   * Preferred response language (ISO 639-1)
   */
  lang?: string | null;

  /**
   * Filter by result layer (e.g. `address`, `place`, `poi`)
   */
  layer?: string | null;

  /**
   * Maximum number of results (default: 5, max: 50)
   */
  limit?: number | null;
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
 * Request body for reverse geocoding. Converts coordinates to addresses or place
 * names.
 */
export interface GeocodeReverseRequest {
  /**
   * GeoJSON Point geometry per RFC 7946. Coordinates use [longitude, latitude]
   * order. Optional third element is altitude in meters.
   */
  geometry: TopLevelAPI.PointGeometry;

  /**
   * Preferred response language (ISO 639-1)
   */
  lang?: string | null;

  /**
   * Maximum number of results (default: 1, max: 50)
   */
  limit?: number | null;

  /**
   * Search radius in meters (default: 100)
   */
  radius?: number | null;
}

/**
 * GeoJSON Feature representing a geocoding result. The geometry is always a Point.
 * Properties include the formatted display name, OSM metadata, confidence score,
 * and source type.
 */
export interface GeocodingFeature {
  /**
   * GeoJSON Geometry object per RFC 7946. Discriminated union — the `type` field
   * determines the coordinate structure.
   */
  geometry: TopLevelAPI.Geometry;

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
     * match), fuzzy (trigram similarity), address (reverse geocode address), place
     * (reverse geocode POI), interpolation (estimated from neighboring addresses)
     */
    source?: 'structured' | 'fuzzy' | 'address' | 'place' | 'interpolation' | null;

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
   * Body param: Partial address or place name input
   */
  q: string;

  /**
   * Query param: Response format: json (default), geojson, csv, ndjson
   */
  format?: string;

  /**
   * Body param: ISO 3166-1 alpha-2 country code to restrict results
   */
  country_code?: string | null;

  /**
   * Body param: GeoJSON Point geometry per RFC 7946. Coordinates use [longitude,
   * latitude] order. Optional third element is altitude in meters.
   */
  focus?: TopLevelAPI.PointGeometry | null;

  /**
   * Body param: Preferred response language (ISO 639-1)
   */
  lang?: string | null;

  /**
   * Body param: Filter by result layer (e.g. `address`, `place`, `poi`)
   */
  layer?: string | null;

  /**
   * Body param: Maximum number of suggestions (default: 5, max: 20)
   */
  limit?: number | null;
}

export interface GeocodeBatchParams {
  addresses: Array<string>;
}

export interface GeocodeForwardParams {
  /**
   * Body param: Address or place name to geocode
   */
  q: string;

  /**
   * Query param: Response format: json (default), geojson, csv, ndjson
   */
  format?: string;

  /**
   * Body param: ISO 3166-1 alpha-2 country code to restrict results
   */
  country_code?: string | null;

  /**
   * Body param: GeoJSON Point geometry per RFC 7946. Coordinates use [longitude,
   * latitude] order. Optional third element is altitude in meters.
   */
  focus?: TopLevelAPI.PointGeometry | null;

  /**
   * Body param: Preferred response language (ISO 639-1)
   */
  lang?: string | null;

  /**
   * Body param: Filter by result layer (e.g. `address`, `place`, `poi`)
   */
  layer?: string | null;

  /**
   * Body param: Maximum number of results (default: 5, max: 50)
   */
  limit?: number | null;
}

export interface GeocodeReverseParams {
  /**
   * Body param: GeoJSON Point geometry per RFC 7946. Coordinates use [longitude,
   * latitude] order. Optional third element is altitude in meters.
   */
  geometry: TopLevelAPI.PointGeometry;

  /**
   * Query param: Response format: json (default), geojson, csv, ndjson
   */
  format?: string;

  /**
   * Body param: Preferred response language (ISO 639-1)
   */
  lang?: string | null;

  /**
   * Body param: Maximum number of results (default: 1, max: 50)
   */
  limit?: number | null;

  /**
   * Body param: Search radius in meters (default: 100)
   */
  radius?: number | null;
}

export declare namespace Geocode {
  export {
    type AutocompleteRequest as AutocompleteRequest,
    type AutocompleteResult as AutocompleteResult,
    type GeocodeForwardRequest as GeocodeForwardRequest,
    type GeocodeResult as GeocodeResult,
    type GeocodeReverseRequest as GeocodeReverseRequest,
    type GeocodingFeature as GeocodingFeature,
    type ReverseGeocodeResult as ReverseGeocodeResult,
    type GeocodeBatchResponse as GeocodeBatchResponse,
    type GeocodeAutocompleteParams as GeocodeAutocompleteParams,
    type GeocodeBatchParams as GeocodeBatchParams,
    type GeocodeForwardParams as GeocodeForwardParams,
    type GeocodeReverseParams as GeocodeReverseParams
  };
}

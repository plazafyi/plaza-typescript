// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Tiles extends APIResource {
  /**
   * Get a Mapbox Vector Tile
   */
  get(y: number, params: TileGetParams, options?: RequestOptions): APIPromise<Response> {
    const { z, x } = params;
    return this._client.get(path`/api/v1/tiles/${z}/${x}/${y}`, {
      ...options,
      headers: buildHeaders([{ Accept: 'application/vnd.mapbox-vector-tile' }, options?.headers]),
      __binaryResponse: true,
    });
  }
}

export interface TileGetParams {
  /**
   * Zoom level (0-22)
   */
  z: number;

  /**
   * Tile X coordinate
   */
  x: number;
}

export declare namespace Tiles {
  export { type TileGetParams as TileGetParams };
}

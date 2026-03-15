// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Plaza } from '../client';

export abstract class APIResource {
  protected _client: Plaza;

  constructor(client: Plaza) {
    this._client = client;
  }
}

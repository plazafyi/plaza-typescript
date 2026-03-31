// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
  perLanguage?: Record<string, PerLanguageData>;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'retrieve',
    endpoint: '/api/v1/features/{type}/{id}',
    httpMethod: 'get',
    summary: 'Get feature by type and ID',
    description: 'Get feature by type and ID',
    stainlessPath: '(resource) elements > (method) retrieve',
    qualified: 'client.elements.retrieve',
    params: ['type: string;', 'id: number;'],
    response:
      "{ geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: object; type: 'Feature'; id?: string; }",
    markdown:
      "## retrieve\n\n`client.elements.retrieve(type: string, id: number): { geometry: geo_json_geometry; properties: object; type: 'Feature'; id?: string; }`\n\n**get** `/api/v1/features/{type}/{id}`\n\nGet feature by type and ID\n\n### Parameters\n\n- `type: string`\n\n- `id: number`\n\n### Returns\n\n- `{ geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: object; type: 'Feature'; id?: string; }`\n  GeoJSON Feature representing an OSM element. Tags from the original OSM element are flattened directly into `properties` (not nested under a `tags` key). Metadata fields `@type` and `@id` identify the OSM element type and ID within properties.\n\n\n  - `geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }`\n  - `properties: object`\n  - `type: 'Feature'`\n  - `id?: string`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst geoJsonFeature = await client.elements.retrieve(0, { type: 'type' });\n\nconsole.log(geoJsonFeature);\n```",
  },
  {
    name: 'batch',
    endpoint: '/api/v1/features/batch',
    httpMethod: 'post',
    summary: 'Fetch multiple features by type and ID',
    description: 'Fetch multiple features by type and ID',
    stainlessPath: '(resource) elements > (method) batch',
    qualified: 'client.elements.batch',
    params: ["elements: { id: number; type: 'node' | 'way' | 'relation'; }[];"],
    response:
      "{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; id?: string; }[]; type: 'FeatureCollection'; }",
    markdown:
      "## batch\n\n`client.elements.batch(elements: { id: number; type: 'node' | 'way' | 'relation'; }[]): { features: geo_json_feature[]; type: 'FeatureCollection'; }`\n\n**post** `/api/v1/features/batch`\n\nFetch multiple features by type and ID\n\n### Parameters\n\n- `elements: { id: number; type: 'node' | 'way' | 'relation'; }[]`\n  Array of element references to fetch\n\n### Returns\n\n- `{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; id?: string; }[]; type: 'FeatureCollection'; }`\n  GeoJSON FeatureCollection (RFC 7946). For paginated endpoints, metadata is returned in HTTP response headers rather than the body:\n\n| Header | Description |\n|---|---|\n| `X-Limit` | Requested result limit |\n| `X-Has-More` | `true` if more results exist |\n| `X-Next-Cursor` | Opaque cursor for next page (cursor pagination) |\n| `X-Next-Offset` | Numeric offset for next page (offset pagination) |\n| `Link` | RFC 8288 `rel=\"next\"` link to the next page |\n\nContent-Type is `application/geo+json`.\n\n\n  - `features: { geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: object; type: 'Feature'; id?: string; }[]`\n  - `type: 'FeatureCollection'`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst featureCollection = await client.elements.batch({ elements: [{ id: 21154906, type: 'node' }, { id: 4589123, type: 'way' }] });\n\nconsole.log(featureCollection);\n```",
  },
  {
    name: 'lookup',
    endpoint: '/api/v1/features/lookup',
    httpMethod: 'post',
    summary: 'Get feature by type and ID',
    description: 'Get feature by type and ID',
    stainlessPath: '(resource) elements > (method) lookup',
    qualified: 'client.elements.lookup',
    response:
      "{ geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: object; type: 'Feature'; id?: string; }",
    markdown:
      "## lookup\n\n`client.elements.lookup(): { geometry: geo_json_geometry; properties: object; type: 'Feature'; id?: string; }`\n\n**post** `/api/v1/features/lookup`\n\nGet feature by type and ID\n\n### Returns\n\n- `{ geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: object; type: 'Feature'; id?: string; }`\n  GeoJSON Feature representing an OSM element. Tags from the original OSM element are flattened directly into `properties` (not nested under a `tags` key). Metadata fields `@type` and `@id` identify the OSM element type and ID within properties.\n\n\n  - `geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }`\n  - `properties: object`\n  - `type: 'Feature'`\n  - `id?: string`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst geoJsonFeature = await client.elements.lookup();\n\nconsole.log(geoJsonFeature);\n```",
  },
  {
    name: 'nearby',
    endpoint: '/api/v1/features/nearby',
    httpMethod: 'get',
    summary: 'Find features near a geographic point',
    description: 'Find features near a geographic point',
    stainlessPath: '(resource) elements > (method) nearby',
    qualified: 'client.elements.nearby',
    params: [
      'lat?: number;',
      'limit?: number;',
      'lng?: number;',
      'near?: string;',
      'output[buffer]?: number;',
      'output[centroid]?: boolean;',
      'output[fields]?: string;',
      'output[geometry]?: boolean;',
      'output[include]?: string;',
      'output[precision]?: number;',
      'output[simplify]?: number;',
      'output[sort]?: string;',
      'radius?: number;',
    ],
    response:
      "{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; id?: string; }[]; type: 'FeatureCollection'; }",
    markdown:
      "## nearby\n\n`client.elements.nearby(lat?: number, limit?: number, lng?: number, near?: string, output[buffer]?: number, output[centroid]?: boolean, output[fields]?: string, output[geometry]?: boolean, output[include]?: string, output[precision]?: number, output[simplify]?: number, output[sort]?: string, radius?: number): { features: geo_json_feature[]; type: 'FeatureCollection'; }`\n\n**get** `/api/v1/features/nearby`\n\nFind features near a geographic point\n\n### Parameters\n\n- `lat?: number`\n  Legacy shorthand. Latitude (-90 to 90). Use near param instead.\n\n- `limit?: number`\n  Maximum results (default 20, max 100)\n\n- `lng?: number`\n  Legacy shorthand. Longitude (-180 to 180). Use near param instead.\n\n- `near?: string`\n  Point geometry for proximity search (lat,lng or GeoJSON). Alternative to lat/lng params.\n\n- `output[buffer]?: number`\n  Buffer geometry by meters\n\n- `output[centroid]?: boolean`\n  Replace geometry with centroid\n\n- `output[fields]?: string`\n  Comma-separated property fields to include\n\n- `output[geometry]?: boolean`\n  Include geometry (default true)\n\n- `output[include]?: string`\n  Extra computed fields: bbox, distance, center\n\n- `output[precision]?: number`\n  Coordinate decimal precision (1-15, default 7)\n\n- `output[simplify]?: number`\n  Simplify geometry tolerance in meters\n\n- `output[sort]?: string`\n  Sort by: distance, name, osm_id\n\n- `radius?: number`\n  Search radius in meters (default 500, max 10000)\n\n### Returns\n\n- `{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; id?: string; }[]; type: 'FeatureCollection'; }`\n  GeoJSON FeatureCollection (RFC 7946). For paginated endpoints, metadata is returned in HTTP response headers rather than the body:\n\n| Header | Description |\n|---|---|\n| `X-Limit` | Requested result limit |\n| `X-Has-More` | `true` if more results exist |\n| `X-Next-Cursor` | Opaque cursor for next page (cursor pagination) |\n| `X-Next-Offset` | Numeric offset for next page (offset pagination) |\n| `Link` | RFC 8288 `rel=\"next\"` link to the next page |\n\nContent-Type is `application/geo+json`.\n\n\n  - `features: { geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: object; type: 'Feature'; id?: string; }[]`\n  - `type: 'FeatureCollection'`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst featureCollection = await client.elements.nearby();\n\nconsole.log(featureCollection);\n```",
  },
  {
    name: 'nearby_post',
    endpoint: '/api/v1/features/nearby',
    httpMethod: 'post',
    summary: 'Find features near a geographic point',
    description: 'Find features near a geographic point',
    stainlessPath: '(resource) elements > (method) nearby_post',
    qualified: 'client.elements.nearbyPost',
    params: [
      'lat?: number;',
      'limit?: number;',
      'lng?: number;',
      'near?: string;',
      'output[buffer]?: number;',
      'output[centroid]?: boolean;',
      'output[fields]?: string;',
      'output[geometry]?: boolean;',
      'output[include]?: string;',
      'output[precision]?: number;',
      'output[simplify]?: number;',
      'output[sort]?: string;',
      'radius?: number;',
    ],
    response:
      "{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; id?: string; }[]; type: 'FeatureCollection'; }",
    markdown:
      "## nearby_post\n\n`client.elements.nearbyPost(lat?: number, limit?: number, lng?: number, near?: string, output[buffer]?: number, output[centroid]?: boolean, output[fields]?: string, output[geometry]?: boolean, output[include]?: string, output[precision]?: number, output[simplify]?: number, output[sort]?: string, radius?: number): { features: geo_json_feature[]; type: 'FeatureCollection'; }`\n\n**post** `/api/v1/features/nearby`\n\nFind features near a geographic point\n\n### Parameters\n\n- `lat?: number`\n  Legacy shorthand. Latitude (-90 to 90). Use near param instead.\n\n- `limit?: number`\n  Maximum results (default 20, max 100)\n\n- `lng?: number`\n  Legacy shorthand. Longitude (-180 to 180). Use near param instead.\n\n- `near?: string`\n  Point geometry for proximity search (lat,lng or GeoJSON). Alternative to lat/lng params.\n\n- `output[buffer]?: number`\n  Buffer geometry by meters\n\n- `output[centroid]?: boolean`\n  Replace geometry with centroid\n\n- `output[fields]?: string`\n  Comma-separated property fields to include\n\n- `output[geometry]?: boolean`\n  Include geometry (default true)\n\n- `output[include]?: string`\n  Extra computed fields: bbox, distance, center\n\n- `output[precision]?: number`\n  Coordinate decimal precision (1-15, default 7)\n\n- `output[simplify]?: number`\n  Simplify geometry tolerance in meters\n\n- `output[sort]?: string`\n  Sort by: distance, name, osm_id\n\n- `radius?: number`\n  Search radius in meters (default 500, max 10000)\n\n### Returns\n\n- `{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; id?: string; }[]; type: 'FeatureCollection'; }`\n  GeoJSON FeatureCollection (RFC 7946). For paginated endpoints, metadata is returned in HTTP response headers rather than the body:\n\n| Header | Description |\n|---|---|\n| `X-Limit` | Requested result limit |\n| `X-Has-More` | `true` if more results exist |\n| `X-Next-Cursor` | Opaque cursor for next page (cursor pagination) |\n| `X-Next-Offset` | Numeric offset for next page (offset pagination) |\n| `Link` | RFC 8288 `rel=\"next\"` link to the next page |\n\nContent-Type is `application/geo+json`.\n\n\n  - `features: { geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: object; type: 'Feature'; id?: string; }[]`\n  - `type: 'FeatureCollection'`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst featureCollection = await client.elements.nearbyPost();\n\nconsole.log(featureCollection);\n```",
  },
  {
    name: 'query',
    endpoint: '/api/v1/features',
    httpMethod: 'get',
    summary: 'Query features by spatial predicate, bounding box, or H3 cell',
    description: 'Query features by spatial predicate, bounding box, or H3 cell',
    stainlessPath: '(resource) elements > (method) query',
    qualified: 'client.elements.query',
    params: [
      'bbox?: string;',
      'contains?: string;',
      'crosses?: string;',
      'cursor?: string;',
      'format?: string;',
      'h3?: string;',
      'intersects?: string;',
      'limit?: number;',
      'near?: string;',
      'output[buffer]?: number;',
      'output[centroid]?: boolean;',
      'output[fields]?: string;',
      'output[geometry]?: boolean;',
      'output[include]?: string;',
      'output[precision]?: number;',
      'output[simplify]?: number;',
      'output[sort]?: string;',
      'radius?: number;',
      'touches?: string;',
      'type?: string;',
      'within?: string;',
    ],
    response:
      "{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; id?: string; }[]; type: 'FeatureCollection'; }",
    markdown:
      "## query\n\n`client.elements.query(bbox?: string, contains?: string, crosses?: string, cursor?: string, format?: string, h3?: string, intersects?: string, limit?: number, near?: string, output[buffer]?: number, output[centroid]?: boolean, output[fields]?: string, output[geometry]?: boolean, output[include]?: string, output[precision]?: number, output[simplify]?: number, output[sort]?: string, radius?: number, touches?: string, type?: string, within?: string): { features: geo_json_feature[]; type: 'FeatureCollection'; }`\n\n**get** `/api/v1/features`\n\nQuery features by spatial predicate, bounding box, or H3 cell\n\n### Parameters\n\n- `bbox?: string`\n  Legacy shorthand. Bounding box: south,west,north,east. Use spatial predicates (near, within, intersects) instead.\n\n- `contains?: string`\n  Geometry that features must contain\n\n- `crosses?: string`\n  Geometry that features must cross\n\n- `cursor?: string`\n  Cursor for pagination\n\n- `format?: string`\n  Response format. json (default) returns paginated GeoJSON. geojson/csv/ndjson stream via chunked transfer encoding.\n\n- `h3?: string`\n  Legacy shorthand. H3 cell index. Use spatial predicates instead.\n\n- `intersects?: string`\n  Geometry that features must intersect\n\n- `limit?: number`\n  Maximum results (default 100, max 10000)\n\n- `near?: string`\n  Point geometry for proximity search (lat,lng). Requires radius.\n\n- `output[buffer]?: number`\n  Buffer geometry by meters\n\n- `output[centroid]?: boolean`\n  Replace geometry with centroid\n\n- `output[fields]?: string`\n  Comma-separated property fields to include\n\n- `output[geometry]?: boolean`\n  Include geometry (default true)\n\n- `output[include]?: string`\n  Extra computed fields: bbox, distance, center\n\n- `output[precision]?: number`\n  Coordinate decimal precision (1-15, default 7)\n\n- `output[simplify]?: number`\n  Simplify geometry tolerance in meters\n\n- `output[sort]?: string`\n  Sort by: distance, name, osm_id\n\n- `radius?: number`\n  Search radius in meters (for near) or buffer distance (for other predicates)\n\n- `touches?: string`\n  Geometry that features must touch\n\n- `type?: string`\n  Element types (comma-separated: node,way,relation)\n\n- `within?: string`\n  Geometry that features must be within\n\n### Returns\n\n- `{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; id?: string; }[]; type: 'FeatureCollection'; }`\n  GeoJSON FeatureCollection (RFC 7946). For paginated endpoints, metadata is returned in HTTP response headers rather than the body:\n\n| Header | Description |\n|---|---|\n| `X-Limit` | Requested result limit |\n| `X-Has-More` | `true` if more results exist |\n| `X-Next-Cursor` | Opaque cursor for next page (cursor pagination) |\n| `X-Next-Offset` | Numeric offset for next page (offset pagination) |\n| `Link` | RFC 8288 `rel=\"next\"` link to the next page |\n\nContent-Type is `application/geo+json`.\n\n\n  - `features: { geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: object; type: 'Feature'; id?: string; }[]`\n  - `type: 'FeatureCollection'`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst featureCollection = await client.elements.query();\n\nconsole.log(featureCollection);\n```",
  },
  {
    name: 'query_post',
    endpoint: '/api/v1/features',
    httpMethod: 'post',
    summary: 'Query features by spatial predicate, bounding box, or H3 cell',
    description: 'Query features by spatial predicate, bounding box, or H3 cell',
    stainlessPath: '(resource) elements > (method) query_post',
    qualified: 'client.elements.queryPost',
    params: [
      'bbox?: string;',
      'contains?: string;',
      'crosses?: string;',
      'cursor?: string;',
      'format?: string;',
      'h3?: string;',
      'intersects?: string;',
      'limit?: number;',
      'near?: string;',
      'output[buffer]?: number;',
      'output[centroid]?: boolean;',
      'output[fields]?: string;',
      'output[geometry]?: boolean;',
      'output[include]?: string;',
      'output[precision]?: number;',
      'output[simplify]?: number;',
      'output[sort]?: string;',
      'radius?: number;',
      'touches?: string;',
      'type?: string;',
      'within?: string;',
    ],
    response:
      "{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; id?: string; }[]; type: 'FeatureCollection'; }",
    markdown:
      "## query_post\n\n`client.elements.queryPost(bbox?: string, contains?: string, crosses?: string, cursor?: string, format?: string, h3?: string, intersects?: string, limit?: number, near?: string, output[buffer]?: number, output[centroid]?: boolean, output[fields]?: string, output[geometry]?: boolean, output[include]?: string, output[precision]?: number, output[simplify]?: number, output[sort]?: string, radius?: number, touches?: string, type?: string, within?: string): { features: geo_json_feature[]; type: 'FeatureCollection'; }`\n\n**post** `/api/v1/features`\n\nQuery features by spatial predicate, bounding box, or H3 cell\n\n### Parameters\n\n- `bbox?: string`\n  Legacy shorthand. Bounding box: south,west,north,east. Use spatial predicates (near, within, intersects) instead.\n\n- `contains?: string`\n  Geometry that features must contain\n\n- `crosses?: string`\n  Geometry that features must cross\n\n- `cursor?: string`\n  Cursor for pagination\n\n- `format?: string`\n  Response format. json (default) returns paginated GeoJSON. geojson/csv/ndjson stream via chunked transfer encoding.\n\n- `h3?: string`\n  Legacy shorthand. H3 cell index. Use spatial predicates instead.\n\n- `intersects?: string`\n  Geometry that features must intersect\n\n- `limit?: number`\n  Maximum results (default 100, max 10000)\n\n- `near?: string`\n  Point geometry for proximity search (lat,lng). Requires radius.\n\n- `output[buffer]?: number`\n  Buffer geometry by meters\n\n- `output[centroid]?: boolean`\n  Replace geometry with centroid\n\n- `output[fields]?: string`\n  Comma-separated property fields to include\n\n- `output[geometry]?: boolean`\n  Include geometry (default true)\n\n- `output[include]?: string`\n  Extra computed fields: bbox, distance, center\n\n- `output[precision]?: number`\n  Coordinate decimal precision (1-15, default 7)\n\n- `output[simplify]?: number`\n  Simplify geometry tolerance in meters\n\n- `output[sort]?: string`\n  Sort by: distance, name, osm_id\n\n- `radius?: number`\n  Search radius in meters (for near) or buffer distance (for other predicates)\n\n- `touches?: string`\n  Geometry that features must touch\n\n- `type?: string`\n  Element types (comma-separated: node,way,relation)\n\n- `within?: string`\n  Geometry that features must be within\n\n### Returns\n\n- `{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; id?: string; }[]; type: 'FeatureCollection'; }`\n  GeoJSON FeatureCollection (RFC 7946). For paginated endpoints, metadata is returned in HTTP response headers rather than the body:\n\n| Header | Description |\n|---|---|\n| `X-Limit` | Requested result limit |\n| `X-Has-More` | `true` if more results exist |\n| `X-Next-Cursor` | Opaque cursor for next page (cursor pagination) |\n| `X-Next-Offset` | Numeric offset for next page (offset pagination) |\n| `Link` | RFC 8288 `rel=\"next\"` link to the next page |\n\nContent-Type is `application/geo+json`.\n\n\n  - `features: { geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: object; type: 'Feature'; id?: string; }[]`\n  - `type: 'FeatureCollection'`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst featureCollection = await client.elements.queryPost();\n\nconsole.log(featureCollection);\n```",
  },
  {
    name: 'create',
    endpoint: '/api/v1/datasets',
    httpMethod: 'post',
    summary: 'Create a new dataset (admin only)',
    description: 'Create a new dataset (admin only)',
    stainlessPath: '(resource) datasets > (method) create',
    qualified: 'client.datasets.create',
    params: [
      'name: string;',
      'slug: string;',
      'attribution?: string;',
      'description?: string;',
      'license?: string;',
      'source_url?: string;',
    ],
    response:
      '{ id: string; inserted_at: string; name: string; slug: string; updated_at: string; attribution?: string; description?: string; license?: string; source_url?: string; }',
    markdown:
      "## create\n\n`client.datasets.create(name: string, slug: string, attribution?: string, description?: string, license?: string, source_url?: string): { id: string; inserted_at: string; name: string; slug: string; updated_at: string; attribution?: string; description?: string; license?: string; source_url?: string; }`\n\n**post** `/api/v1/datasets`\n\nCreate a new dataset (admin only)\n\n### Parameters\n\n- `name: string`\n  Human-readable dataset name\n\n- `slug: string`\n  URL-friendly identifier (lowercase, hyphens, no spaces)\n\n- `attribution?: string`\n  Required attribution text\n\n- `description?: string`\n  Dataset description\n\n- `license?: string`\n  License identifier (e.g. CC-BY-4.0)\n\n- `source_url?: string`\n  Source data URL\n\n### Returns\n\n- `{ id: string; inserted_at: string; name: string; slug: string; updated_at: string; attribution?: string; description?: string; license?: string; source_url?: string; }`\n  Metadata for a custom dataset. Datasets contain user-uploaded geospatial features separate from the OSM data.\n\n  - `id: string`\n  - `inserted_at: string`\n  - `name: string`\n  - `slug: string`\n  - `updated_at: string`\n  - `attribution?: string`\n  - `description?: string`\n  - `license?: string`\n  - `source_url?: string`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst dataset = await client.datasets.create({ name: 'NYC Bike Lanes', slug: 'nyc-bike-lanes' });\n\nconsole.log(dataset);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/api/v1/datasets/{id}',
    httpMethod: 'get',
    summary: 'Get dataset by ID',
    description: 'Get dataset by ID',
    stainlessPath: '(resource) datasets > (method) retrieve',
    qualified: 'client.datasets.retrieve',
    params: ['id: string;'],
    response:
      '{ id: string; inserted_at: string; name: string; slug: string; updated_at: string; attribution?: string; description?: string; license?: string; source_url?: string; }',
    markdown:
      "## retrieve\n\n`client.datasets.retrieve(id: string): { id: string; inserted_at: string; name: string; slug: string; updated_at: string; attribution?: string; description?: string; license?: string; source_url?: string; }`\n\n**get** `/api/v1/datasets/{id}`\n\nGet dataset by ID\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; inserted_at: string; name: string; slug: string; updated_at: string; attribution?: string; description?: string; license?: string; source_url?: string; }`\n  Metadata for a custom dataset. Datasets contain user-uploaded geospatial features separate from the OSM data.\n\n  - `id: string`\n  - `inserted_at: string`\n  - `name: string`\n  - `slug: string`\n  - `updated_at: string`\n  - `attribution?: string`\n  - `description?: string`\n  - `license?: string`\n  - `source_url?: string`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst dataset = await client.datasets.retrieve('id');\n\nconsole.log(dataset);\n```",
  },
  {
    name: 'list',
    endpoint: '/api/v1/datasets',
    httpMethod: 'get',
    summary: 'List all datasets',
    description: 'List all datasets',
    stainlessPath: '(resource) datasets > (method) list',
    qualified: 'client.datasets.list',
    response:
      '{ datasets: { id: string; inserted_at: string; name: string; slug: string; updated_at: string; attribution?: string; description?: string; license?: string; source_url?: string; }[]; }',
    markdown:
      "## list\n\n`client.datasets.list(): { datasets: dataset[]; }`\n\n**get** `/api/v1/datasets`\n\nList all datasets\n\n### Returns\n\n- `{ datasets: { id: string; inserted_at: string; name: string; slug: string; updated_at: string; attribution?: string; description?: string; license?: string; source_url?: string; }[]; }`\n  List of all available datasets.\n\n  - `datasets: { id: string; inserted_at: string; name: string; slug: string; updated_at: string; attribution?: string; description?: string; license?: string; source_url?: string; }[]`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst datasetList = await client.datasets.list();\n\nconsole.log(datasetList);\n```",
  },
  {
    name: 'delete',
    endpoint: '/api/v1/datasets/{id}',
    httpMethod: 'delete',
    summary: 'Delete a dataset',
    description: 'Delete a dataset',
    stainlessPath: '(resource) datasets > (method) delete',
    qualified: 'client.datasets.delete',
    params: ['id: string;'],
    markdown:
      "## delete\n\n`client.datasets.delete(id: string): void`\n\n**delete** `/api/v1/datasets/{id}`\n\nDelete a dataset\n\n### Parameters\n\n- `id: string`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nawait client.datasets.delete('id')\n```",
  },
  {
    name: 'features',
    endpoint: '/api/v1/datasets/{id}/features',
    httpMethod: 'get',
    summary: 'Query features in a dataset',
    description: 'Query features in a dataset',
    stainlessPath: '(resource) datasets > (method) features',
    qualified: 'client.datasets.features',
    params: [
      'id: string;',
      'cursor?: string;',
      'format?: string;',
      'limit?: number;',
      'output[buffer]?: number;',
      'output[centroid]?: boolean;',
      'output[fields]?: string;',
      'output[geometry]?: boolean;',
      'output[include]?: string;',
      'output[precision]?: number;',
      'output[simplify]?: number;',
      'output[sort]?: string;',
    ],
    response:
      "{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; id?: string; }[]; type: 'FeatureCollection'; }",
    markdown:
      "## features\n\n`client.datasets.features(id: string, cursor?: string, format?: string, limit?: number, output[buffer]?: number, output[centroid]?: boolean, output[fields]?: string, output[geometry]?: boolean, output[include]?: string, output[precision]?: number, output[simplify]?: number, output[sort]?: string): { features: geo_json_feature[]; type: 'FeatureCollection'; }`\n\n**get** `/api/v1/datasets/{id}/features`\n\nQuery features in a dataset\n\n### Parameters\n\n- `id: string`\n\n- `cursor?: string`\n  Cursor for pagination\n\n- `format?: string`\n  Response format: json (default), geojson, csv, ndjson\n\n- `limit?: number`\n  Maximum results\n\n- `output[buffer]?: number`\n  Buffer geometry by meters\n\n- `output[centroid]?: boolean`\n  Replace geometry with centroid\n\n- `output[fields]?: string`\n  Comma-separated property fields to include\n\n- `output[geometry]?: boolean`\n  Include geometry (default true)\n\n- `output[include]?: string`\n  Extra computed fields: bbox, distance, center\n\n- `output[precision]?: number`\n  Coordinate decimal precision (1-15, default 7)\n\n- `output[simplify]?: number`\n  Simplify geometry tolerance in meters\n\n- `output[sort]?: string`\n  Sort by: distance, name, osm_id\n\n### Returns\n\n- `{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; id?: string; }[]; type: 'FeatureCollection'; }`\n  GeoJSON FeatureCollection (RFC 7946). For paginated endpoints, metadata is returned in HTTP response headers rather than the body:\n\n| Header | Description |\n|---|---|\n| `X-Limit` | Requested result limit |\n| `X-Has-More` | `true` if more results exist |\n| `X-Next-Cursor` | Opaque cursor for next page (cursor pagination) |\n| `X-Next-Offset` | Numeric offset for next page (offset pagination) |\n| `Link` | RFC 8288 `rel=\"next\"` link to the next page |\n\nContent-Type is `application/geo+json`.\n\n\n  - `features: { geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: object; type: 'Feature'; id?: string; }[]`\n  - `type: 'FeatureCollection'`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst featureCollection = await client.datasets.features('id');\n\nconsole.log(featureCollection);\n```",
  },
  {
    name: 'autocomplete',
    endpoint: '/api/v1/geocode/autocomplete',
    httpMethod: 'get',
    summary: 'Autocomplete a partial address',
    description: 'Autocomplete a partial address',
    stainlessPath: '(resource) geocode > (method) autocomplete',
    qualified: 'client.geocode.autocomplete',
    params: [
      'q: string;',
      'country_code?: string;',
      'format?: string;',
      'lang?: string;',
      'lat?: number;',
      'layer?: string;',
      'limit?: number;',
      'lng?: number;',
    ],
    response:
      "{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; }[]; type: 'FeatureCollection'; }",
    markdown:
      "## autocomplete\n\n`client.geocode.autocomplete(q: string, country_code?: string, format?: string, lang?: string, lat?: number, layer?: string, limit?: number, lng?: number): { features: geocoding_feature[]; type: 'FeatureCollection'; }`\n\n**get** `/api/v1/geocode/autocomplete`\n\nAutocomplete a partial address\n\n### Parameters\n\n- `q: string`\n  Partial address query\n\n- `country_code?: string`\n  ISO 3166-1 alpha-2 country code filter\n\n- `format?: string`\n  Response format: json (default), geojson, csv, ndjson\n\n- `lang?: string`\n  Language code for localized names (e.g. en, de, fr)\n\n- `lat?: number`\n  Focus latitude\n\n- `layer?: string`\n  Filter by layer: address, poi, or admin\n\n- `limit?: number`\n  Maximum results (default 10, max 20)\n\n- `lng?: number`\n  Focus longitude\n\n### Returns\n\n- `{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; }[]; type: 'FeatureCollection'; }`\n  GeoJSON FeatureCollection of autocomplete suggestions for partial address input. Optimized for low-latency type-ahead UIs. Content-Type: `application/geo+json`.\n\n  - `features: { geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: { display_name: string; category?: string; city?: string; confidence?: number; country?: string; country_code?: string; distance_m?: number; full_address?: string; house_number?: string; interpolated?: boolean; name?: string; osm_id?: number; osm_type?: 'node' | 'way' | 'relation'; postcode?: string; score?: number; source?: 'structured' | 'bm25' | 'fuzzy' | 'address' | 'place' | 'interpolation'; state?: string; street?: string; subcategory?: string; tags?: object; wikipedia?: string; }; type: 'Feature'; }[]`\n  - `type: 'FeatureCollection'`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst autocompleteResult = await client.geocode.autocomplete({ q: 'q' });\n\nconsole.log(autocompleteResult);\n```",
  },
  {
    name: 'autocomplete_post',
    endpoint: '/api/v1/geocode/autocomplete',
    httpMethod: 'post',
    summary: 'Autocomplete a partial address',
    description: 'Autocomplete a partial address',
    stainlessPath: '(resource) geocode > (method) autocomplete_post',
    qualified: 'client.geocode.autocompletePost',
    params: [
      'q: string;',
      'country_code?: string;',
      'format?: string;',
      'lang?: string;',
      'lat?: number;',
      'layer?: string;',
      'limit?: number;',
      'lng?: number;',
    ],
    response:
      "{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; }[]; type: 'FeatureCollection'; }",
    markdown:
      "## autocomplete_post\n\n`client.geocode.autocompletePost(q: string, country_code?: string, format?: string, lang?: string, lat?: number, layer?: string, limit?: number, lng?: number): { features: geocoding_feature[]; type: 'FeatureCollection'; }`\n\n**post** `/api/v1/geocode/autocomplete`\n\nAutocomplete a partial address\n\n### Parameters\n\n- `q: string`\n  Partial address query\n\n- `country_code?: string`\n  ISO 3166-1 alpha-2 country code filter\n\n- `format?: string`\n  Response format: json (default), geojson, csv, ndjson\n\n- `lang?: string`\n  Language code for localized names (e.g. en, de, fr)\n\n- `lat?: number`\n  Focus latitude\n\n- `layer?: string`\n  Filter by layer: address, poi, or admin\n\n- `limit?: number`\n  Maximum results (default 10, max 20)\n\n- `lng?: number`\n  Focus longitude\n\n### Returns\n\n- `{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; }[]; type: 'FeatureCollection'; }`\n  GeoJSON FeatureCollection of autocomplete suggestions for partial address input. Optimized for low-latency type-ahead UIs. Content-Type: `application/geo+json`.\n\n  - `features: { geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: { display_name: string; category?: string; city?: string; confidence?: number; country?: string; country_code?: string; distance_m?: number; full_address?: string; house_number?: string; interpolated?: boolean; name?: string; osm_id?: number; osm_type?: 'node' | 'way' | 'relation'; postcode?: string; score?: number; source?: 'structured' | 'bm25' | 'fuzzy' | 'address' | 'place' | 'interpolation'; state?: string; street?: string; subcategory?: string; tags?: object; wikipedia?: string; }; type: 'Feature'; }[]`\n  - `type: 'FeatureCollection'`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst autocompleteResult = await client.geocode.autocompletePost({ q: 'q' });\n\nconsole.log(autocompleteResult);\n```",
  },
  {
    name: 'batch',
    endpoint: '/api/v1/geocode/batch',
    httpMethod: 'post',
    summary: 'Batch geocode multiple addresses',
    description: 'Batch geocode multiple addresses',
    stainlessPath: '(resource) geocode > (method) batch',
    qualified: 'client.geocode.batch',
    params: ['addresses: string[];'],
    response: "{ count: number; results: { features: geocoding_feature[]; type: 'FeatureCollection'; }[]; }",
    markdown:
      "## batch\n\n`client.geocode.batch(addresses: string[]): { count: number; results: geocode_result[]; }`\n\n**post** `/api/v1/geocode/batch`\n\nBatch geocode multiple addresses\n\n### Parameters\n\n- `addresses: string[]`\n\n### Returns\n\n- `{ count: number; results: { features: geocoding_feature[]; type: 'FeatureCollection'; }[]; }`\n  Batch geocoding result. Each entry in `results` is a FeatureCollection corresponding to the input address at the same index. Order is preserved.\n\n  - `count: number`\n  - `results: { features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; }[]; type: 'FeatureCollection'; }[]`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst response = await client.geocode.batch({ addresses: ['string'] });\n\nconsole.log(response);\n```",
  },
  {
    name: 'forward',
    endpoint: '/api/v1/geocode',
    httpMethod: 'get',
    summary: 'Forward geocode an address',
    description: 'Forward geocode an address',
    stainlessPath: '(resource) geocode > (method) forward',
    qualified: 'client.geocode.forward',
    params: [
      'q: string;',
      'bbox?: string;',
      'country_code?: string;',
      'format?: string;',
      'lang?: string;',
      'lat?: number;',
      'layer?: string;',
      'limit?: number;',
      'lng?: number;',
    ],
    response:
      "{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; }[]; type: 'FeatureCollection'; }",
    markdown:
      "## forward\n\n`client.geocode.forward(q: string, bbox?: string, country_code?: string, format?: string, lang?: string, lat?: number, layer?: string, limit?: number, lng?: number): { features: geocoding_feature[]; type: 'FeatureCollection'; }`\n\n**get** `/api/v1/geocode`\n\nForward geocode an address\n\n### Parameters\n\n- `q: string`\n  Address or place name\n\n- `bbox?: string`\n  Bounding box filter: south,west,north,east\n\n- `country_code?: string`\n  ISO 3166-1 alpha-2 country code filter\n\n- `format?: string`\n  Response format: json (default), geojson, csv, ndjson\n\n- `lang?: string`\n  Language code for localized names (e.g. en, de, fr)\n\n- `lat?: number`\n  Focus latitude\n\n- `layer?: string`\n  Filter by layer: address, poi, or admin\n\n- `limit?: number`\n  Maximum results (default 20, max 100)\n\n- `lng?: number`\n  Focus longitude\n\n### Returns\n\n- `{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; }[]; type: 'FeatureCollection'; }`\n  GeoJSON FeatureCollection of forward geocoding results, ordered by relevance. Content-Type: `application/geo+json`.\n\n  - `features: { geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: { display_name: string; category?: string; city?: string; confidence?: number; country?: string; country_code?: string; distance_m?: number; full_address?: string; house_number?: string; interpolated?: boolean; name?: string; osm_id?: number; osm_type?: 'node' | 'way' | 'relation'; postcode?: string; score?: number; source?: 'structured' | 'bm25' | 'fuzzy' | 'address' | 'place' | 'interpolation'; state?: string; street?: string; subcategory?: string; tags?: object; wikipedia?: string; }; type: 'Feature'; }[]`\n  - `type: 'FeatureCollection'`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst geocodeResult = await client.geocode.forward({ q: 'q' });\n\nconsole.log(geocodeResult);\n```",
  },
  {
    name: 'forward_post',
    endpoint: '/api/v1/geocode',
    httpMethod: 'post',
    summary: 'Forward geocode an address',
    description: 'Forward geocode an address',
    stainlessPath: '(resource) geocode > (method) forward_post',
    qualified: 'client.geocode.forwardPost',
    params: [
      'q: string;',
      'bbox?: string;',
      'country_code?: string;',
      'format?: string;',
      'lang?: string;',
      'lat?: number;',
      'layer?: string;',
      'limit?: number;',
      'lng?: number;',
    ],
    response:
      "{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; }[]; type: 'FeatureCollection'; }",
    markdown:
      "## forward_post\n\n`client.geocode.forwardPost(q: string, bbox?: string, country_code?: string, format?: string, lang?: string, lat?: number, layer?: string, limit?: number, lng?: number): { features: geocoding_feature[]; type: 'FeatureCollection'; }`\n\n**post** `/api/v1/geocode`\n\nForward geocode an address\n\n### Parameters\n\n- `q: string`\n  Address or place name\n\n- `bbox?: string`\n  Bounding box filter: south,west,north,east\n\n- `country_code?: string`\n  ISO 3166-1 alpha-2 country code filter\n\n- `format?: string`\n  Response format: json (default), geojson, csv, ndjson\n\n- `lang?: string`\n  Language code for localized names (e.g. en, de, fr)\n\n- `lat?: number`\n  Focus latitude\n\n- `layer?: string`\n  Filter by layer: address, poi, or admin\n\n- `limit?: number`\n  Maximum results (default 20, max 100)\n\n- `lng?: number`\n  Focus longitude\n\n### Returns\n\n- `{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; }[]; type: 'FeatureCollection'; }`\n  GeoJSON FeatureCollection of forward geocoding results, ordered by relevance. Content-Type: `application/geo+json`.\n\n  - `features: { geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: { display_name: string; category?: string; city?: string; confidence?: number; country?: string; country_code?: string; distance_m?: number; full_address?: string; house_number?: string; interpolated?: boolean; name?: string; osm_id?: number; osm_type?: 'node' | 'way' | 'relation'; postcode?: string; score?: number; source?: 'structured' | 'bm25' | 'fuzzy' | 'address' | 'place' | 'interpolation'; state?: string; street?: string; subcategory?: string; tags?: object; wikipedia?: string; }; type: 'Feature'; }[]`\n  - `type: 'FeatureCollection'`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst geocodeResult = await client.geocode.forwardPost({ q: 'q' });\n\nconsole.log(geocodeResult);\n```",
  },
  {
    name: 'reverse',
    endpoint: '/api/v1/geocode/reverse',
    httpMethod: 'get',
    summary: 'Reverse geocode a coordinate',
    description: 'Reverse geocode a coordinate',
    stainlessPath: '(resource) geocode > (method) reverse',
    qualified: 'client.geocode.reverse',
    params: [
      'format?: string;',
      'lang?: string;',
      'lat?: number;',
      'layer?: string;',
      'limit?: number;',
      'lng?: number;',
      'near?: string;',
      'radius?: number;',
    ],
    response:
      "{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; }[]; type: 'FeatureCollection'; }",
    markdown:
      "## reverse\n\n`client.geocode.reverse(format?: string, lang?: string, lat?: number, layer?: string, limit?: number, lng?: number, near?: string, radius?: number): { features: geocoding_feature[]; type: 'FeatureCollection'; }`\n\n**get** `/api/v1/geocode/reverse`\n\nReverse geocode a coordinate\n\n### Parameters\n\n- `format?: string`\n  Response format: json (default), geojson, csv, ndjson\n\n- `lang?: string`\n  Language code for localized names (e.g. en, de, fr)\n\n- `lat?: number`\n  Legacy shorthand. Latitude. Use near param instead.\n\n- `layer?: string`\n  Filter by layer: house or poi\n\n- `limit?: number`\n  Maximum results (default 1, max 20)\n\n- `lng?: number`\n  Legacy shorthand. Longitude. Use near param instead.\n\n- `near?: string`\n  Point geometry for reverse geocode (lat,lng or GeoJSON). Alternative to lat/lng params.\n\n- `radius?: number`\n  Search radius in meters (default 200, max 5000)\n\n### Returns\n\n- `{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; }[]; type: 'FeatureCollection'; }`\n  GeoJSON FeatureCollection of reverse geocoding results, ordered by distance from the query point. Content-Type: `application/geo+json`.\n\n  - `features: { geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: { display_name: string; category?: string; city?: string; confidence?: number; country?: string; country_code?: string; distance_m?: number; full_address?: string; house_number?: string; interpolated?: boolean; name?: string; osm_id?: number; osm_type?: 'node' | 'way' | 'relation'; postcode?: string; score?: number; source?: 'structured' | 'bm25' | 'fuzzy' | 'address' | 'place' | 'interpolation'; state?: string; street?: string; subcategory?: string; tags?: object; wikipedia?: string; }; type: 'Feature'; }[]`\n  - `type: 'FeatureCollection'`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst reverseGeocodeResult = await client.geocode.reverse();\n\nconsole.log(reverseGeocodeResult);\n```",
  },
  {
    name: 'reverse_post',
    endpoint: '/api/v1/geocode/reverse',
    httpMethod: 'post',
    summary: 'Reverse geocode a coordinate',
    description: 'Reverse geocode a coordinate',
    stainlessPath: '(resource) geocode > (method) reverse_post',
    qualified: 'client.geocode.reversePost',
    params: [
      'format?: string;',
      'lang?: string;',
      'lat?: number;',
      'layer?: string;',
      'limit?: number;',
      'lng?: number;',
      'near?: string;',
      'radius?: number;',
    ],
    response:
      "{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; }[]; type: 'FeatureCollection'; }",
    markdown:
      "## reverse_post\n\n`client.geocode.reversePost(format?: string, lang?: string, lat?: number, layer?: string, limit?: number, lng?: number, near?: string, radius?: number): { features: geocoding_feature[]; type: 'FeatureCollection'; }`\n\n**post** `/api/v1/geocode/reverse`\n\nReverse geocode a coordinate\n\n### Parameters\n\n- `format?: string`\n  Response format: json (default), geojson, csv, ndjson\n\n- `lang?: string`\n  Language code for localized names (e.g. en, de, fr)\n\n- `lat?: number`\n  Legacy shorthand. Latitude. Use near param instead.\n\n- `layer?: string`\n  Filter by layer: house or poi\n\n- `limit?: number`\n  Maximum results (default 1, max 20)\n\n- `lng?: number`\n  Legacy shorthand. Longitude. Use near param instead.\n\n- `near?: string`\n  Point geometry for reverse geocode (lat,lng or GeoJSON). Alternative to lat/lng params.\n\n- `radius?: number`\n  Search radius in meters (default 200, max 5000)\n\n### Returns\n\n- `{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; }[]; type: 'FeatureCollection'; }`\n  GeoJSON FeatureCollection of reverse geocoding results, ordered by distance from the query point. Content-Type: `application/geo+json`.\n\n  - `features: { geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: { display_name: string; category?: string; city?: string; confidence?: number; country?: string; country_code?: string; distance_m?: number; full_address?: string; house_number?: string; interpolated?: boolean; name?: string; osm_id?: number; osm_type?: 'node' | 'way' | 'relation'; postcode?: string; score?: number; source?: 'structured' | 'bm25' | 'fuzzy' | 'address' | 'place' | 'interpolation'; state?: string; street?: string; subcategory?: string; tags?: object; wikipedia?: string; }; type: 'Feature'; }[]`\n  - `type: 'FeatureCollection'`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst reverseGeocodeResult = await client.geocode.reversePost();\n\nconsole.log(reverseGeocodeResult);\n```",
  },
  {
    name: 'query',
    endpoint: '/api/v1/search',
    httpMethod: 'get',
    summary: 'Search OSM features by name',
    description: 'Search OSM features by name',
    stainlessPath: '(resource) search > (method) query',
    qualified: 'client.search.query',
    params: [
      'q: string;',
      'cursor?: string;',
      'format?: string;',
      'limit?: number;',
      'output[fields]?: string;',
      'output[include]?: string;',
      'output[precision]?: number;',
      'output[sort]?: string;',
    ],
    response:
      "{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; id?: string; }[]; type: 'FeatureCollection'; }",
    markdown:
      "## query\n\n`client.search.query(q: string, cursor?: string, format?: string, limit?: number, output[fields]?: string, output[include]?: string, output[precision]?: number, output[sort]?: string): { features: geo_json_feature[]; type: 'FeatureCollection'; }`\n\n**get** `/api/v1/search`\n\nSearch OSM features by name\n\n### Parameters\n\n- `q: string`\n  Search query string\n\n- `cursor?: string`\n  Cursor for pagination\n\n- `format?: string`\n  Response format: json (default), geojson, csv, ndjson\n\n- `limit?: number`\n  Maximum results (default 25, max 100)\n\n- `output[fields]?: string`\n  Comma-separated property fields to include\n\n- `output[include]?: string`\n  Extra computed fields: bbox, distance, center\n\n- `output[precision]?: number`\n  Coordinate decimal precision (1-15, default 7)\n\n- `output[sort]?: string`\n  Sort by: distance, name, osm_id\n\n### Returns\n\n- `{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; id?: string; }[]; type: 'FeatureCollection'; }`\n  GeoJSON FeatureCollection (RFC 7946). For paginated endpoints, metadata is returned in HTTP response headers rather than the body:\n\n| Header | Description |\n|---|---|\n| `X-Limit` | Requested result limit |\n| `X-Has-More` | `true` if more results exist |\n| `X-Next-Cursor` | Opaque cursor for next page (cursor pagination) |\n| `X-Next-Offset` | Numeric offset for next page (offset pagination) |\n| `Link` | RFC 8288 `rel=\"next\"` link to the next page |\n\nContent-Type is `application/geo+json`.\n\n\n  - `features: { geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: object; type: 'Feature'; id?: string; }[]`\n  - `type: 'FeatureCollection'`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst featureCollection = await client.search.query({ q: 'q' });\n\nconsole.log(featureCollection);\n```",
  },
  {
    name: 'query_post',
    endpoint: '/api/v1/search',
    httpMethod: 'post',
    summary: 'Search OSM features by name',
    description: 'Search OSM features by name',
    stainlessPath: '(resource) search > (method) query_post',
    qualified: 'client.search.queryPost',
    params: [
      'q: string;',
      'cursor?: string;',
      'format?: string;',
      'limit?: number;',
      'output[fields]?: string;',
      'output[include]?: string;',
      'output[precision]?: number;',
      'output[sort]?: string;',
    ],
    response:
      "{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; id?: string; }[]; type: 'FeatureCollection'; }",
    markdown:
      "## query_post\n\n`client.search.queryPost(q: string, cursor?: string, format?: string, limit?: number, output[fields]?: string, output[include]?: string, output[precision]?: number, output[sort]?: string): { features: geo_json_feature[]; type: 'FeatureCollection'; }`\n\n**post** `/api/v1/search`\n\nSearch OSM features by name\n\n### Parameters\n\n- `q: string`\n  Search query string\n\n- `cursor?: string`\n  Cursor for pagination\n\n- `format?: string`\n  Response format: json (default), geojson, csv, ndjson\n\n- `limit?: number`\n  Maximum results (default 25, max 100)\n\n- `output[fields]?: string`\n  Comma-separated property fields to include\n\n- `output[include]?: string`\n  Extra computed fields: bbox, distance, center\n\n- `output[precision]?: number`\n  Coordinate decimal precision (1-15, default 7)\n\n- `output[sort]?: string`\n  Sort by: distance, name, osm_id\n\n### Returns\n\n- `{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; id?: string; }[]; type: 'FeatureCollection'; }`\n  GeoJSON FeatureCollection (RFC 7946). For paginated endpoints, metadata is returned in HTTP response headers rather than the body:\n\n| Header | Description |\n|---|---|\n| `X-Limit` | Requested result limit |\n| `X-Has-More` | `true` if more results exist |\n| `X-Next-Cursor` | Opaque cursor for next page (cursor pagination) |\n| `X-Next-Offset` | Numeric offset for next page (offset pagination) |\n| `Link` | RFC 8288 `rel=\"next\"` link to the next page |\n\nContent-Type is `application/geo+json`.\n\n\n  - `features: { geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: object; type: 'Feature'; id?: string; }[]`\n  - `type: 'FeatureCollection'`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst featureCollection = await client.search.queryPost({ q: 'q' });\n\nconsole.log(featureCollection);\n```",
  },
  {
    name: 'isochrone',
    endpoint: '/api/v1/isochrone',
    httpMethod: 'get',
    summary: 'Calculate an isochrone from a point',
    description: 'Calculate an isochrone from a point',
    stainlessPath: '(resource) routing > (method) isochrone',
    qualified: 'client.routing.isochrone',
    params: [
      'lat: number;',
      'lng: number;',
      'time: number;',
      'format?: string;',
      'mode?: string;',
      'output[fields]?: string;',
      'output[geometry]?: boolean;',
      'output[include]?: string;',
      'output[precision]?: number;',
      'output[simplify]?: number;',
    ],
    response:
      "{ features?: { geometry: geo_json_geometry; properties: object; type: 'Feature'; id?: string; }[]; geometry?: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties?: { area_m2?: number; max_cost_s?: number; mode?: 'auto' | 'foot' | 'bicycle'; time_seconds?: number; vertices_reached?: number; }; type?: 'Feature' | 'FeatureCollection'; }",
    markdown:
      "## isochrone\n\n`client.routing.isochrone(lat: number, lng: number, time: number, format?: string, mode?: string, output[fields]?: string, output[geometry]?: boolean, output[include]?: string, output[precision]?: number, output[simplify]?: number): { features?: geo_json_feature[]; geometry?: geo_json_geometry; properties?: object; type?: 'Feature' | 'FeatureCollection'; }`\n\n**get** `/api/v1/isochrone`\n\nCalculate an isochrone from a point\n\n### Parameters\n\n- `lat: number`\n  Latitude\n\n- `lng: number`\n  Longitude\n\n- `time: number`\n  Travel time in seconds (1-7200)\n\n- `format?: string`\n  Response format: json (default), geojson, csv, ndjson\n\n- `mode?: string`\n  Travel mode (auto, foot, bicycle)\n\n- `output[fields]?: string`\n  Comma-separated property fields to include\n\n- `output[geometry]?: boolean`\n  Include geometry (default true)\n\n- `output[include]?: string`\n  Extra computed fields: bbox, center\n\n- `output[precision]?: number`\n  Coordinate decimal precision (1-15, default 7)\n\n- `output[simplify]?: number`\n  Simplify geometry tolerance in meters\n\n### Returns\n\n- `{ features?: { geometry: geo_json_geometry; properties: object; type: 'Feature'; id?: string; }[]; geometry?: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties?: { area_m2?: number; max_cost_s?: number; mode?: 'auto' | 'foot' | 'bicycle'; time_seconds?: number; vertices_reached?: number; }; type?: 'Feature' | 'FeatureCollection'; }`\n  GeoJSON Feature or FeatureCollection representing isochrone polygons — areas reachable within the specified travel time(s). Single time value returns a Feature; comma-separated times return a FeatureCollection with one polygon per contour.\n\n  - `features?: { geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: object; type: 'Feature'; id?: string; }[]`\n  - `geometry?: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }`\n  - `properties?: { area_m2?: number; max_cost_s?: number; mode?: 'auto' | 'foot' | 'bicycle'; time_seconds?: number; vertices_reached?: number; }`\n  - `type?: 'Feature' | 'FeatureCollection'`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst response = await client.routing.isochrone({\n  lat: 0,\n  lng: 0,\n  time: 0,\n});\n\nconsole.log(response);\n```",
  },
  {
    name: 'isochrone_post',
    endpoint: '/api/v1/isochrone',
    httpMethod: 'post',
    summary: 'Calculate an isochrone from a point',
    description: 'Calculate an isochrone from a point',
    stainlessPath: '(resource) routing > (method) isochrone_post',
    qualified: 'client.routing.isochronePost',
    params: [
      'lat: number;',
      'lng: number;',
      'time: number;',
      'format?: string;',
      'mode?: string;',
      'output[fields]?: string;',
      'output[geometry]?: boolean;',
      'output[include]?: string;',
      'output[precision]?: number;',
      'output[simplify]?: number;',
    ],
    response:
      "{ features?: { geometry: geo_json_geometry; properties: object; type: 'Feature'; id?: string; }[]; geometry?: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties?: { area_m2?: number; max_cost_s?: number; mode?: 'auto' | 'foot' | 'bicycle'; time_seconds?: number; vertices_reached?: number; }; type?: 'Feature' | 'FeatureCollection'; }",
    markdown:
      "## isochrone_post\n\n`client.routing.isochronePost(lat: number, lng: number, time: number, format?: string, mode?: string, output[fields]?: string, output[geometry]?: boolean, output[include]?: string, output[precision]?: number, output[simplify]?: number): { features?: geo_json_feature[]; geometry?: geo_json_geometry; properties?: object; type?: 'Feature' | 'FeatureCollection'; }`\n\n**post** `/api/v1/isochrone`\n\nCalculate an isochrone from a point\n\n### Parameters\n\n- `lat: number`\n  Latitude\n\n- `lng: number`\n  Longitude\n\n- `time: number`\n  Travel time in seconds (1-7200)\n\n- `format?: string`\n  Response format: json (default), geojson, csv, ndjson\n\n- `mode?: string`\n  Travel mode (auto, foot, bicycle)\n\n- `output[fields]?: string`\n  Comma-separated property fields to include\n\n- `output[geometry]?: boolean`\n  Include geometry (default true)\n\n- `output[include]?: string`\n  Extra computed fields: bbox, center\n\n- `output[precision]?: number`\n  Coordinate decimal precision (1-15, default 7)\n\n- `output[simplify]?: number`\n  Simplify geometry tolerance in meters\n\n### Returns\n\n- `{ features?: { geometry: geo_json_geometry; properties: object; type: 'Feature'; id?: string; }[]; geometry?: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties?: { area_m2?: number; max_cost_s?: number; mode?: 'auto' | 'foot' | 'bicycle'; time_seconds?: number; vertices_reached?: number; }; type?: 'Feature' | 'FeatureCollection'; }`\n  GeoJSON Feature or FeatureCollection representing isochrone polygons — areas reachable within the specified travel time(s). Single time value returns a Feature; comma-separated times return a FeatureCollection with one polygon per contour.\n\n  - `features?: { geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: object; type: 'Feature'; id?: string; }[]`\n  - `geometry?: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }`\n  - `properties?: { area_m2?: number; max_cost_s?: number; mode?: 'auto' | 'foot' | 'bicycle'; time_seconds?: number; vertices_reached?: number; }`\n  - `type?: 'Feature' | 'FeatureCollection'`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst response = await client.routing.isochronePost({\n  lat: 0,\n  lng: 0,\n  time: 0,\n});\n\nconsole.log(response);\n```",
  },
  {
    name: 'matrix',
    endpoint: '/api/v1/matrix',
    httpMethod: 'post',
    summary: 'Calculate a distance matrix between points',
    description: 'Calculate a distance matrix between points',
    stainlessPath: '(resource) routing > (method) matrix',
    qualified: 'client.routing.matrix',
    params: [
      'destinations: { lat: number; lng: number; }[];',
      'origins: { lat: number; lng: number; }[];',
      'annotations?: string;',
      'fallback_speed?: number;',
      "mode?: 'auto' | 'foot' | 'bicycle';",
    ],
    response: 'object',
    markdown:
      "## matrix\n\n`client.routing.matrix(destinations: { lat: number; lng: number; }[], origins: { lat: number; lng: number; }[], annotations?: string, fallback_speed?: number, mode?: 'auto' | 'foot' | 'bicycle'): object`\n\n**post** `/api/v1/matrix`\n\nCalculate a distance matrix between points\n\n### Parameters\n\n- `destinations: { lat: number; lng: number; }[]`\n  Array of destination coordinates (max 50)\n\n- `origins: { lat: number; lng: number; }[]`\n  Array of origin coordinates (max 50)\n\n- `annotations?: string`\n  Comma-separated list of annotations to include: `duration` (always included), `distance`. Example: `duration,distance`.\n\n- `fallback_speed?: number`\n  Fallback speed in km/h for pairs where no route exists. When set, unreachable pairs get estimated values instead of null.\n\n- `mode?: 'auto' | 'foot' | 'bicycle'`\n  Travel mode (default: `auto`)\n\n### Returns\n\n- `object`\n  Distance matrix result. The exact response shape depends on the routing backend. Contains duration (and optionally distance) data for all origin-destination pairs. Null values indicate unreachable pairs.\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst matrixResult = await client.routing.matrix({ destinations: [{ lat: 48.8584, lng: 2.2945 }], origins: [{ lat: 48.8566, lng: 2.3522 }, { lat: 48.8606, lng: 2.3376 }] });\n\nconsole.log(matrixResult);\n```",
  },
  {
    name: 'nearest',
    endpoint: '/api/v1/nearest',
    httpMethod: 'get',
    summary: 'Snap a coordinate to the nearest road',
    description: 'Snap a coordinate to the nearest road',
    stainlessPath: '(resource) routing > (method) nearest',
    qualified: 'client.routing.nearest',
    params: [
      'lat: number;',
      'lng: number;',
      'output[fields]?: string;',
      'output[include]?: string;',
      'output[precision]?: number;',
      'radius?: number;',
    ],
    response:
      "{ geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: { distance_m?: number; edge_id?: number; edge_length_m?: number; highway?: string; osm_way_id?: number; surface?: string; }; type: 'Feature'; }",
    markdown:
      "## nearest\n\n`client.routing.nearest(lat: number, lng: number, output[fields]?: string, output[include]?: string, output[precision]?: number, radius?: number): { geometry: geo_json_geometry; properties: object; type: 'Feature'; }`\n\n**get** `/api/v1/nearest`\n\nSnap a coordinate to the nearest road\n\n### Parameters\n\n- `lat: number`\n  Latitude\n\n- `lng: number`\n  Longitude\n\n- `output[fields]?: string`\n  Comma-separated property fields to include\n\n- `output[include]?: string`\n  Extra computed fields: bbox, distance, center\n\n- `output[precision]?: number`\n  Coordinate decimal precision (1-15, default 7)\n\n- `radius?: number`\n  Search radius in meters (default 500, max 5000)\n\n### Returns\n\n- `{ geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: { distance_m?: number; edge_id?: number; edge_length_m?: number; highway?: string; osm_way_id?: number; surface?: string; }; type: 'Feature'; }`\n  GeoJSON Point Feature representing the nearest point on the road network to the input coordinate. Used for snapping GPS coordinates to roads.\n\n  - `geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }`\n  - `properties: { distance_m?: number; edge_id?: number; edge_length_m?: number; highway?: string; osm_way_id?: number; surface?: string; }`\n  - `type: 'Feature'`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst nearestResult = await client.routing.nearest({ lat: 0, lng: 0 });\n\nconsole.log(nearestResult);\n```",
  },
  {
    name: 'nearest_post',
    endpoint: '/api/v1/nearest',
    httpMethod: 'post',
    summary: 'Snap a coordinate to the nearest road',
    description: 'Snap a coordinate to the nearest road',
    stainlessPath: '(resource) routing > (method) nearest_post',
    qualified: 'client.routing.nearestPost',
    params: [
      'lat: number;',
      'lng: number;',
      'output[fields]?: string;',
      'output[include]?: string;',
      'output[precision]?: number;',
      'radius?: number;',
    ],
    response:
      "{ geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: { distance_m?: number; edge_id?: number; edge_length_m?: number; highway?: string; osm_way_id?: number; surface?: string; }; type: 'Feature'; }",
    markdown:
      "## nearest_post\n\n`client.routing.nearestPost(lat: number, lng: number, output[fields]?: string, output[include]?: string, output[precision]?: number, radius?: number): { geometry: geo_json_geometry; properties: object; type: 'Feature'; }`\n\n**post** `/api/v1/nearest`\n\nSnap a coordinate to the nearest road\n\n### Parameters\n\n- `lat: number`\n  Latitude\n\n- `lng: number`\n  Longitude\n\n- `output[fields]?: string`\n  Comma-separated property fields to include\n\n- `output[include]?: string`\n  Extra computed fields: bbox, distance, center\n\n- `output[precision]?: number`\n  Coordinate decimal precision (1-15, default 7)\n\n- `radius?: number`\n  Search radius in meters (default 500, max 5000)\n\n### Returns\n\n- `{ geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: { distance_m?: number; edge_id?: number; edge_length_m?: number; highway?: string; osm_way_id?: number; surface?: string; }; type: 'Feature'; }`\n  GeoJSON Point Feature representing the nearest point on the road network to the input coordinate. Used for snapping GPS coordinates to roads.\n\n  - `geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }`\n  - `properties: { distance_m?: number; edge_id?: number; edge_length_m?: number; highway?: string; osm_way_id?: number; surface?: string; }`\n  - `type: 'Feature'`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst nearestResult = await client.routing.nearestPost({ lat: 0, lng: 0 });\n\nconsole.log(nearestResult);\n```",
  },
  {
    name: 'route',
    endpoint: '/api/v1/route',
    httpMethod: 'post',
    summary: 'Calculate a route between two points',
    description: 'Calculate a route between two points',
    stainlessPath: '(resource) routing > (method) route',
    qualified: 'client.routing.route',
    params: [
      'destination: { lat: number; lng: number; };',
      'origin: { lat: number; lng: number; };',
      'format?: string;',
      'alternatives?: number;',
      'annotations?: boolean;',
      'depart_at?: string;',
      'ev?: { battery_capacity_wh: number; connector_types?: string[]; initial_charge_pct?: number; min_charge_pct?: number; min_power_kw?: number; };',
      'exclude?: string;',
      "geometries?: 'geojson' | 'polyline' | 'polyline6';",
      "mode?: 'auto' | 'foot' | 'bicycle';",
      "overview?: 'full' | 'simplified' | 'false';",
      'steps?: boolean;',
      "traffic_model?: 'best_guess' | 'optimistic' | 'pessimistic';",
      'waypoints?: { lat: number; lng: number; }[];',
    ],
    response:
      "{ geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: { distance_m: number; duration_s: number; annotations?: object; charge_profile?: number[][]; charging_stops?: object[]; edges?: object[]; energy_used_wh?: number; }; type: 'Feature'; }",
    markdown:
      "## route\n\n`client.routing.route(destination: { lat: number; lng: number; }, origin: { lat: number; lng: number; }, format?: string, alternatives?: number, annotations?: boolean, depart_at?: string, ev?: { battery_capacity_wh: number; connector_types?: string[]; initial_charge_pct?: number; min_charge_pct?: number; min_power_kw?: number; }, exclude?: string, geometries?: 'geojson' | 'polyline' | 'polyline6', mode?: 'auto' | 'foot' | 'bicycle', overview?: 'full' | 'simplified' | 'false', steps?: boolean, traffic_model?: 'best_guess' | 'optimistic' | 'pessimistic', waypoints?: { lat: number; lng: number; }[]): { geometry: geo_json_geometry; properties: object; type: 'Feature'; }`\n\n**post** `/api/v1/route`\n\nCalculate a route between two points\n\n### Parameters\n\n- `destination: { lat: number; lng: number; }`\n  Geographic coordinate as a JSON object with `lat` and `lng` fields.\n  - `lat: number`\n    Latitude in decimal degrees (-90 to 90)\n  - `lng: number`\n    Longitude in decimal degrees (-180 to 180)\n\n- `origin: { lat: number; lng: number; }`\n  Geographic coordinate as a JSON object with `lat` and `lng` fields.\n  - `lat: number`\n    Latitude in decimal degrees (-90 to 90)\n  - `lng: number`\n    Longitude in decimal degrees (-180 to 180)\n\n- `format?: string`\n  Response format for alternatives: json (default), geojson, csv, ndjson\n\n- `alternatives?: number`\n  Number of alternative routes to return (0-3, default 0). When > 0, response is a FeatureCollection of route Features.\n\n- `annotations?: boolean`\n  Include per-edge annotations (speed, duration) on the route (default: false)\n\n- `depart_at?: string`\n  Departure time for traffic-aware routing (ISO 8601)\n\n- `ev?: { battery_capacity_wh: number; connector_types?: string[]; initial_charge_pct?: number; min_charge_pct?: number; min_power_kw?: number; }`\n  Electric vehicle parameters for EV-aware routing\n  - `battery_capacity_wh: number`\n    Total battery capacity in watt-hours (required for EV routing)\n  - `connector_types?: string[]`\n    Acceptable connector types (e.g. `[\"ccs\", \"chademo\"]`)\n  - `initial_charge_pct?: number`\n    Starting charge as a fraction 0-1 (default: 0.8)\n  - `min_charge_pct?: number`\n    Minimum acceptable charge at destination as a fraction 0-1 (default: 0.10)\n  - `min_power_kw?: number`\n    Minimum charger power in kilowatts\n\n- `exclude?: string`\n  Comma-separated road types to exclude (e.g. `toll,motorway,ferry`)\n\n- `geometries?: 'geojson' | 'polyline' | 'polyline6'`\n  Geometry encoding format. Default: `geojson`.\n\n- `mode?: 'auto' | 'foot' | 'bicycle'`\n  Travel mode (default: `auto`)\n\n- `overview?: 'full' | 'simplified' | 'false'`\n  Level of geometry detail: `full` (all points), `simplified` (Douglas-Peucker), `false` (no geometry). Default: `full`.\n\n- `steps?: boolean`\n  Include turn-by-turn navigation steps (default: false)\n\n- `traffic_model?: 'best_guess' | 'optimistic' | 'pessimistic'`\n  Traffic prediction model (only used when `depart_at` is set)\n\n- `waypoints?: { lat: number; lng: number; }[]`\n  Intermediate waypoints to visit in order (maximum 25)\n\n### Returns\n\n- `{ geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: { distance_m: number; duration_s: number; annotations?: object; charge_profile?: number[][]; charging_stops?: object[]; edges?: object[]; energy_used_wh?: number; }; type: 'Feature'; }`\n  GeoJSON Feature representing a calculated route. The geometry is a LineString or MultiLineString of the route path. When `alternatives > 0`, the response is a FeatureCollection containing multiple route Features.\n\n  - `geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }`\n  - `properties: { distance_m: number; duration_s: number; annotations?: object; charge_profile?: number[][]; charging_stops?: object[]; edges?: object[]; energy_used_wh?: number; }`\n  - `type: 'Feature'`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst routeResult = await client.routing.route({\n  destination: { lat: 48.8584, lng: 2.2945 },\n  origin: { lat: 48.8566, lng: 2.3522 },\n});\n\nconsole.log(routeResult);\n```",
  },
  {
    name: 'batch',
    endpoint: '/api/v1/elevation/batch',
    httpMethod: 'post',
    summary: 'Look up elevation for multiple coordinates',
    description: 'Look up elevation for multiple coordinates',
    stainlessPath: '(resource) elevation > (method) batch',
    qualified: 'client.elevation.batch',
    params: ['coordinates: { lat: number; lng: number; }[];', 'format?: string;'],
    response:
      "{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; }[]; type: 'FeatureCollection'; }",
    markdown:
      "## batch\n\n`client.elevation.batch(coordinates: { lat: number; lng: number; }[], format?: string): { features: elevation_lookup_result[]; type: 'FeatureCollection'; }`\n\n**post** `/api/v1/elevation/batch`\n\nLook up elevation for multiple coordinates\n\n### Parameters\n\n- `coordinates: { lat: number; lng: number; }[]`\n  Coordinates to look up elevations for (max 50)\n\n- `format?: string`\n  Response format: json (default), geojson, csv, ndjson\n\n### Returns\n\n- `{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; }[]; type: 'FeatureCollection'; }`\n  GeoJSON FeatureCollection of elevation Point Features with 3D coordinates. Order matches the input coordinates array.\n\n  - `features: { geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: { elevation_m: number; }; type: 'Feature'; }[]`\n  - `type: 'FeatureCollection'`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst elevationBatchResult = await client.elevation.batch({ coordinates: [{ lat: 48.8566, lng: 2.3522 }, { lat: 45.764, lng: 4.8357 }] });\n\nconsole.log(elevationBatchResult);\n```",
  },
  {
    name: 'lookup',
    endpoint: '/api/v1/elevation',
    httpMethod: 'get',
    summary: 'Look up elevation at one or more points',
    description: 'Look up elevation at one or more points',
    stainlessPath: '(resource) elevation > (method) lookup',
    qualified: 'client.elevation.lookup',
    params: [
      'format?: string;',
      'lat?: number;',
      'lng?: number;',
      'locations?: string;',
      'output[fields]?: string;',
      'output[include]?: string;',
      'output[precision]?: number;',
    ],
    response:
      "{ geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: { elevation_m: number; }; type: 'Feature'; }",
    markdown:
      "## lookup\n\n`client.elevation.lookup(format?: string, lat?: number, lng?: number, locations?: string, output[fields]?: string, output[include]?: string, output[precision]?: number): { geometry: geo_json_geometry; properties: object; type: 'Feature'; }`\n\n**get** `/api/v1/elevation`\n\nLook up elevation at one or more points\n\n### Parameters\n\n- `format?: string`\n  Response format: json (default), geojson, csv, ndjson\n\n- `lat?: number`\n  Latitude (single point)\n\n- `lng?: number`\n  Longitude (single point)\n\n- `locations?: string`\n  Pipe-separated lng,lat pairs (batch)\n\n- `output[fields]?: string`\n  Comma-separated property fields to include\n\n- `output[include]?: string`\n  Extra computed fields: bbox, center\n\n- `output[precision]?: number`\n  Coordinate decimal precision (1-15, default 7)\n\n### Returns\n\n- `{ geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: { elevation_m: number; }; type: 'Feature'; }`\n  GeoJSON Point Feature with a 3D coordinate [lng, lat, elevation] per RFC 7946 §3.1.1. The elevation is also available in `properties.elevation_m` for convenience.\n\n  - `geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }`\n  - `properties: { elevation_m: number; }`\n  - `type: 'Feature'`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst elevationLookupResult = await client.elevation.lookup();\n\nconsole.log(elevationLookupResult);\n```",
  },
  {
    name: 'lookup_post',
    endpoint: '/api/v1/elevation',
    httpMethod: 'post',
    summary: 'Look up elevation at one or more points',
    description: 'Look up elevation at one or more points',
    stainlessPath: '(resource) elevation > (method) lookup_post',
    qualified: 'client.elevation.lookupPost',
    params: [
      'format?: string;',
      'lat?: number;',
      'lng?: number;',
      'locations?: string;',
      'output[fields]?: string;',
      'output[include]?: string;',
      'output[precision]?: number;',
    ],
    response:
      "{ geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: { elevation_m: number; }; type: 'Feature'; }",
    markdown:
      "## lookup_post\n\n`client.elevation.lookupPost(format?: string, lat?: number, lng?: number, locations?: string, output[fields]?: string, output[include]?: string, output[precision]?: number): { geometry: geo_json_geometry; properties: object; type: 'Feature'; }`\n\n**post** `/api/v1/elevation`\n\nLook up elevation at one or more points\n\n### Parameters\n\n- `format?: string`\n  Response format: json (default), geojson, csv, ndjson\n\n- `lat?: number`\n  Latitude (single point)\n\n- `lng?: number`\n  Longitude (single point)\n\n- `locations?: string`\n  Pipe-separated lng,lat pairs (batch)\n\n- `output[fields]?: string`\n  Comma-separated property fields to include\n\n- `output[include]?: string`\n  Extra computed fields: bbox, center\n\n- `output[precision]?: number`\n  Coordinate decimal precision (1-15, default 7)\n\n### Returns\n\n- `{ geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: { elevation_m: number; }; type: 'Feature'; }`\n  GeoJSON Point Feature with a 3D coordinate [lng, lat, elevation] per RFC 7946 §3.1.1. The elevation is also available in `properties.elevation_m` for convenience.\n\n  - `geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }`\n  - `properties: { elevation_m: number; }`\n  - `type: 'Feature'`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst elevationLookupResult = await client.elevation.lookupPost();\n\nconsole.log(elevationLookupResult);\n```",
  },
  {
    name: 'profile',
    endpoint: '/api/v1/elevation/profile',
    httpMethod: 'post',
    summary: 'Elevation profile along coordinates',
    description: 'Elevation profile along coordinates',
    stainlessPath: '(resource) elevation > (method) profile',
    qualified: 'client.elevation.profile',
    params: ['coordinates: { lat: number; lng: number; }[];'],
    response:
      "{ geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: { avg_elevation_m: number; max_elevation_m: number; min_elevation_m: number; total_ascent_m: number; total_descent_m: number; }; type: 'Feature'; }",
    markdown:
      "## profile\n\n`client.elevation.profile(coordinates: { lat: number; lng: number; }[]): { geometry: geo_json_geometry; properties: object; type: 'Feature'; }`\n\n**post** `/api/v1/elevation/profile`\n\nElevation profile along coordinates\n\n### Parameters\n\n- `coordinates: { lat: number; lng: number; }[]`\n  Path coordinates in order of travel (min 2, max 50)\n\n### Returns\n\n- `{ geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: { avg_elevation_m: number; max_elevation_m: number; min_elevation_m: number; total_ascent_m: number; total_descent_m: number; }; type: 'Feature'; }`\n  GeoJSON LineString Feature with 3D coordinates [lng, lat, elevation] representing the elevation profile along the input path. Summary statistics are in properties.\n\n  - `geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }`\n  - `properties: { avg_elevation_m: number; max_elevation_m: number; min_elevation_m: number; total_ascent_m: number; total_descent_m: number; }`\n  - `type: 'Feature'`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst elevationProfileResult = await client.elevation.profile({ coordinates: [{ lat: 48.8566, lng: 2.3522 }, { lat: 48.858, lng: 2.34 }, { lat: 48.8584, lng: 2.2945 }] });\n\nconsole.log(elevationProfileResult);\n```",
  },
  {
    name: 'match',
    endpoint: '/api/v1/map-match',
    httpMethod: 'post',
    summary: 'Match GPS coordinates to the road network',
    description: 'Match GPS coordinates to the road network',
    stainlessPath: '(resource) map_match > (method) match',
    qualified: 'client.mapMatch.match',
    params: ['coordinates: { lat: number; lng: number; }[];', 'radiuses?: number[];'],
    response:
      "{ features: { geometry: object; properties: { distance_m?: number; edge_id?: number; matchings_index?: number; name?: string; original?: number[]; waypoint_index?: number; }; type: 'Feature'; }[]; matchings: object[]; type: 'FeatureCollection'; }",
    markdown:
      "## match\n\n`client.mapMatch.match(coordinates: { lat: number; lng: number; }[], radiuses?: number[]): { features: object[]; matchings: object[]; type: 'FeatureCollection'; }`\n\n**post** `/api/v1/map-match`\n\nMatch GPS coordinates to the road network\n\n### Parameters\n\n- `coordinates: { lat: number; lng: number; }[]`\n  GPS coordinates to match, in order of travel (max 50 points)\n\n- `radiuses?: number[]`\n  Search radius per coordinate in meters. Must have the same length as `coordinates` or be omitted entirely. Default: 50m per point.\n\n### Returns\n\n- `{ features: { geometry: object; properties: { distance_m?: number; edge_id?: number; matchings_index?: number; name?: string; original?: number[]; waypoint_index?: number; }; type: 'Feature'; }[]; matchings: object[]; type: 'FeatureCollection'; }`\n  Map matching result as a GeoJSON FeatureCollection. Each Feature is a snapped tracepoint. The top-level `matchings` array contains the matched sub-routes connecting consecutive tracepoints.\n\n  - `features: { geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: { distance_m?: number; edge_id?: number; matchings_index?: number; name?: string; original?: number[]; waypoint_index?: number; }; type: 'Feature'; }[]`\n  - `matchings: object[]`\n  - `type: 'FeatureCollection'`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst mapMatchResult = await client.mapMatch.match({ coordinates: [{ lat: 48.8566, lng: 2.3522 }, { lat: 48.857, lng: 2.353 }, { lat: 48.8575, lng: 2.354 }] });\n\nconsole.log(mapMatchResult);\n```",
  },
  {
    name: 'create',
    endpoint: '/api/v1/optimize',
    httpMethod: 'post',
    summary: 'Optimize route through waypoints',
    description: 'Optimize route through waypoints',
    stainlessPath: '(resource) optimize > (method) create',
    qualified: 'client.optimize.create',
    params: [
      'waypoints: { lat: number; lng: number; }[];',
      'format?: string;',
      "mode?: 'auto' | 'foot' | 'bicycle';",
      'roundtrip?: boolean;',
    ],
    response:
      "{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; }[]; optimization: string; roundtrip: boolean; total_cost_s: number; type: 'FeatureCollection'; } | { job_id: string; status: 'processing'; }",
    markdown:
      "## create\n\n`client.optimize.create(waypoints: { lat: number; lng: number; }[], format?: string, mode?: 'auto' | 'foot' | 'bicycle', roundtrip?: boolean): object | object`\n\n**post** `/api/v1/optimize`\n\nOptimize route through waypoints\n\n### Parameters\n\n- `waypoints: { lat: number; lng: number; }[]`\n  Waypoints to visit in optimized order (2-50 points)\n\n- `format?: string`\n  Response format: json (default), geojson, csv, ndjson\n\n- `mode?: 'auto' | 'foot' | 'bicycle'`\n  Travel mode (default: `auto`)\n\n- `roundtrip?: boolean`\n  Whether the route should return to the starting waypoint (default: true)\n\n### Returns\n\n- `{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; }[]; optimization: string; roundtrip: boolean; total_cost_s: number; type: 'FeatureCollection'; } | { job_id: string; status: 'processing'; }`\n  Optimization response — either a completed FeatureCollection with the optimized route, or an async job reference to poll.\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst optimizeResult = await client.optimize.create({ waypoints: [{ lat: 48.8566, lng: 2.3522 }, { lat: 48.8606, lng: 2.3376 }, { lat: 48.8584, lng: 2.2945 }] });\n\nconsole.log(optimizeResult);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/api/v1/optimize/{job_id}',
    httpMethod: 'get',
    summary: 'Get async optimization result',
    description: 'Get async optimization result',
    stainlessPath: '(resource) optimize > (method) retrieve',
    qualified: 'client.optimize.retrieve',
    params: ['job_id: string;'],
    response:
      "{ status: 'completed' | 'processing'; result?: { features: object[]; optimization: string; roundtrip: boolean; total_cost_s: number; type: 'FeatureCollection'; }; }",
    markdown:
      "## retrieve\n\n`client.optimize.retrieve(job_id: string): { status: 'completed' | 'processing'; result?: optimize_completed_result; }`\n\n**get** `/api/v1/optimize/{job_id}`\n\nGet async optimization result\n\n### Parameters\n\n- `job_id: string`\n\n### Returns\n\n- `{ status: 'completed' | 'processing'; result?: { features: object[]; optimization: string; roundtrip: boolean; total_cost_s: number; type: 'FeatureCollection'; }; }`\n  Status of an async optimization job. When `completed`, the `result` field contains the full OptimizeCompletedResult. When `processing`, the job is still running — poll again. Failed jobs return a standard Error response (HTTP 422), not this schema.\n\n  - `status: 'completed' | 'processing'`\n  - `result?: { features: { geometry: object; properties: { cost_s: number; cumulative_cost_s: number; waypoint_index: number; }; type: 'Feature'; }[]; optimization: string; roundtrip: boolean; total_cost_s: number; type: 'FeatureCollection'; }`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst optimizeJobStatus = await client.optimize.retrieve('job_id');\n\nconsole.log(optimizeJobStatus);\n```",
  },
  {
    name: 'execute',
    endpoint: '/api/v1/query',
    httpMethod: 'post',
    summary: 'Execute a PlazaQL query',
    description: 'Execute a PlazaQL query',
    stainlessPath: '(resource) query > (method) execute',
    qualified: 'client.query.execute',
    params: ['data: string;', 'format?: string;'],
    response:
      "{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; id?: string; }[]; type: 'FeatureCollection'; }",
    markdown:
      "## execute\n\n`client.query.execute(data: string, format?: string): { features: geo_json_feature[]; type: 'FeatureCollection'; }`\n\n**post** `/api/v1/query`\n\nExecute a PlazaQL query\n\n### Parameters\n\n- `data: string`\n  PlazaQL query string\n\n- `format?: string`\n  Response format: json (default), geojson, csv, ndjson\n\n### Returns\n\n- `{ features: { geometry: geo_json_geometry; properties: object; type: 'Feature'; id?: string; }[]; type: 'FeatureCollection'; }`\n  GeoJSON FeatureCollection (RFC 7946). For paginated endpoints, metadata is returned in HTTP response headers rather than the body:\n\n| Header | Description |\n|---|---|\n| `X-Limit` | Requested result limit |\n| `X-Has-More` | `true` if more results exist |\n| `X-Next-Cursor` | Opaque cursor for next page (cursor pagination) |\n| `X-Next-Offset` | Numeric offset for next page (offset pagination) |\n| `Link` | RFC 8288 `rel=\"next\"` link to the next page |\n\nContent-Type is `application/geo+json`.\n\n\n  - `features: { geometry: { coordinates: number[] | number[][] | number[][][] | number[][][][]; type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'; }; properties: object; type: 'Feature'; id?: string; }[]`\n  - `type: 'FeatureCollection'`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst featureCollection = await client.query.execute({ data: '$$ = search(node, amenity: \"cafe\").around(distance: 500, geometry: point(48.8566, 2.3522));' });\n\nconsole.log(featureCollection);\n```",
  },
  {
    name: 'get',
    endpoint: '/api/v1/tiles/{z}/{x}/{y}',
    httpMethod: 'get',
    summary: 'Get a Mapbox Vector Tile',
    description: 'Get a Mapbox Vector Tile',
    stainlessPath: '(resource) tiles > (method) get',
    qualified: 'client.tiles.get',
    params: ['z: number;', 'x: number;', 'y: number;'],
    response: 'string',
    markdown:
      "## get\n\n`client.tiles.get(z: number, x: number, y: number): string`\n\n**get** `/api/v1/tiles/{z}/{x}/{y}`\n\nGet a Mapbox Vector Tile\n\n### Parameters\n\n- `z: number`\n\n- `x: number`\n\n- `y: number`\n\n### Returns\n\n- `string`\n\n### Example\n\n```typescript\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza();\n\nconst tile = await client.tiles.get(0, { z: 0, x: 0 });\n\nconsole.log(tile);\n\nconst content = await tile.blob()\nconsole.log(content)\n```",
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}

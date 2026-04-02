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
    perLanguage: {
      cli: {
        method: 'elements query',
        example: "plaza elements query \\\n  --api-key 'My API Key'",
      },
      csharp: {
        method: 'Elements.Query',
        example:
          'ElementQueryParams parameters = new();\n\nvar featureCollection = await client.Elements.Query(parameters);\n\nConsole.WriteLine(featureCollection);',
      },
      go: {
        method: 'client.Elements.Query',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tfeatureCollection, err := client.Elements.Query(context.TODO(), githubcomplazafyiplazago.ElementQueryParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", featureCollection.Features)\n}\n',
      },
      http: {
        example: 'curl https://plaza.fyi/api/v1/features \\\n    -H "Authorization: Bearer $PLAZA_API_KEY"',
      },
      java: {
        method: 'elements().query',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.FeatureCollection;\nimport com.plazafyi.models.elements.ElementQueryParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        FeatureCollection featureCollection = client.elements().query();\n    }\n}',
      },
      kotlin: {
        method: 'elements().query',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.FeatureCollection\nimport com.plazafyi.models.elements.ElementQueryParams\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val featureCollection: FeatureCollection = client.elements().query()\n}',
      },
      php: {
        method: 'elements->query',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$featureCollection = $client->elements->query(\n  bbox: 'bbox',\n  contains: 'contains',\n  crosses: 'crosses',\n  cursor: 'cursor',\n  format: 'format',\n  h3: 'h3',\n  intersects: 'intersects',\n  limit: 0,\n  near: 'near',\n  outputBuffer: 0,\n  outputCentroid: true,\n  outputFields: 'output[fields]',\n  outputGeometry: true,\n  outputInclude: 'output[include]',\n  outputPrecision: 0,\n  outputSimplify: 0,\n  outputSort: 'output[sort]',\n  radius: 0,\n  touches: 'touches',\n  type: 'type',\n  within: 'within',\n);\n\nvar_dump($featureCollection);",
      },
      python: {
        method: 'elements.query',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\nfeature_collection = client.elements.query()\nprint(feature_collection.features)',
      },
      ruby: {
        method: 'elements.query',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\nfeature_collection = plaza.elements.query\n\nputs(feature_collection)',
      },
      typescript: {
        method: 'client.elements.query',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst featureCollection = await client.elements.query();\n\nconsole.log(featureCollection.features);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'elements query_post',
        example: "plaza elements query-post \\\n  --api-key 'My API Key'",
      },
      csharp: {
        method: 'Elements.QueryPost',
        example:
          'ElementQueryPostParams parameters = new();\n\nvar featureCollection = await client.Elements.QueryPost(parameters);\n\nConsole.WriteLine(featureCollection);',
      },
      go: {
        method: 'client.Elements.QueryPost',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tfeatureCollection, err := client.Elements.QueryPost(context.TODO(), githubcomplazafyiplazago.ElementQueryPostParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", featureCollection.Features)\n}\n',
      },
      http: {
        example:
          'curl https://plaza.fyi/api/v1/features \\\n    -X POST \\\n    -H "Authorization: Bearer $PLAZA_API_KEY"',
      },
      java: {
        method: 'elements().queryPost',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.FeatureCollection;\nimport com.plazafyi.models.elements.ElementQueryPostParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        FeatureCollection featureCollection = client.elements().queryPost();\n    }\n}',
      },
      kotlin: {
        method: 'elements().queryPost',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.FeatureCollection\nimport com.plazafyi.models.elements.ElementQueryPostParams\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val featureCollection: FeatureCollection = client.elements().queryPost()\n}',
      },
      php: {
        method: 'elements->queryPost',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$featureCollection = $client->elements->queryPost(\n  bbox: 'bbox',\n  contains: 'contains',\n  crosses: 'crosses',\n  cursor: 'cursor',\n  format: 'format',\n  h3: 'h3',\n  intersects: 'intersects',\n  limit: 0,\n  near: 'near',\n  outputBuffer: 0,\n  outputCentroid: true,\n  outputFields: 'output[fields]',\n  outputGeometry: true,\n  outputInclude: 'output[include]',\n  outputPrecision: 0,\n  outputSimplify: 0,\n  outputSort: 'output[sort]',\n  radius: 0,\n  touches: 'touches',\n  type: 'type',\n  within: 'within',\n);\n\nvar_dump($featureCollection);",
      },
      python: {
        method: 'elements.query_post',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\nfeature_collection = client.elements.query_post()\nprint(feature_collection.features)',
      },
      ruby: {
        method: 'elements.query_post',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\nfeature_collection = plaza.elements.query_post\n\nputs(feature_collection)',
      },
      typescript: {
        method: 'client.elements.queryPost',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst featureCollection = await client.elements.queryPost();\n\nconsole.log(featureCollection.features);",
      },
    },
  },
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
    perLanguage: {
      cli: {
        method: 'elements retrieve',
        example: "plaza elements retrieve \\\n  --api-key 'My API Key' \\\n  --type type \\\n  --id 0",
      },
      csharp: {
        method: 'Elements.Retrieve',
        example:
          'ElementRetrieveParams parameters = new()\n{\n    Type = "type",\n    ID = 0,\n};\n\nvar geoJsonFeature = await client.Elements.Retrieve(parameters);\n\nConsole.WriteLine(geoJsonFeature);',
      },
      go: {
        method: 'client.Elements.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tgeoJsonFeature, err := client.Elements.Get(\n\t\tcontext.TODO(),\n\t\t"type",\n\t\tint64(0),\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", geoJsonFeature.ID)\n}\n',
      },
      http: {
        example:
          'curl https://plaza.fyi/api/v1/features/$TYPE/$ID \\\n    -H "Authorization: Bearer $PLAZA_API_KEY"',
      },
      java: {
        method: 'elements().retrieve',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.GeoJsonFeature;\nimport com.plazafyi.models.elements.ElementRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        ElementRetrieveParams params = ElementRetrieveParams.builder()\n            .type("type")\n            .id(0L)\n            .build();\n        GeoJsonFeature geoJsonFeature = client.elements().retrieve(params);\n    }\n}',
      },
      kotlin: {
        method: 'elements().retrieve',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.GeoJsonFeature\nimport com.plazafyi.models.elements.ElementRetrieveParams\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val params: ElementRetrieveParams = ElementRetrieveParams.builder()\n        .type("type")\n        .id(0L)\n        .build()\n    val geoJsonFeature: GeoJsonFeature = client.elements().retrieve(params)\n}',
      },
      php: {
        method: 'elements->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$geoJsonFeature = $client->elements->retrieve(0, type: 'type');\n\nvar_dump($geoJsonFeature);",
      },
      python: {
        method: 'elements.retrieve',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\ngeo_json_feature = client.elements.retrieve(\n    id=0,\n    type="type",\n)\nprint(geo_json_feature.id)',
      },
      ruby: {
        method: 'elements.retrieve',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\ngeo_json_feature = plaza.elements.retrieve(0, type: "type")\n\nputs(geo_json_feature)',
      },
      typescript: {
        method: 'client.elements.retrieve',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst geoJsonFeature = await client.elements.retrieve(0, { type: 'type' });\n\nconsole.log(geoJsonFeature.id);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'elements lookup',
        example: "plaza elements lookup \\\n  --api-key 'My API Key'",
      },
      csharp: {
        method: 'Elements.Lookup',
        example:
          'ElementLookupParams parameters = new();\n\nvar geoJsonFeature = await client.Elements.Lookup(parameters);\n\nConsole.WriteLine(geoJsonFeature);',
      },
      go: {
        method: 'client.Elements.Lookup',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tgeoJsonFeature, err := client.Elements.Lookup(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", geoJsonFeature.ID)\n}\n',
      },
      http: {
        example:
          'curl https://plaza.fyi/api/v1/features/lookup \\\n    -X POST \\\n    -H "Authorization: Bearer $PLAZA_API_KEY"',
      },
      java: {
        method: 'elements().lookup',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.GeoJsonFeature;\nimport com.plazafyi.models.elements.ElementLookupParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        GeoJsonFeature geoJsonFeature = client.elements().lookup();\n    }\n}',
      },
      kotlin: {
        method: 'elements().lookup',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.GeoJsonFeature\nimport com.plazafyi.models.elements.ElementLookupParams\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val geoJsonFeature: GeoJsonFeature = client.elements().lookup()\n}',
      },
      php: {
        method: 'elements->lookup',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$geoJsonFeature = $client->elements->lookup();\n\nvar_dump($geoJsonFeature);",
      },
      python: {
        method: 'elements.lookup',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\ngeo_json_feature = client.elements.lookup()\nprint(geo_json_feature.id)',
      },
      ruby: {
        method: 'elements.lookup',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\ngeo_json_feature = plaza.elements.lookup\n\nputs(geo_json_feature)',
      },
      typescript: {
        method: 'client.elements.lookup',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst geoJsonFeature = await client.elements.lookup();\n\nconsole.log(geoJsonFeature.id);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'elements batch',
        example:
          "plaza elements batch \\\n  --api-key 'My API Key' \\\n  --element '{id: 21154906, type: node}' \\\n  --element '{id: 4589123, type: way}'",
      },
      csharp: {
        method: 'Elements.Batch',
        example:
          'ElementBatchParams parameters = new()\n{\n    Elements =\n    [\n        new()\n        {\n            ID = 21154906,\n            Type = Type.Node,\n        },\n        new()\n        {\n            ID = 4589123,\n            Type = Type.Way,\n        },\n    ],\n};\n\nvar featureCollection = await client.Elements.Batch(parameters);\n\nConsole.WriteLine(featureCollection);',
      },
      go: {
        method: 'client.Elements.Batch',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tfeatureCollection, err := client.Elements.Batch(context.TODO(), githubcomplazafyiplazago.ElementBatchParams{\n\t\tBatchRequest: githubcomplazafyiplazago.BatchRequestParam{\n\t\t\tElements: githubcomplazafyiplazago.F([]githubcomplazafyiplazago.BatchRequestElementParam{{\n\t\t\t\tID:   githubcomplazafyiplazago.F(int64(21154906)),\n\t\t\t\tType: githubcomplazafyiplazago.F(githubcomplazafyiplazago.BatchRequestElementsTypeNode),\n\t\t\t}, {\n\t\t\t\tID:   githubcomplazafyiplazago.F(int64(4589123)),\n\t\t\t\tType: githubcomplazafyiplazago.F(githubcomplazafyiplazago.BatchRequestElementsTypeWay),\n\t\t\t}}),\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", featureCollection.Features)\n}\n',
      },
      http: {
        example:
          'curl https://plaza.fyi/api/v1/features/batch \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $PLAZA_API_KEY" \\\n    -d \'{\n          "elements": [\n            {\n              "id": 21154906,\n              "type": "node"\n            },\n            {\n              "id": 4589123,\n              "type": "way"\n            }\n          ]\n        }\'',
      },
      java: {
        method: 'elements().batch',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.FeatureCollection;\nimport com.plazafyi.models.elements.BatchRequest;\nimport com.plazafyi.models.elements.ElementBatchParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        BatchRequest params = BatchRequest.builder()\n            .addElement(BatchRequest.Element.builder()\n                .id(21154906L)\n                .type(BatchRequest.Element.Type.NODE)\n                .build())\n            .addElement(BatchRequest.Element.builder()\n                .id(4589123L)\n                .type(BatchRequest.Element.Type.WAY)\n                .build())\n            .build();\n        FeatureCollection featureCollection = client.elements().batch(params);\n    }\n}',
      },
      kotlin: {
        method: 'elements().batch',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.FeatureCollection\nimport com.plazafyi.models.elements.BatchRequest\nimport com.plazafyi.models.elements.ElementBatchParams\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val params: BatchRequest = BatchRequest.builder()\n        .addElement(BatchRequest.Element.builder()\n            .id(21154906L)\n            .type(BatchRequest.Element.Type.NODE)\n            .build())\n        .addElement(BatchRequest.Element.builder()\n            .id(4589123L)\n            .type(BatchRequest.Element.Type.WAY)\n            .build())\n        .build()\n    val featureCollection: FeatureCollection = client.elements().batch(params)\n}',
      },
      php: {
        method: 'elements->batch',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$featureCollection = $client->elements->batch(\n  elements: [\n    ['id' => 21154906, 'type' => 'node'], ['id' => 4589123, 'type' => 'way']\n  ],\n);\n\nvar_dump($featureCollection);",
      },
      python: {
        method: 'elements.batch',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\nfeature_collection = client.elements.batch(\n    elements=[{\n        "id": 21154906,\n        "type": "node",\n    }, {\n        "id": 4589123,\n        "type": "way",\n    }],\n)\nprint(feature_collection.features)',
      },
      ruby: {
        method: 'elements.batch',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\nfeature_collection = plaza.elements.batch(elements: [{id: 21154906, type: :node}, {id: 4589123, type: :way}])\n\nputs(feature_collection)',
      },
      typescript: {
        method: 'client.elements.batch',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst featureCollection = await client.elements.batch({\n  elements: [\n    { id: 21154906, type: 'node' },\n    { id: 4589123, type: 'way' },\n  ],\n});\n\nconsole.log(featureCollection.features);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'elements nearby',
        example: "plaza elements nearby \\\n  --api-key 'My API Key'",
      },
      csharp: {
        method: 'Elements.Nearby',
        example:
          'ElementNearbyParams parameters = new();\n\nvar featureCollection = await client.Elements.Nearby(parameters);\n\nConsole.WriteLine(featureCollection);',
      },
      go: {
        method: 'client.Elements.Nearby',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tfeatureCollection, err := client.Elements.Nearby(context.TODO(), githubcomplazafyiplazago.ElementNearbyParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", featureCollection.Features)\n}\n',
      },
      http: {
        example:
          'curl https://plaza.fyi/api/v1/features/nearby \\\n    -H "Authorization: Bearer $PLAZA_API_KEY"',
      },
      java: {
        method: 'elements().nearby',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.FeatureCollection;\nimport com.plazafyi.models.elements.ElementNearbyParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        FeatureCollection featureCollection = client.elements().nearby();\n    }\n}',
      },
      kotlin: {
        method: 'elements().nearby',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.FeatureCollection\nimport com.plazafyi.models.elements.ElementNearbyParams\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val featureCollection: FeatureCollection = client.elements().nearby()\n}',
      },
      php: {
        method: 'elements->nearby',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$featureCollection = $client->elements->nearby(\n  lat: 0,\n  limit: 0,\n  lng: 0,\n  near: 'near',\n  outputBuffer: 0,\n  outputCentroid: true,\n  outputFields: 'output[fields]',\n  outputGeometry: true,\n  outputInclude: 'output[include]',\n  outputPrecision: 0,\n  outputSimplify: 0,\n  outputSort: 'output[sort]',\n  radius: 0,\n);\n\nvar_dump($featureCollection);",
      },
      python: {
        method: 'elements.nearby',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\nfeature_collection = client.elements.nearby()\nprint(feature_collection.features)',
      },
      ruby: {
        method: 'elements.nearby',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\nfeature_collection = plaza.elements.nearby\n\nputs(feature_collection)',
      },
      typescript: {
        method: 'client.elements.nearby',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst featureCollection = await client.elements.nearby();\n\nconsole.log(featureCollection.features);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'elements nearby_post',
        example: "plaza elements nearby-post \\\n  --api-key 'My API Key'",
      },
      csharp: {
        method: 'Elements.NearbyPost',
        example:
          'ElementNearbyPostParams parameters = new();\n\nvar featureCollection = await client.Elements.NearbyPost(parameters);\n\nConsole.WriteLine(featureCollection);',
      },
      go: {
        method: 'client.Elements.NearbyPost',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tfeatureCollection, err := client.Elements.NearbyPost(context.TODO(), githubcomplazafyiplazago.ElementNearbyPostParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", featureCollection.Features)\n}\n',
      },
      http: {
        example:
          'curl https://plaza.fyi/api/v1/features/nearby \\\n    -X POST \\\n    -H "Authorization: Bearer $PLAZA_API_KEY"',
      },
      java: {
        method: 'elements().nearbyPost',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.FeatureCollection;\nimport com.plazafyi.models.elements.ElementNearbyPostParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        FeatureCollection featureCollection = client.elements().nearbyPost();\n    }\n}',
      },
      kotlin: {
        method: 'elements().nearbyPost',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.FeatureCollection\nimport com.plazafyi.models.elements.ElementNearbyPostParams\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val featureCollection: FeatureCollection = client.elements().nearbyPost()\n}',
      },
      php: {
        method: 'elements->nearbyPost',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$featureCollection = $client->elements->nearbyPost(\n  lat: 0,\n  limit: 0,\n  lng: 0,\n  near: 'near',\n  outputBuffer: 0,\n  outputCentroid: true,\n  outputFields: 'output[fields]',\n  outputGeometry: true,\n  outputInclude: 'output[include]',\n  outputPrecision: 0,\n  outputSimplify: 0,\n  outputSort: 'output[sort]',\n  radius: 0,\n);\n\nvar_dump($featureCollection);",
      },
      python: {
        method: 'elements.nearby_post',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\nfeature_collection = client.elements.nearby_post()\nprint(feature_collection.features)',
      },
      ruby: {
        method: 'elements.nearby_post',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\nfeature_collection = plaza.elements.nearby_post\n\nputs(feature_collection)',
      },
      typescript: {
        method: 'client.elements.nearbyPost',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst featureCollection = await client.elements.nearbyPost();\n\nconsole.log(featureCollection.features);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'datasets list',
        example: "plaza datasets list \\\n  --api-key 'My API Key'",
      },
      csharp: {
        method: 'Datasets.List',
        example:
          'DatasetListParams parameters = new();\n\nvar datasetList = await client.Datasets.List(parameters);\n\nConsole.WriteLine(datasetList);',
      },
      go: {
        method: 'client.Datasets.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tdatasetList, err := client.Datasets.List(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", datasetList.Datasets)\n}\n',
      },
      http: {
        example: 'curl https://plaza.fyi/api/v1/datasets \\\n    -H "Authorization: Bearer $PLAZA_API_KEY"',
      },
      java: {
        method: 'datasets().list',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.datasets.DatasetList;\nimport com.plazafyi.models.datasets.DatasetListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        DatasetList datasetList = client.datasets().list();\n    }\n}',
      },
      kotlin: {
        method: 'datasets().list',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.datasets.DatasetList\nimport com.plazafyi.models.datasets.DatasetListParams\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val datasetList: DatasetList = client.datasets().list()\n}',
      },
      php: {
        method: 'datasets->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$datasetList = $client->datasets->list();\n\nvar_dump($datasetList);",
      },
      python: {
        method: 'datasets.list',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\ndataset_list = client.datasets.list()\nprint(dataset_list.datasets)',
      },
      ruby: {
        method: 'datasets.list',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\ndataset_list = plaza.datasets.list\n\nputs(dataset_list)',
      },
      typescript: {
        method: 'client.datasets.list',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst datasetList = await client.datasets.list();\n\nconsole.log(datasetList.datasets);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'datasets create',
        example:
          "plaza datasets create \\\n  --api-key 'My API Key' \\\n  --name 'NYC Bike Lanes' \\\n  --slug nyc-bike-lanes",
      },
      csharp: {
        method: 'Datasets.Create',
        example:
          'DatasetCreateParams parameters = new()\n{\n    Name = "NYC Bike Lanes",\n    Slug = "nyc-bike-lanes",\n};\n\nvar dataset = await client.Datasets.Create(parameters);\n\nConsole.WriteLine(dataset);',
      },
      go: {
        method: 'client.Datasets.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tdataset, err := client.Datasets.New(context.TODO(), githubcomplazafyiplazago.DatasetNewParams{\n\t\tName: githubcomplazafyiplazago.F("NYC Bike Lanes"),\n\t\tSlug: githubcomplazafyiplazago.F("nyc-bike-lanes"),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", dataset.ID)\n}\n',
      },
      http: {
        example:
          'curl https://plaza.fyi/api/v1/datasets \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $PLAZA_API_KEY" \\\n    -d \'{\n          "name": "NYC Bike Lanes",\n          "slug": "nyc-bike-lanes"\n        }\'',
      },
      java: {
        method: 'datasets().create',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.datasets.Dataset;\nimport com.plazafyi.models.datasets.DatasetCreateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        DatasetCreateParams params = DatasetCreateParams.builder()\n            .name("NYC Bike Lanes")\n            .slug("nyc-bike-lanes")\n            .build();\n        Dataset dataset = client.datasets().create(params);\n    }\n}',
      },
      kotlin: {
        method: 'datasets().create',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.datasets.Dataset\nimport com.plazafyi.models.datasets.DatasetCreateParams\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val params: DatasetCreateParams = DatasetCreateParams.builder()\n        .name("NYC Bike Lanes")\n        .slug("nyc-bike-lanes")\n        .build()\n    val dataset: Dataset = client.datasets().create(params)\n}',
      },
      php: {
        method: 'datasets->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$dataset = $client->datasets->create(\n  name: 'NYC Bike Lanes',\n  slug: 'nyc-bike-lanes',\n  attribution: 'attribution',\n  description: 'description',\n  license: 'license',\n  sourceURL: 'https://example.com',\n);\n\nvar_dump($dataset);",
      },
      python: {
        method: 'datasets.create',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\ndataset = client.datasets.create(\n    name="NYC Bike Lanes",\n    slug="nyc-bike-lanes",\n)\nprint(dataset.id)',
      },
      ruby: {
        method: 'datasets.create',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\ndataset = plaza.datasets.create(name: "NYC Bike Lanes", slug: "nyc-bike-lanes")\n\nputs(dataset)',
      },
      typescript: {
        method: 'client.datasets.create',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst dataset = await client.datasets.create({ name: 'NYC Bike Lanes', slug: 'nyc-bike-lanes' });\n\nconsole.log(dataset.id);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'datasets retrieve',
        example: "plaza datasets retrieve \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      csharp: {
        method: 'Datasets.Retrieve',
        example:
          'DatasetRetrieveParams parameters = new() { ID = "id" };\n\nvar dataset = await client.Datasets.Retrieve(parameters);\n\nConsole.WriteLine(dataset);',
      },
      go: {
        method: 'client.Datasets.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tdataset, err := client.Datasets.Get(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", dataset.ID)\n}\n',
      },
      http: {
        example:
          'curl https://plaza.fyi/api/v1/datasets/$ID \\\n    -H "Authorization: Bearer $PLAZA_API_KEY"',
      },
      java: {
        method: 'datasets().retrieve',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.datasets.Dataset;\nimport com.plazafyi.models.datasets.DatasetRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        Dataset dataset = client.datasets().retrieve("id");\n    }\n}',
      },
      kotlin: {
        method: 'datasets().retrieve',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.datasets.Dataset\nimport com.plazafyi.models.datasets.DatasetRetrieveParams\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val dataset: Dataset = client.datasets().retrieve("id")\n}',
      },
      php: {
        method: 'datasets->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$dataset = $client->datasets->retrieve('id');\n\nvar_dump($dataset);",
      },
      python: {
        method: 'datasets.retrieve',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\ndataset = client.datasets.retrieve(\n    "id",\n)\nprint(dataset.id)',
      },
      ruby: {
        method: 'datasets.retrieve',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\ndataset = plaza.datasets.retrieve("id")\n\nputs(dataset)',
      },
      typescript: {
        method: 'client.datasets.retrieve',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst dataset = await client.datasets.retrieve('id');\n\nconsole.log(dataset.id);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'datasets delete',
        example: "plaza datasets delete \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      csharp: {
        method: 'Datasets.Delete',
        example:
          'DatasetDeleteParams parameters = new() { ID = "id" };\n\nawait client.Datasets.Delete(parameters);',
      },
      go: {
        method: 'client.Datasets.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Datasets.Delete(context.TODO(), "id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://plaza.fyi/api/v1/datasets/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $PLAZA_API_KEY"',
      },
      java: {
        method: 'datasets().delete',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.datasets.DatasetDeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        client.datasets().delete("id");\n    }\n}',
      },
      kotlin: {
        method: 'datasets().delete',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.datasets.DatasetDeleteParams\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    client.datasets().delete("id")\n}',
      },
      php: {
        method: 'datasets->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$result = $client->datasets->delete('id');\n\nvar_dump($result);",
      },
      python: {
        method: 'datasets.delete',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\nclient.datasets.delete(\n    "id",\n)',
      },
      ruby: {
        method: 'datasets.delete',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\nresult = plaza.datasets.delete("id")\n\nputs(result)',
      },
      typescript: {
        method: 'client.datasets.delete',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.datasets.delete('id');",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'datasets features',
        example: "plaza datasets features \\\n  --api-key 'My API Key' \\\n  --id id",
      },
      csharp: {
        method: 'Datasets.Features',
        example:
          'DatasetFeaturesParams parameters = new() { ID = "id" };\n\nvar featureCollection = await client.Datasets.Features(parameters);\n\nConsole.WriteLine(featureCollection);',
      },
      go: {
        method: 'client.Datasets.Features',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tfeatureCollection, err := client.Datasets.Features(\n\t\tcontext.TODO(),\n\t\t"id",\n\t\tgithubcomplazafyiplazago.DatasetFeaturesParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", featureCollection.Features)\n}\n',
      },
      http: {
        example:
          'curl https://plaza.fyi/api/v1/datasets/$ID/features \\\n    -H "Authorization: Bearer $PLAZA_API_KEY"',
      },
      java: {
        method: 'datasets().features',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.FeatureCollection;\nimport com.plazafyi.models.datasets.DatasetFeaturesParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        FeatureCollection featureCollection = client.datasets().features("id");\n    }\n}',
      },
      kotlin: {
        method: 'datasets().features',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.FeatureCollection\nimport com.plazafyi.models.datasets.DatasetFeaturesParams\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val featureCollection: FeatureCollection = client.datasets().features("id")\n}',
      },
      php: {
        method: 'datasets->features',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$featureCollection = $client->datasets->features(\n  'id',\n  cursor: 'cursor',\n  format: 'format',\n  limit: 0,\n  outputBuffer: 0,\n  outputCentroid: true,\n  outputFields: 'output[fields]',\n  outputGeometry: true,\n  outputInclude: 'output[include]',\n  outputPrecision: 0,\n  outputSimplify: 0,\n  outputSort: 'output[sort]',\n);\n\nvar_dump($featureCollection);",
      },
      python: {
        method: 'datasets.features',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\nfeature_collection = client.datasets.features(\n    id="id",\n)\nprint(feature_collection.features)',
      },
      ruby: {
        method: 'datasets.features',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\nfeature_collection = plaza.datasets.features("id")\n\nputs(feature_collection)',
      },
      typescript: {
        method: 'client.datasets.features',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst featureCollection = await client.datasets.features('id');\n\nconsole.log(featureCollection.features);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'geocode forward',
        example: "plaza geocode forward \\\n  --api-key 'My API Key' \\\n  --q q",
      },
      csharp: {
        method: 'Geocode.Forward',
        example:
          'GeocodeForwardParams parameters = new() { Q = "q" };\n\nvar geocodeResult = await client.Geocode.Forward(parameters);\n\nConsole.WriteLine(geocodeResult);',
      },
      go: {
        method: 'client.Geocode.Forward',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tgeocodeResult, err := client.Geocode.Forward(context.TODO(), githubcomplazafyiplazago.GeocodeForwardParams{\n\t\tQ: githubcomplazafyiplazago.F("q"),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", geocodeResult.Features)\n}\n',
      },
      http: {
        example: 'curl https://plaza.fyi/api/v1/geocode \\\n    -H "Authorization: Bearer $PLAZA_API_KEY"',
      },
      java: {
        method: 'geocode().forward',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.geocode.GeocodeForwardParams;\nimport com.plazafyi.models.geocode.GeocodeResult;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        GeocodeForwardParams params = GeocodeForwardParams.builder()\n            .q("q")\n            .build();\n        GeocodeResult geocodeResult = client.geocode().forward(params);\n    }\n}',
      },
      kotlin: {
        method: 'geocode().forward',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.geocode.GeocodeForwardParams\nimport com.plazafyi.models.geocode.GeocodeResult\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val params: GeocodeForwardParams = GeocodeForwardParams.builder()\n        .q("q")\n        .build()\n    val geocodeResult: GeocodeResult = client.geocode().forward(params)\n}',
      },
      php: {
        method: 'geocode->forward',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$geocodeResult = $client->geocode->forward(\n  q: 'q',\n  bbox: 'bbox',\n  countryCode: 'country_code',\n  format: 'format',\n  lang: 'lang',\n  lat: 0,\n  layer: 'layer',\n  limit: 0,\n  lng: 0,\n);\n\nvar_dump($geocodeResult);",
      },
      python: {
        method: 'geocode.forward',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\ngeocode_result = client.geocode.forward(\n    q="q",\n)\nprint(geocode_result.features)',
      },
      ruby: {
        method: 'geocode.forward',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\ngeocode_result = plaza.geocode.forward(q: "q")\n\nputs(geocode_result)',
      },
      typescript: {
        method: 'client.geocode.forward',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst geocodeResult = await client.geocode.forward({ q: 'q' });\n\nconsole.log(geocodeResult.features);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'geocode forward_post',
        example: "plaza geocode forward-post \\\n  --api-key 'My API Key' \\\n  --q q",
      },
      csharp: {
        method: 'Geocode.ForwardPost',
        example:
          'GeocodeForwardPostParams parameters = new() { Q = "q" };\n\nvar geocodeResult = await client.Geocode.ForwardPost(parameters);\n\nConsole.WriteLine(geocodeResult);',
      },
      go: {
        method: 'client.Geocode.ForwardPost',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tgeocodeResult, err := client.Geocode.ForwardPost(context.TODO(), githubcomplazafyiplazago.GeocodeForwardPostParams{\n\t\tQ: githubcomplazafyiplazago.F("q"),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", geocodeResult.Features)\n}\n',
      },
      http: {
        example:
          'curl https://plaza.fyi/api/v1/geocode \\\n    -X POST \\\n    -H "Authorization: Bearer $PLAZA_API_KEY"',
      },
      java: {
        method: 'geocode().forwardPost',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.geocode.GeocodeForwardPostParams;\nimport com.plazafyi.models.geocode.GeocodeResult;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        GeocodeForwardPostParams params = GeocodeForwardPostParams.builder()\n            .q("q")\n            .build();\n        GeocodeResult geocodeResult = client.geocode().forwardPost(params);\n    }\n}',
      },
      kotlin: {
        method: 'geocode().forwardPost',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.geocode.GeocodeForwardPostParams\nimport com.plazafyi.models.geocode.GeocodeResult\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val params: GeocodeForwardPostParams = GeocodeForwardPostParams.builder()\n        .q("q")\n        .build()\n    val geocodeResult: GeocodeResult = client.geocode().forwardPost(params)\n}',
      },
      php: {
        method: 'geocode->forwardPost',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$geocodeResult = $client->geocode->forwardPost(\n  q: 'q',\n  bbox: 'bbox',\n  countryCode: 'country_code',\n  format: 'format',\n  lang: 'lang',\n  lat: 0,\n  layer: 'layer',\n  limit: 0,\n  lng: 0,\n);\n\nvar_dump($geocodeResult);",
      },
      python: {
        method: 'geocode.forward_post',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\ngeocode_result = client.geocode.forward_post(\n    q="q",\n)\nprint(geocode_result.features)',
      },
      ruby: {
        method: 'geocode.forward_post',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\ngeocode_result = plaza.geocode.forward_post(q: "q")\n\nputs(geocode_result)',
      },
      typescript: {
        method: 'client.geocode.forwardPost',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst geocodeResult = await client.geocode.forwardPost({ q: 'q' });\n\nconsole.log(geocodeResult.features);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'geocode reverse',
        example: "plaza geocode reverse \\\n  --api-key 'My API Key'",
      },
      csharp: {
        method: 'Geocode.Reverse',
        example:
          'GeocodeReverseParams parameters = new();\n\nvar reverseGeocodeResult = await client.Geocode.Reverse(parameters);\n\nConsole.WriteLine(reverseGeocodeResult);',
      },
      go: {
        method: 'client.Geocode.Reverse',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\treverseGeocodeResult, err := client.Geocode.Reverse(context.TODO(), githubcomplazafyiplazago.GeocodeReverseParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", reverseGeocodeResult.Features)\n}\n',
      },
      http: {
        example:
          'curl https://plaza.fyi/api/v1/geocode/reverse \\\n    -H "Authorization: Bearer $PLAZA_API_KEY"',
      },
      java: {
        method: 'geocode().reverse',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.geocode.GeocodeReverseParams;\nimport com.plazafyi.models.geocode.ReverseGeocodeResult;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        ReverseGeocodeResult reverseGeocodeResult = client.geocode().reverse();\n    }\n}',
      },
      kotlin: {
        method: 'geocode().reverse',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.geocode.GeocodeReverseParams\nimport com.plazafyi.models.geocode.ReverseGeocodeResult\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val reverseGeocodeResult: ReverseGeocodeResult = client.geocode().reverse()\n}',
      },
      php: {
        method: 'geocode->reverse',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$reverseGeocodeResult = $client->geocode->reverse(\n  format: 'format',\n  lang: 'lang',\n  lat: 0,\n  layer: 'layer',\n  limit: 0,\n  lng: 0,\n  near: 'near',\n  radius: 0,\n);\n\nvar_dump($reverseGeocodeResult);",
      },
      python: {
        method: 'geocode.reverse',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\nreverse_geocode_result = client.geocode.reverse()\nprint(reverse_geocode_result.features)',
      },
      ruby: {
        method: 'geocode.reverse',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\nreverse_geocode_result = plaza.geocode.reverse\n\nputs(reverse_geocode_result)',
      },
      typescript: {
        method: 'client.geocode.reverse',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst reverseGeocodeResult = await client.geocode.reverse();\n\nconsole.log(reverseGeocodeResult.features);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'geocode reverse_post',
        example: "plaza geocode reverse-post \\\n  --api-key 'My API Key'",
      },
      csharp: {
        method: 'Geocode.ReversePost',
        example:
          'GeocodeReversePostParams parameters = new();\n\nvar reverseGeocodeResult = await client.Geocode.ReversePost(parameters);\n\nConsole.WriteLine(reverseGeocodeResult);',
      },
      go: {
        method: 'client.Geocode.ReversePost',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\treverseGeocodeResult, err := client.Geocode.ReversePost(context.TODO(), githubcomplazafyiplazago.GeocodeReversePostParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", reverseGeocodeResult.Features)\n}\n',
      },
      http: {
        example:
          'curl https://plaza.fyi/api/v1/geocode/reverse \\\n    -X POST \\\n    -H "Authorization: Bearer $PLAZA_API_KEY"',
      },
      java: {
        method: 'geocode().reversePost',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.geocode.GeocodeReversePostParams;\nimport com.plazafyi.models.geocode.ReverseGeocodeResult;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        ReverseGeocodeResult reverseGeocodeResult = client.geocode().reversePost();\n    }\n}',
      },
      kotlin: {
        method: 'geocode().reversePost',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.geocode.GeocodeReversePostParams\nimport com.plazafyi.models.geocode.ReverseGeocodeResult\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val reverseGeocodeResult: ReverseGeocodeResult = client.geocode().reversePost()\n}',
      },
      php: {
        method: 'geocode->reversePost',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$reverseGeocodeResult = $client->geocode->reversePost(\n  format: 'format',\n  lang: 'lang',\n  lat: 0,\n  layer: 'layer',\n  limit: 0,\n  lng: 0,\n  near: 'near',\n  radius: 0,\n);\n\nvar_dump($reverseGeocodeResult);",
      },
      python: {
        method: 'geocode.reverse_post',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\nreverse_geocode_result = client.geocode.reverse_post()\nprint(reverse_geocode_result.features)',
      },
      ruby: {
        method: 'geocode.reverse_post',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\nreverse_geocode_result = plaza.geocode.reverse_post\n\nputs(reverse_geocode_result)',
      },
      typescript: {
        method: 'client.geocode.reversePost',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst reverseGeocodeResult = await client.geocode.reversePost();\n\nconsole.log(reverseGeocodeResult.features);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'geocode autocomplete',
        example: "plaza geocode autocomplete \\\n  --api-key 'My API Key' \\\n  --q q",
      },
      csharp: {
        method: 'Geocode.Autocomplete',
        example:
          'GeocodeAutocompleteParams parameters = new() { Q = "q" };\n\nvar autocompleteResult = await client.Geocode.Autocomplete(parameters);\n\nConsole.WriteLine(autocompleteResult);',
      },
      go: {
        method: 'client.Geocode.Autocomplete',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tautocompleteResult, err := client.Geocode.Autocomplete(context.TODO(), githubcomplazafyiplazago.GeocodeAutocompleteParams{\n\t\tQ: githubcomplazafyiplazago.F("q"),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", autocompleteResult.Features)\n}\n',
      },
      http: {
        example:
          'curl https://plaza.fyi/api/v1/geocode/autocomplete \\\n    -H "Authorization: Bearer $PLAZA_API_KEY"',
      },
      java: {
        method: 'geocode().autocomplete',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.geocode.AutocompleteResult;\nimport com.plazafyi.models.geocode.GeocodeAutocompleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        GeocodeAutocompleteParams params = GeocodeAutocompleteParams.builder()\n            .q("q")\n            .build();\n        AutocompleteResult autocompleteResult = client.geocode().autocomplete(params);\n    }\n}',
      },
      kotlin: {
        method: 'geocode().autocomplete',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.geocode.AutocompleteResult\nimport com.plazafyi.models.geocode.GeocodeAutocompleteParams\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val params: GeocodeAutocompleteParams = GeocodeAutocompleteParams.builder()\n        .q("q")\n        .build()\n    val autocompleteResult: AutocompleteResult = client.geocode().autocomplete(params)\n}',
      },
      php: {
        method: 'geocode->autocomplete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$autocompleteResult = $client->geocode->autocomplete(\n  q: 'q',\n  countryCode: 'country_code',\n  format: 'format',\n  lang: 'lang',\n  lat: 0,\n  layer: 'layer',\n  limit: 0,\n  lng: 0,\n);\n\nvar_dump($autocompleteResult);",
      },
      python: {
        method: 'geocode.autocomplete',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\nautocomplete_result = client.geocode.autocomplete(\n    q="q",\n)\nprint(autocomplete_result.features)',
      },
      ruby: {
        method: 'geocode.autocomplete',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\nautocomplete_result = plaza.geocode.autocomplete(q: "q")\n\nputs(autocomplete_result)',
      },
      typescript: {
        method: 'client.geocode.autocomplete',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst autocompleteResult = await client.geocode.autocomplete({ q: 'q' });\n\nconsole.log(autocompleteResult.features);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'geocode autocomplete_post',
        example: "plaza geocode autocomplete-post \\\n  --api-key 'My API Key' \\\n  --q q",
      },
      csharp: {
        method: 'Geocode.AutocompletePost',
        example:
          'GeocodeAutocompletePostParams parameters = new() { Q = "q" };\n\nvar autocompleteResult = await client.Geocode.AutocompletePost(parameters);\n\nConsole.WriteLine(autocompleteResult);',
      },
      go: {
        method: 'client.Geocode.AutocompletePost',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tautocompleteResult, err := client.Geocode.AutocompletePost(context.TODO(), githubcomplazafyiplazago.GeocodeAutocompletePostParams{\n\t\tQ: githubcomplazafyiplazago.F("q"),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", autocompleteResult.Features)\n}\n',
      },
      http: {
        example:
          'curl https://plaza.fyi/api/v1/geocode/autocomplete \\\n    -X POST \\\n    -H "Authorization: Bearer $PLAZA_API_KEY"',
      },
      java: {
        method: 'geocode().autocompletePost',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.geocode.AutocompleteResult;\nimport com.plazafyi.models.geocode.GeocodeAutocompletePostParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        GeocodeAutocompletePostParams params = GeocodeAutocompletePostParams.builder()\n            .q("q")\n            .build();\n        AutocompleteResult autocompleteResult = client.geocode().autocompletePost(params);\n    }\n}',
      },
      kotlin: {
        method: 'geocode().autocompletePost',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.geocode.AutocompleteResult\nimport com.plazafyi.models.geocode.GeocodeAutocompletePostParams\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val params: GeocodeAutocompletePostParams = GeocodeAutocompletePostParams.builder()\n        .q("q")\n        .build()\n    val autocompleteResult: AutocompleteResult = client.geocode().autocompletePost(params)\n}',
      },
      php: {
        method: 'geocode->autocompletePost',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$autocompleteResult = $client->geocode->autocompletePost(\n  q: 'q',\n  countryCode: 'country_code',\n  format: 'format',\n  lang: 'lang',\n  lat: 0,\n  layer: 'layer',\n  limit: 0,\n  lng: 0,\n);\n\nvar_dump($autocompleteResult);",
      },
      python: {
        method: 'geocode.autocomplete_post',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\nautocomplete_result = client.geocode.autocomplete_post(\n    q="q",\n)\nprint(autocomplete_result.features)',
      },
      ruby: {
        method: 'geocode.autocomplete_post',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\nautocomplete_result = plaza.geocode.autocomplete_post(q: "q")\n\nputs(autocomplete_result)',
      },
      typescript: {
        method: 'client.geocode.autocompletePost',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst autocompleteResult = await client.geocode.autocompletePost({ q: 'q' });\n\nconsole.log(autocompleteResult.features);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'geocode batch',
        example: "plaza geocode batch \\\n  --api-key 'My API Key' \\\n  --address string",
      },
      csharp: {
        method: 'Geocode.Batch',
        example:
          'GeocodeBatchParams parameters = new()\n{\n    Addresses =\n    [\n        "string"\n    ],\n};\n\nvar response = await client.Geocode.Batch(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Geocode.Batch',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Geocode.Batch(context.TODO(), githubcomplazafyiplazago.GeocodeBatchParams{\n\t\tAddresses: githubcomplazafyiplazago.F([]string{"string"}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Count)\n}\n',
      },
      http: {
        example:
          'curl https://plaza.fyi/api/v1/geocode/batch \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $PLAZA_API_KEY" \\\n    -d \'{\n          "addresses": [\n            "string"\n          ]\n        }\'',
      },
      java: {
        method: 'geocode().batch',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.geocode.GeocodeBatchParams;\nimport com.plazafyi.models.geocode.GeocodeBatchResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        GeocodeBatchParams params = GeocodeBatchParams.builder()\n            .addAddress("string")\n            .build();\n        GeocodeBatchResponse response = client.geocode().batch(params);\n    }\n}',
      },
      kotlin: {
        method: 'geocode().batch',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.geocode.GeocodeBatchParams\nimport com.plazafyi.models.geocode.GeocodeBatchResponse\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val params: GeocodeBatchParams = GeocodeBatchParams.builder()\n        .addAddress("string")\n        .build()\n    val response: GeocodeBatchResponse = client.geocode().batch(params)\n}',
      },
      php: {
        method: 'geocode->batch',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$response = $client->geocode->batch(addresses: ['string']);\n\nvar_dump($response);",
      },
      python: {
        method: 'geocode.batch',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.geocode.batch(\n    addresses=["string"],\n)\nprint(response.count)',
      },
      ruby: {
        method: 'geocode.batch',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\nresponse = plaza.geocode.batch(addresses: ["string"])\n\nputs(response)',
      },
      typescript: {
        method: 'client.geocode.batch',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.geocode.batch({ addresses: ['string'] });\n\nconsole.log(response.count);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'search query',
        example: "plaza search query \\\n  --api-key 'My API Key' \\\n  --q q",
      },
      csharp: {
        method: 'Search.Query',
        example:
          'SearchQueryParams parameters = new() { Q = "q" };\n\nvar featureCollection = await client.Search.Query(parameters);\n\nConsole.WriteLine(featureCollection);',
      },
      go: {
        method: 'client.Search.Query',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tfeatureCollection, err := client.Search.Query(context.TODO(), githubcomplazafyiplazago.SearchQueryParams{\n\t\tQ: githubcomplazafyiplazago.F("q"),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", featureCollection.Features)\n}\n',
      },
      http: {
        example: 'curl https://plaza.fyi/api/v1/search \\\n    -H "Authorization: Bearer $PLAZA_API_KEY"',
      },
      java: {
        method: 'search().query',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.FeatureCollection;\nimport com.plazafyi.models.search.SearchQueryParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        SearchQueryParams params = SearchQueryParams.builder()\n            .q("q")\n            .build();\n        FeatureCollection featureCollection = client.search().query(params);\n    }\n}',
      },
      kotlin: {
        method: 'search().query',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.FeatureCollection\nimport com.plazafyi.models.search.SearchQueryParams\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val params: SearchQueryParams = SearchQueryParams.builder()\n        .q("q")\n        .build()\n    val featureCollection: FeatureCollection = client.search().query(params)\n}',
      },
      php: {
        method: 'search->query',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$featureCollection = $client->search->query(\n  q: 'q',\n  cursor: 'cursor',\n  format: 'format',\n  limit: 0,\n  outputFields: 'output[fields]',\n  outputInclude: 'output[include]',\n  outputPrecision: 0,\n  outputSort: 'output[sort]',\n);\n\nvar_dump($featureCollection);",
      },
      python: {
        method: 'search.query',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\nfeature_collection = client.search.query(\n    q="q",\n)\nprint(feature_collection.features)',
      },
      ruby: {
        method: 'search.query',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\nfeature_collection = plaza.search.query(q: "q")\n\nputs(feature_collection)',
      },
      typescript: {
        method: 'client.search.query',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst featureCollection = await client.search.query({ q: 'q' });\n\nconsole.log(featureCollection.features);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'search query_post',
        example: "plaza search query-post \\\n  --api-key 'My API Key' \\\n  --q q",
      },
      csharp: {
        method: 'Search.QueryPost',
        example:
          'SearchQueryPostParams parameters = new() { Q = "q" };\n\nvar featureCollection = await client.Search.QueryPost(parameters);\n\nConsole.WriteLine(featureCollection);',
      },
      go: {
        method: 'client.Search.QueryPost',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tfeatureCollection, err := client.Search.QueryPost(context.TODO(), githubcomplazafyiplazago.SearchQueryPostParams{\n\t\tQ: githubcomplazafyiplazago.F("q"),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", featureCollection.Features)\n}\n',
      },
      http: {
        example:
          'curl https://plaza.fyi/api/v1/search \\\n    -X POST \\\n    -H "Authorization: Bearer $PLAZA_API_KEY"',
      },
      java: {
        method: 'search().queryPost',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.FeatureCollection;\nimport com.plazafyi.models.search.SearchQueryPostParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        SearchQueryPostParams params = SearchQueryPostParams.builder()\n            .q("q")\n            .build();\n        FeatureCollection featureCollection = client.search().queryPost(params);\n    }\n}',
      },
      kotlin: {
        method: 'search().queryPost',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.FeatureCollection\nimport com.plazafyi.models.search.SearchQueryPostParams\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val params: SearchQueryPostParams = SearchQueryPostParams.builder()\n        .q("q")\n        .build()\n    val featureCollection: FeatureCollection = client.search().queryPost(params)\n}',
      },
      php: {
        method: 'search->queryPost',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$featureCollection = $client->search->queryPost(\n  q: 'q',\n  cursor: 'cursor',\n  format: 'format',\n  limit: 0,\n  outputFields: 'output[fields]',\n  outputInclude: 'output[include]',\n  outputPrecision: 0,\n  outputSort: 'output[sort]',\n);\n\nvar_dump($featureCollection);",
      },
      python: {
        method: 'search.query_post',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\nfeature_collection = client.search.query_post(\n    q="q",\n)\nprint(feature_collection.features)',
      },
      ruby: {
        method: 'search.query_post',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\nfeature_collection = plaza.search.query_post(q: "q")\n\nputs(feature_collection)',
      },
      typescript: {
        method: 'client.search.queryPost',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst featureCollection = await client.search.queryPost({ q: 'q' });\n\nconsole.log(featureCollection.features);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'routing route',
        example:
          "plaza routing route \\\n  --api-key 'My API Key' \\\n  --destination '{lat: 48.8584, lng: 2.2945}' \\\n  --origin '{lat: 48.8566, lng: 2.3522}'",
      },
      csharp: {
        method: 'Routing.Route',
        example:
          'RoutingRouteParams parameters = new()\n{\n    Destination = new()\n    {\n        Lat = 48.8584,\n        Lng = 2.2945,\n    },\n    Origin = new()\n    {\n        Lat = 48.8566,\n        Lng = 2.3522,\n    },\n};\n\nvar routeResult = await client.Routing.Route(parameters);\n\nConsole.WriteLine(routeResult);',
      },
      go: {
        method: 'client.Routing.Route',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\trouteResult, err := client.Routing.Route(context.TODO(), githubcomplazafyiplazago.RoutingRouteParams{\n\t\tRouteRequest: githubcomplazafyiplazago.RouteRequestParam{\n\t\t\tDestination: githubcomplazafyiplazago.F(githubcomplazafyiplazago.RouteRequestDestinationParam{\n\t\t\t\tLat: githubcomplazafyiplazago.F(48.858400),\n\t\t\t\tLng: githubcomplazafyiplazago.F(2.294500),\n\t\t\t}),\n\t\t\tOrigin: githubcomplazafyiplazago.F(githubcomplazafyiplazago.RouteRequestOriginParam{\n\t\t\t\tLat: githubcomplazafyiplazago.F(48.856600),\n\t\t\t\tLng: githubcomplazafyiplazago.F(2.352200),\n\t\t\t}),\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", routeResult.Geometry)\n}\n',
      },
      http: {
        example:
          'curl https://plaza.fyi/api/v1/route \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $PLAZA_API_KEY" \\\n    -d \'{\n          "destination": {\n            "lat": 48.8584,\n            "lng": 2.2945\n          },\n          "origin": {\n            "lat": 48.8566,\n            "lng": 2.3522\n          }\n        }\'',
      },
      java: {
        method: 'routing().route',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.routing.RouteRequest;\nimport com.plazafyi.models.routing.RouteResult;\nimport com.plazafyi.models.routing.RoutingRouteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        RouteRequest params = RouteRequest.builder()\n            .destination(RouteRequest.Destination.builder()\n                .lat(48.8584)\n                .lng(2.2945)\n                .build())\n            .origin(RouteRequest.Origin.builder()\n                .lat(48.8566)\n                .lng(2.3522)\n                .build())\n            .build();\n        RouteResult routeResult = client.routing().route(params);\n    }\n}',
      },
      kotlin: {
        method: 'routing().route',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.routing.RouteRequest\nimport com.plazafyi.models.routing.RouteResult\nimport com.plazafyi.models.routing.RoutingRouteParams\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val params: RouteRequest = RouteRequest.builder()\n        .destination(RouteRequest.Destination.builder()\n            .lat(48.8584)\n            .lng(2.2945)\n            .build())\n        .origin(RouteRequest.Origin.builder()\n            .lat(48.8566)\n            .lng(2.3522)\n            .build())\n        .build()\n    val routeResult: RouteResult = client.routing().route(params)\n}',
      },
      php: {
        method: 'routing->route',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$routeResult = $client->routing->route(\n  destination: ['lat' => 48.8584, 'lng' => 2.2945],\n  origin: ['lat' => 48.8566, 'lng' => 2.3522],\n  format: 'format',\n  alternatives: 0,\n  annotations: true,\n  departAt: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  ev: [\n    'batteryCapacityWh' => 75000,\n    'connectorTypes' => ['string'],\n    'initialChargePct' => 0,\n    'minChargePct' => 0,\n    'minPowerKw' => 0,\n  ],\n  exclude: 'exclude',\n  geometries: 'geojson',\n  mode: 'auto',\n  overview: 'full',\n  steps: true,\n  trafficModel: 'best_guess',\n  waypoints: [['lat' => 48.8566, 'lng' => 2.3522]],\n);\n\nvar_dump($routeResult);",
      },
      python: {
        method: 'routing.route',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\nroute_result = client.routing.route(\n    destination={\n        "lat": 48.8584,\n        "lng": 2.2945,\n    },\n    origin={\n        "lat": 48.8566,\n        "lng": 2.3522,\n    },\n)\nprint(route_result.geometry)',
      },
      ruby: {
        method: 'routing.route',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\nroute_result = plaza.routing.route(destination: {lat: 48.8584, lng: 2.2945}, origin: {lat: 48.8566, lng: 2.3522})\n\nputs(route_result)',
      },
      typescript: {
        method: 'client.routing.route',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst routeResult = await client.routing.route({\n  destination: { lat: 48.8584, lng: 2.2945 },\n  origin: { lat: 48.8566, lng: 2.3522 },\n});\n\nconsole.log(routeResult.geometry);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'routing nearest',
        example: "plaza routing nearest \\\n  --api-key 'My API Key' \\\n  --lat 0 \\\n  --lng 0",
      },
      csharp: {
        method: 'Routing.Nearest',
        example:
          'RoutingNearestParams parameters = new()\n{\n    Lat = 0,\n    Lng = 0,\n};\n\nvar nearestResult = await client.Routing.Nearest(parameters);\n\nConsole.WriteLine(nearestResult);',
      },
      go: {
        method: 'client.Routing.Nearest',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tnearestResult, err := client.Routing.Nearest(context.TODO(), githubcomplazafyiplazago.RoutingNearestParams{\n\t\tLat: githubcomplazafyiplazago.F(0.000000),\n\t\tLng: githubcomplazafyiplazago.F(0.000000),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", nearestResult.Geometry)\n}\n',
      },
      http: {
        example: 'curl https://plaza.fyi/api/v1/nearest \\\n    -H "Authorization: Bearer $PLAZA_API_KEY"',
      },
      java: {
        method: 'routing().nearest',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.routing.NearestResult;\nimport com.plazafyi.models.routing.RoutingNearestParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        RoutingNearestParams params = RoutingNearestParams.builder()\n            .lat(0.0)\n            .lng(0.0)\n            .build();\n        NearestResult nearestResult = client.routing().nearest(params);\n    }\n}',
      },
      kotlin: {
        method: 'routing().nearest',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.routing.NearestResult\nimport com.plazafyi.models.routing.RoutingNearestParams\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val params: RoutingNearestParams = RoutingNearestParams.builder()\n        .lat(0.0)\n        .lng(0.0)\n        .build()\n    val nearestResult: NearestResult = client.routing().nearest(params)\n}',
      },
      php: {
        method: 'routing->nearest',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$nearestResult = $client->routing->nearest(\n  lat: 0,\n  lng: 0,\n  outputFields: 'output[fields]',\n  outputInclude: 'output[include]',\n  outputPrecision: 0,\n  radius: 0,\n);\n\nvar_dump($nearestResult);",
      },
      python: {
        method: 'routing.nearest',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\nnearest_result = client.routing.nearest(\n    lat=0,\n    lng=0,\n)\nprint(nearest_result.geometry)',
      },
      ruby: {
        method: 'routing.nearest',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\nnearest_result = plaza.routing.nearest(lat: 0, lng: 0)\n\nputs(nearest_result)',
      },
      typescript: {
        method: 'client.routing.nearest',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst nearestResult = await client.routing.nearest({ lat: 0, lng: 0 });\n\nconsole.log(nearestResult.geometry);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'routing nearest_post',
        example: "plaza routing nearest-post \\\n  --api-key 'My API Key' \\\n  --lat 0 \\\n  --lng 0",
      },
      csharp: {
        method: 'Routing.NearestPost',
        example:
          'RoutingNearestPostParams parameters = new()\n{\n    Lat = 0,\n    Lng = 0,\n};\n\nvar nearestResult = await client.Routing.NearestPost(parameters);\n\nConsole.WriteLine(nearestResult);',
      },
      go: {
        method: 'client.Routing.NearestPost',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tnearestResult, err := client.Routing.NearestPost(context.TODO(), githubcomplazafyiplazago.RoutingNearestPostParams{\n\t\tLat: githubcomplazafyiplazago.F(0.000000),\n\t\tLng: githubcomplazafyiplazago.F(0.000000),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", nearestResult.Geometry)\n}\n',
      },
      http: {
        example:
          'curl https://plaza.fyi/api/v1/nearest \\\n    -X POST \\\n    -H "Authorization: Bearer $PLAZA_API_KEY"',
      },
      java: {
        method: 'routing().nearestPost',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.routing.NearestResult;\nimport com.plazafyi.models.routing.RoutingNearestPostParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        RoutingNearestPostParams params = RoutingNearestPostParams.builder()\n            .lat(0.0)\n            .lng(0.0)\n            .build();\n        NearestResult nearestResult = client.routing().nearestPost(params);\n    }\n}',
      },
      kotlin: {
        method: 'routing().nearestPost',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.routing.NearestResult\nimport com.plazafyi.models.routing.RoutingNearestPostParams\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val params: RoutingNearestPostParams = RoutingNearestPostParams.builder()\n        .lat(0.0)\n        .lng(0.0)\n        .build()\n    val nearestResult: NearestResult = client.routing().nearestPost(params)\n}',
      },
      php: {
        method: 'routing->nearestPost',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$nearestResult = $client->routing->nearestPost(\n  lat: 0,\n  lng: 0,\n  outputFields: 'output[fields]',\n  outputInclude: 'output[include]',\n  outputPrecision: 0,\n  radius: 0,\n);\n\nvar_dump($nearestResult);",
      },
      python: {
        method: 'routing.nearest_post',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\nnearest_result = client.routing.nearest_post(\n    lat=0,\n    lng=0,\n)\nprint(nearest_result.geometry)',
      },
      ruby: {
        method: 'routing.nearest_post',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\nnearest_result = plaza.routing.nearest_post(lat: 0, lng: 0)\n\nputs(nearest_result)',
      },
      typescript: {
        method: 'client.routing.nearestPost',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst nearestResult = await client.routing.nearestPost({ lat: 0, lng: 0 });\n\nconsole.log(nearestResult.geometry);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'routing isochrone',
        example:
          "plaza routing isochrone \\\n  --api-key 'My API Key' \\\n  --lat 0 \\\n  --lng 0 \\\n  --time 0",
      },
      csharp: {
        method: 'Routing.Isochrone',
        example:
          'RoutingIsochroneParams parameters = new()\n{\n    Lat = 0,\n    Lng = 0,\n    Time = 0,\n};\n\nvar response = await client.Routing.Isochrone(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Routing.Isochrone',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Routing.Isochrone(context.TODO(), githubcomplazafyiplazago.RoutingIsochroneParams{\n\t\tLat:  githubcomplazafyiplazago.F(0.000000),\n\t\tLng:  githubcomplazafyiplazago.F(0.000000),\n\t\tTime: githubcomplazafyiplazago.F(0.000000),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Features)\n}\n',
      },
      http: {
        example: 'curl https://plaza.fyi/api/v1/isochrone \\\n    -H "Authorization: Bearer $PLAZA_API_KEY"',
      },
      java: {
        method: 'routing().isochrone',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.routing.RoutingIsochroneParams;\nimport com.plazafyi.models.routing.RoutingIsochroneResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        RoutingIsochroneParams params = RoutingIsochroneParams.builder()\n            .lat(0.0)\n            .lng(0.0)\n            .time(0.0)\n            .build();\n        RoutingIsochroneResponse response = client.routing().isochrone(params);\n    }\n}',
      },
      kotlin: {
        method: 'routing().isochrone',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.routing.RoutingIsochroneParams\nimport com.plazafyi.models.routing.RoutingIsochroneResponse\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val params: RoutingIsochroneParams = RoutingIsochroneParams.builder()\n        .lat(0.0)\n        .lng(0.0)\n        .time(0.0)\n        .build()\n    val response: RoutingIsochroneResponse = client.routing().isochrone(params)\n}',
      },
      php: {
        method: 'routing->isochrone',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$response = $client->routing->isochrone(\n  lat: 0,\n  lng: 0,\n  time: 0,\n  format: 'format',\n  mode: 'mode',\n  outputFields: 'output[fields]',\n  outputGeometry: true,\n  outputInclude: 'output[include]',\n  outputPrecision: 0,\n  outputSimplify: 0,\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'routing.isochrone',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.routing.isochrone(\n    lat=0,\n    lng=0,\n    time=0,\n)\nprint(response.features)',
      },
      ruby: {
        method: 'routing.isochrone',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\nresponse = plaza.routing.isochrone(lat: 0, lng: 0, time: 0)\n\nputs(response)',
      },
      typescript: {
        method: 'client.routing.isochrone',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.routing.isochrone({\n  lat: 0,\n  lng: 0,\n  time: 0,\n});\n\nconsole.log(response.features);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'routing isochrone_post',
        example:
          "plaza routing isochrone-post \\\n  --api-key 'My API Key' \\\n  --lat 0 \\\n  --lng 0 \\\n  --time 0",
      },
      csharp: {
        method: 'Routing.IsochronePost',
        example:
          'RoutingIsochronePostParams parameters = new()\n{\n    Lat = 0,\n    Lng = 0,\n    Time = 0,\n};\n\nvar response = await client.Routing.IsochronePost(parameters);\n\nConsole.WriteLine(response);',
      },
      go: {
        method: 'client.Routing.IsochronePost',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Routing.IsochronePost(context.TODO(), githubcomplazafyiplazago.RoutingIsochronePostParams{\n\t\tLat:  githubcomplazafyiplazago.F(0.000000),\n\t\tLng:  githubcomplazafyiplazago.F(0.000000),\n\t\tTime: githubcomplazafyiplazago.F(0.000000),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Features)\n}\n',
      },
      http: {
        example:
          'curl https://plaza.fyi/api/v1/isochrone \\\n    -X POST \\\n    -H "Authorization: Bearer $PLAZA_API_KEY"',
      },
      java: {
        method: 'routing().isochronePost',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.routing.RoutingIsochronePostParams;\nimport com.plazafyi.models.routing.RoutingIsochronePostResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        RoutingIsochronePostParams params = RoutingIsochronePostParams.builder()\n            .lat(0.0)\n            .lng(0.0)\n            .time(0.0)\n            .build();\n        RoutingIsochronePostResponse response = client.routing().isochronePost(params);\n    }\n}',
      },
      kotlin: {
        method: 'routing().isochronePost',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.routing.RoutingIsochronePostParams\nimport com.plazafyi.models.routing.RoutingIsochronePostResponse\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val params: RoutingIsochronePostParams = RoutingIsochronePostParams.builder()\n        .lat(0.0)\n        .lng(0.0)\n        .time(0.0)\n        .build()\n    val response: RoutingIsochronePostResponse = client.routing().isochronePost(params)\n}',
      },
      php: {
        method: 'routing->isochronePost',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$response = $client->routing->isochronePost(\n  lat: 0,\n  lng: 0,\n  time: 0,\n  format: 'format',\n  mode: 'mode',\n  outputFields: 'output[fields]',\n  outputGeometry: true,\n  outputInclude: 'output[include]',\n  outputPrecision: 0,\n  outputSimplify: 0,\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'routing.isochrone_post',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.routing.isochrone_post(\n    lat=0,\n    lng=0,\n    time=0,\n)\nprint(response.features)',
      },
      ruby: {
        method: 'routing.isochrone_post',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\nresponse = plaza.routing.isochrone_post(lat: 0, lng: 0, time: 0)\n\nputs(response)',
      },
      typescript: {
        method: 'client.routing.isochronePost',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.routing.isochronePost({\n  lat: 0,\n  lng: 0,\n  time: 0,\n});\n\nconsole.log(response.features);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'routing matrix',
        example:
          "plaza routing matrix \\\n  --api-key 'My API Key' \\\n  --destination '{lat: 48.8584, lng: 2.2945}' \\\n  --origin '{lat: 48.8566, lng: 2.3522}' \\\n  --origin '{lat: 48.8606, lng: 2.3376}'",
      },
      csharp: {
        method: 'Routing.Matrix',
        example:
          'RoutingMatrixParams parameters = new()\n{\n    Destinations =\n    [\n        new()\n        {\n            Lat = 48.8584,\n            Lng = 2.2945,\n        },\n    ],\n    Origins =\n    [\n        new()\n        {\n            Lat = 48.8566,\n            Lng = 2.3522,\n        },\n        new()\n        {\n            Lat = 48.8606,\n            Lng = 2.3376,\n        },\n    ],\n};\n\nvar matrixResult = await client.Routing.Matrix(parameters);\n\nConsole.WriteLine(matrixResult);',
      },
      go: {
        method: 'client.Routing.Matrix',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmatrixResult, err := client.Routing.Matrix(context.TODO(), githubcomplazafyiplazago.RoutingMatrixParams{\n\t\tMatrixRequest: githubcomplazafyiplazago.MatrixRequestParam{\n\t\t\tDestinations: githubcomplazafyiplazago.F([]githubcomplazafyiplazago.MatrixRequestDestinationParam{{\n\t\t\t\tLat: githubcomplazafyiplazago.F(48.858400),\n\t\t\t\tLng: githubcomplazafyiplazago.F(2.294500),\n\t\t\t}}),\n\t\t\tOrigins: githubcomplazafyiplazago.F([]githubcomplazafyiplazago.MatrixRequestOriginParam{{\n\t\t\t\tLat: githubcomplazafyiplazago.F(48.856600),\n\t\t\t\tLng: githubcomplazafyiplazago.F(2.352200),\n\t\t\t}, {\n\t\t\t\tLat: githubcomplazafyiplazago.F(48.860600),\n\t\t\t\tLng: githubcomplazafyiplazago.F(2.337600),\n\t\t\t}}),\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", matrixResult)\n}\n',
      },
      http: {
        example:
          'curl https://plaza.fyi/api/v1/matrix \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $PLAZA_API_KEY" \\\n    -d \'{\n          "destinations": [\n            {\n              "lat": 48.8584,\n              "lng": 2.2945\n            }\n          ],\n          "origins": [\n            {\n              "lat": 48.8566,\n              "lng": 2.3522\n            },\n            {\n              "lat": 48.8606,\n              "lng": 2.3376\n            }\n          ]\n        }\'',
      },
      java: {
        method: 'routing().matrix',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.routing.MatrixRequest;\nimport com.plazafyi.models.routing.MatrixResult;\nimport com.plazafyi.models.routing.RoutingMatrixParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        MatrixRequest params = MatrixRequest.builder()\n            .addDestination(MatrixRequest.Destination.builder()\n                .lat(48.8584)\n                .lng(2.2945)\n                .build())\n            .addOrigin(MatrixRequest.Origin.builder()\n                .lat(48.8566)\n                .lng(2.3522)\n                .build())\n            .addOrigin(MatrixRequest.Origin.builder()\n                .lat(48.8606)\n                .lng(2.3376)\n                .build())\n            .build();\n        MatrixResult matrixResult = client.routing().matrix(params);\n    }\n}',
      },
      kotlin: {
        method: 'routing().matrix',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.routing.MatrixRequest\nimport com.plazafyi.models.routing.MatrixResult\nimport com.plazafyi.models.routing.RoutingMatrixParams\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val params: MatrixRequest = MatrixRequest.builder()\n        .addDestination(MatrixRequest.Destination.builder()\n            .lat(48.8584)\n            .lng(2.2945)\n            .build())\n        .addOrigin(MatrixRequest.Origin.builder()\n            .lat(48.8566)\n            .lng(2.3522)\n            .build())\n        .addOrigin(MatrixRequest.Origin.builder()\n            .lat(48.8606)\n            .lng(2.3376)\n            .build())\n        .build()\n    val matrixResult: MatrixResult = client.routing().matrix(params)\n}',
      },
      php: {
        method: 'routing->matrix',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$matrixResult = $client->routing->matrix(\n  destinations: [['lat' => 48.8584, 'lng' => 2.2945]],\n  origins: [\n    ['lat' => 48.8566, 'lng' => 2.3522], ['lat' => 48.8606, 'lng' => 2.3376]\n  ],\n  annotations: 'annotations',\n  fallbackSpeed: 1,\n  mode: 'auto',\n);\n\nvar_dump($matrixResult);",
      },
      python: {
        method: 'routing.matrix',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\nmatrix_result = client.routing.matrix(\n    destinations=[{\n        "lat": 48.8584,\n        "lng": 2.2945,\n    }],\n    origins=[{\n        "lat": 48.8566,\n        "lng": 2.3522,\n    }, {\n        "lat": 48.8606,\n        "lng": 2.3376,\n    }],\n)\nprint(matrix_result)',
      },
      ruby: {
        method: 'routing.matrix',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\nmatrix_result = plaza.routing.matrix(\n  destinations: [{lat: 48.8584, lng: 2.2945}],\n  origins: [{lat: 48.8566, lng: 2.3522}, {lat: 48.8606, lng: 2.3376}]\n)\n\nputs(matrix_result)',
      },
      typescript: {
        method: 'client.routing.matrix',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst matrixResult = await client.routing.matrix({\n  destinations: [{ lat: 48.8584, lng: 2.2945 }],\n  origins: [\n    { lat: 48.8566, lng: 2.3522 },\n    { lat: 48.8606, lng: 2.3376 },\n  ],\n});\n\nconsole.log(matrixResult);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'elevation lookup',
        example: "plaza elevation lookup \\\n  --api-key 'My API Key'",
      },
      csharp: {
        method: 'Elevation.Lookup',
        example:
          'ElevationLookupParams parameters = new();\n\nvar elevationLookupResult = await client.Elevation.Lookup(parameters);\n\nConsole.WriteLine(elevationLookupResult);',
      },
      go: {
        method: 'client.Elevation.Lookup',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\televationLookupResult, err := client.Elevation.Lookup(context.TODO(), githubcomplazafyiplazago.ElevationLookupParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", elevationLookupResult.Geometry)\n}\n',
      },
      http: {
        example: 'curl https://plaza.fyi/api/v1/elevation \\\n    -H "Authorization: Bearer $PLAZA_API_KEY"',
      },
      java: {
        method: 'elevation().lookup',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.elevation.ElevationLookupParams;\nimport com.plazafyi.models.elevation.ElevationLookupResult;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        ElevationLookupResult elevationLookupResult = client.elevation().lookup();\n    }\n}',
      },
      kotlin: {
        method: 'elevation().lookup',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.elevation.ElevationLookupParams\nimport com.plazafyi.models.elevation.ElevationLookupResult\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val elevationLookupResult: ElevationLookupResult = client.elevation().lookup()\n}',
      },
      php: {
        method: 'elevation->lookup',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$elevationLookupResult = $client->elevation->lookup(\n  format: 'format',\n  lat: 0,\n  lng: 0,\n  locations: 'locations',\n  outputFields: 'output[fields]',\n  outputInclude: 'output[include]',\n  outputPrecision: 0,\n);\n\nvar_dump($elevationLookupResult);",
      },
      python: {
        method: 'elevation.lookup',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\nelevation_lookup_result = client.elevation.lookup()\nprint(elevation_lookup_result.geometry)',
      },
      ruby: {
        method: 'elevation.lookup',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\nelevation_lookup_result = plaza.elevation.lookup\n\nputs(elevation_lookup_result)',
      },
      typescript: {
        method: 'client.elevation.lookup',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst elevationLookupResult = await client.elevation.lookup();\n\nconsole.log(elevationLookupResult.geometry);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'elevation lookup_post',
        example: "plaza elevation lookup-post \\\n  --api-key 'My API Key'",
      },
      csharp: {
        method: 'Elevation.LookupPost',
        example:
          'ElevationLookupPostParams parameters = new();\n\nvar elevationLookupResult = await client.Elevation.LookupPost(parameters);\n\nConsole.WriteLine(elevationLookupResult);',
      },
      go: {
        method: 'client.Elevation.LookupPost',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\televationLookupResult, err := client.Elevation.LookupPost(context.TODO(), githubcomplazafyiplazago.ElevationLookupPostParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", elevationLookupResult.Geometry)\n}\n',
      },
      http: {
        example:
          'curl https://plaza.fyi/api/v1/elevation \\\n    -X POST \\\n    -H "Authorization: Bearer $PLAZA_API_KEY"',
      },
      java: {
        method: 'elevation().lookupPost',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.elevation.ElevationLookupPostParams;\nimport com.plazafyi.models.elevation.ElevationLookupResult;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        ElevationLookupResult elevationLookupResult = client.elevation().lookupPost();\n    }\n}',
      },
      kotlin: {
        method: 'elevation().lookupPost',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.elevation.ElevationLookupPostParams\nimport com.plazafyi.models.elevation.ElevationLookupResult\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val elevationLookupResult: ElevationLookupResult = client.elevation().lookupPost()\n}',
      },
      php: {
        method: 'elevation->lookupPost',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$elevationLookupResult = $client->elevation->lookupPost(\n  format: 'format',\n  lat: 0,\n  lng: 0,\n  locations: 'locations',\n  outputFields: 'output[fields]',\n  outputInclude: 'output[include]',\n  outputPrecision: 0,\n);\n\nvar_dump($elevationLookupResult);",
      },
      python: {
        method: 'elevation.lookup_post',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\nelevation_lookup_result = client.elevation.lookup_post()\nprint(elevation_lookup_result.geometry)',
      },
      ruby: {
        method: 'elevation.lookup_post',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\nelevation_lookup_result = plaza.elevation.lookup_post\n\nputs(elevation_lookup_result)',
      },
      typescript: {
        method: 'client.elevation.lookupPost',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst elevationLookupResult = await client.elevation.lookupPost();\n\nconsole.log(elevationLookupResult.geometry);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'elevation batch',
        example:
          "plaza elevation batch \\\n  --api-key 'My API Key' \\\n  --coordinate '{lat: 48.8566, lng: 2.3522}' \\\n  --coordinate '{lat: 45.764, lng: 4.8357}'",
      },
      csharp: {
        method: 'Elevation.Batch',
        example:
          'ElevationBatchParams parameters = new()\n{\n    Coordinates =\n    [\n        new()\n        {\n            Lat = 48.8566,\n            Lng = 2.3522,\n        },\n        new()\n        {\n            Lat = 45.764,\n            Lng = 4.8357,\n        },\n    ],\n};\n\nvar elevationBatchResult = await client.Elevation.Batch(parameters);\n\nConsole.WriteLine(elevationBatchResult);',
      },
      go: {
        method: 'client.Elevation.Batch',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\televationBatchResult, err := client.Elevation.Batch(context.TODO(), githubcomplazafyiplazago.ElevationBatchParams{\n\t\tCoordinates: githubcomplazafyiplazago.F([]githubcomplazafyiplazago.ElevationBatchParamsCoordinate{{\n\t\t\tLat: githubcomplazafyiplazago.F(48.856600),\n\t\t\tLng: githubcomplazafyiplazago.F(2.352200),\n\t\t}, {\n\t\t\tLat: githubcomplazafyiplazago.F(45.764000),\n\t\t\tLng: githubcomplazafyiplazago.F(4.835700),\n\t\t}}),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", elevationBatchResult.Features)\n}\n',
      },
      http: {
        example:
          'curl https://plaza.fyi/api/v1/elevation/batch \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $PLAZA_API_KEY" \\\n    -d \'{\n          "coordinates": [\n            {\n              "lat": 48.8566,\n              "lng": 2.3522\n            },\n            {\n              "lat": 45.764,\n              "lng": 4.8357\n            }\n          ]\n        }\'',
      },
      java: {
        method: 'elevation().batch',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.elevation.ElevationBatchParams;\nimport com.plazafyi.models.elevation.ElevationBatchResult;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        ElevationBatchParams params = ElevationBatchParams.builder()\n            .addCoordinate(ElevationBatchParams.Coordinate.builder()\n                .lat(48.8566)\n                .lng(2.3522)\n                .build())\n            .addCoordinate(ElevationBatchParams.Coordinate.builder()\n                .lat(45.764)\n                .lng(4.8357)\n                .build())\n            .build();\n        ElevationBatchResult elevationBatchResult = client.elevation().batch(params);\n    }\n}',
      },
      kotlin: {
        method: 'elevation().batch',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.elevation.ElevationBatchParams\nimport com.plazafyi.models.elevation.ElevationBatchResult\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val params: ElevationBatchParams = ElevationBatchParams.builder()\n        .addCoordinate(ElevationBatchParams.Coordinate.builder()\n            .lat(48.8566)\n            .lng(2.3522)\n            .build())\n        .addCoordinate(ElevationBatchParams.Coordinate.builder()\n            .lat(45.764)\n            .lng(4.8357)\n            .build())\n        .build()\n    val elevationBatchResult: ElevationBatchResult = client.elevation().batch(params)\n}',
      },
      php: {
        method: 'elevation->batch',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$elevationBatchResult = $client->elevation->batch(\n  coordinates: [\n    ['lat' => 48.8566, 'lng' => 2.3522], ['lat' => 45.764, 'lng' => 4.8357]\n  ],\n  format: 'format',\n);\n\nvar_dump($elevationBatchResult);",
      },
      python: {
        method: 'elevation.batch',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\nelevation_batch_result = client.elevation.batch(\n    coordinates=[{\n        "lat": 48.8566,\n        "lng": 2.3522,\n    }, {\n        "lat": 45.764,\n        "lng": 4.8357,\n    }],\n)\nprint(elevation_batch_result.features)',
      },
      ruby: {
        method: 'elevation.batch',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\nelevation_batch_result = plaza.elevation.batch(coordinates: [{lat: 48.8566, lng: 2.3522}, {lat: 45.764, lng: 4.8357}])\n\nputs(elevation_batch_result)',
      },
      typescript: {
        method: 'client.elevation.batch',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst elevationBatchResult = await client.elevation.batch({\n  coordinates: [\n    { lat: 48.8566, lng: 2.3522 },\n    { lat: 45.764, lng: 4.8357 },\n  ],\n});\n\nconsole.log(elevationBatchResult.features);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'elevation profile',
        example:
          "plaza elevation profile \\\n  --api-key 'My API Key' \\\n  --coordinate '{lat: 48.8566, lng: 2.3522}' \\\n  --coordinate '{lat: 48.858, lng: 2.34}' \\\n  --coordinate '{lat: 48.8584, lng: 2.2945}'",
      },
      csharp: {
        method: 'Elevation.Profile',
        example:
          'ElevationProfileParams parameters = new()\n{\n    Coordinates =\n    [\n        new()\n        {\n            Lat = 48.8566,\n            Lng = 2.3522,\n        },\n        new()\n        {\n            Lat = 48.858,\n            Lng = 2.34,\n        },\n        new()\n        {\n            Lat = 48.8584,\n            Lng = 2.2945,\n        },\n    ],\n};\n\nvar elevationProfileResult = await client.Elevation.Profile(parameters);\n\nConsole.WriteLine(elevationProfileResult);',
      },
      go: {
        method: 'client.Elevation.Profile',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\televationProfileResult, err := client.Elevation.Profile(context.TODO(), githubcomplazafyiplazago.ElevationProfileParams{\n\t\tElevationProfileRequest: githubcomplazafyiplazago.ElevationProfileRequestParam{\n\t\t\tCoordinates: githubcomplazafyiplazago.F([]githubcomplazafyiplazago.ElevationProfileRequestCoordinateParam{{\n\t\t\t\tLat: githubcomplazafyiplazago.F(48.856600),\n\t\t\t\tLng: githubcomplazafyiplazago.F(2.352200),\n\t\t\t}, {\n\t\t\t\tLat: githubcomplazafyiplazago.F(48.858000),\n\t\t\t\tLng: githubcomplazafyiplazago.F(2.340000),\n\t\t\t}, {\n\t\t\t\tLat: githubcomplazafyiplazago.F(48.858400),\n\t\t\t\tLng: githubcomplazafyiplazago.F(2.294500),\n\t\t\t}}),\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", elevationProfileResult.Geometry)\n}\n',
      },
      http: {
        example:
          'curl https://plaza.fyi/api/v1/elevation/profile \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $PLAZA_API_KEY" \\\n    -d \'{\n          "coordinates": [\n            {\n              "lat": 48.8566,\n              "lng": 2.3522\n            },\n            {\n              "lat": 48.858,\n              "lng": 2.34\n            },\n            {\n              "lat": 48.8584,\n              "lng": 2.2945\n            }\n          ]\n        }\'',
      },
      java: {
        method: 'elevation().profile',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.elevation.ElevationProfileParams;\nimport com.plazafyi.models.elevation.ElevationProfileRequest;\nimport com.plazafyi.models.elevation.ElevationProfileResult;\nimport java.util.List;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        ElevationProfileRequest params = ElevationProfileRequest.builder()\n            .coordinates(List.of(\n              ElevationProfileRequest.Coordinate.builder()\n                  .lat(48.8566)\n                  .lng(2.3522)\n                  .build(),\n              ElevationProfileRequest.Coordinate.builder()\n                  .lat(48.858)\n                  .lng(2.34)\n                  .build(),\n              ElevationProfileRequest.Coordinate.builder()\n                  .lat(48.8584)\n                  .lng(2.2945)\n                  .build()\n            ))\n            .build();\n        ElevationProfileResult elevationProfileResult = client.elevation().profile(params);\n    }\n}',
      },
      kotlin: {
        method: 'elevation().profile',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.elevation.ElevationProfileParams\nimport com.plazafyi.models.elevation.ElevationProfileRequest\nimport com.plazafyi.models.elevation.ElevationProfileResult\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val params: ElevationProfileRequest = ElevationProfileRequest.builder()\n        .coordinates(listOf(\n          ElevationProfileRequest.Coordinate.builder()\n              .lat(48.8566)\n              .lng(2.3522)\n              .build(),\n          ElevationProfileRequest.Coordinate.builder()\n              .lat(48.858)\n              .lng(2.34)\n              .build(),\n          ElevationProfileRequest.Coordinate.builder()\n              .lat(48.8584)\n              .lng(2.2945)\n              .build(),\n        ))\n        .build()\n    val elevationProfileResult: ElevationProfileResult = client.elevation().profile(params)\n}',
      },
      php: {
        method: 'elevation->profile',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$elevationProfileResult = $client->elevation->profile(\n  coordinates: [\n    ['lat' => 48.8566, 'lng' => 2.3522],\n    ['lat' => 48.858, 'lng' => 2.34],\n    ['lat' => 48.8584, 'lng' => 2.2945],\n  ],\n);\n\nvar_dump($elevationProfileResult);",
      },
      python: {
        method: 'elevation.profile',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\nelevation_profile_result = client.elevation.profile(\n    coordinates=[{\n        "lat": 48.8566,\n        "lng": 2.3522,\n    }, {\n        "lat": 48.858,\n        "lng": 2.34,\n    }, {\n        "lat": 48.8584,\n        "lng": 2.2945,\n    }],\n)\nprint(elevation_profile_result.geometry)',
      },
      ruby: {
        method: 'elevation.profile',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\nelevation_profile_result = plaza.elevation.profile(\n  coordinates: [{lat: 48.8566, lng: 2.3522}, {lat: 48.858, lng: 2.34}, {lat: 48.8584, lng: 2.2945}]\n)\n\nputs(elevation_profile_result)',
      },
      typescript: {
        method: 'client.elevation.profile',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst elevationProfileResult = await client.elevation.profile({\n  coordinates: [\n    { lat: 48.8566, lng: 2.3522 },\n    { lat: 48.858, lng: 2.34 },\n    { lat: 48.8584, lng: 2.2945 },\n  ],\n});\n\nconsole.log(elevationProfileResult.geometry);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'map_match match',
        example:
          "plaza map-match match \\\n  --api-key 'My API Key' \\\n  --coordinate '{lat: 48.8566, lng: 2.3522}' \\\n  --coordinate '{lat: 48.857, lng: 2.353}' \\\n  --coordinate '{lat: 48.8575, lng: 2.354}'",
      },
      csharp: {
        method: 'MapMatch.Match',
        example:
          'MapMatchMatchParams parameters = new()\n{\n    Coordinates =\n    [\n        new()\n        {\n            Lat = 48.8566,\n            Lng = 2.3522,\n        },\n        new()\n        {\n            Lat = 48.857,\n            Lng = 2.353,\n        },\n        new()\n        {\n            Lat = 48.8575,\n            Lng = 2.354,\n        },\n    ],\n};\n\nvar mapMatchResult = await client.MapMatch.Match(parameters);\n\nConsole.WriteLine(mapMatchResult);',
      },
      go: {
        method: 'client.MapMatch.Match',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmapMatchResult, err := client.MapMatch.Match(context.TODO(), githubcomplazafyiplazago.MapMatchMatchParams{\n\t\tMapMatchRequest: githubcomplazafyiplazago.MapMatchRequestParam{\n\t\t\tCoordinates: githubcomplazafyiplazago.F([]githubcomplazafyiplazago.MapMatchRequestCoordinateParam{{\n\t\t\t\tLat: githubcomplazafyiplazago.F(48.856600),\n\t\t\t\tLng: githubcomplazafyiplazago.F(2.352200),\n\t\t\t}, {\n\t\t\t\tLat: githubcomplazafyiplazago.F(48.857000),\n\t\t\t\tLng: githubcomplazafyiplazago.F(2.353000),\n\t\t\t}, {\n\t\t\t\tLat: githubcomplazafyiplazago.F(48.857500),\n\t\t\t\tLng: githubcomplazafyiplazago.F(2.354000),\n\t\t\t}}),\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", mapMatchResult.Features)\n}\n',
      },
      http: {
        example:
          'curl https://plaza.fyi/api/v1/map-match \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $PLAZA_API_KEY" \\\n    -d \'{\n          "coordinates": [\n            {\n              "lat": 48.8566,\n              "lng": 2.3522\n            },\n            {\n              "lat": 48.857,\n              "lng": 2.353\n            },\n            {\n              "lat": 48.8575,\n              "lng": 2.354\n            }\n          ]\n        }\'',
      },
      java: {
        method: 'mapMatch().match',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.mapmatch.MapMatchMatchParams;\nimport com.plazafyi.models.mapmatch.MapMatchRequest;\nimport com.plazafyi.models.mapmatch.MapMatchResult;\nimport java.util.List;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        MapMatchRequest params = MapMatchRequest.builder()\n            .coordinates(List.of(\n              MapMatchRequest.Coordinate.builder()\n                  .lat(48.8566)\n                  .lng(2.3522)\n                  .build(),\n              MapMatchRequest.Coordinate.builder()\n                  .lat(48.857)\n                  .lng(2.353)\n                  .build(),\n              MapMatchRequest.Coordinate.builder()\n                  .lat(48.8575)\n                  .lng(2.354)\n                  .build()\n            ))\n            .build();\n        MapMatchResult mapMatchResult = client.mapMatch().match(params);\n    }\n}',
      },
      kotlin: {
        method: 'mapMatch().match',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.mapmatch.MapMatchMatchParams\nimport com.plazafyi.models.mapmatch.MapMatchRequest\nimport com.plazafyi.models.mapmatch.MapMatchResult\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val params: MapMatchRequest = MapMatchRequest.builder()\n        .coordinates(listOf(\n          MapMatchRequest.Coordinate.builder()\n              .lat(48.8566)\n              .lng(2.3522)\n              .build(),\n          MapMatchRequest.Coordinate.builder()\n              .lat(48.857)\n              .lng(2.353)\n              .build(),\n          MapMatchRequest.Coordinate.builder()\n              .lat(48.8575)\n              .lng(2.354)\n              .build(),\n        ))\n        .build()\n    val mapMatchResult: MapMatchResult = client.mapMatch().match(params)\n}',
      },
      php: {
        method: 'mapMatch->match',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$mapMatchResult = $client->mapMatch->match(\n  coordinates: [\n    ['lat' => 48.8566, 'lng' => 2.3522],\n    ['lat' => 48.857, 'lng' => 2.353],\n    ['lat' => 48.8575, 'lng' => 2.354],\n  ],\n  radiuses: [0],\n);\n\nvar_dump($mapMatchResult);",
      },
      python: {
        method: 'map_match.match',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\nmap_match_result = client.map_match.match(\n    coordinates=[{\n        "lat": 48.8566,\n        "lng": 2.3522,\n    }, {\n        "lat": 48.857,\n        "lng": 2.353,\n    }, {\n        "lat": 48.8575,\n        "lng": 2.354,\n    }],\n)\nprint(map_match_result.features)',
      },
      ruby: {
        method: 'map_match.match',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\nmap_match_result = plaza.map_match.match(\n  coordinates: [{lat: 48.8566, lng: 2.3522}, {lat: 48.857, lng: 2.353}, {lat: 48.8575, lng: 2.354}]\n)\n\nputs(map_match_result)',
      },
      typescript: {
        method: 'client.mapMatch.match',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst mapMatchResult = await client.mapMatch.match({\n  coordinates: [\n    { lat: 48.8566, lng: 2.3522 },\n    { lat: 48.857, lng: 2.353 },\n    { lat: 48.8575, lng: 2.354 },\n  ],\n});\n\nconsole.log(mapMatchResult.features);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'optimize create',
        example:
          "plaza optimize create \\\n  --api-key 'My API Key' \\\n  --waypoint '{lat: 48.8566, lng: 2.3522}' \\\n  --waypoint '{lat: 48.8606, lng: 2.3376}' \\\n  --waypoint '{lat: 48.8584, lng: 2.2945}'",
      },
      csharp: {
        method: 'Optimize.Create',
        example:
          'OptimizeCreateParams parameters = new()\n{\n    Waypoints =\n    [\n        new()\n        {\n            Lat = 48.8566,\n            Lng = 2.3522,\n        },\n        new()\n        {\n            Lat = 48.8606,\n            Lng = 2.3376,\n        },\n        new()\n        {\n            Lat = 48.8584,\n            Lng = 2.2945,\n        },\n    ],\n};\n\nvar optimizeResult = await client.Optimize.Create(parameters);\n\nConsole.WriteLine(optimizeResult);',
      },
      go: {
        method: 'client.Optimize.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\toptimizeResult, err := client.Optimize.New(context.TODO(), githubcomplazafyiplazago.OptimizeNewParams{\n\t\tOptimizeRequest: githubcomplazafyiplazago.OptimizeRequestParam{\n\t\t\tWaypoints: githubcomplazafyiplazago.F([]githubcomplazafyiplazago.OptimizeRequestWaypointParam{{\n\t\t\t\tLat: githubcomplazafyiplazago.F(48.856600),\n\t\t\t\tLng: githubcomplazafyiplazago.F(2.352200),\n\t\t\t}, {\n\t\t\t\tLat: githubcomplazafyiplazago.F(48.860600),\n\t\t\t\tLng: githubcomplazafyiplazago.F(2.337600),\n\t\t\t}, {\n\t\t\t\tLat: githubcomplazafyiplazago.F(48.858400),\n\t\t\t\tLng: githubcomplazafyiplazago.F(2.294500),\n\t\t\t}}),\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", optimizeResult)\n}\n',
      },
      http: {
        example:
          'curl https://plaza.fyi/api/v1/optimize \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $PLAZA_API_KEY" \\\n    -d \'{\n          "waypoints": [\n            {\n              "lat": 48.8566,\n              "lng": 2.3522\n            },\n            {\n              "lat": 48.8606,\n              "lng": 2.3376\n            },\n            {\n              "lat": 48.8584,\n              "lng": 2.2945\n            }\n          ]\n        }\'',
      },
      java: {
        method: 'optimize().create',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.optimize.OptimizeCreateParams;\nimport com.plazafyi.models.optimize.OptimizeRequest;\nimport com.plazafyi.models.optimize.OptimizeResult;\nimport java.util.List;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        OptimizeRequest params = OptimizeRequest.builder()\n            .waypoints(List.of(\n              OptimizeRequest.Waypoint.builder()\n                  .lat(48.8566)\n                  .lng(2.3522)\n                  .build(),\n              OptimizeRequest.Waypoint.builder()\n                  .lat(48.8606)\n                  .lng(2.3376)\n                  .build(),\n              OptimizeRequest.Waypoint.builder()\n                  .lat(48.8584)\n                  .lng(2.2945)\n                  .build()\n            ))\n            .build();\n        OptimizeResult optimizeResult = client.optimize().create(params);\n    }\n}',
      },
      kotlin: {
        method: 'optimize().create',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.optimize.OptimizeCreateParams\nimport com.plazafyi.models.optimize.OptimizeRequest\nimport com.plazafyi.models.optimize.OptimizeResult\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val params: OptimizeRequest = OptimizeRequest.builder()\n        .waypoints(listOf(\n          OptimizeRequest.Waypoint.builder()\n              .lat(48.8566)\n              .lng(2.3522)\n              .build(),\n          OptimizeRequest.Waypoint.builder()\n              .lat(48.8606)\n              .lng(2.3376)\n              .build(),\n          OptimizeRequest.Waypoint.builder()\n              .lat(48.8584)\n              .lng(2.2945)\n              .build(),\n        ))\n        .build()\n    val optimizeResult: OptimizeResult = client.optimize().create(params)\n}',
      },
      php: {
        method: 'optimize->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$optimizeResult = $client->optimize->create(\n  waypoints: [\n    ['lat' => 48.8566, 'lng' => 2.3522],\n    ['lat' => 48.8606, 'lng' => 2.3376],\n    ['lat' => 48.8584, 'lng' => 2.2945],\n  ],\n  format: 'format',\n  mode: 'auto',\n  roundtrip: false,\n);\n\nvar_dump($optimizeResult);",
      },
      python: {
        method: 'optimize.create',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\noptimize_result = client.optimize.create(\n    waypoints=[{\n        "lat": 48.8566,\n        "lng": 2.3522,\n    }, {\n        "lat": 48.8606,\n        "lng": 2.3376,\n    }, {\n        "lat": 48.8584,\n        "lng": 2.2945,\n    }],\n)\nprint(optimize_result)',
      },
      ruby: {
        method: 'optimize.create',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\noptimize_result = plaza.optimize.create(\n  waypoints: [{lat: 48.8566, lng: 2.3522}, {lat: 48.8606, lng: 2.3376}, {lat: 48.8584, lng: 2.2945}]\n)\n\nputs(optimize_result)',
      },
      typescript: {
        method: 'client.optimize.create',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst optimizeResult = await client.optimize.create({\n  waypoints: [\n    { lat: 48.8566, lng: 2.3522 },\n    { lat: 48.8606, lng: 2.3376 },\n    { lat: 48.8584, lng: 2.2945 },\n  ],\n});\n\nconsole.log(optimizeResult);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'optimize retrieve',
        example: "plaza optimize retrieve \\\n  --api-key 'My API Key' \\\n  --job-id job_id",
      },
      csharp: {
        method: 'Optimize.Retrieve',
        example:
          'OptimizeRetrieveParams parameters = new() { JobID = "job_id" };\n\nvar optimizeJobStatus = await client.Optimize.Retrieve(parameters);\n\nConsole.WriteLine(optimizeJobStatus);',
      },
      go: {
        method: 'client.Optimize.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\toptimizeJobStatus, err := client.Optimize.Get(context.TODO(), "job_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", optimizeJobStatus.Status)\n}\n',
      },
      http: {
        example:
          'curl https://plaza.fyi/api/v1/optimize/$JOB_ID \\\n    -H "Authorization: Bearer $PLAZA_API_KEY"',
      },
      java: {
        method: 'optimize().retrieve',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.optimize.OptimizeJobStatus;\nimport com.plazafyi.models.optimize.OptimizeRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        OptimizeJobStatus optimizeJobStatus = client.optimize().retrieve("job_id");\n    }\n}',
      },
      kotlin: {
        method: 'optimize().retrieve',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.optimize.OptimizeJobStatus\nimport com.plazafyi.models.optimize.OptimizeRetrieveParams\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val optimizeJobStatus: OptimizeJobStatus = client.optimize().retrieve("job_id")\n}',
      },
      php: {
        method: 'optimize->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$optimizeJobStatus = $client->optimize->retrieve('job_id');\n\nvar_dump($optimizeJobStatus);",
      },
      python: {
        method: 'optimize.retrieve',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\noptimize_job_status = client.optimize.retrieve(\n    "job_id",\n)\nprint(optimize_job_status.status)',
      },
      ruby: {
        method: 'optimize.retrieve',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\noptimize_job_status = plaza.optimize.retrieve("job_id")\n\nputs(optimize_job_status)',
      },
      typescript: {
        method: 'client.optimize.retrieve',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst optimizeJobStatus = await client.optimize.retrieve('job_id');\n\nconsole.log(optimizeJobStatus.status);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'query execute',
        example:
          "plaza query execute \\\n  --api-key 'My API Key' \\\n  --data '$$ = search(node, amenity: \"cafe\").around(distance: 500, geometry: point(48.8566, 2.3522));'",
      },
      csharp: {
        method: 'Query.Execute',
        example:
          'QueryExecuteParams parameters = new()\n{\n    Data = "$$ = search(node, amenity: \\"cafe\\").around(distance: 500, geometry: point(48.8566, 2.3522));",\n};\n\nvar featureCollection = await client.Query.Execute(parameters);\n\nConsole.WriteLine(featureCollection);',
      },
      go: {
        method: 'client.Query.Execute',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tfeatureCollection, err := client.Query.Execute(context.TODO(), githubcomplazafyiplazago.QueryExecuteParams{\n\t\tPlazaqlQuery: githubcomplazafyiplazago.PlazaqlQueryParam{\n\t\t\tData: githubcomplazafyiplazago.F(`$$ = search(node, amenity: "cafe").around(distance: 500, geometry: point(48.8566, 2.3522));`),\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", featureCollection.Features)\n}\n',
      },
      http: {
        example:
          'curl https://plaza.fyi/api/v1/query \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $PLAZA_API_KEY" \\\n    -d \'{\n          "data": "$$ = search(node, amenity: \\\\"cafe\\\\").around(distance: 500, geometry: point(48.8566, 2.3522));"\n        }\'',
      },
      java: {
        method: 'query().execute',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.FeatureCollection;\nimport com.plazafyi.models.query.PlazaqlQuery;\nimport com.plazafyi.models.query.QueryExecuteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        PlazaqlQuery params = PlazaqlQuery.builder()\n            .data("$$ = search(node, amenity: \\"cafe\\").around(distance: 500, geometry: point(48.8566, 2.3522));")\n            .build();\n        FeatureCollection featureCollection = client.query().execute(params);\n    }\n}',
      },
      kotlin: {
        method: 'query().execute',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.FeatureCollection\nimport com.plazafyi.models.query.PlazaqlQuery\nimport com.plazafyi.models.query.QueryExecuteParams\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val params: PlazaqlQuery = PlazaqlQuery.builder()\n        .data("\\$\\$ = search(node, amenity: \\"cafe\\").around(distance: 500, geometry: point(48.8566, 2.3522));")\n        .build()\n    val featureCollection: FeatureCollection = client.query().execute(params)\n}',
      },
      php: {
        method: 'query->execute',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$featureCollection = $client->query->execute(\n  data: '$$ = search(node, amenity: \"cafe\").around(distance: 500, geometry: point(48.8566, 2.3522));',\n  format: 'format',\n);\n\nvar_dump($featureCollection);",
      },
      python: {
        method: 'query.execute',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\nfeature_collection = client.query.execute(\n    data="$$ = search(node, amenity: \\"cafe\\").around(distance: 500, geometry: point(48.8566, 2.3522));",\n)\nprint(feature_collection.features)',
      },
      ruby: {
        method: 'query.execute',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\nfeature_collection = plaza.query.execute(\n  data: "$$ = search(node, amenity: \\"cafe\\").around(distance: 500, geometry: point(48.8566, 2.3522));"\n)\n\nputs(feature_collection)',
      },
      typescript: {
        method: 'client.query.execute',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst featureCollection = await client.query.execute({\n  data: '$$ = search(node, amenity: \"cafe\").around(distance: 500, geometry: point(48.8566, 2.3522));',\n});\n\nconsole.log(featureCollection.features);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'tiles get',
        example: "plaza tiles get \\\n  --api-key 'My API Key' \\\n  --z 0 \\\n  --x 0 \\\n  --y 0",
      },
      csharp: {
        method: 'Tiles.Get',
        example:
          'TileGetParams parameters = new()\n{\n    Z = 0,\n    X = 0,\n    Y = 0,\n};\n\nvar tile = await client.Tiles.Get(parameters);\n\nConsole.WriteLine(tile);',
      },
      go: {
        method: 'client.Tiles.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\ttile, err := client.Tiles.Get(\n\t\tcontext.TODO(),\n\t\tint64(0),\n\t\tint64(0),\n\t\tint64(0),\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", tile)\n}\n',
      },
      http: {
        example:
          'curl https://plaza.fyi/api/v1/tiles/$Z/$X/$Y \\\n    -H "Authorization: Bearer $PLAZA_API_KEY"',
      },
      java: {
        method: 'tiles().get',
        example:
          'package com.plazafyi.example;\n\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.core.http.HttpResponse;\nimport com.plazafyi.models.tiles.TileGetParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        PlazaClient client = PlazaOkHttpClient.fromEnv();\n\n        TileGetParams params = TileGetParams.builder()\n            .z(0L)\n            .x(0L)\n            .y(0L)\n            .build();\n        HttpResponse tile = client.tiles().get(params);\n    }\n}',
      },
      kotlin: {
        method: 'tiles().get',
        example:
          'package com.plazafyi.example\n\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.core.http.HttpResponse\nimport com.plazafyi.models.tiles.TileGetParams\n\nfun main() {\n    val client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\n    val params: TileGetParams = TileGetParams.builder()\n        .z(0L)\n        .x(0L)\n        .y(0L)\n        .build()\n    val tile: HttpResponse = client.tiles().get(params)\n}',
      },
      php: {
        method: 'tiles->get',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key', environment: 'local');\n\n$tile = $client->tiles->get(0, z: 0, x: 0);\n\nvar_dump($tile);",
      },
      python: {
        method: 'tiles.get',
        example:
          'import os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n)\ntile = client.tiles.get(\n    y=0,\n    z=0,\n    x=0,\n)\nprint(tile)\ncontent = tile.read()\nprint(content)',
      },
      ruby: {
        method: 'tiles.get',
        example:
          'require "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: "My API Key",\n  environment: "local" # defaults to "production"\n)\n\ntile = plaza.tiles.get(0, z: 0, x: 0)\n\nputs(tile)',
      },
      typescript: {
        method: 'client.tiles.get',
        example:
          "import Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n});\n\nconst tile = await client.tiles.get(0, { z: 0, x: 0 });\n\nconsole.log(tile);\n\nconst content = await tile.blob();\nconsole.log(content);",
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'python',
    content:
      '# Plaza Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/plaza.svg?label=pypi%20(stable))](https://pypi.org/project/plaza/)\n\nThe Plaza Python library provides convenient access to the Plaza REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Plaza MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40plazafyi%2Fmcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBwbGF6YWZ5aS9tY3AiXSwiZW52Ijp7IlBMQVpBX0FQSV9LRVkiOiJNeSBBUEkgS2V5In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40plazafyi%2Fmcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40plazafyi%2Fmcp%22%5D%2C%22env%22%3A%7B%22PLAZA_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nThe REST API documentation can be found on [docs.plaza.fyi](https://docs.plaza.fyi). The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from PyPI\npip install plaza\n```\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom plaza import Plaza\n\nclient = Plaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n    # defaults to "production".\n    environment="local",\n)\n\nfeature_collection = client.elements.query(\n    near="48.8584,2.2945",\n    radius=500,\n)\nprint(feature_collection.features)\n```\n\nWhile you can provide an `api_key` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `PLAZA_API_KEY="My API Key"` to your `.env` file\nso that your API Key is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncPlaza` instead of `Plaza` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom plaza import AsyncPlaza\n\nclient = AsyncPlaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n    # defaults to "production".\n    environment="local",\n)\n\nasync def main() -> None:\n  feature_collection = await client.elements.query(\n      near="48.8584,2.2945",\n      radius=500,\n  )\n  print(feature_collection.features)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from PyPI\npip install plaza[aiohttp]\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom plaza import DefaultAioHttpClient\nfrom plaza import AsyncPlaza\n\nasync def main() -> None:\n  async with AsyncPlaza(\n    api_key=os.environ.get("PLAZA_API_KEY"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    feature_collection = await client.elements.query(\n        near="48.8584,2.2945",\n        radius=500,\n    )\n    print(feature_collection.features)\n\nasyncio.run(main())\n```\n\n\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n\n\n## Nested params\n\nNested parameters are dictionaries, typed using `TypedDict`, for example:\n\n```python\nfrom plaza import Plaza\n\nclient = Plaza()\n\nroute_result = client.routing.route(\n    destination={\n        "lat": 48.8584,\n        "lng": 2.2945,\n    },\n    origin={\n        "lat": 48.8566,\n        "lng": 2.3522,\n    },\n)\nprint(route_result.destination)\n```\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `plaza.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `plaza.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `plaza.APIError`.\n\n```python\nimport plaza\nfrom plaza import Plaza\n\nclient = Plaza()\n\ntry:\n    client.elements.query(\n        near="48.8584,2.2945",\n        radius=500,\n    )\nexcept plaza.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept plaza.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept plaza.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom plaza import Plaza\n\n# Configure the default for all requests:\nclient = Plaza(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).elements.query(\n    near="48.8584,2.2945",\n    radius=500,\n)\n```\n\n### Timeouts\n\nBy default requests time out after 1 minute. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom plaza import Plaza\n\n# Configure the default for all requests:\nclient = Plaza(\n    # 20 seconds (default is 1 minute)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = Plaza(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).elements.query(\n    near="48.8584,2.2945",\n    radius=500,\n)\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `PLAZA_LOG` to `info`.\n\n```shell\n$ export PLAZA_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom plaza import Plaza\n\nclient = Plaza()\nresponse = client.elements.with_raw_response.query(\n    near="48.8584,2.2945",\n    radius=500,\n)\nprint(response.headers.get(\'X-My-Header\'))\n\nelement = response.parse()  # get the object that `elements.query()` would have returned\nprint(element.features)\n```\n\nThese methods return an [`APIResponse`](https://github.com/plazafyi/plaza-python/tree/main/src/plaza/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/plazafyi/plaza-python/tree/main/src/plaza/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.elements.with_streaming_response.query(\n    near="48.8584,2.2945",\n    radius=500,\n) as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom plaza import Plaza, DefaultHttpxClient\n\nclient = Plaza(\n    # Or use the `PLAZA_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom plaza import Plaza\n\nwith Plaza() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/plazafyi/plaza-python/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport plaza\nprint(plaza.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'go',
    content:
      '# Plaza Go API Library\n\n<a href="https://pkg.go.dev/github.com/plazafyi/plaza-go"><img src="https://pkg.go.dev/badge/github.com/plazafyi/plaza-go.svg" alt="Go Reference"></a>\n\nThe Plaza Go library provides convenient access to the [Plaza REST API](https://docs.plaza.fyi)\nfrom applications written in Go.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Plaza MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40plazafyi%2Fmcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBwbGF6YWZ5aS9tY3AiXSwiZW52Ijp7IlBMQVpBX0FQSV9LRVkiOiJNeSBBUEkgS2V5In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40plazafyi%2Fmcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40plazafyi%2Fmcp%22%5D%2C%22env%22%3A%7B%22PLAZA_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n```go\nimport (\n\t"github.com/plazafyi/plaza-go" // imported as SDK_PackageName\n)\n```\n\n<!-- x-release-please-end -->\n\nOr to pin the version:\n\n<!-- x-release-please-start-version -->\n\n```sh\ngo get -u \'github.com/plazafyi/plaza-go@v0.0.1\'\n```\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Go 1.22+.\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```go\npackage main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/plazafyi/plaza-go"\n\t"github.com/plazafyi/plaza-go/option"\n)\n\nfunc main() {\n\tclient := githubcomplazafyiplazago.NewClient(\n\t\toption.WithAPIKey("My API Key"), // defaults to os.LookupEnv("PLAZA_API_KEY")\n\t\toption.WithEnvironmentLocal(),   // defaults to option.WithEnvironmentProduction()\n\t)\n\tfeatureCollection, err := client.Elements.Query(context.TODO(), githubcomplazafyiplazago.ElementQueryParams{\n\t\tNear:   githubcomplazafyiplazago.F("48.8584,2.2945"),\n\t\tRadius: githubcomplazafyiplazago.F(500.000000),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", featureCollection.Features)\n}\n\n```\n\n### Request fields\n\nAll request parameters are wrapped in a generic `Field` type,\nwhich we use to distinguish zero values from null or omitted fields.\n\nThis prevents accidentally sending a zero value if you forget a required parameter,\nand enables explicitly sending `null`, `false`, `\'\'`, or `0` on optional parameters.\nAny field not specified is not sent.\n\nTo construct fields with values, use the helpers `String()`, `Int()`, `Float()`, or most commonly, the generic `F[T]()`.\nTo send a null, use `Null[T]()`, and to send a nonconforming value, use `Raw[T](any)`. For example:\n\n```go\nparams := FooParams{\n\tName: SDK_PackageName.F("hello"),\n\n\t// Explicitly send `"description": null`\n\tDescription: SDK_PackageName.Null[string](),\n\n\tPoint: SDK_PackageName.F(SDK_PackageName.Point{\n\t\tX: SDK_PackageName.Int(0),\n\t\tY: SDK_PackageName.Int(1),\n\n\t\t// In cases where the API specifies a given type,\n\t\t// but you want to send something else, use `Raw`:\n\t\tZ: SDK_PackageName.Raw[int64](0.01), // sends a float\n\t}),\n}\n```\n\n### Response objects\n\nAll fields in response structs are value types (not pointers or wrappers).\n\nIf a given field is `null`, not present, or invalid, the corresponding field\nwill simply be its zero value.\n\nAll response structs also include a special `JSON` field, containing more detailed\ninformation about each property, which you can use like so:\n\n```go\nif res.Name == "" {\n\t// true if `"name"` is either not present or explicitly null\n\tres.JSON.Name.IsNull()\n\n\t// true if the `"name"` key was not present in the response JSON at all\n\tres.JSON.Name.IsMissing()\n\n\t// When the API returns data that cannot be coerced to the expected type:\n\tif res.JSON.Name.IsInvalid() {\n\t\traw := res.JSON.Name.Raw()\n\n\t\tlegacyName := struct{\n\t\t\tFirst string `json:"first"`\n\t\t\tLast  string `json:"last"`\n\t\t}{}\n\t\tjson.Unmarshal([]byte(raw), &legacyName)\n\t\tname = legacyName.First + " " + legacyName.Last\n\t}\n}\n```\n\nThese `.JSON` structs also include an `Extras` map containing\nany properties in the json response that were not specified\nin the struct. This can be useful for API features not yet\npresent in the SDK.\n\n```go\nbody := res.JSON.ExtraFields["my_unexpected_field"].Raw()\n```\n\n### RequestOptions\n\nThis library uses the functional options pattern. Functions defined in the\n`SDK_PackageOptionName` package return a `RequestOption`, which is a closure that mutates a\n`RequestConfig`. These options can be supplied to the client or at individual\nrequests. For example:\n\n```go\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\t// Adds a header to every request made by the client\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "custom_header_info"),\n)\n\nclient.Elements.Query(context.TODO(), ...,\n\t// Override the header\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "some_other_custom_header_info"),\n\t// Add an undocumented field to the request body, using sjson syntax\n\tSDK_PackageOptionName.WithJSONSet("some.json.path", map[string]string{"my": "object"}),\n)\n```\n\nSee the [full list of request options](https://pkg.go.dev/github.com/plazafyi/plaza-go/SDK_PackageOptionName).\n\n### Pagination\n\nThis library provides some conveniences for working with paginated list endpoints.\n\nYou can use `.ListAutoPaging()` methods to iterate through items across all pages:\n\n\n\nOr you can use simple `.List()` methods to fetch a single page and receive a standard response object\nwith additional helper methods like `.GetNextPage()`, e.g.:\n\n\n\n### Errors\n\nWhen the API returns a non-success status code, we return an error with type\n`*SDK_PackageName.Error`. This contains the `StatusCode`, `*http.Request`, and\n`*http.Response` values of the request, as well as the JSON of the error body\n(much like other response objects in the SDK).\n\nTo handle errors, we recommend that you use the `errors.As` pattern:\n\n```go\n_, err := client.Elements.Query(context.TODO(), githubcomplazafyiplazago.ElementQueryParams{\n\tNear:   githubcomplazafyiplazago.F("48.8584,2.2945"),\n\tRadius: githubcomplazafyiplazago.F(500.000000),\n})\nif err != nil {\n\tvar apierr *githubcomplazafyiplazago.Error\n\tif errors.As(err, &apierr) {\n\t\tprintln(string(apierr.DumpRequest(true)))  // Prints the serialized HTTP request\n\t\tprintln(string(apierr.DumpResponse(true))) // Prints the serialized HTTP response\n\t}\n\tpanic(err.Error()) // GET "/api/v1/features": 400 Bad Request { ... }\n}\n```\n\nWhen other errors occur, they are returned unwrapped; for example,\nif HTTP transport fails, you might receive `*url.Error` wrapping `*net.OpError`.\n\n### Timeouts\n\nRequests do not time out by default; use context to configure a timeout for a request lifecycle.\n\nNote that if a request is [retried](#retries), the context timeout does not start over.\nTo set a per-retry timeout, use `SDK_PackageOptionName.WithRequestTimeout()`.\n\n```go\n// This sets the timeout for the request, including all the retries.\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)\ndefer cancel()\nclient.Elements.Query(\n\tctx,\n\tgithubcomplazafyiplazago.ElementQueryParams{\n\t\tNear:   githubcomplazafyiplazago.F("48.8584,2.2945"),\n\t\tRadius: githubcomplazafyiplazago.F(500.000000),\n\t},\n\t// This sets the per-retry timeout\n\toption.WithRequestTimeout(20*time.Second),\n)\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads in multipart requests are typed as\n`param.Field[io.Reader]`. The contents of the `io.Reader` will by default be sent as a multipart form\npart with the file name of "anonymous_file" and content-type of "application/octet-stream".\n\nThe file name and content-type can be customized by implementing `Name() string` or `ContentType()\nstring` on the run-time type of `io.Reader`. Note that `os.File` implements `Name() string`, so a\nfile returned by `os.Open` will be sent with the file name on disk.\n\nWe also provide a helper `SDK_PackageName.FileParam(reader io.Reader, filename string, contentType string)`\nwhich can be used to wrap any `io.Reader` with the appropriate file name and content type.\n\n\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nWe retry by default all connection errors, 408 Request Timeout, 409 Conflict, 429 Rate Limit,\nand >=500 Internal errors.\n\nYou can use the `WithMaxRetries` option to configure or disable this:\n\n```go\n// Configure the default for all requests:\nclient := githubcomplazafyiplazago.NewClient(\n\toption.WithMaxRetries(0), // default is 2\n)\n\n// Override per-request:\nclient.Elements.Query(\n\tcontext.TODO(),\n\tgithubcomplazafyiplazago.ElementQueryParams{\n\t\tNear:   githubcomplazafyiplazago.F("48.8584,2.2945"),\n\t\tRadius: githubcomplazafyiplazago.F(500.000000),\n\t},\n\toption.WithMaxRetries(5),\n)\n```\n\n\n### Accessing raw response data (e.g. response headers)\n\nYou can access the raw HTTP response data by using the `option.WithResponseInto()` request option. This is useful when\nyou need to examine response headers, status codes, or other details.\n\n```go\n// Create a variable to store the HTTP response\nvar response *http.Response\nfeatureCollection, err := client.Elements.Query(\n\tcontext.TODO(),\n\tgithubcomplazafyiplazago.ElementQueryParams{\n\t\tNear:   githubcomplazafyiplazago.F("48.8584,2.2945"),\n\t\tRadius: githubcomplazafyiplazago.F(500.000000),\n\t},\n\toption.WithResponseInto(&response),\n)\nif err != nil {\n\t// handle error\n}\nfmt.Printf("%+v\\n", featureCollection)\n\nfmt.Printf("Status Code: %d\\n", response.StatusCode)\nfmt.Printf("Headers: %+#v\\n", response.Header)\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.Get`, `client.Post`, and other HTTP verbs.\n`RequestOptions` on the client, such as retries, will be respected when making these requests.\n\n```go\nvar (\n    // params can be an io.Reader, a []byte, an encoding/json serializable object,\n    // or a "…Params" struct defined in this library.\n    params map[string]interface{}\n\n    // result can be an []byte, *http.Response, a encoding/json deserializable object,\n    // or a model defined in this library.\n    result *http.Response\n)\nerr := client.Post(context.Background(), "/unspecified", params, &result)\nif err != nil {\n    …\n}\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use either the `SDK_PackageOptionName.WithQuerySet()`\nor the `SDK_PackageOptionName.WithJSONSet()` methods.\n\n```go\nparams := FooNewParams{\n    ID:   SDK_PackageName.F("id_xxxx"),\n    Data: SDK_PackageName.F(FooNewParamsData{\n        FirstName: SDK_PackageName.F("John"),\n    }),\n}\nclient.Foo.New(context.Background(), params, SDK_PackageOptionName.WithJSONSet("data.last_name", "Doe"))\n```\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may either access the raw JSON of the response as a string\nwith `result.JSON.RawJSON()`, or get the raw JSON of a particular field on the result with\n`result.JSON.Foo.Raw()`.\n\nAny fields that are not present on the response struct will be saved and can be accessed by `result.JSON.ExtraFields()` which returns the extra fields as a `map[string]Field`.\n\n### Middleware\n\nWe provide `SDK_PackageOptionName.WithMiddleware` which applies the given\nmiddleware to requests.\n\n```go\nfunc Logger(req *http.Request, next SDK_PackageOptionName.MiddlewareNext) (res *http.Response, err error) {\n\t// Before the request\n\tstart := time.Now()\n\tLogReq(req)\n\n\t// Forward the request to the next handler\n\tres, err = next(req)\n\n\t// Handle stuff after the request\n\tend := time.Now()\n\tLogRes(res, err, start - end)\n\n    return res, err\n}\n\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\tSDK_PackageOptionName.WithMiddleware(Logger),\n)\n```\n\nWhen multiple middlewares are provided as variadic arguments, the middlewares\nare applied left to right. If `SDK_PackageOptionName.WithMiddleware` is given\nmultiple times, for example first in the client then the method, the\nmiddleware in the client will run first and the middleware given in the method\nwill run next.\n\nYou may also replace the default `http.Client` with\n`SDK_PackageOptionName.WithHTTPClient(client)`. Only one http client is\naccepted (this overwrites any previous client) and receives requests after any\nmiddleware has been applied.\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/plazafyi/plaza-go/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Plaza TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/@plazafyi/sdk.svg?label=npm%20(stable))](https://npmjs.org/package/@plazafyi/sdk) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@plazafyi/sdk)\n\nThis library provides convenient access to the Plaza REST API from server-side TypeScript or JavaScript.\n\n\n\nThe REST API documentation can be found on [docs.plaza.fyi](https://docs.plaza.fyi). The full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Plaza MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40plazafyi%2Fmcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBwbGF6YWZ5aS9tY3AiXSwiZW52Ijp7IlBMQVpBX0FQSV9LRVkiOiJNeSBBUEkgS2V5In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40plazafyi%2Fmcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40plazafyi%2Fmcp%22%5D%2C%22env%22%3A%7B%22PLAZA_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install @plazafyi/sdk\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n  environment: 'local', // defaults to 'production'\n});\n\nconst featureCollection = await client.elements.query({ near: '48.8584,2.2945', radius: 500 });\n\nconsole.log(featureCollection.features);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  apiKey: process.env['PLAZA_API_KEY'], // This is the default and can be omitted\n  environment: 'local', // defaults to 'production'\n});\n\nconst params: Plaza.ElementQueryParams = { near: '48.8584,2.2945', radius: 500 };\nconst featureCollection: Plaza.FeatureCollection = await client.elements.query(params);\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst featureCollection = await client.elements\n  .query({ near: '48.8584,2.2945', radius: 500 })\n  .catch(async (err) => {\n    if (err instanceof Plaza.APIError) {\n      console.log(err.status); // 400\n      console.log(err.name); // BadRequestError\n      console.log(err.headers); // {server: 'nginx', ...}\n    } else {\n      throw err;\n    }\n  });\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new Plaza({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.elements.query({ near: '48.8584,2.2945', radius: 500 }, {\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new Plaza({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.elements.query({ near: '48.8584,2.2945', radius: 500 }, {\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new Plaza();\n\nconst response = await client.elements.query({ near: '48.8584,2.2945', radius: 500 }).asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: featureCollection, response: raw } = await client.elements\n  .query({ near: '48.8584,2.2945', radius: 500 })\n  .withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(featureCollection.features);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `PLAZA_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport Plaza from '@plazafyi/sdk';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new Plaza({\n  logger: logger.child({ name: 'Plaza' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.elements.query({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport Plaza from '@plazafyi/sdk';\nimport fetch from 'my-fetch';\n\nconst client = new Plaza({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport Plaza from '@plazafyi/sdk';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new Plaza({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport Plaza from '@plazafyi/sdk';\n\nconst client = new Plaza({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport Plaza from 'npm:@plazafyi/sdk';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new Plaza({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/plazafyi/plaza-typescript/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
  {
    language: 'ruby',
    content:
      '# Plaza Ruby API library\n\nThe Plaza Ruby library provides convenient access to the Plaza REST API from any Ruby 3.2.0+ application. It ships with comprehensive types & docstrings in Yard, RBS, and RBI – [see below](https://github.com/plazafyi/plaza-ruby#Sorbet) for usage with Sorbet. The standard library\'s `net/http` is used as the HTTP transport, with connection pooling via the `connection_pool` gem.\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Plaza MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40plazafyi%2Fmcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBwbGF6YWZ5aS9tY3AiXSwiZW52Ijp7IlBMQVpBX0FQSV9LRVkiOiJNeSBBUEkgS2V5In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40plazafyi%2Fmcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40plazafyi%2Fmcp%22%5D%2C%22env%22%3A%7B%22PLAZA_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nDocumentation for releases of this gem can be found [on RubyDoc](https://gemdocs.org/gems/plaza).\n\nThe REST API documentation can be found on [docs.plaza.fyi](https://docs.plaza.fyi).\n\n## Installation\n\nTo use this gem, install via Bundler by adding the following to your application\'s `Gemfile`:\n\n<!-- x-release-please-start-version -->\n\n```ruby\ngem "plaza", "~> 0.0.1"\n```\n\n<!-- x-release-please-end -->\n\n## Usage\n\n```ruby\nrequire "bundler/setup"\nrequire "plaza"\n\nplaza = Plaza::Client.new(\n  api_key: ENV["PLAZA_API_KEY"], # This is the default and can be omitted\n  environment: "local" # defaults to "production"\n)\n\nfeature_collection = plaza.elements.query(near: "48.8584,2.2945", radius: 500)\n\nputs(feature_collection.features)\n```\n\n\n\n\n\n\n\n### Handling errors\n\nWhen the library is unable to connect to the API, or if the API returns a non-success status code (i.e., 4xx or 5xx response), a subclass of `Plaza::Errors::APIError` will be thrown:\n\n```ruby\nbegin\n  element = plaza.elements.query(near: "48.8584,2.2945", radius: 500)\nrescue Plaza::Errors::APIConnectionError => e\n  puts("The server could not be reached")\n  puts(e.cause)  # an underlying Exception, likely raised within `net/http`\nrescue Plaza::Errors::RateLimitError => e\n  puts("A 429 status code was received; we should back off a bit.")\nrescue Plaza::Errors::APIStatusError => e\n  puts("Another non-200-range status code was received")\n  puts(e.status)\nend\n```\n\nError codes are as follows:\n\n| Cause            | Error Type                 |\n| ---------------- | -------------------------- |\n| HTTP 400         | `BadRequestError`          |\n| HTTP 401         | `AuthenticationError`      |\n| HTTP 403         | `PermissionDeniedError`    |\n| HTTP 404         | `NotFoundError`            |\n| HTTP 409         | `ConflictError`            |\n| HTTP 422         | `UnprocessableEntityError` |\n| HTTP 429         | `RateLimitError`           |\n| HTTP >= 500      | `InternalServerError`      |\n| Other HTTP error | `APIStatusError`           |\n| Timeout          | `APITimeoutError`          |\n| Network error    | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\n\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict, 429 Rate Limit, >=500 Internal errors, and timeouts will all be retried by default.\n\nYou can use the `max_retries` option to configure or disable this:\n\n```ruby\n# Configure the default for all requests:\nplaza = Plaza::Client.new(\n  max_retries: 0 # default is 2\n)\n\n# Or, configure per-request:\nplaza.elements.query(near: "48.8584,2.2945", radius: 500, request_options: {max_retries: 5})\n```\n\n### Timeouts\n\nBy default, requests will time out after 60 seconds. You can use the timeout option to configure or disable this:\n\n```ruby\n# Configure the default for all requests:\nplaza = Plaza::Client.new(\n  timeout: nil # default is 60\n)\n\n# Or, configure per-request:\nplaza.elements.query(near: "48.8584,2.2945", radius: 500, request_options: {timeout: 5})\n```\n\nOn timeout, `Plaza::Errors::APITimeoutError` is raised.\n\nNote that requests that time out are retried by default.\n\n## Advanced concepts\n\n### BaseModel\n\nAll parameter and response objects inherit from `Plaza::Internal::Type::BaseModel`, which provides several conveniences, including:\n\n1. All fields, including unknown ones, are accessible with `obj[:prop]` syntax, and can be destructured with `obj => {prop: prop}` or pattern-matching syntax.\n\n2. Structural equivalence for equality; if two API calls return the same values, comparing the responses with == will return true.\n\n3. Both instances and the classes themselves can be pretty-printed.\n\n4. Helpers such as `#to_h`, `#deep_to_h`, `#to_json`, and `#to_yaml`.\n\n### Making custom or undocumented requests\n\n#### Undocumented properties\n\nYou can send undocumented parameters to any endpoint, and read undocumented response properties, like so:\n\nNote: the `extra_` parameters of the same name overrides the documented parameters.\n\n```ruby\nfeature_collection =\n  plaza.elements.query(\n    near: "48.8584,2.2945",\n    radius: 500,\n    request_options: {\n      extra_query: {my_query_parameter: value},\n      extra_body: {my_body_parameter: value},\n      extra_headers: {"my-header": value}\n    }\n  )\n\nputs(feature_collection[:my_undocumented_property])\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` under the `request_options:` parameter when making a request, as seen in the examples above.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints while retaining the benefit of auth, retries, and so on, you can make requests using `client.request`, like so:\n\n```ruby\nresponse = client.request(\n  method: :post,\n  path: \'/undocumented/endpoint\',\n  query: {"dog": "woof"},\n  headers: {"useful-header": "interesting-value"},\n  body: {"hello": "world"}\n)\n```\n\n### Concurrency & connection pooling\n\nThe `Plaza::Client` instances are threadsafe, but are only are fork-safe when there are no in-flight HTTP requests.\n\nEach instance of `Plaza::Client` has its own HTTP connection pool with a default size of 99. As such, we recommend instantiating the client once per application in most settings.\n\nWhen all available connections from the pool are checked out, requests wait for a new connection to become available, with queue time counting towards the request timeout.\n\nUnless otherwise specified, other classes in the SDK do not have locks protecting their underlying data structure.\n\n## Sorbet\n\nThis library provides comprehensive [RBI](https://sorbet.org/docs/rbi) definitions, and has no dependency on sorbet-runtime.\n\nYou can provide typesafe request parameters like so:\n\n```ruby\nplaza.elements.query(near: "48.8584,2.2945", radius: 500)\n```\n\nOr, equivalently:\n\n```ruby\n# Hashes work, but are not typesafe:\nplaza.elements.query(near: "48.8584,2.2945", radius: 500)\n\n# You can also splat a full Params class:\nparams = Plaza::ElementQueryParams.new(near: "48.8584,2.2945", radius: 500)\nplaza.elements.query(**params)\n```\n\n### Enums\n\nSince this library does not depend on `sorbet-runtime`, it cannot provide [`T::Enum`](https://sorbet.org/docs/tenum) instances. Instead, we provide "tagged symbols" instead, which is always a primitive at runtime:\n\n```ruby\n# :auto\nputs(Plaza::MatrixRequest::Mode::AUTO)\n\n# Revealed type: `T.all(Plaza::MatrixRequest::Mode, Symbol)`\nT.reveal_type(Plaza::MatrixRequest::Mode::AUTO)\n```\n\nEnum parameters have a "relaxed" type, so you can either pass in enum constants or their literal value:\n\n```ruby\n# Using the enum constants preserves the tagged type information:\nplaza.routing.matrix(\n  mode: Plaza::MatrixRequest::Mode::AUTO,\n  # …\n)\n\n# Literal values are also permissible:\nplaza.routing.matrix(\n  mode: :auto,\n  # …\n)\n```\n\n## Versioning\n\nThis package follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions. As the library is in initial development and has a major version of `0`, APIs may change at any time.\n\nThis package considers improvements to the (non-runtime) `*.rbi` and `*.rbs` type definitions to be non-breaking changes.\n\n## Requirements\n\nRuby 3.2.0 or higher.\n\n## Contributing\n\nSee [the contributing documentation](https://github.com/plazafyi/plaza-ruby/tree/main/CONTRIBUTING.md).\n',
  },
  {
    language: 'java',
    content:
      '# Plaza Java API Library\n\n<!-- x-release-please-start-version -->\n[![Maven Central](https://img.shields.io/maven-central/v/com.plazafyi/plaza-java)](https://central.sonatype.com/artifact/com.plazafyi/plaza-java/0.0.1)\n[![javadoc](https://javadoc.io/badge2/com.plazafyi/plaza-java/0.0.1/javadoc.svg)](https://javadoc.io/doc/com.plazafyi/plaza-java/0.0.1)\n<!-- x-release-please-end -->\n\nThe Plaza Java SDK provides convenient access to the [Plaza REST API](https://docs.plaza.fyi)   from applications written in Java.\n\nThe Plaza Java SDK is similar to the Plaza Kotlin SDK but with minor differences that       make it more ergonomic for use in Java, such as `Optional` instead of nullable values, `Stream`       instead of `Sequence`, and `CompletableFuture` instead of suspend functions.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Plaza MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40plazafyi%2Fmcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBwbGF6YWZ5aS9tY3AiXSwiZW52Ijp7IlBMQVpBX0FQSV9LRVkiOiJNeSBBUEkgS2V5In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40plazafyi%2Fmcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40plazafyi%2Fmcp%22%5D%2C%22env%22%3A%7B%22PLAZA_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n<!-- x-release-please-start-version -->\n\nThe REST API documentation can be found on [docs.plaza.fyi](https://docs.plaza.fyi). Javadocs are available on [javadoc.io](https://javadoc.io/doc/com.plazafyi/plaza-java/0.0.1).\n\n<!-- x-release-please-end -->\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n### Gradle\n\n~~~kotlin\nimplementation("com.plazafyi:plaza-java:0.0.1")\n~~~\n\n### Maven\n\n~~~xml\n<dependency>\n  <groupId>com.plazafyi</groupId>\n  <artifactId>plaza-java</artifactId>\n  <version>0.0.1</version>\n</dependency>\n~~~\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Java 8 or later.\n\n## Usage\n\n```java\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.FeatureCollection;\nimport com.plazafyi.models.elements.ElementQueryParams;\n\n// Configures using the `plaza.apiKey` and `plaza.baseUrl` system properties\n// Or configures using the `PLAZA_API_KEY` and `PLAZA_BASE_URL` environment variables\nPlazaClient client = PlazaOkHttpClient.fromEnv();\n\nElementQueryParams params = ElementQueryParams.builder()\n    .near("48.8584,2.2945")\n    .radius(500.0)\n    .build();\nFeatureCollection featureCollection = client.elements().query(params);\n```\n\n## Client configuration\n\nConfigure the client using system properties or environment variables:\n\n```java\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\n\n// Configures using the `plaza.apiKey` and `plaza.baseUrl` system properties\n// Or configures using the `PLAZA_API_KEY` and `PLAZA_BASE_URL` environment variables\nPlazaClient client = PlazaOkHttpClient.fromEnv();\n```\n\nOr manually:\n\n```java\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\n\nPlazaClient client = PlazaOkHttpClient.builder()\n    .apiKey("My API Key")\n    .build();\n```\n\nOr using a combination of the two approaches:\n\n```java\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\n\nPlazaClient client = PlazaOkHttpClient.builder()\n    // Configures using the `plaza.apiKey` and `plaza.baseUrl` system properties\n    // Or configures using the `PLAZA_API_KEY` and `PLAZA_BASE_URL` environment variables\n    .fromEnv()\n    .apiKey("My API Key")\n    .build();\n```\n\nSee this table for the available options:\n\n| Setter    | System property | Environment variable | Required | Default value         |\n| --------- | --------------- | -------------------- | -------- | --------------------- |\n| `apiKey`  | `plaza.apiKey`  | `PLAZA_API_KEY`      | true     | -                     |\n| `baseUrl` | `plaza.baseUrl` | `PLAZA_BASE_URL`     | true     | `"https://plaza.fyi"` |\n\nSystem properties take precedence over environment variables.\n\n> [!TIP]\n> Don\'t create more than one client in the same application. Each client has a connection pool and\n> thread pools, which are more efficient to share between requests.\n\n### Modifying configuration\n\nTo temporarily use a modified client configuration, while reusing the same connection and thread       pools, call `withOptions()` on any client or service:\n\n```java\nimport com.plazafyi.client.PlazaClient;\n\nPlazaClient clientWithOptions = client.withOptions(optionsBuilder -> {\n    optionsBuilder.baseUrl("https://example.com");\n    optionsBuilder.maxRetries(42);\n});\n```\n\nThe `withOptions()` method does not affect the original client or service.\n\n## Requests and responses\n\nTo send a request to the Plaza API, build an instance of some `Params` class and pass it to the     corresponding client method. When the response is received, it will be deserialized into an instance of     a Java class.\n\nFor example, `client.elements().query(...)` should be called with an instance of `ElementQueryParams`, and it     will return an instance of `FeatureCollection`.\n\n## Immutability\n\nEach class in the SDK has an associated   [builder](https://blogs.oracle.com/javamagazine/post/exploring-joshua-blochs-builder-design-pattern-in-java)   or factory method for constructing it.\n\nEach class is [immutable](https://docs.oracle.com/javase/tutorial/essential/concurrency/immutable.html)   once constructed. If the class has an associated builder, then it has a `toBuilder()` method, which can   be used to convert it back to a builder for making a modified copy.\n\nBecause each class is immutable, builder modification will _never_ affect already built class instances.\n\n## Asynchronous execution\n\nThe default client is synchronous. To switch to asynchronous execution, call the `async()` method:\n\n```java\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport com.plazafyi.models.FeatureCollection;\nimport com.plazafyi.models.elements.ElementQueryParams;\nimport java.util.concurrent.CompletableFuture;\n\n// Configures using the `plaza.apiKey` and `plaza.baseUrl` system properties\n// Or configures using the `PLAZA_API_KEY` and `PLAZA_BASE_URL` environment variables\nPlazaClient client = PlazaOkHttpClient.fromEnv();\n\nElementQueryParams params = ElementQueryParams.builder()\n    .near("48.8584,2.2945")\n    .radius(500.0)\n    .build();\nCompletableFuture<FeatureCollection> featureCollection = client.async().elements().query(params);\n```\n\nOr create an asynchronous client from the beginning:\n\n```java\nimport com.plazafyi.client.PlazaClientAsync;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClientAsync;\nimport com.plazafyi.models.FeatureCollection;\nimport com.plazafyi.models.elements.ElementQueryParams;\nimport java.util.concurrent.CompletableFuture;\n\n// Configures using the `plaza.apiKey` and `plaza.baseUrl` system properties\n// Or configures using the `PLAZA_API_KEY` and `PLAZA_BASE_URL` environment variables\nPlazaClientAsync client = PlazaOkHttpClientAsync.fromEnv();\n\nElementQueryParams params = ElementQueryParams.builder()\n    .near("48.8584,2.2945")\n    .radius(500.0)\n    .build();\nCompletableFuture<FeatureCollection> featureCollection = client.elements().query(params);\n```\n\nThe asynchronous client supports the same options as the synchronous one, except most methods return `CompletableFuture`s.\n\n\n\n\n\n## Binary responses\n\nThe SDK defines methods that return binary responses, which are used for API responses that shouldn\'t     necessarily be parsed, like non-JSON data.\n\nThese methods return [`HttpResponse`](plaza-java-core/src/main/kotlin/com/plazafyi/core/http/HttpResponse.kt):\n\n```java\nimport com.plazafyi.core.http.HttpResponse;\nimport com.plazafyi.models.tiles.TileGetParams;\n\nTileGetParams params = TileGetParams.builder()\n    .z(0L)\n    .x(0L)\n    .y(0L)\n    .build();\nHttpResponse tile = client.tiles().get(params);\n```\n\nTo save the response content to a file, use the     [`Files.copy(...)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#copy-java.io.InputStream-java.nio.file.Path-java.nio.file.CopyOption...-)     method:\n\n```java\nimport com.plazafyi.core.http.HttpResponse;\nimport java.nio.file.Files;\nimport java.nio.file.Paths;\nimport java.nio.file.StandardCopyOption;\n\ntry (HttpResponse response = client.tiles().get(params)) {\n    Files.copy(\n        response.body(),\n        Paths.get(path),\n        StandardCopyOption.REPLACE_EXISTING\n    );\n} catch (Exception e) {\n    System.out.println("Something went wrong!");\n    throw new RuntimeException(e);\n}\n```\n\nOr transfer the response content to any     [`OutputStream`](https://docs.oracle.com/javase/8/docs/api/java/io/OutputStream.html):\n\n```java\nimport com.plazafyi.core.http.HttpResponse;\nimport java.nio.file.Files;\nimport java.nio.file.Paths;\n\ntry (HttpResponse response = client.tiles().get(params)) {\n    response.body().transferTo(Files.newOutputStream(Paths.get(path)));\n} catch (Exception e) {\n    System.out.println("Something went wrong!");\n    throw new RuntimeException(e);\n}\n```\n\n## Raw responses\n\nThe SDK defines methods that deserialize responses into instances of Java classes.       However, these methods don\'t provide access to the response headers, status code, or the raw response       body.\n\nTo access this data, prefix any HTTP method call on a client or service with `withRawResponse()`:\n\n```java\nimport com.plazafyi.core.http.Headers;\nimport com.plazafyi.core.http.HttpResponseFor;\nimport com.plazafyi.models.FeatureCollection;\nimport com.plazafyi.models.elements.ElementQueryParams;\n\nElementQueryParams params = ElementQueryParams.builder()\n    .near("48.8584,2.2945")\n    .radius(500.0)\n    .build();\nHttpResponseFor<FeatureCollection> featureCollection = client.elements().withRawResponse().query(params);\n\nint statusCode = featureCollection.statusCode();\nHeaders headers = featureCollection.headers();\n```\n\nYou can still deserialize the response into an instance of a Java class if needed:\n\n```java\nimport com.plazafyi.models.FeatureCollection;\n\nFeatureCollection parsedFeatureCollection = featureCollection.parse();\n```\n\n## Error handling\n\nThe SDK throws custom unchecked exception types:\n\n- [`PlazaServiceException`](plaza-java-core/src/main/kotlin/com/plazafyi/errors/PlazaServiceException.kt): Base class for HTTP errors. See this table for which exception       subclass is thrown for each HTTP status code:\n\n  | Status | Exception                                          |\n  | ------ | -------------------------------------------------- |\n  | 400    | [`BadRequestException`](plaza-java-core/src/main/kotlin/com/plazafyi/errors/BadRequestException.kt)           |\n  | 401    | [`UnauthorizedException`](plaza-java-core/src/main/kotlin/com/plazafyi/errors/UnauthorizedException.kt)         |\n  | 403    | [`PermissionDeniedException`](plaza-java-core/src/main/kotlin/com/plazafyi/errors/PermissionDeniedException.kt)     |\n  | 404    | [`NotFoundException`](plaza-java-core/src/main/kotlin/com/plazafyi/errors/NotFoundException.kt)             |\n  | 422    | [`UnprocessableEntityException`](plaza-java-core/src/main/kotlin/com/plazafyi/errors/UnprocessableEntityException.kt)  |\n  | 429    | [`RateLimitException`](plaza-java-core/src/main/kotlin/com/plazafyi/errors/RateLimitException.kt)            |\n  | 5xx    | [`InternalServerException`](plaza-java-core/src/main/kotlin/com/plazafyi/errors/InternalServerException.kt)       |\n  | others | [`UnexpectedStatusCodeException`](plaza-java-core/src/main/kotlin/com/plazafyi/errors/UnexpectedStatusCodeException.kt) |\n\n- [`PlazaIoException`](plaza-java-core/src/main/kotlin/com/plazafyi/errors/PlazaIoException.kt): I/O networking errors.\n\n- [`PlazaRetryableException`](plaza-java-core/src/main/kotlin/com/plazafyi/errors/PlazaRetryableException.kt): Generic error indicating a failure that could be retried by the client.\n\n- [`PlazaInvalidDataException`](plaza-java-core/src/main/kotlin/com/plazafyi/errors/PlazaInvalidDataException.kt): Failure to interpret successfully parsed data. For example,       when accessing a property that\'s supposed to be required, but the API unexpectedly omitted it from the       response.\n\n- [`PlazaException`](plaza-java-core/src/main/kotlin/com/plazafyi/errors/PlazaException.kt): Base class for all exceptions. Most errors will result in one of the       previously mentioned ones, but completely generic errors may be thrown using the base class.\n\n\n\n## Logging\n\nThe SDK uses the standard   [OkHttp logging interceptor](https://github.com/square/okhttp/tree/master/okhttp-logging-interceptor).\n\nEnable logging by setting the `PLAZA_LOG` environment variable to   `info`:\n\n```sh\nexport PLAZA_LOG=info\n```\n\nOr to `debug` for more verbose logging:\n\n```sh\nexport PLAZA_LOG=debug\n```\n\n## ProGuard and R8\n\nAlthough the SDK uses reflection, it is still usable with     [ProGuard](https://github.com/Guardsquare/proguard) and     [R8](https://developer.android.com/topic/performance/app-optimization/enable-app-optimization) because     `plaza-java-core` is published with a     [configuration file](plaza-java-core/src/main/resources/META-INF/proguard/plaza-java-core.pro) containing     [keep rules](https://www.guardsquare.com/manual/configuration/usage).\n\nProGuard and R8 should automatically detect and use the published rules, but you can also manually copy     the keep rules if necessary.\n\n\n\n\n\n## Jackson\n\nThe SDK depends on [Jackson](https://github.com/FasterXML/jackson) for JSON     serialization/deserialization. It is compatible with version 2.13.4 or higher,     but depends on version 2.18.2 by default.\n\nThe SDK throws an exception if it detects an incompatible Jackson version at runtime (e.g. if the     default version was overridden in your Maven or Gradle config).\n\nIf the SDK threw an exception, but you\'re _certain_ the version is compatible, then disable the version     check using the `checkJacksonVersionCompatibility` on [`PlazaOkHttpClient`](plaza-java-client-okhttp/src/main/kotlin/com/plazafyi/client/okhttp/PlazaOkHttpClient.kt) or     [`PlazaOkHttpClientAsync`](plaza-java-client-okhttp/src/main/kotlin/com/plazafyi/client/okhttp/PlazaOkHttpClientAsync.kt).\n\n> [!CAUTION]\n> We make no guarantee that the SDK works correctly when the Jackson version check is disabled.\n\nAlso note that there are bugs in older Jackson versions that can affect the SDK. We don\'t work around all     Jackson bugs ([example](https://github.com/FasterXML/jackson-databind/issues/3240)) and expect users to     upgrade Jackson for those instead.\n\n## Network options\n\n### Retries\n\nThe SDK automatically retries 2 times by default, with a short exponential backoff between requests.\n\nOnly the following error types are retried:\n- Connection errors (for example, due to a network connectivity problem)\n- 408 Request Timeout\n- 409 Conflict\n- 429 Rate Limit\n- 5xx Internal\n\nThe API may also explicitly instruct the SDK to retry or not retry a request.\n\nTo set a custom number of retries, configure the client using the `maxRetries` method:\n\n```java\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\n\nPlazaClient client = PlazaOkHttpClient.builder()\n    .fromEnv()\n    .maxRetries(4)\n    .build();\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default.\n\nTo set a custom timeout, configure the method call using the `timeout` method:\n\n```java\nimport com.plazafyi.models.FeatureCollection;\n\nFeatureCollection featureCollection = client.elements().query(RequestOptions.builder().timeout(Duration.ofSeconds(30)).build());\n```\n\nOr configure the default for all method calls at the client level:\n\n```java\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport java.time.Duration;\n\nPlazaClient client = PlazaOkHttpClient.builder()\n    .fromEnv()\n    .timeout(Duration.ofSeconds(30))\n    .build();\n```\n\n### Proxies\n\nTo route requests through a proxy, configure the client using the `proxy` method:\n\n```java\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport java.net.InetSocketAddress;\nimport java.net.Proxy;\n\nPlazaClient client = PlazaOkHttpClient.builder()\n    .fromEnv()\n    .proxy(new Proxy(\n      Proxy.Type.HTTP, new InetSocketAddress(\n        "https://example.com", 8080\n      )\n    ))\n    .build();\n```\n\n### Connection pooling\n\nTo customize the underlying OkHttp connection pool, configure the client using the   `maxIdleConnections` and `keepAliveDuration` methods:\n\n```java\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\nimport java.time.Duration;\n\nPlazaClient client = PlazaOkHttpClient.builder()\n    .fromEnv()\n    // If `maxIdleConnections` is set, then `keepAliveDuration` must be set, and vice versa.\n    .maxIdleConnections(10)\n    .keepAliveDuration(Duration.ofMinutes(2))\n    .build();\n```\n\nIf both options are unset, OkHttp\'s default connection pool settings are used.\n\n### HTTPS\n\n> [!NOTE]\n> Most applications should not call these methods, and instead use the system defaults. The defaults include\n> special optimizations that can be lost if the implementations are modified.\n\nTo configure how HTTPS connections are secured, configure the client using the `sslSocketFactory`,   `trustManager`, and `hostnameVerifier` methods:\n\n```java\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\n\nPlazaClient client = PlazaOkHttpClient.builder()\n    .fromEnv()\n    // If `sslSocketFactory` is set, then `trustManager` must be set, and vice versa.\n    .sslSocketFactory(yourSSLSocketFactory)\n    .trustManager(yourTrustManager)\n    .hostnameVerifier(yourHostnameVerifier)\n    .build();\n```\n\n### Environments\n\nThe SDK sends requests to the production by default. To send requests to a different     environment, configure the client like so:\n\n```java\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\n\nPlazaClient client = PlazaOkHttpClient.builder()\n    .fromEnv()\n    .local()\n    .build();\n```\n\n### Custom HTTP client\n\nThe SDK consists of three artifacts:\n- `plaza-java-core`\n  - Contains core SDK logic\n  - Does not depend on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`PlazaClient`](plaza-java-core/src/main/kotlin/com/plazafyi/client/PlazaClient.kt), [`PlazaClientAsync`](plaza-java-core/src/main/kotlin/com/plazafyi/client/PlazaClientAsync.kt),             [`PlazaClientImpl`](plaza-java-core/src/main/kotlin/com/plazafyi/client/PlazaClientImpl.kt), and [`PlazaClientAsyncImpl`](plaza-java-core/src/main/kotlin/com/plazafyi/client/PlazaClientAsyncImpl.kt), all of which can             work with any HTTP client\n- `plaza-java-client-okhttp`\n  - Depends on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`PlazaOkHttpClient`](plaza-java-client-okhttp/src/main/kotlin/com/plazafyi/client/okhttp/PlazaOkHttpClient.kt) and [`PlazaOkHttpClientAsync`](plaza-java-client-okhttp/src/main/kotlin/com/plazafyi/client/okhttp/PlazaOkHttpClientAsync.kt), which             provide a way to construct [`PlazaClientImpl`](plaza-java-core/src/main/kotlin/com/plazafyi/client/PlazaClientImpl.kt) and             [`PlazaClientAsyncImpl`](plaza-java-core/src/main/kotlin/com/plazafyi/client/PlazaClientAsyncImpl.kt), respectively, using OkHttp\n- `plaza-java`\n  - Depends on and exposes the APIs of both `plaza-java-core` and `plaza-java-client-okhttp`\n  - Does not have its own logic\n\nThis structure allows replacing the SDK\'s default HTTP client without pulling in unnecessary dependencies.\n\n#### Customized [`OkHttpClient`](https://square.github.io/okhttp/3.x/okhttp/okhttp3/OkHttpClient.html)\n\n> [!TIP]\n> Try the available [network options](#network-options) before replacing the default client.\n\nTo use a customized `OkHttpClient`:\n\n1. Replace your [`plaza-java` dependency](#installation) with `plaza-java-core`\n2. Copy `plaza-java-client-okhttp`\'s [`OkHttpClient`](plaza-java-client-okhttp/src/main/kotlin/com/plazafyi/client/okhttp/OkHttpClient.kt) class into your code and        customize it\n3. Construct [`PlazaClientImpl`](plaza-java-core/src/main/kotlin/com/plazafyi/client/PlazaClientImpl.kt) or [`PlazaClientAsyncImpl`](plaza-java-core/src/main/kotlin/com/plazafyi/client/PlazaClientAsyncImpl.kt), similarly to        [`PlazaOkHttpClient`](plaza-java-client-okhttp/src/main/kotlin/com/plazafyi/client/okhttp/PlazaOkHttpClient.kt) or [`PlazaOkHttpClientAsync`](plaza-java-client-okhttp/src/main/kotlin/com/plazafyi/client/okhttp/PlazaOkHttpClientAsync.kt), using your        customized client\n\n### Completely custom HTTP client\n\nTo use a completely custom HTTP client:\n\n1. Replace your [`plaza-java` dependency](#installation) with `plaza-java-core`\n2. Write a class that implements the [`HttpClient`](plaza-java-core/src/main/kotlin/com/plazafyi/core/http/HttpClient.kt) interface\n3. Construct [`PlazaClientImpl`](plaza-java-core/src/main/kotlin/com/plazafyi/client/PlazaClientImpl.kt) or [`PlazaClientAsyncImpl`](plaza-java-core/src/main/kotlin/com/plazafyi/client/PlazaClientAsyncImpl.kt), similarly to        [`PlazaOkHttpClient`](plaza-java-client-okhttp/src/main/kotlin/com/plazafyi/client/okhttp/PlazaOkHttpClient.kt) or [`PlazaOkHttpClientAsync`](plaza-java-client-okhttp/src/main/kotlin/com/plazafyi/client/okhttp/PlazaOkHttpClientAsync.kt), using your new        client class\n\n## Undocumented API functionality\n\nThe SDK is typed for convenient usage of the documented API. However, it also supports working with undocumented or not yet supported parts of the API.\n\n### Parameters\n\nTo set undocumented parameters, call the `putAdditionalHeader`, `putAdditionalQueryParam`, or       `putAdditionalBodyProperty` methods on any `Params` class:\n\n```java\nimport com.plazafyi.core.JsonValue;\nimport com.plazafyi.models.elements.ElementQueryParams;\n\nElementQueryParams params = ElementQueryParams.builder()\n    .putAdditionalHeader("Secret-Header", "42")\n    .putAdditionalQueryParam("secret_query_param", "42")\n    .putAdditionalBodyProperty("secretProperty", JsonValue.from("42"))\n    .build();\n```\n\nThese can be accessed on the built object later using the `_additionalHeaders()`,       `_additionalQueryParams()`, and `_additionalBodyProperties()` methods.\n\nTo set a documented parameter or property to an undocumented or not yet supported _value_, pass a       [`JsonValue`](plaza-java-core/src/main/kotlin/com/plazafyi/core/Values.kt) object to its setter:\n\n```java\nimport com.plazafyi.models.elements.ElementQueryParams;\n\nElementQueryParams params = ElementQueryParams.builder()\n    .near("48.8584,2.2945")\n    .radius(500.0)\n    .build();\n```\n\nThe most straightforward way to create a [`JsonValue`](plaza-java-core/src/main/kotlin/com/plazafyi/core/Values.kt) is using its       `from(...)` method:\n\n```java\nimport com.plazafyi.core.JsonValue;\nimport java.util.List;\nimport java.util.Map;\n\n// Create primitive JSON values\nJsonValue nullValue = JsonValue.from(null);\nJsonValue booleanValue = JsonValue.from(true);\nJsonValue numberValue = JsonValue.from(42);\nJsonValue stringValue = JsonValue.from("Hello World!");\n\n// Create a JSON array value equivalent to `["Hello", "World"]`\nJsonValue arrayValue = JsonValue.from(List.of(\n  "Hello", "World"\n));\n\n// Create a JSON object value equivalent to `{ "a": 1, "b": 2 }`\nJsonValue objectValue = JsonValue.from(Map.of(\n  "a", 1,\n  "b", 2\n));\n\n// Create an arbitrarily nested JSON equivalent to:\n// {\n//   "a": [1, 2],\n//   "b": [3, 4]\n// }\nJsonValue complexValue = JsonValue.from(Map.of(\n  "a", List.of(\n    1, 2\n  ),\n  "b", List.of(\n    3, 4\n  )\n));\n```\n\nNormally a `Builder` class\'s `build` method will throw         [`IllegalStateException`](https://docs.oracle.com/javase/8/docs/api/java/lang/IllegalStateException.html)         if any required parameter or property is unset.\n\nTo forcibly omit a required parameter or property, pass [`JsonMissing`](plaza-java-core/src/main/kotlin/com/plazafyi/core/Values.kt):\n\n```java\nimport com.plazafyi.core.JsonMissing;\nimport com.plazafyi.models.elements.ElementQueryParams;\nimport com.plazafyi.models.elements.ElementRetrieveParams;\n\nElementQueryParams params = ElementRetrieveParams.builder()\n    .type(JsonMissing.of())\n    .build();\n```\n\n### Response properties\n\nTo access undocumented response properties, call the `_additionalProperties()` method:\n\n```java\nimport com.plazafyi.core.JsonValue;\nimport java.util.Map;\n\nMap<String, JsonValue> additionalProperties = client.elements().query(params)._additionalProperties();\nJsonValue secretPropertyValue = additionalProperties.get("secretProperty");\n\nString result = secretPropertyValue.accept(new JsonValue.Visitor<>() {\n    @Override\n    public String visitNull() {\n        return "It\'s null!";\n    }\n\n    @Override\n    public String visitBoolean(boolean value) {\n        return "It\'s a boolean!";\n    }\n\n    @Override\n    public String visitNumber(Number value) {\n        return "It\'s a number!";\n    }\n\n    // Other methods include `visitMissing`, `visitString`, `visitArray`, and `visitObject`\n    // The default implementation of each unimplemented method delegates to `visitDefault`, which throws by default, but can also be overridden\n});\n```\n\nTo access a property\'s raw JSON value, which may be undocumented, call its `_` prefixed method:\n\n```java\nimport com.plazafyi.core.JsonField;\nimport java.util.Optional;\n\nJsonField<Object> field = client.elements().query(params)._field();\n\nif (field.isMissing()) {\n  // The property is absent from the JSON response\n} else if (field.isNull()) {\n  // The property was set to literal null\n} else {\n  // Check if value was provided as a string\n  // Other methods include `asNumber()`, `asBoolean()`, etc.\n  Optional<String> jsonString = field.asString();\n\n  // Try to deserialize into a custom type\n  MyClass myObject = field.asUnknown().orElseThrow().convert(MyClass.class);\n}\n```\n\n### Response validation\n\nIn rare cases, the API may return a response that doesn\'t match the expected type. For example, the SDK     may expect a property to contain a `String`, but the API could return something else.\n\nBy default, the SDK will not throw an exception in this case. It will throw     [`PlazaInvalidDataException`](plaza-java-core/src/main/kotlin/com/plazafyi/errors/PlazaInvalidDataException.kt) only if you directly access the property.\n\nIf you would prefer to check that the response is completely well-typed upfront, then either call     `validate()`:\n\n```java\nimport com.plazafyi.models.FeatureCollection;\n\nFeatureCollection featureCollection = client.elements().query(params).validate();\n```\n\nOr configure the method call to validate the response using the `responseValidation` method:\n\n```java\nimport com.plazafyi.models.FeatureCollection;\n\nFeatureCollection featureCollection = client.elements().query(RequestOptions.builder().responseValidation(true).build());\n```\n\nOr configure the default for all method calls at the client level:\n\n```java\nimport com.plazafyi.client.PlazaClient;\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient;\n\nPlazaClient client = PlazaOkHttpClient.builder()\n    .fromEnv()\n    .responseValidation(true)\n    .build();\n```\n\n## FAQ\n\n### Why don\'t you use plain `enum` classes?\n\nJava `enum` classes are not trivially   [forwards compatible](https://www.stainless.com/blog/making-java-enums-forwards-compatible). Using them in   the SDK could cause runtime exceptions if the API is updated to respond with a new enum value.\n\n### Why do you represent fields using `JsonField<T>` instead of just plain `T`?\n\nUsing `JsonField<T>` enables a few features:\n\n- Allowing usage of [undocumented API functionality](#undocumented-api-functionality)\n- Lazily [validating the API response against the expected shape](#response-validation)\n- Representing absent vs explicitly null values\n\n### Why don\'t you use [`data` classes](https://kotlinlang.org/docs/data-classes.html)?\n\nIt is not [backwards compatible to add new fields to a data class](https://kotlinlang.org/docs/api-guidelines-backward-compatibility.html#avoid-using-data-classes-in-your-api)   and we don\'t want to introduce a breaking change every time we add a field to a class.\n\n### Why don\'t you use checked exceptions?\n\nChecked exceptions are widely considered a mistake in the Java programming language. In fact, they were   omitted from Kotlin for this reason.\n\nChecked exceptions:\n\n- Are verbose to handle\n- Encourage error handling at the wrong level of abstraction, where nothing can be done about the error\n- Are tedious to propagate due to the [function coloring problem](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function)\n- Don\'t play well with lambdas (also due to the function coloring problem)\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/plazafyi/plaza-java/issues) with questions, bugs, or suggestions.\n',
  },
  {
    language: 'kotlin',
    content:
      '# Plaza Kotlin API Library\n\n<!-- x-release-please-start-version -->\n[![Maven Central](https://img.shields.io/maven-central/v/com.plazafyi/plaza-kotlin)](https://central.sonatype.com/artifact/com.plazafyi/plaza-kotlin/0.0.1)\n[![javadoc](https://javadoc.io/badge2/com.plazafyi/plaza-kotlin/0.0.1/javadoc.svg)](https://javadoc.io/doc/com.plazafyi/plaza-kotlin/0.0.1)\n<!-- x-release-please-end -->\n\nThe Plaza Kotlin SDK provides convenient access to the [Plaza REST API](https://docs.plaza.fyi)   from applications written in Kotlin.\n\nThe Plaza Kotlin SDK is similar to the Plaza Java SDK but with minor differences that       make it more ergonomic for use in Kotlin, such as nullable values instead of `Optional`,       `Sequence` instead of `Stream`, and suspend functions instead of `CompletableFuture`.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Plaza MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40plazafyi%2Fmcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBwbGF6YWZ5aS9tY3AiXSwiZW52Ijp7IlBMQVpBX0FQSV9LRVkiOiJNeSBBUEkgS2V5In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40plazafyi%2Fmcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40plazafyi%2Fmcp%22%5D%2C%22env%22%3A%7B%22PLAZA_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n<!-- x-release-please-start-version -->\n\nThe REST API documentation can be found on [docs.plaza.fyi](https://docs.plaza.fyi). KDocs are available on [javadoc.io](https://javadoc.io/doc/com.plazafyi/plaza-kotlin/0.0.1).\n\n<!-- x-release-please-end -->\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n### Gradle\n\n~~~kotlin\nimplementation("com.plazafyi:plaza-kotlin:0.0.1")\n~~~\n\n### Maven\n\n~~~xml\n<dependency>\n  <groupId>com.plazafyi</groupId>\n  <artifactId>plaza-kotlin</artifactId>\n  <version>0.0.1</version>\n</dependency>\n~~~\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Java 8 or later.\n\n## Usage\n\n```kotlin\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.FeatureCollection\nimport com.plazafyi.models.elements.ElementQueryParams\n\n// Configures using the `plaza.apiKey` and `plaza.baseUrl` system properties\n// Or configures using the `PLAZA_API_KEY` and `PLAZA_BASE_URL` environment variables\nval client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\nval params: ElementQueryParams = ElementQueryParams.builder()\n    .near("48.8584,2.2945")\n    .radius(500.0)\n    .build()\nval featureCollection: FeatureCollection = client.elements().query(params)\n```\n\n## Client configuration\n\nConfigure the client using system properties or environment variables:\n\n```kotlin\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\n\n// Configures using the `plaza.apiKey` and `plaza.baseUrl` system properties\n// Or configures using the `PLAZA_API_KEY` and `PLAZA_BASE_URL` environment variables\nval client: PlazaClient = PlazaOkHttpClient.fromEnv()\n```\n\nOr manually:\n\n```kotlin\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\n\nval client: PlazaClient = PlazaOkHttpClient.builder()\n    .apiKey("My API Key")\n    .build()\n```\n\nOr using a combination of the two approaches:\n\n```kotlin\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\n\nval client: PlazaClient = PlazaOkHttpClient.builder()\n    // Configures using the `plaza.apiKey` and `plaza.baseUrl` system properties\n    // Or configures using the `PLAZA_API_KEY` and `PLAZA_BASE_URL` environment variables\n    .fromEnv()\n    .apiKey("My API Key")\n    .build()\n```\n\nSee this table for the available options:\n\n| Setter    | System property | Environment variable | Required | Default value         |\n| --------- | --------------- | -------------------- | -------- | --------------------- |\n| `apiKey`  | `plaza.apiKey`  | `PLAZA_API_KEY`      | true     | -                     |\n| `baseUrl` | `plaza.baseUrl` | `PLAZA_BASE_URL`     | true     | `"https://plaza.fyi"` |\n\nSystem properties take precedence over environment variables.\n\n> [!TIP]\n> Don\'t create more than one client in the same application. Each client has a connection pool and\n> thread pools, which are more efficient to share between requests.\n\n### Modifying configuration\n\nTo temporarily use a modified client configuration, while reusing the same connection and thread       pools, call `withOptions()` on any client or service:\n\n```kotlin\nimport com.plazafyi.client.PlazaClient\n\nval clientWithOptions: PlazaClient = client.withOptions {\n    it.baseUrl("https://example.com")\n    it.maxRetries(42)\n}\n```\n\nThe `withOptions()` method does not affect the original client or service.\n\n## Requests and responses\n\nTo send a request to the Plaza API, build an instance of some `Params` class and pass it to the     corresponding client method. When the response is received, it will be deserialized into an instance of     a Kotlin class.\n\nFor example, `client.elements().query(...)` should be called with an instance of `ElementQueryParams`, and it     will return an instance of `FeatureCollection`.\n\n## Immutability\n\nEach class in the SDK has an associated   [builder](https://blogs.oracle.com/javamagazine/post/exploring-joshua-blochs-builder-design-pattern-in-java)   or factory method for constructing it.\n\nEach class is [immutable](https://docs.oracle.com/javase/tutorial/essential/concurrency/immutable.html)   once constructed. If the class has an associated builder, then it has a `toBuilder()` method, which can   be used to convert it back to a builder for making a modified copy.\n\nBecause each class is immutable, builder modification will _never_ affect already built class instances.\n\n## Asynchronous execution\n\nThe default client is synchronous. To switch to asynchronous execution, call the `async()` method:\n\n```kotlin\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport com.plazafyi.models.FeatureCollection\nimport com.plazafyi.models.elements.ElementQueryParams\n\n// Configures using the `plaza.apiKey` and `plaza.baseUrl` system properties\n// Or configures using the `PLAZA_API_KEY` and `PLAZA_BASE_URL` environment variables\nval client: PlazaClient = PlazaOkHttpClient.fromEnv()\n\nval params: ElementQueryParams = ElementQueryParams.builder()\n    .near("48.8584,2.2945")\n    .radius(500.0)\n    .build()\nval featureCollection: FeatureCollection = client.async().elements().query(params)\n```\n\nOr create an asynchronous client from the beginning:\n\n```kotlin\nimport com.plazafyi.client.PlazaClientAsync\nimport com.plazafyi.client.okhttp.PlazaOkHttpClientAsync\nimport com.plazafyi.models.FeatureCollection\nimport com.plazafyi.models.elements.ElementQueryParams\n\n// Configures using the `plaza.apiKey` and `plaza.baseUrl` system properties\n// Or configures using the `PLAZA_API_KEY` and `PLAZA_BASE_URL` environment variables\nval client: PlazaClientAsync = PlazaOkHttpClientAsync.fromEnv()\n\nval params: ElementQueryParams = ElementQueryParams.builder()\n    .near("48.8584,2.2945")\n    .radius(500.0)\n    .build()\nval featureCollection: FeatureCollection = client.elements().query(params)\n```\n\nThe asynchronous client supports the same options as the synchronous one, except most methods are [suspending](https://kotlinlang.org/docs/coroutines-guide.html).\n\n\n\n\n\n## Binary responses\n\nThe SDK defines methods that return binary responses, which are used for API responses that shouldn\'t     necessarily be parsed, like non-JSON data.\n\nThese methods return [`HttpResponse`](plaza-kotlin-core/src/main/kotlin/com/plazafyi/core/http/HttpResponse.kt):\n\n```kotlin\nimport com.plazafyi.core.http.HttpResponse\nimport com.plazafyi.models.tiles.TileGetParams\n\nval params: TileGetParams = TileGetParams.builder()\n    .z(0L)\n    .x(0L)\n    .y(0L)\n    .build()\nval tile: HttpResponse = client.tiles().get(params)\n```\n\nTo save the response content to a file, use the     [`Files.copy(...)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#copy-java.io.InputStream-java.nio.file.Path-java.nio.file.CopyOption...-)     method:\n\n```kotlin\nimport java.nio.file.Files\nimport java.nio.file.Paths\nimport java.nio.file.StandardCopyOption\n\nclient.tiles().get(params).use {\n    Files.copy(\n        it.body(),\n        Paths.get(path),\n        StandardCopyOption.REPLACE_EXISTING\n    )\n}\n```\n\nOr transfer the response content to any     [`OutputStream`](https://docs.oracle.com/javase/8/docs/api/java/io/OutputStream.html):\n\n```kotlin\nimport java.nio.file.Files\nimport java.nio.file.Paths\n\nclient.tiles().get(params).use {\n    it.body().transferTo(Files.newOutputStream(Paths.get(path)))\n}\n```\n\n## Raw responses\n\nThe SDK defines methods that deserialize responses into instances of Kotlin classes.       However, these methods don\'t provide access to the response headers, status code, or the raw response       body.\n\nTo access this data, prefix any HTTP method call on a client or service with `withRawResponse()`:\n\n```kotlin\nimport com.plazafyi.core.http.Headers\nimport com.plazafyi.core.http.HttpResponseFor\nimport com.plazafyi.models.FeatureCollection\nimport com.plazafyi.models.elements.ElementQueryParams\n\nval params: ElementQueryParams = ElementQueryParams.builder()\n    .near("48.8584,2.2945")\n    .radius(500.0)\n    .build()\nval featureCollection: HttpResponseFor<FeatureCollection> = client.elements().withRawResponse().query(params)\n\nval statusCode: Int = featureCollection.statusCode()\nval headers: Headers = featureCollection.headers()\n```\n\nYou can still deserialize the response into an instance of a Kotlin class if needed:\n\n```kotlin\nimport com.plazafyi.models.FeatureCollection\n\nval parsedFeatureCollection: FeatureCollection = featureCollection.parse()\n```\n\n## Error handling\n\nThe SDK throws custom unchecked exception types:\n\n- [`PlazaServiceException`](plaza-kotlin-core/src/main/kotlin/com/plazafyi/errors/PlazaServiceException.kt): Base class for HTTP errors. See this table for which exception       subclass is thrown for each HTTP status code:\n\n  | Status | Exception                                          |\n  | ------ | -------------------------------------------------- |\n  | 400    | [`BadRequestException`](plaza-kotlin-core/src/main/kotlin/com/plazafyi/errors/BadRequestException.kt)           |\n  | 401    | [`UnauthorizedException`](plaza-kotlin-core/src/main/kotlin/com/plazafyi/errors/UnauthorizedException.kt)         |\n  | 403    | [`PermissionDeniedException`](plaza-kotlin-core/src/main/kotlin/com/plazafyi/errors/PermissionDeniedException.kt)     |\n  | 404    | [`NotFoundException`](plaza-kotlin-core/src/main/kotlin/com/plazafyi/errors/NotFoundException.kt)             |\n  | 422    | [`UnprocessableEntityException`](plaza-kotlin-core/src/main/kotlin/com/plazafyi/errors/UnprocessableEntityException.kt)  |\n  | 429    | [`RateLimitException`](plaza-kotlin-core/src/main/kotlin/com/plazafyi/errors/RateLimitException.kt)            |\n  | 5xx    | [`InternalServerException`](plaza-kotlin-core/src/main/kotlin/com/plazafyi/errors/InternalServerException.kt)       |\n  | others | [`UnexpectedStatusCodeException`](plaza-kotlin-core/src/main/kotlin/com/plazafyi/errors/UnexpectedStatusCodeException.kt) |\n\n- [`PlazaIoException`](plaza-kotlin-core/src/main/kotlin/com/plazafyi/errors/PlazaIoException.kt): I/O networking errors.\n\n- [`PlazaRetryableException`](plaza-kotlin-core/src/main/kotlin/com/plazafyi/errors/PlazaRetryableException.kt): Generic error indicating a failure that could be retried by the client.\n\n- [`PlazaInvalidDataException`](plaza-kotlin-core/src/main/kotlin/com/plazafyi/errors/PlazaInvalidDataException.kt): Failure to interpret successfully parsed data. For example,       when accessing a property that\'s supposed to be required, but the API unexpectedly omitted it from the       response.\n\n- [`PlazaException`](plaza-kotlin-core/src/main/kotlin/com/plazafyi/errors/PlazaException.kt): Base class for all exceptions. Most errors will result in one of the       previously mentioned ones, but completely generic errors may be thrown using the base class.\n\n\n\n## Logging\n\nThe SDK uses the standard   [OkHttp logging interceptor](https://github.com/square/okhttp/tree/master/okhttp-logging-interceptor).\n\nEnable logging by setting the `PLAZA_LOG` environment variable to   `info`:\n\n```sh\nexport PLAZA_LOG=info\n```\n\nOr to `debug` for more verbose logging:\n\n```sh\nexport PLAZA_LOG=debug\n```\n\n## ProGuard and R8\n\nAlthough the SDK uses reflection, it is still usable with     [ProGuard](https://github.com/Guardsquare/proguard) and     [R8](https://developer.android.com/topic/performance/app-optimization/enable-app-optimization) because     `plaza-kotlin-core` is published with a     [configuration file](plaza-kotlin-core/src/main/resources/META-INF/proguard/plaza-kotlin-core.pro) containing     [keep rules](https://www.guardsquare.com/manual/configuration/usage).\n\nProGuard and R8 should automatically detect and use the published rules, but you can also manually copy     the keep rules if necessary.\n\n\n\n\n\n## Jackson\n\nThe SDK depends on [Jackson](https://github.com/FasterXML/jackson) for JSON     serialization/deserialization. It is compatible with version 2.13.4 or higher,     but depends on version 2.18.2 by default.\n\nThe SDK throws an exception if it detects an incompatible Jackson version at runtime (e.g. if the     default version was overridden in your Maven or Gradle config).\n\nIf the SDK threw an exception, but you\'re _certain_ the version is compatible, then disable the version     check using the `checkJacksonVersionCompatibility` on [`PlazaOkHttpClient`](plaza-kotlin-client-okhttp/src/main/kotlin/com/plazafyi/client/okhttp/PlazaOkHttpClient.kt) or     [`PlazaOkHttpClientAsync`](plaza-kotlin-client-okhttp/src/main/kotlin/com/plazafyi/client/okhttp/PlazaOkHttpClientAsync.kt).\n\n> [!CAUTION]\n> We make no guarantee that the SDK works correctly when the Jackson version check is disabled.\n\nAlso note that there are bugs in older Jackson versions that can affect the SDK. We don\'t work around all     Jackson bugs ([example](https://github.com/FasterXML/jackson-databind/issues/3240)) and expect users to     upgrade Jackson for those instead.\n\n## Network options\n\n### Retries\n\nThe SDK automatically retries 2 times by default, with a short exponential backoff between requests.\n\nOnly the following error types are retried:\n- Connection errors (for example, due to a network connectivity problem)\n- 408 Request Timeout\n- 409 Conflict\n- 429 Rate Limit\n- 5xx Internal\n\nThe API may also explicitly instruct the SDK to retry or not retry a request.\n\nTo set a custom number of retries, configure the client using the `maxRetries` method:\n\n```kotlin\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\n\nval client: PlazaClient = PlazaOkHttpClient.builder()\n    .fromEnv()\n    .maxRetries(4)\n    .build()\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default.\n\nTo set a custom timeout, configure the method call using the `timeout` method:\n\n```kotlin\nimport com.plazafyi.models.FeatureCollection\n\nval featureCollection: FeatureCollection = client.elements().query(RequestOptions.builder().timeout(Duration.ofSeconds(30)).build())\n```\n\nOr configure the default for all method calls at the client level:\n\n```kotlin\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport java.time.Duration\n\nval client: PlazaClient = PlazaOkHttpClient.builder()\n    .fromEnv()\n    .timeout(Duration.ofSeconds(30))\n    .build()\n```\n\n### Proxies\n\nTo route requests through a proxy, configure the client using the `proxy` method:\n\n```kotlin\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport java.net.InetSocketAddress\nimport java.net.Proxy\n\nval client: PlazaClient = PlazaOkHttpClient.builder()\n    .fromEnv()\n    .proxy(Proxy(\n      Proxy.Type.HTTP, InetSocketAddress(\n        "https://example.com", 8080\n      )\n    ))\n    .build()\n```\n\n### Connection pooling\n\nTo customize the underlying OkHttp connection pool, configure the client using the   `maxIdleConnections` and `keepAliveDuration` methods:\n\n```kotlin\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\nimport java.time.Duration\n\nval client: PlazaClient = PlazaOkHttpClient.builder()\n    .fromEnv()\n    // If `maxIdleConnections` is set, then `keepAliveDuration` must be set, and vice versa.\n    .maxIdleConnections(10)\n    .keepAliveDuration(Duration.ofMinutes(2))\n    .build()\n```\n\nIf both options are unset, OkHttp\'s default connection pool settings are used.\n\n### HTTPS\n\n> [!NOTE]\n> Most applications should not call these methods, and instead use the system defaults. The defaults include\n> special optimizations that can be lost if the implementations are modified.\n\nTo configure how HTTPS connections are secured, configure the client using the `sslSocketFactory`,   `trustManager`, and `hostnameVerifier` methods:\n\n```kotlin\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\n\nval client: PlazaClient = PlazaOkHttpClient.builder()\n    .fromEnv()\n    // If `sslSocketFactory` is set, then `trustManager` must be set, and vice versa.\n    .sslSocketFactory(yourSSLSocketFactory)\n    .trustManager(yourTrustManager)\n    .hostnameVerifier(yourHostnameVerifier)\n    .build()\n```\n\n### Environments\n\nThe SDK sends requests to the production by default. To send requests to a different     environment, configure the client like so:\n\n```kotlin\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\n\nval client: PlazaClient = PlazaOkHttpClient.builder()\n    .fromEnv()\n    .local()\n    .build()\n```\n\n### Custom HTTP client\n\nThe SDK consists of three artifacts:\n- `plaza-kotlin-core`\n  - Contains core SDK logic\n  - Does not depend on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`PlazaClient`](plaza-kotlin-core/src/main/kotlin/com/plazafyi/client/PlazaClient.kt), [`PlazaClientAsync`](plaza-kotlin-core/src/main/kotlin/com/plazafyi/client/PlazaClientAsync.kt),             [`PlazaClientImpl`](plaza-kotlin-core/src/main/kotlin/com/plazafyi/client/PlazaClientImpl.kt), and [`PlazaClientAsyncImpl`](plaza-kotlin-core/src/main/kotlin/com/plazafyi/client/PlazaClientAsyncImpl.kt), all of which can             work with any HTTP client\n- `plaza-kotlin-client-okhttp`\n  - Depends on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`PlazaOkHttpClient`](plaza-kotlin-client-okhttp/src/main/kotlin/com/plazafyi/client/okhttp/PlazaOkHttpClient.kt) and [`PlazaOkHttpClientAsync`](plaza-kotlin-client-okhttp/src/main/kotlin/com/plazafyi/client/okhttp/PlazaOkHttpClientAsync.kt), which             provide a way to construct [`PlazaClientImpl`](plaza-kotlin-core/src/main/kotlin/com/plazafyi/client/PlazaClientImpl.kt) and             [`PlazaClientAsyncImpl`](plaza-kotlin-core/src/main/kotlin/com/plazafyi/client/PlazaClientAsyncImpl.kt), respectively, using OkHttp\n- `plaza-kotlin`\n  - Depends on and exposes the APIs of both `plaza-kotlin-core` and `plaza-kotlin-client-okhttp`\n  - Does not have its own logic\n\nThis structure allows replacing the SDK\'s default HTTP client without pulling in unnecessary dependencies.\n\n#### Customized [`OkHttpClient`](https://square.github.io/okhttp/3.x/okhttp/okhttp3/OkHttpClient.html)\n\n> [!TIP]\n> Try the available [network options](#network-options) before replacing the default client.\n\nTo use a customized `OkHttpClient`:\n\n1. Replace your [`plaza-kotlin` dependency](#installation) with `plaza-kotlin-core`\n2. Copy `plaza-kotlin-client-okhttp`\'s [`OkHttpClient`](plaza-kotlin-client-okhttp/src/main/kotlin/com/plazafyi/client/okhttp/OkHttpClient.kt) class into your code and        customize it\n3. Construct [`PlazaClientImpl`](plaza-kotlin-core/src/main/kotlin/com/plazafyi/client/PlazaClientImpl.kt) or [`PlazaClientAsyncImpl`](plaza-kotlin-core/src/main/kotlin/com/plazafyi/client/PlazaClientAsyncImpl.kt), similarly to        [`PlazaOkHttpClient`](plaza-kotlin-client-okhttp/src/main/kotlin/com/plazafyi/client/okhttp/PlazaOkHttpClient.kt) or [`PlazaOkHttpClientAsync`](plaza-kotlin-client-okhttp/src/main/kotlin/com/plazafyi/client/okhttp/PlazaOkHttpClientAsync.kt), using your        customized client\n\n### Completely custom HTTP client\n\nTo use a completely custom HTTP client:\n\n1. Replace your [`plaza-kotlin` dependency](#installation) with `plaza-kotlin-core`\n2. Write a class that implements the [`HttpClient`](plaza-kotlin-core/src/main/kotlin/com/plazafyi/core/http/HttpClient.kt) interface\n3. Construct [`PlazaClientImpl`](plaza-kotlin-core/src/main/kotlin/com/plazafyi/client/PlazaClientImpl.kt) or [`PlazaClientAsyncImpl`](plaza-kotlin-core/src/main/kotlin/com/plazafyi/client/PlazaClientAsyncImpl.kt), similarly to        [`PlazaOkHttpClient`](plaza-kotlin-client-okhttp/src/main/kotlin/com/plazafyi/client/okhttp/PlazaOkHttpClient.kt) or [`PlazaOkHttpClientAsync`](plaza-kotlin-client-okhttp/src/main/kotlin/com/plazafyi/client/okhttp/PlazaOkHttpClientAsync.kt), using your new        client class\n\n## Undocumented API functionality\n\nThe SDK is typed for convenient usage of the documented API. However, it also supports working with undocumented or not yet supported parts of the API.\n\n### Parameters\n\nTo set undocumented parameters, call the `putAdditionalHeader`, `putAdditionalQueryParam`, or       `putAdditionalBodyProperty` methods on any `Params` class:\n\n```kotlin\nimport com.plazafyi.core.JsonValue\nimport com.plazafyi.models.elements.ElementQueryParams\n\nval params: ElementQueryParams = ElementQueryParams.builder()\n    .putAdditionalHeader("Secret-Header", "42")\n    .putAdditionalQueryParam("secret_query_param", "42")\n    .putAdditionalBodyProperty("secretProperty", JsonValue.from("42"))\n    .build()\n```\n\nThese can be accessed on the built object later using the `_additionalHeaders()`,       `_additionalQueryParams()`, and `_additionalBodyProperties()` methods.\n\nTo set a documented parameter or property to an undocumented or not yet supported _value_, pass a       [`JsonValue`](plaza-kotlin-core/src/main/kotlin/com/plazafyi/core/Values.kt) object to its setter:\n\n```kotlin\nimport com.plazafyi.models.elements.ElementQueryParams\n\nval params: ElementQueryParams = ElementQueryParams.builder()\n    .near("48.8584,2.2945")\n    .radius(500.0)\n    .build()\n```\n\nThe most straightforward way to create a [`JsonValue`](plaza-kotlin-core/src/main/kotlin/com/plazafyi/core/Values.kt) is using its       `from(...)` method:\n\n```kotlin\nimport com.plazafyi.core.JsonValue\n\n// Create primitive JSON values\nval nullValue: JsonValue = JsonValue.from(null)\nval booleanValue: JsonValue = JsonValue.from(true)\nval numberValue: JsonValue = JsonValue.from(42)\nval stringValue: JsonValue = JsonValue.from("Hello World!")\n\n// Create a JSON array value equivalent to `["Hello", "World"]`\nval arrayValue: JsonValue = JsonValue.from(listOf(\n  "Hello", "World"\n))\n\n// Create a JSON object value equivalent to `{ "a": 1, "b": 2 }`\nval objectValue: JsonValue = JsonValue.from(mapOf(\n  "a" to 1, "b" to 2\n))\n\n// Create an arbitrarily nested JSON equivalent to:\n// {\n//   "a": [1, 2],\n//   "b": [3, 4]\n// }\nval complexValue: JsonValue = JsonValue.from(mapOf(\n  "a" to listOf(\n    1, 2\n  ), "b" to listOf(\n    3, 4\n  )\n))\n```\n\nNormally a `Builder` class\'s `build` method will throw         [`IllegalStateException`](https://docs.oracle.com/javase/8/docs/api/java/lang/IllegalStateException.html)         if any required parameter or property is unset.\n\nTo forcibly omit a required parameter or property, pass [`JsonMissing`](plaza-kotlin-core/src/main/kotlin/com/plazafyi/core/Values.kt):\n\n```kotlin\nimport com.plazafyi.core.JsonMissing\nimport com.plazafyi.models.elements.ElementQueryParams\nimport com.plazafyi.models.elements.ElementRetrieveParams\n\nval params: ElementQueryParams = ElementRetrieveParams.builder()\n    .type(JsonMissing.of())\n    .build()\n```\n\n### Response properties\n\nTo access undocumented response properties, call the `_additionalProperties()` method:\n\n```kotlin\nimport com.plazafyi.core.JsonBoolean\nimport com.plazafyi.core.JsonNull\nimport com.plazafyi.core.JsonNumber\nimport com.plazafyi.core.JsonValue\n\nval additionalProperties: Map<String, JsonValue> = client.elements().query(params)._additionalProperties()\nval secretPropertyValue: JsonValue = additionalProperties.get("secretProperty")\n\nval result = when (secretPropertyValue) {\n    is JsonNull -> "It\'s null!"\n    is JsonBoolean -> "It\'s a boolean!"\n    is JsonNumber -> "It\'s a number!"\n    // Other types include `JsonMissing`, `JsonString`, `JsonArray`, and `JsonObject`\n    else -> "It\'s something else!"\n}\n```\n\nTo access a property\'s raw JSON value, which may be undocumented, call its `_` prefixed method:\n\n```kotlin\nimport com.plazafyi.core.JsonField\n\nval field: JsonField<Any> = client.elements().query(params)._field()\n\nif (field.isMissing()) {\n  // The property is absent from the JSON response\n} else if (field.isNull()) {\n  // The property was set to literal null\n} else {\n  // Check if value was provided as a string\n  // Other methods include `asNumber()`, `asBoolean()`, etc.\n  val jsonString: String? = field.asString();\n\n  // Try to deserialize into a custom type\n  val myObject: MyClass = field.asUnknown()!!.convert(MyClass::class.java)\n}\n```\n\n### Response validation\n\nIn rare cases, the API may return a response that doesn\'t match the expected type. For example, the SDK     may expect a property to contain a `String`, but the API could return something else.\n\nBy default, the SDK will not throw an exception in this case. It will throw     [`PlazaInvalidDataException`](plaza-kotlin-core/src/main/kotlin/com/plazafyi/errors/PlazaInvalidDataException.kt) only if you directly access the property.\n\nIf you would prefer to check that the response is completely well-typed upfront, then either call     `validate()`:\n\n```kotlin\nimport com.plazafyi.models.FeatureCollection\n\nval featureCollection: FeatureCollection = client.elements().query(params).validate()\n```\n\nOr configure the method call to validate the response using the `responseValidation` method:\n\n```kotlin\nimport com.plazafyi.models.FeatureCollection\n\nval featureCollection: FeatureCollection = client.elements().query(RequestOptions.builder().responseValidation(true).build())\n```\n\nOr configure the default for all method calls at the client level:\n\n```kotlin\nimport com.plazafyi.client.PlazaClient\nimport com.plazafyi.client.okhttp.PlazaOkHttpClient\n\nval client: PlazaClient = PlazaOkHttpClient.builder()\n    .fromEnv()\n    .responseValidation(true)\n    .build()\n```\n\n## FAQ\n\n### Why don\'t you use plain `enum` classes?\n\nKotlin `enum` classes are not trivially   [forwards compatible](https://www.stainless.com/blog/making-java-enums-forwards-compatible). Using them in   the SDK could cause runtime exceptions if the API is updated to respond with a new enum value.\n\n### Why do you represent fields using `JsonField<T>` instead of just plain `T`?\n\nUsing `JsonField<T>` enables a few features:\n\n- Allowing usage of [undocumented API functionality](#undocumented-api-functionality)\n- Lazily [validating the API response against the expected shape](#response-validation)\n- Representing absent vs explicitly null values\n\n### Why don\'t you use [`data` classes](https://kotlinlang.org/docs/data-classes.html)?\n\nIt is not [backwards compatible to add new fields to a data class](https://kotlinlang.org/docs/api-guidelines-backward-compatibility.html#avoid-using-data-classes-in-your-api)   and we don\'t want to introduce a breaking change every time we add a field to a class.\n\n### Why don\'t you use checked exceptions?\n\nChecked exceptions are widely considered a mistake in the Java programming language. In fact, they were   omitted from Kotlin for this reason.\n\nChecked exceptions:\n\n- Are verbose to handle\n- Encourage error handling at the wrong level of abstraction, where nothing can be done about the error\n- Are tedious to propagate due to the [function coloring problem](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function)\n- Don\'t play well with lambdas (also due to the function coloring problem)\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/plazafyi/plaza-kotlin/issues) with questions, bugs, or suggestions.\n',
  },
  {
    language: 'csharp',
    content:
      '# Plaza C# API Library\n\nThe Plaza C# SDK provides convenient access to the [Plaza REST API](https://docs.plaza.fyi) from applications written in   C#.\n\n## Installation\n\nInstall the package from [NuGet](https://www.nuget.org/packages/Plaza):\n\n```bash\ndotnet add package Plaza\n```\n\n## Requirements\n\nThis library requires .NET Standard 2.0 or later.\n\n## Usage\n\nSee the [`examples`](examples) directory for complete and runnable examples.\n\n```csharp\nPlazaClient client = new();\n\nElementQueryParams parameters = new()\n{\n    Near = "48.8584,2.2945",\n    Radius = 500,\n};\n\nvar featureCollection = await client.Elements.Query(parameters);\n\nConsole.WriteLine(featureCollection);\n```',
  },
  {
    language: 'cli',
    content:
      "# Plaza CLI\n\nThe official CLI for the [Plaza REST API](https://docs.plaza.fyi).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n<!-- x-release-please-start-version -->\n\n## Installation\n\n### Installing with Homebrew\n\n~~~sh\nbrew install plazafyi/tap/plaza\n~~~\n\n### Installing with Go\n\nTo test or install the CLI locally, you need [Go](https://go.dev/doc/install) version 1.22 or later installed.\n\n~~~sh\ngo install 'github.com/plazafyi/plaza-cli/cmd/plaza@latest'\n~~~\n\nOnce you have run `go install`, the binary is placed in your Go bin directory:\n\n- **Default location**: `$HOME/go/bin` (or `$GOPATH/bin` if GOPATH is set)\n- **Check your path**: Run `go env GOPATH` to see the base directory\n\nIf commands aren't found after installation, add the Go bin directory to your PATH:\n\n~~~sh\n# Add to your shell profile (.zshrc, .bashrc, etc.)\nexport PATH=\"$PATH:$(go env GOPATH)/bin\"\n~~~\n\n<!-- x-release-please-end -->\n\n### Running Locally\n\nAfter cloning the git repository for this project, you can use the\n`scripts/run` script to run the tool locally:\n\n~~~sh\n./scripts/run args...\n~~~\n\n## Usage\n\nThe CLI follows a resource-based command structure:\n\n~~~sh\nplaza [resource] <command> [flags...]\n~~~\n\n~~~sh\nplaza elements query \\\n  --api-key 'My API Key' \\\n  --near 48.8584,2.2945 \\\n  --radius 500\n~~~\n\nFor details about specific commands, use the `--help` flag.\n\n### Environment variables\n\n| Environment variable | Description   | Required |\n| -------------------- | ------------- | -------- |\n| `PLAZA_API_KEY`      | Plaza API key | yes      |\n\n### Global flags\n\n- `--api-key` - Plaza API key (can also be set with `PLAZA_API_KEY` env var)\n- `--help` - Show command line usage\n- `--debug` - Enable debug logging (includes HTTP request/response details)\n- `--version`, `-v` - Show the CLI version\n- `--base-url` - Use a custom API backend URL\n- `--format` - Change the output format (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--format-error` - Change the output format for errors (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--transform` - Transform the data output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n- `--transform-error` - Transform the error output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n\n### Passing files as arguments\n\nTo pass files to your API, you can use the `@myfile.ext` syntax:\n\n~~~bash\nplaza <command> --arg @abe.jpg\n~~~\n\nFiles can also be passed inside JSON or YAML blobs:\n\n~~~bash\nplaza <command> --arg '{image: \"@abe.jpg\"}'\n# Equivalent:\nplaza <command> <<YAML\narg:\n  image: \"@abe.jpg\"\nYAML\n~~~\n\nIf you need to pass a string literal that begins with an `@` sign, you can\nescape the `@` sign to avoid accidentally passing a file.\n\n~~~bash\nplaza <command> --username '\\@abe'\n~~~\n\n#### Explicit encoding\n\nFor JSON endpoints, the CLI tool does filetype sniffing to determine whether the\nfile contents should be sent as a string literal (for plain text files) or as a\nbase64-encoded string literal (for binary files). If you need to explicitly send\nthe file as either plain text or base64-encoded data, you can use\n`@file://myfile.txt` (for string encoding) or `@data://myfile.dat` (for\nbase64-encoding). Note that absolute paths will begin with `@file://` or\n`@data://`, followed by a third `/` (for example, `@file:///tmp/file.txt`).\n\n~~~bash\nplaza <command> --arg @data://file.txt\n~~~\n",
  },
  {
    language: 'php',
    content:
      "# Plaza PHP API Library\n\nThe Plaza PHP library provides convenient access to the Plaza REST API from any PHP 8.1.0+ application.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n```\ncomposer require \"plazafyi/plaza-php 0.0.1\"\n```\n<!-- x-release-please-end -->\n\n## Usage\n\n```php\n<?php\n\n$client = new Client(\n  apiKey: getenv('PLAZA_API_KEY') ?: 'My API Key', environment: 'local'\n);\n\n$featureCollection = $client->elements->query(\n  near: '48.8584,2.2945', radius: 500\n);\n\nvar_dump($featureCollection->features);\n```",
  },
];

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

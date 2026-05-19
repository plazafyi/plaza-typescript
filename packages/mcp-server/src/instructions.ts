// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import fs from 'fs/promises';
import { getLogger } from './logger';
import { readEnv } from './util';

const INSTRUCTIONS_CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

interface InstructionsCacheEntry {
  fetchedInstructions: string;
  fetchedAt: number;
}

const instructionsCache = new Map<string, InstructionsCacheEntry>();

export async function getInstructions({
  stainlessApiKey,
  customInstructionsPath,
}: {
  stainlessApiKey?: string | undefined;
  customInstructionsPath?: string | undefined;
}): Promise<string> {
  const now = Date.now();
  const cacheKey = customInstructionsPath ?? stainlessApiKey ?? '';
  const cached = instructionsCache.get(cacheKey);

  if (cached && now - cached.fetchedAt <= INSTRUCTIONS_CACHE_TTL_MS) {
    return cached.fetchedInstructions;
  }

  // Evict stale entries so the cache doesn't grow unboundedly.
  for (const [key, entry] of instructionsCache) {
    if (now - entry.fetchedAt > INSTRUCTIONS_CACHE_TTL_MS) {
      instructionsCache.delete(key);
    }
  }

  let fetchedInstructions: string;

  if (customInstructionsPath) {
    fetchedInstructions = await fetchLatestInstructionsFromFile(customInstructionsPath);
  } else {
    fetchedInstructions = await fetchLatestInstructionsFromApi(stainlessApiKey);
  }

  instructionsCache.set(cacheKey, { fetchedInstructions, fetchedAt: now });
  return fetchedInstructions;
}

async function fetchLatestInstructionsFromFile(path: string): Promise<string> {
  try {
    return await fs.readFile(path, 'utf-8');
  } catch (error) {
    getLogger().error({ error, path }, 'Error fetching instructions from file');
    throw error;
  }
}

async function fetchLatestInstructionsFromApi(stainlessApiKey: string | undefined): Promise<string> {
  // Setting the stainless API key is optional, but may be required
  // to authenticate requests to the Stainless API.
  const response = await fetch(
    readEnv('CODE_MODE_INSTRUCTIONS_URL') ?? 'https://api.stainless.com/api/ai/instructions/plaza',
    {
      method: 'GET',
      headers: { ...(stainlessApiKey && { Authorization: stainlessApiKey }) },
    },
  );

  let instructions: string | undefined;
  if (!response.ok) {
    getLogger().warn(
      'Warning: failed to retrieve MCP server instructions. Proceeding with default instructions...',
    );

    instructions =
      '\n  This is the plaza MCP server.\n\n  Available tools:\n  - search_docs: Search SDK documentation to find the right methods and parameters.\n  - execute: Run TypeScript code against a pre-authenticated SDK client. Define an async run(client) function.\n\n  Workflow:\n  - If unsure about the API, call search_docs first.\n  - Write complete solutions in a single execute call when possible. For large datasets, use API filters to narrow results or paginate within a single execute block.\n  - If execute returns an error, read the error and fix your code rather than retrying the same approach.\n  - Variables do not persist between execute calls. Return or log all data you need.\n  - Individual HTTP requests to the API have a 30-second timeout. If a request times out, try a smaller query or add filters.\n  - Code execution has a total timeout of approximately 5 minutes. If your code times out, simplify it or break it into smaller steps.\n  ';
  }

  instructions ??= ((await response.json()) as { instructions: string }).instructions;

  instructions +=
    '\nPlaza is a geospatial data API serving the complete OpenStreetMap (OSM) planet\ndataset — every node, way, and relation on Earth. All responses use GeoJSON\n(RFC 7946). Coordinates are always [longitude, latitude] order.\n\nAll spatial inputs use GeoJSON geometry objects. Points are\n{"type": "Point", "coordinates": [lng, lat]}. Polygons, LineStrings, and\nother geometry types follow the GeoJSON spec (RFC 7946).\n\n# Core Concepts\n\nOSM has three element types:\n- node: a point (lat/lng) — POIs, addresses, trees, traffic signals\n- way: an ordered list of nodes — roads, buildings, rivers, boundaries\n- relation: a group of nodes/ways/relations with roles — routes, multipolygons, restrictions\n\nTags are key=value pairs on elements. Common keys: name, amenity, highway, building,\nshop, cuisine, opening_hours, addr:street, addr:housenumber. Tags are free-form —\ncheck the OSM wiki (wiki.openstreetmap.org/wiki/Map_features) for conventions.\n\n# Choosing the Right Endpoint\n\n## Feature Queries (features)\nUse `features.query` (POST) for spatial queries with tag filters. Pass GeoJSON\ngeometry objects as top-level body keys: `around`, `within`, or `intersects`.\nUse `features.retrieve` to fetch a single element by type and OSM ID.\nUse `features.batch` to fetch up to 100 elements by type+ID pairs.\n\nKey params for POST /features: `around` (GeoJSON Point for proximity),\n`within` (GeoJSON Polygon for containment), `intersects` (any GeoJSON geometry),\n`radius` (meters, used with `around`), `tags` (key=value filters),\n`type` (node/way/relation), `h3` (H3 cell index), `limit`, `cursor`.\n\n`around` accepts a GeoJSON Point and pairs with `radius` (meters) at the top level.\n`within` accepts a GeoJSON Polygon.\n`intersects` accepts any GeoJSON geometry.\n\n## Geocoding\nUse `geocode.forward` (POST) to convert addresses/place names to coordinates.\nUse `geocode.reverse` (POST) to convert a GeoJSON Point to an address.\nUse `geocode.autocomplete` (POST) for typeahead search suggestions.\nUse `geocode.batch` (POST) to geocode multiple addresses in one call.\n\nKey params: `q` (search text), `focus` (GeoJSON Point for bias),\n`country_code` (ISO 3166-1), `layer` (address/poi/street/city/country),\n`lang` (BCP 47), `limit`.\n\n## Search\nUse `search.query` (POST) for full-text search across OSM feature names.\nReturns ranked results with BM25 scoring. Params: `q`, `limit`, `cursor`.\n\n## Routing\nUse `routing.route` (POST) to calculate a route between origin and destination.\nModes: auto, foot, bicycle. Body includes GeoJSON Point geometries for\n`origin` and `destination`.\nUse `routing.isochrone` (POST) to get reachable area from a GeoJSON Point\nwithin a time limit. Params: `geometry` (GeoJSON Point), `time` (seconds), `mode`.\nUse `routing.matrix` (POST) for distance/duration matrix between multiple\norigins and destinations. Body includes arrays of GeoJSON Point geometries.\nUse `routing.nearest` (POST) to snap a GeoJSON Point to the nearest road segment.\n\n## Elevation\nUse `elevation.lookup` (POST) for elevation at a GeoJSON Point or MultiPoint.\nUse `elevation.profile` (POST) for elevation along a GeoJSON LineString path.\n\n## Map Matching\nUse `map_match.match` (POST) to snap a GPS trace (GeoJSON LineString) to the\nroad network. Pass geometry as a GeoJSON LineString in the `geometry` field.\nInclude optional `radiuses` array for per-point search radius (default 50m).\n\n## Route Optimization\nUse `optimize.create` (POST) to optimize visit order for multiple waypoints (TSP).\nPass waypoints as an array of GeoJSON Point geometries.\nReturns immediately with a job_id for large problems.\nUse `optimize.retrieve` (GET) to poll for async results.\n\n## PlazaQL\nUse `query.execute` to execute PlazaQL queries — a powerful query language\nfor selecting OSM data by tags, spatial filters, and element relationships.\nBody: { "data": "<plazaql query string>" }\n\n### PlazaQL Syntax Reference\n\nQuery structure:\n  [settings];\n  statement; statement; ...\n  out body;\n\nElement types: node, way, relation (or rel), nwr (any type).\n\nTag filters (inside square brackets):\n  [key=value]        — exact match\n  [key!=value]       — not equal\n  [key]              — key exists\n  [!key]             — key missing\n  [key~"regex"]      — value matches regex\n  [key!~"regex"]     — value does not match regex\n\nSpatial filters (inside parentheses):\n  (south,west,north,east)       — bounding box\n  (around:radius,lat,lng)       — circle around point (meters)\n  (around:radius)               — circle around input set\n  (poly:"lat1 lng1 lat2 lng2")  — polygon containment\n  (area.setname)                — within named area\n\nOutput modes:\n  out body;     — tags + geometry (default)\n  out geom;     — full geometry (ways include node coords)\n  out center;   — centroid of each element\n  out skel;     — geometry only, no tags\n  out ids;      — IDs only\n  out count;    — count of results\n  out body qt 100;  — sort by quadtile, limit to 100\n\nRecurse operators:\n  >    — recurse down (way→nodes, relation→members)\n  <    — recurse up (node→parent ways/relations)\n  >>   — full transitive recurse down\n  <<   — full transitive recurse up\n  (._;>;);  — current set + all child elements (common idiom)\n\nSet operations:\n  (stmt1; stmt2;);           — union\n  (.set1; - .set2;);         — difference\n  node.set1.set2;            — intersection\n  node[...]->.setname;       — store result in named set\n\nArea queries:\n  area[name="Berlin"]->.a;\n  node[amenity=cafe](area.a);\n\nSettings block:\n  [bbox:south,west,north,east]\n  [timeout:seconds]\n  [out:json]  or  [out:xml]  or  [out:csv(col1,col2; true; ",")]\n\n### PlazaQL Examples\n\nFind cafes in Paris:\n  area[name="Paris"]->.a;\n  node[amenity=cafe](area.a);\n  out body;\n\nAll subway stations within 2km of a point:\n  node[station=subway](around:2000,48.8566,2.3522);\n  out geom;\n\nBuildings in a bounding box:\n  way[building](48.85,2.34,48.87,2.36);\n  out center;\n\nRestaurants with cuisine tag:\n  nwr[amenity=restaurant][cuisine](48.8,2.3,48.9,2.4);\n  out body;\n\nAll bus routes in an area:\n  area[name="Manhattan"]->.a;\n  relation[route=bus](area.a);\n  out body;\n\n## Vector Tiles\nUse `tiles.get` for Mapbox Vector Tiles at z/x/y coordinates.\n\n## Datasets\nUse `datasets.list` to browse available datasets.\nUse `datasets.features` to query features within a specific dataset.\n\n# Tips for Agents\n\n- Coordinates are ALWAYS [longitude, latitude] — Paris is [2.3522, 48.8566], not [48.8566, 2.3522].\n- All spatial inputs use GeoJSON geometry objects — never pass raw lat/lng numbers.\n- For "find X near Y", first geocode Y, then use features.query with `around` set to a\n  GeoJSON Point and `radius` in meters, or use PlazaQL\'s around: filter.\n- For complex spatial queries (polygons, unions, tag combinations), prefer PlazaQL.\n- For simple lookups ("get the Eiffel Tower"), use features.retrieve with type=node and OSM ID,\n  or search.query with q="Eiffel Tower".\n- To express a bounding box, use a GeoJSON Polygon with 5 coordinates (closing the ring):\n  {"type": "Polygon", "coordinates": [[[west, south], [east, south], [east, north], [west, north], [west, south]]]}\n- Limit results to avoid timeouts on large areas. Use limit param or PlazaQL limit modifier.\n- Premium endpoints (route, isochrone, matrix, map-match, optimize) count as 4x against quotas.\n- All endpoints require an API key via Bearer auth header.\n';
  return instructions;
}

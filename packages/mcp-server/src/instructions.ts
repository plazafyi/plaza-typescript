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
    '\nPlaza is a geospatial data API serving the complete OpenStreetMap (OSM) planet\ndataset — every node, way, and relation on Earth. All responses use GeoJSON\n(RFC 7946). Coordinates are always [longitude, latitude] order.\n\n# Core Concepts\n\nOSM has three element types:\n- node: a point (lat/lng) — POIs, addresses, trees, traffic signals\n- way: an ordered list of nodes — roads, buildings, rivers, boundaries\n- relation: a group of nodes/ways/relations with roles — routes, multipolygons, restrictions\n\nTags are key=value pairs on elements. Common keys: name, amenity, highway, building,\nshop, cuisine, opening_hours, addr:street, addr:housenumber. Tags are free-form —\ncheck the OSM wiki (wiki.openstreetmap.org/wiki/Map_features) for conventions.\n\n# Choosing the Right Endpoint\n\n## Element Queries (features)\nUse `elements.query` (GET) for simple spatial queries with tag filters.\nUse `elements.query_post` (POST) for complex spatial filters (polygons, multiple filters).\nUse `elements.retrieve` to fetch a single element by type and OSM ID.\nUse `elements.batch` to fetch up to 100 elements by type+ID pairs.\nUse `elements.nearby` to find features near a point within a radius.\n\nKey params for GET /features: bbox (south,west,north,east), h3 (H3 cell index),\ntype (node/way/relation), tags[key]=value for tag filters, limit, cursor.\n\n## Geocoding\nUse `geocode.forward` to convert addresses/place names to coordinates.\nUse `geocode.reverse` to convert coordinates to addresses.\nUse `geocode.autocomplete` for typeahead search suggestions.\nUse `geocode.batch` to geocode multiple addresses in one call.\n\nKey params: q (search text), lat/lng (bias point), country_code (ISO 3166-1),\nlayer (address/poi/street/city/country), lang (BCP 47), limit.\n\n## Search\nUse `search.query` for full-text search across OSM feature names.\nReturns ranked results with BM25 scoring. Params: q, limit, cursor.\n\n## Routing\nUse `routing.route` to calculate a route between origin and destination.\nModes: auto, foot, bicycle. Body includes GeoJSON Point geometries for origin/destination.\nUse `routing.isochrone` to get reachable area from a point within a time limit.\nParams: lat, lng, time (seconds), mode.\nUse `routing.matrix` for distance/duration matrix between multiple origins and destinations.\nBody includes GeoJSON MultiPoint geometries.\nUse `routing.nearest` to snap a coordinate to the nearest road segment.\n\n## Elevation\nUse `elevation.lookup` for elevation at a single point.\nUse `elevation.batch` for multiple points.\nUse `elevation.profile` for elevation along a path (LineString).\n\n## Map Matching\nUse `map_match.match` to snap a GPS trace (LineString) to the road network.\nInclude optional radiuses array for per-point search radius (default 50m).\n\n## Route Optimization\nUse `optimize.create` to optimize visit order for multiple waypoints (TSP).\nReturns immediately with a job_id for large problems.\nUse `optimize.retrieve` to poll for async results.\n\n## PlazaQL\nUse `query.plazaql` to execute PlazaQL queries — a powerful query language\nfor selecting OSM data by tags, spatial filters, and element relationships.\nBody: { "data": "<plazaql query string>" }\n\n### PlazaQL Syntax Reference\n\nQuery structure:\n  [settings];\n  statement; statement; ...\n  out body;\n\nElement types: node, way, relation (or rel), nwr (any type).\n\nTag filters (inside square brackets):\n  [key=value]        — exact match\n  [key!=value]       — not equal\n  [key]              — key exists\n  [!key]             — key missing\n  [key~"regex"]      — value matches regex\n  [key!~"regex"]     — value does not match regex\n\nSpatial filters (inside parentheses):\n  (south,west,north,east)       — bounding box\n  (around:radius,lat,lng)       — circle around point (meters)\n  (around:radius)               — circle around input set\n  (poly:"lat1 lng1 lat2 lng2")  — polygon containment\n  (area.setname)                — within named area\n\nOutput modes:\n  out body;     — tags + geometry (default)\n  out geom;     — full geometry (ways include node coords)\n  out center;   — centroid of each element\n  out skel;     — geometry only, no tags\n  out ids;      — IDs only\n  out count;    — count of results\n  out body qt 100;  — sort by quadtile, limit to 100\n\nRecurse operators:\n  >    — recurse down (way→nodes, relation→members)\n  <    — recurse up (node→parent ways/relations)\n  >>   — full transitive recurse down\n  <<   — full transitive recurse up\n  (._;>;);  — current set + all child elements (common idiom)\n\nSet operations:\n  (stmt1; stmt2;);           — union\n  (.set1; - .set2;);         — difference\n  node.set1.set2;            — intersection\n  node[...]->.setname;       — store result in named set\n\nArea queries:\n  area[name="Berlin"]->.a;\n  node[amenity=cafe](area.a);\n\nSettings block:\n  [bbox:south,west,north,east]\n  [timeout:seconds]\n  [out:json]  or  [out:xml]  or  [out:csv(col1,col2; true; ",")]\n\n### PlazaQL Examples\n\nFind cafes in Paris:\n  area[name="Paris"]->.a;\n  node[amenity=cafe](area.a);\n  out body;\n\nAll subway stations within 2km of a point:\n  node[station=subway](around:2000,48.8566,2.3522);\n  out geom;\n\nBuildings in a bounding box:\n  way[building](48.85,2.34,48.87,2.36);\n  out center;\n\nRestaurants with cuisine tag:\n  nwr[amenity=restaurant][cuisine](48.8,2.3,48.9,2.4);\n  out body;\n\nAll bus routes in an area:\n  area[name="Manhattan"]->.a;\n  relation[route=bus](area.a);\n  out body;\n\n## Vector Tiles\nUse `tiles.get` for Mapbox Vector Tiles at z/x/y coordinates.\n\n## Datasets\nUse `datasets.list` to browse available datasets.\nUse `datasets.features` to query features within a specific dataset.\n\n# Tips for Agents\n\n- Coordinates are ALWAYS [longitude, latitude] — Paris is [2.3522, 48.8566], not [48.8566, 2.3522].\n- For "find X near Y", first geocode Y, then use elements.nearby or PlazaQL around: filter.\n- For complex spatial queries (polygons, unions, tag combinations), prefer PlazaQL.\n- For simple lookups ("get the Eiffel Tower"), use elements.retrieve with type=node and OSM ID,\n  or search.query with q="Eiffel Tower".\n- bbox format is south,west,north,east (min lat, min lng, max lat, max lng).\n- Limit results to avoid timeouts on large areas. Use limit param or PlazaQL limit modifier.\n- Premium endpoints (route, isochrone, matrix, map-match, optimize) count as 4x against quotas.\n- All endpoints require an API key via Bearer auth header.\n';
  return instructions;
}

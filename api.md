# Plaza

Types:

- <code><a href="./src/resources/top-level.ts">Error</a></code>
- <code><a href="./src/resources/top-level.ts">FeatureCollection</a></code>
- <code><a href="./src/resources/top-level.ts">GeoJsonFeature</a></code>
- <code><a href="./src/resources/top-level.ts">GeoJsonGeometry</a></code>

# Elements

Types:

- <code><a href="./src/resources/elements.ts">BatchRequest</a></code>

Methods:

- <code title="get /api/v1/features/{type}/{id}">client.elements.<a href="./src/resources/elements.ts">retrieve</a>(id, { ...params }) -> GeoJsonFeature</code>
- <code title="post /api/v1/features/batch">client.elements.<a href="./src/resources/elements.ts">batch</a>({ ...params }) -> FeatureCollection</code>
- <code title="get /api/v1/features/nearby">client.elements.<a href="./src/resources/elements.ts">nearby</a>({ ...params }) -> FeatureCollection</code>
- <code title="get /api/v1/features">client.elements.<a href="./src/resources/elements.ts">query</a>({ ...params }) -> FeatureCollection</code>

# Datasets

Types:

- <code><a href="./src/resources/datasets.ts">Dataset</a></code>
- <code><a href="./src/resources/datasets.ts">DatasetList</a></code>

Methods:

- <code title="post /api/v1/datasets">client.datasets.<a href="./src/resources/datasets.ts">create</a>({ ...params }) -> Dataset</code>
- <code title="get /api/v1/datasets/{id}">client.datasets.<a href="./src/resources/datasets.ts">retrieve</a>(id) -> Dataset</code>
- <code title="get /api/v1/datasets">client.datasets.<a href="./src/resources/datasets.ts">list</a>() -> DatasetList</code>
- <code title="delete /api/v1/datasets/{id}">client.datasets.<a href="./src/resources/datasets.ts">delete</a>(id) -> void</code>
- <code title="get /api/v1/datasets/{id}/features">client.datasets.<a href="./src/resources/datasets.ts">features</a>(id, { ...params }) -> FeatureCollection</code>

# Geocode

Types:

- <code><a href="./src/resources/geocode.ts">AutocompleteResult</a></code>
- <code><a href="./src/resources/geocode.ts">GeocodeResult</a></code>
- <code><a href="./src/resources/geocode.ts">GeocodingFeature</a></code>
- <code><a href="./src/resources/geocode.ts">ReverseGeocodeResult</a></code>
- <code><a href="./src/resources/geocode.ts">GeocodeBatchResponse</a></code>

Methods:

- <code title="get /api/v1/geocode/autocomplete">client.geocode.<a href="./src/resources/geocode.ts">autocomplete</a>({ ...params }) -> AutocompleteResult</code>
- <code title="post /api/v1/geocode/batch">client.geocode.<a href="./src/resources/geocode.ts">batch</a>({ ...params }) -> unknown</code>
- <code title="get /api/v1/geocode">client.geocode.<a href="./src/resources/geocode.ts">forward</a>({ ...params }) -> GeocodeResult</code>
- <code title="get /api/v1/geocode/reverse">client.geocode.<a href="./src/resources/geocode.ts">reverse</a>({ ...params }) -> ReverseGeocodeResult</code>

# Search

Methods:

- <code title="get /api/v1/search">client.search.<a href="./src/resources/search.ts">query</a>({ ...params }) -> FeatureCollection</code>

# Routing

Types:

- <code><a href="./src/resources/routing.ts">MatrixRequest</a></code>
- <code><a href="./src/resources/routing.ts">MatrixResult</a></code>
- <code><a href="./src/resources/routing.ts">NearestResult</a></code>
- <code><a href="./src/resources/routing.ts">RouteRequest</a></code>
- <code><a href="./src/resources/routing.ts">RouteResult</a></code>

Methods:

- <code title="get /api/v1/isochrone">client.routing.<a href="./src/resources/routing.ts">isochrone</a>({ ...params }) -> GeoJsonFeature</code>
- <code title="post /api/v1/matrix">client.routing.<a href="./src/resources/routing.ts">matrix</a>({ ...params }) -> MatrixResult</code>
- <code title="get /api/v1/nearest">client.routing.<a href="./src/resources/routing.ts">nearest</a>({ ...params }) -> NearestResult</code>
- <code title="post /api/v1/route">client.routing.<a href="./src/resources/routing.ts">route</a>({ ...params }) -> RouteResult</code>

# Elevation

Types:

- <code><a href="./src/resources/elevation.ts">ElevationBatchResult</a></code>
- <code><a href="./src/resources/elevation.ts">ElevationLookupResult</a></code>
- <code><a href="./src/resources/elevation.ts">ElevationProfileRequest</a></code>
- <code><a href="./src/resources/elevation.ts">ElevationProfileResult</a></code>

Methods:

- <code title="post /api/v1/elevation/batch">client.elevation.<a href="./src/resources/elevation.ts">batch</a>({ ...params }) -> ElevationBatchResult</code>
- <code title="get /api/v1/elevation">client.elevation.<a href="./src/resources/elevation.ts">lookup</a>({ ...params }) -> ElevationLookupResult</code>
- <code title="post /api/v1/elevation/profile">client.elevation.<a href="./src/resources/elevation.ts">profile</a>({ ...params }) -> ElevationProfileResult</code>

# MapMatch

Types:

- <code><a href="./src/resources/map-match.ts">MapMatchRequest</a></code>
- <code><a href="./src/resources/map-match.ts">MapMatchResult</a></code>

Methods:

- <code title="post /api/v1/map-match">client.mapMatch.<a href="./src/resources/map-match.ts">match</a>({ ...params }) -> MapMatchResult</code>

# Optimize

Types:

- <code><a href="./src/resources/optimize.ts">OptimizeCompletedResult</a></code>
- <code><a href="./src/resources/optimize.ts">OptimizeJobStatus</a></code>
- <code><a href="./src/resources/optimize.ts">OptimizeProcessingResult</a></code>
- <code><a href="./src/resources/optimize.ts">OptimizeRequest</a></code>
- <code><a href="./src/resources/optimize.ts">OptimizeResult</a></code>

Methods:

- <code title="post /api/v1/optimize">client.optimize.<a href="./src/resources/optimize.ts">create</a>({ ...params }) -> OptimizeResult</code>
- <code title="get /api/v1/optimize/{job_id}">client.optimize.<a href="./src/resources/optimize.ts">retrieve</a>(jobID) -> OptimizeJobStatus</code>

# Query

Types:

- <code><a href="./src/resources/query.ts">OverpassQuery</a></code>
- <code><a href="./src/resources/query.ts">SparqlQuery</a></code>
- <code><a href="./src/resources/query.ts">SparqlResult</a></code>

Methods:

- <code title="post /api/v1/overpass">client.query.<a href="./src/resources/query.ts">overpass</a>({ ...params }) -> FeatureCollection</code>
- <code title="post /api/v1/sparql">client.query.<a href="./src/resources/query.ts">sparql</a>({ ...params }) -> SparqlResult</code>

# Tiles

Methods:

- <code title="get /api/v1/tiles/{z}/{x}/{y}">client.tiles.<a href="./src/resources/tiles.ts">get</a>(y, { ...params }) -> Response</code>

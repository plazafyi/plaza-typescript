# V1

Types:

- <code><a href="./src/resources/v1/v1.ts">V1CalculateDistanceMatrixResponse</a></code>
- <code><a href="./src/resources/v1/v1.ts">V1CalculateRouteResponse</a></code>
- <code><a href="./src/resources/v1/v1.ts">V1ExecuteSparqlResponse</a></code>
- <code><a href="./src/resources/v1/v1.ts">V1SnapToNearestResponse</a></code>

Methods:

- <code title="post /api/v1/matrix">client.v1.<a href="./src/resources/v1/v1.ts">calculateDistanceMatrix</a>({ ...params }) -> V1CalculateDistanceMatrixResponse</code>
- <code title="get /api/v1/isochrone">client.v1.<a href="./src/resources/v1/v1.ts">calculateIsochrone</a>({ ...params }) -> GeoJsonFeature</code>
- <code title="post /api/v1/route">client.v1.<a href="./src/resources/v1/v1.ts">calculateRoute</a>({ ...params }) -> V1CalculateRouteResponse</code>
- <code title="post /api/v1/overpass">client.v1.<a href="./src/resources/v1/v1.ts">executeOverpass</a>({ ...params }) -> FeatureCollection</code>
- <code title="get /api/v1/query">client.v1.<a href="./src/resources/v1/v1.ts">executeQuery</a>({ ...params }) -> FeatureCollection</code>
- <code title="post /api/v1/sparql">client.v1.<a href="./src/resources/v1/v1.ts">executeSparql</a>({ ...params }) -> V1ExecuteSparqlResponse</code>
- <code title="get /api/v1/nearby">client.v1.<a href="./src/resources/v1/v1.ts">findNearby</a>({ ...params }) -> FeatureCollection</code>
- <code title="get /api/v1/tiles/{z}/{x}/{y}">client.v1.<a href="./src/resources/v1/v1.ts">getTile</a>(y, { ...params }) -> Response</code>
- <code title="get /api/v1/reverse-geocode">client.v1.<a href="./src/resources/v1/v1.ts">reverseGeocode</a>({ ...params }) -> GeoJsonFeature</code>
- <code title="get /api/v1/search">client.v1.<a href="./src/resources/v1/v1.ts">searchFeatures</a>({ ...params }) -> FeatureCollection</code>
- <code title="get /api/v1/nearest">client.v1.<a href="./src/resources/v1/v1.ts">snapToNearest</a>({ ...params }) -> V1SnapToNearestResponse</code>

## Datasets

Types:

- <code><a href="./src/resources/v1/datasets.ts">DatasetResponse</a></code>
- <code><a href="./src/resources/v1/datasets.ts">FeatureCollection</a></code>
- <code><a href="./src/resources/v1/datasets.ts">DatasetListResponse</a></code>

Methods:

- <code title="post /api/v1/datasets">client.v1.datasets.<a href="./src/resources/v1/datasets.ts">create</a>({ ...params }) -> DatasetResponse</code>
- <code title="get /api/v1/datasets/{id}">client.v1.datasets.<a href="./src/resources/v1/datasets.ts">retrieve</a>(id) -> DatasetResponse</code>
- <code title="get /api/v1/datasets">client.v1.datasets.<a href="./src/resources/v1/datasets.ts">list</a>() -> DatasetListResponse</code>
- <code title="delete /api/v1/datasets/{id}">client.v1.datasets.<a href="./src/resources/v1/datasets.ts">delete</a>(id) -> void</code>
- <code title="get /api/v1/datasets/{id}/features">client.v1.datasets.<a href="./src/resources/v1/datasets.ts">queryFeatures</a>(id, { ...params }) -> FeatureCollection</code>

## Elements

Types:

- <code><a href="./src/resources/v1/elements.ts">GeoJsonFeature</a></code>
- <code><a href="./src/resources/v1/elements.ts">GeoJsonGeometry</a></code>

Methods:

- <code title="get /api/v1/elements/{type}/{id}">client.v1.elements.<a href="./src/resources/v1/elements.ts">retrieve</a>(id, { ...params }) -> GeoJsonFeature</code>
- <code title="post /api/v1/elements/batch">client.v1.elements.<a href="./src/resources/v1/elements.ts">fetchBatch</a>({ ...params }) -> FeatureCollection</code>
- <code title="get /api/v1/elements">client.v1.elements.<a href="./src/resources/v1/elements.ts">query</a>({ ...params }) -> FeatureCollection</code>

## Geocode

Types:

- <code><a href="./src/resources/v1/geocode.ts">GeocodeAutocompleteResponse</a></code>
- <code><a href="./src/resources/v1/geocode.ts">GeocodeForwardResponse</a></code>
- <code><a href="./src/resources/v1/geocode.ts">GeocodeReverseResponse</a></code>

Methods:

- <code title="get /api/v1/geocode/autocomplete">client.v1.geocode.<a href="./src/resources/v1/geocode.ts">autocomplete</a>({ ...params }) -> GeocodeAutocompleteResponse</code>
- <code title="get /api/v1/geocode">client.v1.geocode.<a href="./src/resources/v1/geocode.ts">forward</a>({ ...params }) -> GeocodeForwardResponse</code>
- <code title="get /api/v1/geocode/reverse">client.v1.geocode.<a href="./src/resources/v1/geocode.ts">reverse</a>({ ...params }) -> GeocodeReverseResponse</code>

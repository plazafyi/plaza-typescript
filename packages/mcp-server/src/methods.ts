// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.elements.retrieve',
    fullyQualifiedName: 'elements.retrieve',
    httpMethod: 'get',
    httpPath: '/api/v1/features/{type}/{id}',
  },
  {
    clientCallName: 'client.elements.batch',
    fullyQualifiedName: 'elements.batch',
    httpMethod: 'post',
    httpPath: '/api/v1/features/batch',
  },
  {
    clientCallName: 'client.elements.lookup',
    fullyQualifiedName: 'elements.lookup',
    httpMethod: 'post',
    httpPath: '/api/v1/features/lookup',
  },
  {
    clientCallName: 'client.elements.nearby',
    fullyQualifiedName: 'elements.nearby',
    httpMethod: 'get',
    httpPath: '/api/v1/features/nearby',
  },
  {
    clientCallName: 'client.elements.nearbyPost',
    fullyQualifiedName: 'elements.nearbyPost',
    httpMethod: 'post',
    httpPath: '/api/v1/features/nearby',
  },
  {
    clientCallName: 'client.elements.query',
    fullyQualifiedName: 'elements.query',
    httpMethod: 'get',
    httpPath: '/api/v1/features',
  },
  {
    clientCallName: 'client.elements.queryPost',
    fullyQualifiedName: 'elements.queryPost',
    httpMethod: 'post',
    httpPath: '/api/v1/features',
  },
  {
    clientCallName: 'client.datasets.create',
    fullyQualifiedName: 'datasets.create',
    httpMethod: 'post',
    httpPath: '/api/v1/datasets',
  },
  {
    clientCallName: 'client.datasets.retrieve',
    fullyQualifiedName: 'datasets.retrieve',
    httpMethod: 'get',
    httpPath: '/api/v1/datasets/{id}',
  },
  {
    clientCallName: 'client.datasets.list',
    fullyQualifiedName: 'datasets.list',
    httpMethod: 'get',
    httpPath: '/api/v1/datasets',
  },
  {
    clientCallName: 'client.datasets.delete',
    fullyQualifiedName: 'datasets.delete',
    httpMethod: 'delete',
    httpPath: '/api/v1/datasets/{id}',
  },
  {
    clientCallName: 'client.datasets.features',
    fullyQualifiedName: 'datasets.features',
    httpMethod: 'get',
    httpPath: '/api/v1/datasets/{id}/features',
  },
  {
    clientCallName: 'client.geocode.autocomplete',
    fullyQualifiedName: 'geocode.autocomplete',
    httpMethod: 'get',
    httpPath: '/api/v1/geocode/autocomplete',
  },
  {
    clientCallName: 'client.geocode.autocompletePost',
    fullyQualifiedName: 'geocode.autocompletePost',
    httpMethod: 'post',
    httpPath: '/api/v1/geocode/autocomplete',
  },
  {
    clientCallName: 'client.geocode.batch',
    fullyQualifiedName: 'geocode.batch',
    httpMethod: 'post',
    httpPath: '/api/v1/geocode/batch',
  },
  {
    clientCallName: 'client.geocode.forward',
    fullyQualifiedName: 'geocode.forward',
    httpMethod: 'get',
    httpPath: '/api/v1/geocode',
  },
  {
    clientCallName: 'client.geocode.forwardPost',
    fullyQualifiedName: 'geocode.forwardPost',
    httpMethod: 'post',
    httpPath: '/api/v1/geocode',
  },
  {
    clientCallName: 'client.geocode.reverse',
    fullyQualifiedName: 'geocode.reverse',
    httpMethod: 'get',
    httpPath: '/api/v1/geocode/reverse',
  },
  {
    clientCallName: 'client.geocode.reversePost',
    fullyQualifiedName: 'geocode.reversePost',
    httpMethod: 'post',
    httpPath: '/api/v1/geocode/reverse',
  },
  {
    clientCallName: 'client.search.query',
    fullyQualifiedName: 'search.query',
    httpMethod: 'get',
    httpPath: '/api/v1/search',
  },
  {
    clientCallName: 'client.search.queryPost',
    fullyQualifiedName: 'search.queryPost',
    httpMethod: 'post',
    httpPath: '/api/v1/search',
  },
  {
    clientCallName: 'client.routing.isochrone',
    fullyQualifiedName: 'routing.isochrone',
    httpMethod: 'get',
    httpPath: '/api/v1/isochrone',
  },
  {
    clientCallName: 'client.routing.isochronePost',
    fullyQualifiedName: 'routing.isochronePost',
    httpMethod: 'post',
    httpPath: '/api/v1/isochrone',
  },
  {
    clientCallName: 'client.routing.matrix',
    fullyQualifiedName: 'routing.matrix',
    httpMethod: 'post',
    httpPath: '/api/v1/matrix',
  },
  {
    clientCallName: 'client.routing.nearest',
    fullyQualifiedName: 'routing.nearest',
    httpMethod: 'get',
    httpPath: '/api/v1/nearest',
  },
  {
    clientCallName: 'client.routing.nearestPost',
    fullyQualifiedName: 'routing.nearestPost',
    httpMethod: 'post',
    httpPath: '/api/v1/nearest',
  },
  {
    clientCallName: 'client.routing.route',
    fullyQualifiedName: 'routing.route',
    httpMethod: 'post',
    httpPath: '/api/v1/route',
  },
  {
    clientCallName: 'client.elevation.batch',
    fullyQualifiedName: 'elevation.batch',
    httpMethod: 'post',
    httpPath: '/api/v1/elevation/batch',
  },
  {
    clientCallName: 'client.elevation.lookup',
    fullyQualifiedName: 'elevation.lookup',
    httpMethod: 'get',
    httpPath: '/api/v1/elevation',
  },
  {
    clientCallName: 'client.elevation.lookupPost',
    fullyQualifiedName: 'elevation.lookupPost',
    httpMethod: 'post',
    httpPath: '/api/v1/elevation',
  },
  {
    clientCallName: 'client.elevation.profile',
    fullyQualifiedName: 'elevation.profile',
    httpMethod: 'post',
    httpPath: '/api/v1/elevation/profile',
  },
  {
    clientCallName: 'client.mapMatch.match',
    fullyQualifiedName: 'mapMatch.match',
    httpMethod: 'post',
    httpPath: '/api/v1/map-match',
  },
  {
    clientCallName: 'client.optimize.create',
    fullyQualifiedName: 'optimize.create',
    httpMethod: 'post',
    httpPath: '/api/v1/optimize',
  },
  {
    clientCallName: 'client.optimize.retrieve',
    fullyQualifiedName: 'optimize.retrieve',
    httpMethod: 'get',
    httpPath: '/api/v1/optimize/{job_id}',
  },
  {
    clientCallName: 'client.query.execute',
    fullyQualifiedName: 'query.execute',
    httpMethod: 'post',
    httpPath: '/api/v1/query',
  },
  {
    clientCallName: 'client.query.overpass',
    fullyQualifiedName: 'query.overpass',
    httpMethod: 'post',
    httpPath: '/api/v1/overpass',
  },
  {
    clientCallName: 'client.query.sparql',
    fullyQualifiedName: 'query.sparql',
    httpMethod: 'post',
    httpPath: '/api/v1/sparql',
  },
  {
    clientCallName: 'client.tiles.get',
    fullyQualifiedName: 'tiles.get',
    httpMethod: 'get',
    httpPath: '/api/v1/tiles/{z}/{x}/{y}',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}

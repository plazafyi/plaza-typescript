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
    clientCallName: 'client.v1.calculateDistanceMatrix',
    fullyQualifiedName: 'v1.calculateDistanceMatrix',
    httpMethod: 'post',
    httpPath: '/api/v1/matrix',
  },
  {
    clientCallName: 'client.v1.calculateIsochrone',
    fullyQualifiedName: 'v1.calculateIsochrone',
    httpMethod: 'get',
    httpPath: '/api/v1/isochrone',
  },
  {
    clientCallName: 'client.v1.calculateRoute',
    fullyQualifiedName: 'v1.calculateRoute',
    httpMethod: 'post',
    httpPath: '/api/v1/route',
  },
  {
    clientCallName: 'client.v1.executeOverpass',
    fullyQualifiedName: 'v1.executeOverpass',
    httpMethod: 'post',
    httpPath: '/api/v1/overpass',
  },
  {
    clientCallName: 'client.v1.executeQuery',
    fullyQualifiedName: 'v1.executeQuery',
    httpMethod: 'get',
    httpPath: '/api/v1/query',
  },
  {
    clientCallName: 'client.v1.executeSparql',
    fullyQualifiedName: 'v1.executeSparql',
    httpMethod: 'post',
    httpPath: '/api/v1/sparql',
  },
  {
    clientCallName: 'client.v1.findNearby',
    fullyQualifiedName: 'v1.findNearby',
    httpMethod: 'get',
    httpPath: '/api/v1/nearby',
  },
  {
    clientCallName: 'client.v1.getTile',
    fullyQualifiedName: 'v1.getTile',
    httpMethod: 'get',
    httpPath: '/api/v1/tiles/{z}/{x}/{y}',
  },
  {
    clientCallName: 'client.v1.reverseGeocode',
    fullyQualifiedName: 'v1.reverseGeocode',
    httpMethod: 'get',
    httpPath: '/api/v1/reverse-geocode',
  },
  {
    clientCallName: 'client.v1.searchFeatures',
    fullyQualifiedName: 'v1.searchFeatures',
    httpMethod: 'get',
    httpPath: '/api/v1/search',
  },
  {
    clientCallName: 'client.v1.snapToNearest',
    fullyQualifiedName: 'v1.snapToNearest',
    httpMethod: 'get',
    httpPath: '/api/v1/nearest',
  },
  {
    clientCallName: 'client.v1.datasets.create',
    fullyQualifiedName: 'v1.datasets.create',
    httpMethod: 'post',
    httpPath: '/api/v1/datasets',
  },
  {
    clientCallName: 'client.v1.datasets.retrieve',
    fullyQualifiedName: 'v1.datasets.retrieve',
    httpMethod: 'get',
    httpPath: '/api/v1/datasets/{id}',
  },
  {
    clientCallName: 'client.v1.datasets.list',
    fullyQualifiedName: 'v1.datasets.list',
    httpMethod: 'get',
    httpPath: '/api/v1/datasets',
  },
  {
    clientCallName: 'client.v1.datasets.delete',
    fullyQualifiedName: 'v1.datasets.delete',
    httpMethod: 'delete',
    httpPath: '/api/v1/datasets/{id}',
  },
  {
    clientCallName: 'client.v1.datasets.queryFeatures',
    fullyQualifiedName: 'v1.datasets.queryFeatures',
    httpMethod: 'get',
    httpPath: '/api/v1/datasets/{id}/features',
  },
  {
    clientCallName: 'client.v1.elements.retrieve',
    fullyQualifiedName: 'v1.elements.retrieve',
    httpMethod: 'get',
    httpPath: '/api/v1/elements/{type}/{id}',
  },
  {
    clientCallName: 'client.v1.elements.fetchBatch',
    fullyQualifiedName: 'v1.elements.fetchBatch',
    httpMethod: 'post',
    httpPath: '/api/v1/elements/batch',
  },
  {
    clientCallName: 'client.v1.elements.query',
    fullyQualifiedName: 'v1.elements.query',
    httpMethod: 'get',
    httpPath: '/api/v1/elements',
  },
  {
    clientCallName: 'client.v1.geocode.autocomplete',
    fullyQualifiedName: 'v1.geocode.autocomplete',
    httpMethod: 'get',
    httpPath: '/api/v1/geocode/autocomplete',
  },
  {
    clientCallName: 'client.v1.geocode.forward',
    fullyQualifiedName: 'v1.geocode.forward',
    httpMethod: 'get',
    httpPath: '/api/v1/geocode',
  },
  {
    clientCallName: 'client.v1.geocode.reverse',
    fullyQualifiedName: 'v1.geocode.reverse',
    httpMethod: 'get',
    httpPath: '/api/v1/geocode/reverse',
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

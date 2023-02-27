import { QueryClient } from 'react-query';
import { AnyOBJ } from './types';

export const getClient = (() => {
  let client: QueryClient | null = null;

  return () => {
    if (!client)
      client = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            cacheTime: Infinity,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      });

    return client;
  };
})();

const BASE_URL = 'https://api.coingecko.com/api/v3/simple/price';

export const fetcher = async ({
  method,
  path,
  body,
  params,
}: {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path?: string;
  body?: AnyOBJ;
  params?: AnyOBJ;
}) => {
  let url = `${BASE_URL}`;

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
    },
  };

  if (path) url += path;

  if (params) {
    const searchParams = new URLSearchParams(params);
    url += '?' + searchParams.toString();
  }

  if (body) options.body = JSON.stringify(body);

  try {
    const res = await fetch(url, options);
    const json = await res.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const QueryKeys = {
  TOKEN_USD: 'TOKEN_USD',
};

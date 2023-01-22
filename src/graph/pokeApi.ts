import axios from "axios";

export const pokeGraphQL = async (
  operationsDoc: string,
  operationName: string,
  variables?: Record<string, any>,
  orderBy?: Record<string, any>
) => {
  return fetch('https://api.tiopanda.dev/v1/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query: operationsDoc,
      variables: { ...variables, ...orderBy },
      operationName,
    }),
  }).then(result => result.json());
}
import axios from "axios";

export const pokeGraphQL = async (
  operationsDoc: string,
  operationName: string,
  variables?: Record<string, any>
) => {
  return fetch('https://apipkm.codea.plus/v1/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query: operationsDoc,
      variables,
      operationName,
    }),
  }).then(result => result.json());
}
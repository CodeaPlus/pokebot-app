import { pokeGraphQL } from "./pokeApi";
import { operationPokemon } from './graph-queries';
import { Pokemon } from "@/domain/pokemon.interface";

export interface RequestError {
  response: {
    status: number;
  },
  title: string,
  message: string
}

const getError = ({ title, message, response }: RequestError): RequestError => ({ title, message, response })

const getPokemon = async (id: number): Promise<Pokemon> => {
  try {
    const { data } = await pokeGraphQL(
      operationPokemon,
      'MyQuery',
      {
        "where": { "id": { "_eq": id } }
      }
    )

    data.pokemon[0].sprites = [{
      frontDefault: data.pokemon[0].sprites[0].front_default,
      frontShiny: data.pokemon[0].sprites[0].front_shiny
    }];

    return data.pokemon[0];
  } catch (error) {
    throw getError(error as RequestError)
  }
}

export const GeneralEndpoints = {
  getPokemon
}

import { pokeGraphQL } from "./pokeApi";
import { operationPokemon } from './graph-queries';
import { Pokemon } from "@/domain/pokemon.interface";
import nodeHtmlToImage from 'node-html-to-image';

export interface RequestError {
  response: {
    status: number;
  },
  title: string,
  message: string
}

const getError = ({ title, message, response }: RequestError): RequestError => ({ title, message, response })

const getPokemon = async (name: string): Promise<Pokemon> => {
  try {
    const { data } = await pokeGraphQL(
      operationPokemon,
      'MyQuery',
      {
        "where": {
          "pokemon": { "name": { "_eq": name } }
        }
      }
    )

    data.pokemon[0].pokemon.sprites = [{
      frontDefault: data.pokemon[0].pokemon.sprites[0].front_default,
      frontShiny: data.pokemon[0].pokemon.sprites[0].front_shiny
    }];

    return data.pokemon[0].pokemon;
  } catch (error) {
    throw getError(error as RequestError)
  }
}

export const GeneralEndpoints = {
  getPokemon
}

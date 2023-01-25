import { pokeGraphQL } from "./pokeApi";
import { operationPokemon, getPokeUserCard, operationPokemonRandom, operationPokemonDaily } from './graph-queries';
import { PokeUserCard, Pokemon } from "@/domain/pokemon.interface";

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
      'PokebotQuery',
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

const getDailyPokemon = async (day: number, month: number): Promise<Pokemon> => {
  try {
    const { data } = await pokeGraphQL(
      operationPokemonDaily,
      'PokebotQuery',
      {
        "where": {
          "day": { "_eq": day },
          "month": { "_eq": month },
        }
      }
    )

    // TODO: @Panda.dev - Improve this logic in backend
    data.daily[0].sprites = [{
      frontDefault: data.daily[0].sprites[0].front_default,
      frontShiny: data.daily[0].sprites[0].front_shiny
    }];

    return data.daily[0];
  } catch (error) {
    throw getError(error as RequestError)
  }
}

const getRandomPokemon = async (): Promise<Pokemon> => {
  try {
    const { data } = await pokeGraphQL(
      operationPokemonRandom,
      'PokebotQuery'
    )

    // TODO: @Panda.dev - Improve this logic in backend
    data.randomPokemon[0].sprites = [{
      frontDefault: data.randomPokemon[0].sprites[0].front_default,
      frontShiny: data.randomPokemon[0].sprites[0].front_shiny
    }];

    return data.randomPokemon[0];
  } catch (error) {
    throw getError(error as RequestError)
  }
}

const getUserCards = async (limit: number): Promise<PokeUserCard[]> => {
  try {
    const { data } = await pokeGraphQL(
      getPokeUserCard,
      'PokeGet',
      {
        "limit": limit,
        "order_by": { attachmentId: "desc" }
      }
    )

    return data.userCards;
  } catch (error) {
    throw getError(error as RequestError)
  }
}

const getUserCard = async (attachmentId: string): Promise<PokeUserCard> => {
  try {
    const { data } = await pokeGraphQL(
      getPokeUserCard,
      'PokeGet',
      {
        "where": {
          "attachmentId": { "_eq": attachmentId }
        }
      }
    )

    return data.userCards[0];
  } catch (error) {
    throw getError(error as RequestError)
  }
}

export const GeneralEndpoints = {
  getPokemon,
  getDailyPokemon,
  getRandomPokemon,
  getUserCards,
  getUserCard
}

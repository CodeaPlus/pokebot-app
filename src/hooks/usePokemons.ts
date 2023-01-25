import { GeneralEndpoints } from "@/graph/general.endpoints"
import { useQuery } from "@tanstack/react-query"

export interface LatestCards {
  limit: number
}

export interface DailyPokemon {
  day: number,
  month: number
}

export const usePokemonRandom = () => {
  const randomQuery = useQuery(
    ['pokemon-random'],
    GeneralEndpoints.getRandomPokemon,
    {
      staleTime: 1000 * 60
    }
  )

  return randomQuery
}

export const usePokemonLatestCards = ({ limit }: LatestCards) => {
  const randomQuery = useQuery(
    ['pokemon-latest-cards'],
    () => GeneralEndpoints.getUserCards(limit),
    {
      staleTime: 1000 * 60
    }
  )

  return randomQuery
}

export const usePokemonDaily = ({ day, month }: DailyPokemon) => {
  const dailyQuery = useQuery(
    ['pokemon-daily'],
    () => GeneralEndpoints.getDailyPokemon(day, month),
    {
      staleTime: 1000 * 60 * 60
    }
  )

  return dailyQuery
}
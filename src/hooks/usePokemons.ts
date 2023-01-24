import { GeneralEndpoints } from "@/graph/general.endpoints"
import { useQuery } from "@tanstack/react-query"

export const usePokemonRandom = () => {
  const randomQuery = useQuery(
    ['pokemon-random'],
    GeneralEndpoints.getRandomPokemon,
    {
      staleTime: 1000 * 60 * 60
    }
  )

  return randomQuery
}
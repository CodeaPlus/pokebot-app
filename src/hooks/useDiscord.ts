import { DiscordEndpoints } from "@/graph/discord.endpoints"
import { useQuery } from "@tanstack/react-query"

export const useDiscordServers = () => {
  const query = useQuery(
    ['discord-servers'],
    DiscordEndpoints.getServers,
    {
      staleTime: 1000 * 60 * 60
    }
  )

  return query
}
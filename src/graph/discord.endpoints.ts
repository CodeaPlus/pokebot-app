import { DiscordServer } from '@/domain/discord.interface';
import { RequestError } from '@/graph/general.endpoints';

export const getError = ({ title, message, response }: RequestError): RequestError => ({ title, message, response })

const getServers = async (): Promise<DiscordServer[]> => {
  try {
    const response = await fetch("api/servers");

    const data = await response.json();

    return data;
  } catch (error) {
    throw getError(error as RequestError)
  }
}

export const DiscordEndpoints = {
  getServers
}

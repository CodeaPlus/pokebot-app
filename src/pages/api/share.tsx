// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GeneralEndpoints } from '@/graph/general.endpoints';
import { getPokemonImage } from '@/helpers/pokemon.helpers';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { query } = req;

  const pokemon = await GeneralEndpoints.getPokemon(query.name as string || '');

  const { image, pokemonName } = await getPokemonImage(
    query.day as string || '',
    query.month as string || '',
    query.username as string || '',
    query.avatarUrl as string || '',
    query.lenguage as string || '',
    pokemon
  )

  res.writeHead(200, { 'Content-Type': 'image/png' });
  res.end(image, 'binary');
}

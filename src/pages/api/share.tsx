/* eslint-disable @next/next/no-img-element */
import { GeneralEndpoints } from '@/graph/general.endpoints';
import { NextRequest } from 'next/server';
import { ImageResponse } from '@vercel/og';
import Image from 'next/image'
import { getColor, getFlavorText, getHeight, getShinyChance, getTypes, getWeight } from '@/utils/pokemon.utils';
import { getPattern } from '../../utils/pokemon.utils';
import chroma from 'chroma-js';

export const config = {
  runtime: 'experimental-edge',
};

// Make sure the font exists in the specified path:
const fontRegular = fetch(new URL('../../assets/fonts/Roboto-Regular.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

const fontMedium = fetch(new URL('../../assets/fonts/Roboto-Medium.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

const fontBold = fetch(new URL('../../assets/fonts/Roboto-Bold.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

export default async function handler(
  req: NextRequest
) {
  try {
    const robotoRegular = await fontRegular;
    const robotoMedium = await fontMedium;
    const robotoBold = await fontBold;

    const { searchParams } = new URL(req.url);
    const pokemonId = searchParams.get('id') || '0';

    const pokemon = await GeneralEndpoints.getPokemon(+pokemonId);

    const imageSource = getShinyChance(pokemon)
    const pattern = getPattern(searchParams.get('type') || 'normal')
    const height = getHeight(pokemon);
    const weight = getWeight(pokemon);
    const types = getTypes(pokemon);
    const flavor = getFlavorText(pokemon, searchParams.get('lenguage') || 'en');
    const opaqueColor = chroma(getColor(searchParams.get('type') || 'normal')).alpha(.75).css();

    return new ImageResponse(
      (
        <div
          style={{
            height: '768px',
            width: '1080px',
            display: 'flex',
            fontFamily: '"Roboto"',
            flexDirection: 'column',
            fontWeight: 400,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            position: 'relative',
          }}
        >
          <div
            style={{
              backgroundImage: `url(${pattern})`,
              backgroundSize: '200px 200px',
            }}
            tw="inset-0 absolute z-10"
          ></div>
          <div tw="rounded-2xl bg-black/60 p-8 text-white text-xl flex flex-col leading-none left-8 absolute text-left font-medium top-20 w-[30rem] z-20">
            <div tw="font-black text-[3.5rem] uppercase w-[80%] mb-4">{pokemon.name}</div>

            <div tw="flex flex-col">
              <div tw="flex mb-2">
                <strong tw="mr-2 font-bold">Type:</strong> {types}
              </div>
              <div tw="flex mb-2">
                <strong tw="mr-2 font-bold">Height:</strong> {height} m
              </div>
              <div tw="flex mb-2">
                <strong tw="mr-2 font-bold">Weight:</strong> {weight} kg
              </div>

              <p tw="leading-tight w-[calc(100%-4rem)]">{flavor}</p>
            </div>
          </div>
          <div style={{ backgroundColor: opaqueColor }} tw="flex text-[3rem] items-center text-white p-8 absolute text-left font-black bottom-8 left-0 w-full uppercase z-20">
            <img tw="rounded-full mr-4" src={searchParams.get('avatarUrl') || ''} alt={searchParams.get('username') || ''} width="120" height="120" />
            <div tw="flex flex-col">
              <div tw="flex text-[2.5rem]">{searchParams.get('username') || ''}</div>
              <div tw="flex text-[4rem]">{searchParams.get('day') || ''} {searchParams.get('month') || ''}</div>
            </div>
          </div>
          <img tw="absolute h-[80%] right-0 z-30 top-0" src={imageSource} alt={pokemon.name} />
        </div>
      ),
      {
        width: 1080,
        height: 768,
        fonts: [
          {
            name: 'Roboto',
            data: robotoRegular,
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Roboto',
            data: robotoMedium,
            weight: 500,
            style: 'normal',
          },
          {
            name: 'Roboto',
            data: robotoBold,
            weight: 700,
            style: 'normal',
          },
        ],
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

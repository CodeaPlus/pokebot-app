/* eslint-disable @next/next/no-img-element */
import { NextRequest } from 'next/server';
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'experimental-edge',
};

export default async function handler(
  req: NextRequest
) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id') || '0';
    const user = searchParams.get('user') || '0';
    const name = searchParams.get('name') || '0';

    return new ImageResponse(
      (
        <div
          style={{
            height: '768px',
            width: '1471px',
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
          <img tw="absolute inset-0" src={`https://cdn.discordapp.com/attachments/${id}/${user}/${name}.png`} alt="Pokemon" />
        </div>
      ),
      {
        width: 1471,
        height: 768
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

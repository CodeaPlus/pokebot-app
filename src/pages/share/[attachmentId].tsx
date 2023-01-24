import { FC } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { GeneralEndpoints } from '@/graph/general.endpoints'
import { RequestError } from '../../graph/general.endpoints';

interface Props {
  data: {
    attachmentId: string,
    avatarUrl: string,
    day: number,
    discordUserId: string,
    image: string,
    month: number,
    pokemonId: string,
    type: string,
    username: string,
    id: number,
  }
}

const Page: FC<Props> = ({ data }) => {
  const { image, day, month, username, avatarUrl, id, type } = data;

  return (
    <>
      <Head>
        <title>{username} Pokmon Card - Pokebot+</title>
        <meta name="description" content="This card was generated on Pokebot+ from discord." />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Share your card on Twitter - Pokebot+" />
        <meta property="twitter:description" content="This card was generated on Pokebot+ from discord." />
        <meta property="twitter:image" content={`https://pokebot.by.ddumst.dev/api/share?image=${image}`} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Share your card on Twitter - Pokebot+" />
        <meta property="og:description" content="This card was generated on Pokebot+ from discord." />
        <meta name="og:image" content={`https://pokebot.by.ddumst.dev/api/share?image=${image}`} />

      </Head>

      <Image src={image} alt="Shared Image - Pokebot+" width={894} height={636} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { attachmentId } = context.query;

  let isError = false;
  let response = null;

  try {
    response = await GeneralEndpoints.getUserCard(attachmentId as string || '0');
  } catch (error) {
    isError = true
    context.res.statusCode = (error as RequestError).response?.status;
  }

  return {
    props: {
      data: response
    },
  }
}

export default Page

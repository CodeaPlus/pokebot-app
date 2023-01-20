import { FC } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'

interface Props {
  data: {
    imageUrl: string
  }
}

const Page: FC<Props> = ({ data }) => {
  const { imageUrl } = data;

  return (
    <>
      <Head>
        <title>Share your card on Twitter - Pokebot+</title>
        <meta name="description" content="This card was generated on Pokebot+ from discord." />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Share your card on Twitter - Pokebot+" />
        <meta property="twitter:description" content="This card was generated on Pokebot+ from discord." />
        <meta property="twitter:image" content={`https://api.axieverse.club/v1/cards/v3/back/anemone/image`} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Share your card on Twitter - Pokebot+" />
        <meta property="og:description" content="This card was generated on Pokebot+ from discord." />
        <meta name="og:image" content={`https://api.axieverse.club/v1/cards/v3/back/anemone/image`} />

      </Head>

      <Image src={`https://cdn.discordapp.com/attachments/${imageUrl}.png`} alt="Shared Image - Pokebot+" width={894} height={636} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { imageUrl } = context.query;

  return {
    props: {
      data: {
        imageUrl: (imageUrl as Array<string>).join('/')
      }
    },
  }
}

export default Page

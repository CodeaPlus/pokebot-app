import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Page: React.FC = () => {
  const router = useRouter()
  const { imageUrl } = router.query;

  const [image, setImage] = useState<string>()

  useEffect(() => {
    if (imageUrl) {
      setImage((imageUrl as Array<string>).join('/'));
    }
  }, [imageUrl])

  return (
    <>
      <Head>
        <title>Share your card on Twitter - Pokebot+</title>
        <meta name="description" content="This card was generated on Pokebot+ from discord." />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Share your card on Twitter - Pokebot+" />
        <meta property="twitter:description" content="This card was generated on Pokebot+ from discord." />
        <meta property="twitter:image" content="https://raw.githubusercontent.com/The-Juice-Team/assets/main/thejuiceteam-banner.png" />

        {/* Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Share your card on Twitter - Pokebot+" />
        <meta property="og:description" content="This card was generated on Pokebot+ from discord." />
        <meta name="og:image" content="https://raw.githubusercontent.com/The-Juice-Team/assets/main/thejuiceteam-banner.png" />

      </Head>

      {image && (
        <>

          <Image src={`https://cdn.discordapp.com/attachments/${image}.png`} alt="Shared Image - Pokebot+" width={894} height={636} />
        </>
      )}
    </>
  )
}

export default Page

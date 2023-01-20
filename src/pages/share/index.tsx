import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Page: React.FC = () => {
  const router = useRouter()
  const { image } = router.query

  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={image as string} />
      </Head>

      <Image src={image as string} alt="Shared Image - Pokebot+" width={894} height={636} />
    </>
  )
}

export default Page

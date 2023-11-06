
import HeroSection from '@/organisms/HeroSection'
import Head from 'next/head'
import Image from 'next/image'


export default function Home() {
  return (
    <>
      <Head>
        <title>Comwell - THE nr 1 hotel chain, hotels icon</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <HeroSection />
      </main>
    </>
  )
}

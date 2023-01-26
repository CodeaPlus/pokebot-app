import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

const NotFound: NextPage = () => {
  return (
    <>
      <Head>
        <title>404 - Pokebot+</title>
        <meta name="description" content="Generate, Collect and Trade random Pokemon cards on your favorite Discord server." />
        <meta name="keywords" content="Generate, Collect, Trade, Pokemon, Discord, ddumst.dev, panda.dev" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full h-screen bg-red-700 flex flex-col items-center justify-center gap-4">
        <div className="relative w-full">
          <h1 className="font-extrabold text-[14rem] md:text-[30rem] leading-none opacity-50 absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 z-1">404</h1>
          <Image className="relative mx-auto z-10 w-[150px] md:w-[250px]" src="/images/rocket-team-404.png" alt="Rocket Team" width={253} height={493} />
        </div>

        <h4 className="font-bold text-2xl leading-none text-stone-800 text-center">
          <span className="text-white">The Rocket Team</span> has won this time!
        </h4>

        <Link href="/" className="relative inline-block text-lg group">
          <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
            <span className="relative">Return home</span>
          </span>
          <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
        </Link>
      </div>
    </>
  );
};

export default NotFound;

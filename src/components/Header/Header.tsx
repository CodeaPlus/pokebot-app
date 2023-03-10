import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import IconHamburger from "../icons/IconHamburger";
import classNames from 'classnames';

interface Props {
  backgroundColorMobile: string
}

const Header: FC<Props> = ({ backgroundColorMobile }) => {
  const router = useRouter()
  const [splitLocation, setLocation] = useState<string[]>(router.asPath.split("/"));
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const closeNav = () => setShowMobileMenu(false)

  useEffect(() => {
    setLocation(router.asPath.split("/"));
  }, [router])

  return (
    <>
      <header className="hidden lg:flex fixed bg-[#010101]/60 backdrop-blur-sm justify-center border-b-[1px] border-[#595959]/50 z-[999] w-full left-0 top-0">
        <div className="container">
          <div className="flex items-center py-2">
            <div className="logo">
              <Link href="/" className="flex gap-2 text-white font-extrabold items-center">
                <Image src="/images/pokebot.png" alt="Juice Team" width={35} height={54} />
                <span>POKEBOT+</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex justify-between px-8 py-3 lg:hidden z-[9999] fixed bg-[#010101]/60 w-full left-0 top-0">
        <div className="w-8">
          <Link href="/" className="flex gap-2 text-white font-extrabold items-center">
            <Image src="/images/pokebot.png" alt="Juice Team" width={35} height={54} />
            <span>POKEBOT+</span>
          </Link>
        </div>
        <span className="flex items-center" onClick={() => setShowMobileMenu(true)}>
          <IconHamburger style={{ color: "#FFFFFF" }} />
        </span>
        <div
          className={classNames(
            "flex flex-col items-center fixed justify-center overflow-hidden z-[999] w-full h-0 top-0 bottom-0 left-0 right-0 transition-all duration-[0.5s]",
            {
              "!h-full": showMobileMenu
            }
          )}
          style={{ backgroundColor: backgroundColorMobile }}
        >
          <span className="absolute top-5 right-7 text-4xl text-white" onClick={closeNav}>&times;</span>
          <div className="flex flex-col items-center gap-8 h-screen py-8">
            <Link href="/" className="flex gap-2 text-white font-extrabold items-center" onClick={closeNav}>
              <Image src="/images/pokebot.png" alt="Juice Team" width={35} height={54} />
              <span>POKEBOT+</span>
            </Link>
            <ul className="flex flex-col items-center gap-4">

            </ul>
            <Link
              className={`text-white font-extrabold text-sm mt-auto p-4 rounded-md bg-black/40 uppercase`}
              href="https://discord.com/api/oauth2/authorize?client_id=1063588337895616622&permissions=8&scope=bot" target={"_blank"}
            >
              Install in your server
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

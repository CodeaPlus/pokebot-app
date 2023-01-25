import React from 'react'
import Image from 'next/image'
import { DiscordServer } from '@/domain/discord.interface';
import { MotionContainer } from '@/components/Motion';

interface Props {
  servers: DiscordServer[];
}

const ServersList: React.FC<Props> = ({ servers }) => {
  return (
    <div className="container mx-auto my-16 overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-4">
        <MotionContainer
          className="text-black font-extrabold text-5xl mt-8 text-center mb-0 md:mb-8"
          tag="h1"
          animation="fadeIn"
          delay={0.2}
        >
          WHO USE POKEBOT+?
        </MotionContainer>
        <MotionContainer
          className="text-black font-extrabold text-xl my-4 text-center"
          tag="h1"
          animation="fadeIn"
          delay={0.2}
        >
          DISCORD SERVERS
        </MotionContainer>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {servers.map(server => (
            <div className="bg-white rounded-lg overflow-hidden" key={server.id}>
              <Image
                src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`}
                alt={server.name}
                width={64}
                height={64}
                className="rounded-lg w-full"
              />
              <div className="px-6 py-4">
                <h2 className="font-medium text-lg mb-2">{server.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServersList

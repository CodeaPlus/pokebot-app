import { FC } from 'react'
import Image from 'next/image'
import { MotionContainer } from '@/components/Motion'

import { Pokemon } from '@/domain/pokemon.interface'
import styles from '@/styles/Home.module.css';
import { getPattern, getTypes, getHeight, getWeight, getFlavorText, getColor } from '@/utils/pokemon.utils';
import chroma from 'chroma-js';
import moment from 'moment';

interface Props {
  dailyPokemon: Pokemon
}

const HomeDailyPokemon: FC<Props> = ({ dailyPokemon }) => {
  const currentDate = moment().format('MMMM DD');

  return (
    <div className="relative overflow-hidden pt-[80px] pb-[160px]" style={{ backgroundColor: dailyPokemon.types[0].color, backgroundImage: `url(${getPattern(dailyPokemon.types[0].name)})` }}>
      <div className={styles["divider-daily-pokemon-top"]}>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className={styles["shape-fill"]}></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className={styles["shape-fill"]}></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className={styles["shape-fill"]}></path>
        </svg>
      </div>

      <div className="container mx-auto mb-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <MotionContainer
            className="text-white font-extrabold text-5xl my-8 text-center"
            tag="h1"
            animation="fadeIn"
            delay={0.2}
          >
            DAILY POKEMON
          </MotionContainer>

          <div className="flex items-center flex-col-reverse md:flex-row justify-center gap-8 md:gap-4">
            <MotionContainer
              className="rounded-2xl bg-black/60 p-8 text-white text-xl flex flex-col leading-none text-left font-medium w-[90%] md:w-[30rem] z-20"
              animation={'fadeRight'}
            >
              <div className="font-black text-4xl md:text-[3.5rem] uppercase w-[80%] mb-4">{dailyPokemon.name}</div>

              <div className="flex flex-col">
                <div className="flex mb-2">
                  <strong className="mr-2 font-bold">Type:</strong> {getTypes(dailyPokemon)}
                </div>
                <div className="flex mb-2">
                  <strong className="mr-2 font-bold">Height:</strong> {getHeight(dailyPokemon)} m
                </div>
                <div className="flex mb-8">
                  <strong className="mr-2 font-bold">Weight:</strong> {getWeight(dailyPokemon)} kg
                </div>

                <p className="leading-tight w-full md:w-[calc(100%-4rem)]">{getFlavorText(dailyPokemon, 'en')}</p>
              </div>
            </MotionContainer>

            <MotionContainer
              className="flex flex-col items-center justify-center gap-4"
              animation={'fadeLeft'}
            >
              <Image src={dailyPokemon.sprites[0].frontDefault} alt="Pokemon Card" width={500} height={500} />
            </MotionContainer>

          </div>
        </div>
      </div>

      <div
        style={{ backgroundColor: chroma(getColor(dailyPokemon.types[0].name || 'normal')).darken(.40).css() }}
        className="flex text-[2rem] items-center justify-center text-white p-8 text-center font-black w-full uppercase z-20"
      >
        Happy Birthday to all trainers born on {currentDate}!
      </div>

      <div className={styles["divider-daily-pokemon-bottom"]}>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className={styles["shape-fill"]}></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className={styles["shape-fill"]}></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className={styles["shape-fill"]}></path>
        </svg>
      </div>
    </div>
  )
}

export default HomeDailyPokemon;
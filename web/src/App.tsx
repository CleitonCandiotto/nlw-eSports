import { GameBanner } from "./components/GameBanner";
import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

import './styles/input.css';

import logoImg from './assets/logo-nlw.svg'
import { CreateAdBanner } from "./components/CreateAdBanner";
import { CreateAdModal } from "./components/CreateAdModal"


function App() {
  interface Game {
    id: string
    title: string
    bannrUrl: string
    _count: {
      ads: number
    }
  }

  const [games , setGamnes] = useState<Game[]>([])

  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "free",
    slides: {
      perView: 5,
      spacing: 25,
    },
  })
    

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data =>{
        setGamnes(data)
      })
  }, [])
  

  return (
    <div className='max-w-[1440px] mx-auto flex flex-col items-center my-20' >
      <img className='w-72' src={logoImg} alt="" />

      <h1 className='text-5xl text-white font-black mt-20'>
        Seu <span className=''>duo</span> está aqui.
      </h1>

      
      <div ref={sliderRef} className='keen-slider mt-16 max-w-6xl'>
        {games.map( game => {
            return (
              <div className="keen-slider__slide">
                <GameBanner
                  key={game.id}
                  bannerUrl={game.bannrUrl}
                  title={game.title}
                  adsCount={game._count.ads}
                  
                />
              </div>
            )
          })}
      </div>
      
      
      <Dialog.Root>
        <CreateAdBanner/> 
        <CreateAdModal/>       
      </Dialog.Root>
      
    </div>
  )
}

export default App

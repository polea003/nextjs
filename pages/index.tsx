import Image from 'next/image'
import { useState, useEffect } from 'react'
import Ceremony from '@/components/Ceremony';
import Reception from '@/components/Reception';
import Hotel from '@/components/Hotel';
import Travel from '@/components/Travel';
import Story from '@/components/Story';
import Registry from '@/components/Registry';
import RSVP from '@/components/RSVP';
import { FloatingNavBar } from '@/components/FloatingNavBar';

export default function Home() {
  const [translateYNames, setTranslateYNames] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [scrollY, setScrollY] = useState(0);
  const [heartScale, setHeartScale] = useState(1);
  const [translateYHeart, setTranslateYHeart] = useState(0);
  const [selectedView, setSelectedView] = useState(undefined);

  useEffect(() => {
    const element = document.getElementById(selectedView || '');
    element?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedView])


  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      if (window.scrollY > 154) return
      // Calculate scale factor, adjust as necessary
      let newTranslateYHeart = window.scrollY * 0.2; // Moves down half as fast as scrolling
      setTranslateYHeart(newTranslateYHeart);
      // let newOpacity = 1 - window.scrollY * 0.01; // Decreases as you scroll
      let newOpacity = 1 - (window.scrollY / 100) // Decreases as you scroll
      newOpacity = Math.max(newOpacity, 0); // Ensure opacity doesn't go below 0
      setOpacity(newOpacity);
      let newTranslateYNames = window.scrollY * 0.5; // Moves down half as fast as scrolling
      setTranslateYNames(newTranslateYNames);

      // let newHeartScale = 1 + window.scrollY * 0.0004;
      let newHeartScale = 1 + (window.scrollY / 154) * .06;
      setHeartScale(newHeartScale)
    }
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  })

  return (
    <div>

      {/* start of cards */}
      <div className='absolute inset-x-0 top-0 flex flex-col items-center'>
        <div className='flex justify-between w-full p-6'>
          <div className='md:w-[300px] xl:w-[425px] mt-4 md:h-[300px] xl:h-[425px] relative z-50'>
            <Image
              src="/top-left.png"
              alt=''
              fill={true}
            />
          </div>
          <div className='md:w-[500px] xl:w-[700px] md:h-[500px] xl:h-[700px] relative z-50'>
            <Image
              src="/top-right.png"
              alt=''
              fill={true}
              style={{
                objectFit: 'cover'
              }}
            />
          </div>
        </div>
      </div>

      {/* sophy and patrick */}
      <div>
        <FloatingNavBar setSelectedView={setSelectedView} show={scrollY >= 100} />
      </div>
      {/* <FloatingNavBar show={true} /> */}
      <div className='flex flex-col items-center w-full bg-[#FDF6ED]'>
        <div className='relative w-80 xl:w-96 h-64 z-30 mt-6 md:mt-32 pointer-events-none' style={{ transform: `translateY(${translateYNames}px)`, opacity: opacity }}>
          <Image
            src="/sophia_and_patrick.png"
            alt=''
            layout="fill"
            objectFit='contain'
          />
        </div>
        <div>
          <div className='w-full flex flex-col items-center z-40'
              style={{ transform: `scale(${heartScale}) translateY(-${translateYHeart}px)` }}
          >
            <Image
              src="/heart-bw.png"
              alt=''
              width={925}
              height={1}
            />
        </div>

      </div>
      <div className='pt-12 pb-40'>
        <div className='flex flex-col items-center'>
          <div className="text-4xl" style={{ fontFamily: 'Copperplate'}}>January 27, 2024</div>
          <div className="text-4xl" style={{ fontFamily: 'Copperplate'}}>Miami Beach, FL</div>
        </div>
      </div>
      
      <div id="story" className='w-full flex flex-col items-center bg-[#183642] text-2xl text-white py-40' style={{'fontFamily': 'Copperplate'}}>
        <Story />
      </div>

      <div id="ceremony" className='w-full flex flex-col items-center bg-[#A82428] text-2xl text-white py-40' style={{'fontFamily': 'Copperplate'}}>
        <Ceremony />
      </div>

      <div id="reception" className='w-full flex flex-col items-center bg-[#183642] text-2xl text-white py-40' style={{'fontFamily': 'Copperplate'}}>
        <Reception />
      </div>

      <div id="hotel" className='w-full flex flex-col items-center bg-[#315C5E] text-2xl text-white py-40' style={{'fontFamily': 'Copperplate'}}>
        <Hotel />
      </div>

      <div id="travel" className='w-full flex flex-col items-center bg-[#F7E4CA] text-2xl py-40' style={{'fontFamily': 'Copperplate'}}>
        <Travel />
      </div>

      <div id="registry" className='w-full flex flex-col items-center bg-[#183642] text-2xl text-white py-96' style={{'fontFamily': 'Copperplate'}}>
        <Registry />
      </div>

      <div id="rsvp" className='w-full flex flex-col items-center bg-[#FDF6ED] text-2xl py-96' style={{'fontFamily': 'Copperplate'}}>
        <RSVP />
      </div>

      </div>
  </div>
  )
}
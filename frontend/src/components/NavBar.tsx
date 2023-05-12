import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavBar = ({ isDark, setIsDark }: {
  isDark: boolean
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>
}) => {

  return (
    <div className='w-full pt-7 px-5 cu2:px-10'>
      <div className='cu2:justify-between flex flex-col  cu2:flex-row justify-center  space-y-5 cu2:space-y-0 items-center cu2:items-center'>
        {/* Logo */}
        <Logo />

        {/* Middle part */}
        <DropDowns />

        {/* End part */}
        <div className='flex h-full items-center space-x-5'>
          <div className='w-fit'>
            <Timer />
          </div>
          <div>
            <button className='flex items-center rounded-xl text-white space-x-2 px-3 py-2 bg-cyan'>
              <div className='w-5 h-5'>
                <img src='plane.png' />
              </div>
              <div className='text-xs cu2:text-base font-semibold'>
                Connect Telegram
              </div>
            </button>
          </div>
          <div>
            <ToggleDarkMode isDark={isDark} setIsDark={setIsDark} />
          </div>
        </div>

      </div>
    </div>
  )
}

function Logo() {
  return (
    <div className='w-[60%] cu1:w-[40%] cu2:w-[18%] aspect-[362/61]'>
      <img src='main-logo.png' className='w-full h-full' />
    </div>
  )
}

function DropDowns() {
  const [toogle, setToogle] = useState(false)
  const units = [
    'btc',
    'trx',
    'eos',
    'zil',
    'bat',
    'zrx',
    'req',
    'nuls',
    'eth',
    'xrp',
  ]
  let location = useLocation();
  return (
    <div className='h-full m-0 p-0'>
      <ul className='flex space-x-2 h-full items-center text-sm font-medium cu2:text-base font-sans'>
        <button className='py-1.5 flex items-center space-x-2 px-2.5 cu2:px-3 cu2:py-2  rounded-md bg-gray-100 dark:bg-[#2e3241] dark:text-white'>
          <span>INR</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-2.5 h-2.5 cu2:w-3.5 cu2:h-3.5 dark:fill-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
        <button 
          className={`py-1.5 relative flex items-center space-x-2 px-2.5 cu2:px-3 cu2:py-2  rounded-md bg-gray-100 dark:bg-[#2e3241] dark:text-white`}
          onClick={(event)=>{
            event.preventDefault();
            setToogle(prev=>!prev)
          }}>
          <span>{location.pathname.substring(1).toUpperCase()}</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-2.5 h-2.5 cu2:w-3.5 cu2:h-3.5 dark:fill-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
          {
            toogle && <ul className='absolute flex flex-col dark:text-black top-12 rounded-lg left-0 border'>
              {
                units.map((unit) => {
                  return (
                    <Link to={`/${unit}`} className='bg-gray-50 hover:bg-gray-200 w-36 py-1.5 px-4 text-left'>
                      {unit.toUpperCase()}
                    </Link>
                  )
                })
              }
            </ul>
          }
        </button>
        <a className='py-1.5 flex items-center space-x-2 px-2.5 cu2:px-3 cu2:py-2  rounded-md bg-gray-100 dark:bg-[#2e3241] dark:text-white'>
          BUY BTC
        </a>
      </ul>
    </div>
  )
}

function Timer() {
  const circleRef1 = useRef(null)
  const circleRef2 = useRef(null)

  const [time, setTime] = useState<number>(0)

  useEffect(() => {
    console.log("In useeffect1")
    window.setInterval(() => {
      setTime((prev) => prev + 1)
    }, 1000)
    // const input = document.querySelector('input');
    // setProgress(input.value);

  }, [])

  useEffect(() => {
    if (!circleRef1.current || !circleRef2.current) return;

    var circle = circleRef1.current as SVGCircleElement
    var circle2 = circleRef2.current as SVGCircleElement

    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;
    circle2.style.strokeDasharray = `${circumference} ${circumference}`;
    circle2.style.strokeDashoffset = `${circumference}`;


    let offset = 60 - ((time % 60) / 60) * 60;

    circle.style.strokeDashoffset = `${offset}`;
    circle2.style.strokeDashoffset = `${offset}`;

    console.log(offset)
  }, [time])

  return (
    <svg
      className="flex items-center progress-ring rounded-full w-[25px] h-[25px] cu2:w-[35px] cu2:h-[35px]">
      <circle
        className="delay-100 ease-linear stroke-gray-200 block cu2:hidden"
        strokeWidth="1.5"
        fill="white"
        r="11"
        cx="12.5"
        cy="12.5" />
      <circle
        ref={circleRef1}
        className="progress-ring__circle z-10 block cu2:hidden stroke-cyan"
        strokeWidth="1.5"
        fill="white"
        r="10"
        cx="12.5"
        cy="12.5" />

      <circle
        className="delay-100 ease-linear stroke-gray-200 hidden cu2:block"
        strokeWidth="2.5"
        fill="white"
        r="14"
        cx="17.5"
        cy="17.5" />
      <circle
        ref={circleRef2}
        className="progress-ring__circle z-10 hidden cu2:block stroke-cyan"
        strokeWidth="2.5"
        fill="white"
        r="15"
        cx="17.5"
        cy="17.5" />
    </svg>
  )
}

function ToggleDarkMode({ isDark, setIsDark }: {
  isDark: boolean
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <button
      className={`flex ${(isDark) ? "place-content-start" : "place-content-end"} delay-700 ease-in-out transition-all rounded-full w-[60px] aspect-[5/3] p-[5px] bg-gray-200`}
      onClick={(event) => {
        event.preventDefault();
        setIsDark((prev) => !prev)
      }}>
      <div className='rounded-full w-[25px] aspect-square bg-cyan' />
    </button>
  )
}

export default NavBar
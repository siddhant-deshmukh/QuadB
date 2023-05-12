import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Timer from './Timer'
import MiddlePart from './MiddlePart'

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
        <MiddlePart />

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
    <Link to='/' className='w-[60%] cu1:w-[40%] cu2:w-[18%] aspect-[362/61]'>
      <img src='main-logo.png' className='w-full h-full' />
    </Link>
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
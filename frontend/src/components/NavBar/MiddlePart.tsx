import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

function MiddlePart() {
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
  let unit = location.pathname.substring(1).toUpperCase()
  if(unit === ''){
    unit = 'BTC'
  }
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
          onClick={(event) => {
            event.preventDefault();
            setToogle(prev => !prev)
          }}>
          <span>{unit}</span>
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
        <button className='py-1.5 flex items-center space-x-2 px-2.5 cu2:px-3 cu2:py-2  rounded-md bg-gray-100 dark:bg-[#2e3241] dark:text-white'>
          BUY BTC
        </button>
      </ul>
    </div>
  )
}


export default MiddlePart
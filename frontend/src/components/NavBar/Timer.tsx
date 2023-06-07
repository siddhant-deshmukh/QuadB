import React, { useEffect, useRef, useState } from 'react'

function Timer() {
  const [time, setTime] = useState<number>(0)

  const circleRef2 = useRef(null)

  useEffect(() => {
    console.log("In useeffect1")
    window.setInterval(() => {
      setTime((prev) => prev + 1)
    }, 1000)
  }, [])

  return (
    <div className='relative flex items-center  text-center w-[35px] h-[35px]'>
      <div
        className='inline-block  z-20 w-full text-cyan'
      >
        {
          time % 60
        }
      </div>
      <svg
        className="circle-svg flex absolute top-0 right-0  items-center progress-ring rounded-full w-[35px] h-[35px]">
        <circle
          className=""
          strokeWidth="2.5"
          fill="none"
          stroke='white'
          strokeLinecap='round'
          strokeDashoffset={0}
          r="14.5"
          cx="17.5"
          cy="17.5" />
        <circle
          ref={circleRef2}
          className="progress-ring__circle z-10  stroke-cyan"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap='round'
          strokeDashoffset={0}
          r="14.5"
          cx="17.5"
          cy="17.5" />
      </svg>

    </div>
  )
}


export default Timer
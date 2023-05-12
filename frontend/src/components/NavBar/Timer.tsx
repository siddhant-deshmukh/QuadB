import React, { useEffect, useRef, useState } from 'react'

function Timer() {
  const [time, setTime] = useState<number>(0)

  const circleRef1 = useRef(null)
  const circleRef2 = useRef(null)

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
    circle.style.strokeDasharray = `${circumference} `;
    // circle.style.strokeDashoffset = `${circumference}`;
    circle2.style.strokeDasharray = `${circumference}`;
    // circle2.style.strokeDashoffset = `${circumference}`;


    // let offset = circumference - ((time % 60) / 60) * circumference;

    // circle.style.strokeDashoffset = `${offset}`;
    // circle2.style.strokeDashoffset = `${offset}`;

    // console.log(offset)
  }, [time])

  return (
    <div className='relative text-center w-[25px] h-[25px] cu2:w-[35px] cu2:h-[35px]'>
      <div
        className='inline-block z-20  text-cyan'
        style={{lineHeight:'35px'}}
      >
        {
          time % 60
        }
      </div>
      <svg
        className="circle-svg flex absolute top-0 right-0  items-center progress-ring rounded-full w-[25px] h-[25px] cu2:w-[35px] cu2:h-[35px]">
        {/* <circle
          className="delay-100 ease-linear stroke-gray-200 block cu2:hidden"
          strokeWidth="1.5"
          fill="white"
          r="11"
          cx="12.5"
          cy="12.5" /> */}
        <circle
          ref={circleRef1}
          className="progress-ring__circle z-10 block cu2:hidden stroke-cyan"
          strokeWidth="1.5"
          fill="white"
          r="10"
          cx="12.5"
          cy="12.5" />

        {/* <circle
          className="delay-100 ease-linear stroke-gray-200 hidden cu2:block"
          strokeWidth="2.5"
          fill="white"
          r="14"
          cx="17.5"
          cy="17.5" /> */}
        <circle
          ref={circleRef2}
          className="progress-ring__circle z-10 hidden cu2:block stroke-cyan"
          strokeWidth="2.5"
          fill="white"
          r="15"
          cx="17.5"
          cy="17.5" />
      </svg>

    </div>
  )
}


export default Timer
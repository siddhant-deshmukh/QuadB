import React from 'react'

const SummeryBar = () => {
  return (
    <div className='w-full flex items-center px-4 cu1.5:px-10 cu2:px-[5%] justify-between text-gray-400'>
      <FloatDisplayWithTime percent={0.86} time={5} timeUnit='Mins'/>
      <FloatDisplayWithTime percent={1.45} time={1} timeUnit='Hour'/>
      <div className='flex flex-col space-y-0 cu2:space-y-3 items-center text-center'>
        <span className='text-sm cu1.5:text-lg'>Best Price to Trade</span>
        <INRPrice price={2460559}/>
        <span className='text-[8px] mt-2 cu1.5:text-base ' >Average BTC/INR net price including commission</span>
      </div>
      <FloatDisplayWithTime percent={8.7} time={1} timeUnit='Day'/>
      <FloatDisplayWithTime percent={15.41} time={7} timeUnit='Days'/>
    </div>
  )
}

function FloatDisplayWithTime({ percent, time, timeUnit}: {
  percent: number,
  time : 5 | 1 | 7,
  timeUnit : 'Mins' | 'Hour' | 'Day' | 'Days',
}) {

  let str = percent.toString()
  str.slice(0, str.indexOf('.') + 3)

  return (
    <div className='flex flex-col items-center'>
      <div className='text-cyan text-sm  cu1.5:text-4xl'>
        {str} %
      </div>
      <div className='text-gray-400 text-xs flex space-x-2 cu1.5:text-xl'>
        <span>{time}</span> 
        <span>{timeUnit}</span>
      </div>
    </div>
  )
}
function INRPrice({price}:{price:number}){

  let str = convertNumToInr(price)
  return (
    <div className='text-base text-black dark:text-white cu1.5:text-5xl cu2:text-7xl'>
      ₹ {str}
    </div>
  )
}
function convertNumToInr(num:number){
  let str = num.toString()
  let l = str.length
  let ans = ''
  if(l<=3){
    return str
  }else if((l-3)%2 == 1 ){
    ans = str.substring(0,1)
    for(let i=1; i< l-3; i=i+2){
      ans += ',' + str.substring(i,i+2)
    }
  }else{
    ans = str.substring(0,2)
    for(let i=2; i< l-3; i=i+2){
      ans += ',' + str.substring(i,i+2)
    }
  }
  ans += ',' + str.substring(l-3)
  return ans
}
export default SummeryBar
import React, { useEffect, useState } from 'react'
import { DataList } from '../App'
import { convertNumToInr } from '../utils/convertNumToString'
import { useLocation } from 'react-router-dom'

const Table = ({dataList}:{
  dataList : DataList[]
}) => {

  // const [dataList,setDataList] = useState<DataList[] | null>(null)

  

  
  if(!dataList){
    return (
      <div>
        Loading
      </div>
    )
  }
  return (
    <div className='max-w-full w-full overflow-x-auto'>
      <table className='dark:text-white w-full max-w-full min-h-full'>
        <thead className=''>
          <tr>
            <th>#</th>
            <th>Platform</th>
            <th>Last Traded Price</th>
            <th>Buy / Sell Price</th>
            <th>Difference</th>
            <th>Savings</th>
          </tr>
        </thead>
        <tbody>
          {
            dataList.map((ele)=>{
              return <Row rowData={ele}/>
            })
          }
        </tbody>
      </table>
    </div>
  )
}
function Row({rowData}:{rowData: DataList}) {
  const {index, platform, last, buy, sell, diff,savings} = rowData
  return (
    <tr>
      <td>{index}</td>
      <td className='flex space-x-2 items-center place-content-center'>
        <img src='/wazirx.png' className='aspect-square rounded-full w-6 h-6'/>
        <span>WazirX</span>
      </td>
      <td>₹ {convertNumToInr(last)}</td>
      <td>₹ {convertNumToInr(buy)} / ₹ {convertNumToInr(sell)}</td>
      <td className={`${(diff<0)?'text-red-500':'text-cyan'}`} >{diff} %</td>
      <td className={`${(savings<0)?'text-red-500':'text-cyan'}`}>{(savings<0)?'▼':'▲'} ₹ {convertNumToInr(savings)}</td>
    </tr>
  )
}
export default Table
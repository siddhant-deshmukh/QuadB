import React, { useEffect, useState } from 'react'
import { DataList } from '../App'
import { convertNumToInr } from '../utils/convertNumToString'
import { useLocation } from 'react-router-dom'

const Table = ({ dataList }: {
  dataList: DataList[]
}) => {
  const location = useLocation()
  let base_unit = location.pathname.substring(1)
  let is_all = (base_unit === '') ? true : false

  if (!dataList) {
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
            <th>{(is_all) ? 'Currency' : 'Platform'}</th>
            <th>Last Traded Price</th>
            <th>Buy / Sell Price</th>
            {
              !is_all &&
              <>
                <th>Difference</th>
                <th>Savings</th>
              </>
            }
          </tr>
        </thead>
        <tbody>
          {
            dataList.map((ele) => {
              return <Row rowData={ele} is_all={is_all} />
            })
          }
        </tbody>
      </table>
    </div>
  )
}
function Row({ rowData, is_all }: {
  is_all: Boolean
  rowData: DataList,
}) {
  const { index, platform, last, buy, sell, diff, savings } = rowData
  return (
    <tr>
      <td>{index}</td>
      <td className='flex space-x-2 items-center place-content-center'>
        {
          is_all &&
          <span>{platform}</span>
        }
        {
          !is_all &&
          <>
            <img src='/wazirx.png' className='aspect-square rounded-full w-6 h-6' />
            <span>WazirX</span>
          </>
        }
      </td>
      <td>₹ {convertNumToInr(last)}</td>
      <td>₹ {convertNumToInr(buy)} / ₹ {convertNumToInr(sell)}</td>
      {
        !is_all &&
        <>
          <td className={`${(diff < 0) ? 'text-red-500' : 'text-cyan'}`} >{diff} %</td>
          <td className={`${(savings < 0) ? 'text-red-500' : 'text-cyan'}`}>{(savings < 0) ? '▼' : '▲'} ₹ {convertNumToInr(savings)}</td>
        </>
      }
    </tr >
  )
}
export default Table
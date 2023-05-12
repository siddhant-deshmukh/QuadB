import React from 'react'

const Table = () => {
  return (
    <div className='max-w-full w-full overflow-x-auto'>
      <table className='dark:text-white w-full max-w-full'>
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
          <Row />
        </tbody>
      </table>
    </div>
  )
}
function Row({sr_num, platform, last, buy, sell, difference,savings}:{
  sr_num : number,
  platform : string,
  last : string,
  buy : string,
  sell : string,
  difference : number,
  savings : number
}) {
  return (
    <tr>
      <td>{sr_num}</td>
      <td>{platform}</td>
      <td>₹ {last}</td>
      <td>₹ {buy} / ₹ {sell}</td>
      <td>-{difference} %</td>
      <td>▼ ₹ {savings}</td>
    </tr>
  )
}
export default Table
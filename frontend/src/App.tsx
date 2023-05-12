import { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import SummeryBar from './components/SummeryBar'
import Table from './components/Table'
import { useLocation } from 'react-router-dom'

export interface DataList {
  index: number,
  platform: string,
  last: number,
  buy: number,
  sell: number,
  diff: number,
  savings: number,
  volume: number,
  name : string,
}

function App() {
  const [count, setCount] = useState<number>(0)
  const [isDark, setIsDark] = useState<boolean>(true)
  const [dataList, setDataList] = useState<DataList[]>([])
  const [bestP, setBestP] = useState<number>(0)

  const location = useLocation()
  let base_unit = location.pathname.substring(1)
  if(base_unit === ''){
    base_unit = 'btc'
  }

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/${base_unit}`)
      .then(res => res.json())
      .then((data : DataList[]) => {
        if (data && Array.isArray(data)) {
          let avg = 0
          data.forEach(e => {
            avg += e.last
          })
          avg = avg / data.length
          setBestP(avg)

          let newData = data.map((ele, index) => {
            return {
              index: index + 1,
              platform: ele.name.toUpperCase(),
              last: Math.floor(ele.last),
              buy: Math.floor(ele.buy),
              sell: Math.floor(ele.sell),
              diff: ((ele.last - avg) / (ele.last)).toFixed(2),
              savings: Math.floor(ele.last - avg)
            } 
          })
          //@ts-ignore
          setDataList(newData)
        }

      })
  }, [base_unit])

  return (
    <div className={`${(isDark) ? 'dark' : ''}`}>
      <div className='dark:bg-[#191d28] min-h-screen flex flex-col space-y-10 overflow-y-auto'>
        <NavBar isDark={isDark} setIsDark={setIsDark} />
        <SummeryBar bestP={bestP}/>
        <Table dataList={dataList} />
      </div>
    </div>
  )
}

export default App

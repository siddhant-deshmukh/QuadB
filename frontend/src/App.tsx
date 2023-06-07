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
  name: string,
}

function App() {
  const [bestP, setBestP] = useState<number>(0)
  const [isDark, setIsDark] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [dataList, setDataList] = useState<DataList[]>([])

  const location = useLocation()
  let base_unit = location.pathname.substring(1)

  useEffect(() => {
    setLoading(true)
    fetch(`${import.meta.env.VITE_API_URL}/${base_unit}`)
      .then(res => res.json())
      .then((data: DataList[]) => {
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

      }).finally(() => {
        setLoading(false)
      })
  }, [base_unit])

  return (
    <div className={`${(isDark) ? 'dark' : ''}`}>
      <div className='dark:bg-[#191d28] min-h-screen flex flex-col space-y-10 overflow-y-auto'>
        <NavBar isDark={isDark} setIsDark={setIsDark} />
        {
          !loading &&
          <>
            <SummeryBar bestP={bestP} />
            <Table dataList={dataList} />
          </>
        }
        {
          loading &&
          <div role="status" className='pt-10 flex place-content-center'>
            <svg aria-hidden="true" className="w-28 h-28 text-gray-200 animate-spin dark:text-white fill-cyan" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        }
      </div>
    </div>
  )
}

export default App

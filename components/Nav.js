import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from '~/lib/theme'
import Connect from './Connect'
import { Popover, Button } from 'antd'
import { BellFilled } from '@ant-design/icons'
import { getNotificationListApi } from '../data/api/AllApi'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
function formatString(input) {
  if (input.length <= 6) {
    return input
  }
  const front = input.slice(0, 5)
  const back = input.slice(-5)
  return `${front}...${back}`
}
const Nav = () => {
  const router = useRouter()
  const { isDarkMode } = useTheme()
  const [data, setData] = useState([])
  const [detail, setDetail] = useState([])
  const handleMouseEnter = () => {
    getNotificationListApi(localStorage.getItem('address')).then((res) => {
      console.log(res)
      setData(res.data.list)
    })
  }
  useEffect(() => {
    let a = []
    for (let i = 0; i < data.length; i++) {
      data[i].vaultActivity.detail = JSON.parse(
        atob(data[i].vaultActivity.detail)
      )
      a.push(data[i])
    }
    setDetail(a)
  }, [data])
  console.log(detail)
  const content = (
    <>
      <div>
        {detail.map((it) => {
          return (
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => {
                // console.log(it.followerAddress)
                router.push({
                  pathname: '/portfolio',
                  query: {
                    address: it.followerAddress,
                  },
                })
              }}
            >
              {formatString(it.followerAddress) +
                '进行了' +
                it.vaultActivity.operation +
                '数量:' +
                it.vaultActivity.detail.amount}
            </div>
          )
        })}
      </div>
    </>
  )
  return (
    <nav className="w-full border-b bg-scale-300 p-4">
      <div className="flex flex-row-reverse">
        <Connect />
        <Popover
          placement="bottom"
          // title={'123'}
          onMouseEnter={handleMouseEnter}
          content={content}
          // arrow={mergedArrow}
        >
          <BellFilled style={{ color: 'white', cursor: 'pointer' }} />
        </Popover>
      </div>
    </nav>
  )
}

export default Nav

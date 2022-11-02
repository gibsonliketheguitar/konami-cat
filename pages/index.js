import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useRef, useState } from 'react'
import CatPictures from '../component/CatPictures'
import Header from '../component/Header'
import Messages from '../component/Messages'

const KONAMI_KEY = 'injects3crets'

export default function Home() {
  //keypress timer states
  const nowRef = useRef(null)
  const [startTime, setStart] = useState(null)
  const [now, setNow] = useState(null)

  //message timer states
  const mNowRef = useRef(null)
  const [mStartTime, setMStart] = useState(null)
  const [mNow, setMNow] = useState(null)

  //other states
  const [input, setInput] = useState('')
  const [fromTheDeep, setMessage] = useState([])
  const [catImgData, setCatImgData] = useState([])

  function resetAll() {
    clearInterval(nowRef.current)
    nowRef.current = null
    setStart(null)
    setInput('')
    setNow(null)
  }

  function resetTimeout(seconds) {
    setStart(seconds * 1000 + Date.now())
  }

  function startTimeout() {
    if (nowRef.current === null) {
      nowRef.current = setInterval(() => {
        setNow(Date.now())
      }, 10)
    }
  }

  function initMCountDown(seconds) {
    setMStart(seconds * 1000 + Date.now())
  }

  function startMTimeOut() {
    mNowRef.current = setInterval(() => {
      setMNow(Date.now())
    }, 10)
  }

  //Fetch Cat pictures from reddit.com/r/cats
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('https://www.reddit.com/r/cats.json')
        const { data } = await response.json()
        const catUrlAndLink = data.children
          .map(({ data }) => {
            return { url: data?.url, link: data?.permalink }
          })
          .filter(ele => {
            const end = ele.url.slice(-3)
            if (end === 'png' || end === 'jpg' || end === 'gif') return true
          })
        const komiBonus = {
          url: 'https://media.tenor.com/_Nmi-p_Z83AAAAAC/komi-cant-communicate-komi-san-comyushou-desu.gif',
          link: 'https://en.wikipedia.org/wiki/Komi_Can%27t_Communicate',
          bonus: true
        }
        const randIdx = Math.floor(Math.random() * catUrlAndLink.length)
        catUrlAndLink.splice(randIdx, 0, komiBonus)
        setCatImgData(catUrlAndLink)
      }
      catch (error) {
        console.log('failed to fetch and set cat pictures')
      }
    }

    getData()
  }, [])

  //Capture key strokes
  useEffect(() => {
    const keyPress = (event) => {
      if (event.key === 'Escape') {
        resetAll()
        return
      }
      setInput(prev => {
        //if default state, start setInterval for now
        if (nowRef.current === null) startTimeout()
        const newInput = prev + event.key
        resetTimeout(5)
        return newInput
      })
    }

    window.addEventListener('keydown', keyPress)
    return () => {
      window.removeEventListener('keydown', keyPress)
      clearInterval(nowRef.current)
    }
  }, [])

  //Konami Code Input count down timer
  useEffect(() => {
    if (startTime === null || now === null) return
    const time = (startTime - now) / 1000
    if (time <= 0) resetAll()
  }, [startTime, now])

  //Fetch Message when Konami code is correct
  useEffect(() => {
    if (input !== KONAMI_KEY || fromTheDeep.length > 0) return
    resetAll()
    fetchData()

    async function fetchData() {
      try {
        const response = await fetch('https://api.github.com/repos/elixir-lang/elixir/issues')
        const data = await response.json()
        const transformedData = data
          .map(d => {
            return { id: d.id, created: d.created_at, updated: d.updated_at, url: d.url, title: d.title, username: d.user.login, userAvatar: d.user.avatar_url }
          })
          .sort((a, b) => new Date(b.created) - new Date(a.created))
          .slice(0, 100)

        setMessage(_ => {
          initMCountDown(15)
          startMTimeOut()
          return transformedData
        })
      }
      catch (error) {
        console.log('failed to get messages from the deep and set')
      }
    }
  }, [input, fromTheDeep])

  //Message Count Down Timer
  useEffect(() => {
    if (mStartTime === null || mNow === null) return
    const time = (mStartTime - mNow) / 1000
    if (time <= 0) {
      clearInterval(mNowRef.current)
      mNowRef.current = null
      setMessage([])
    }
  }, [mStartTime, mNow])

  let time = 0
  if (startTime !== null && now !== null) time = (startTime - now) / 1000

  let mTime = 0
  if (mTime !== null && mNow !== null) mTime = (mStartTime - mNow) / 1000

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      height: '100vh',
    }}>
      <Header />
      <Typography variant='h3' component='h1' m='24px'> Sweet Kittens</Typography>
      <Typography variant>{fromTheDeep.length > 0 ? mTime.toFixed(3) : time.toFixed(3)}</Typography>
      {fromTheDeep.length === 0 && <CatPictures data={catImgData} />}
      <Messages data={fromTheDeep} />
    </Box >
  )
}

import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const KOMAI_KEY = 'injects3screts'
const KOMAI_TEST = 'test'

export default function Home() {
  const nowRef = useRef(null)
  const [catImgData, setCatImgData] = useState([])
  const [input, setInput] = useState('')
  const [startTime, setStart] = useState(null)
  const [now, setNow] = useState(null)


  function resetAll() {
    clearInterval(nowRef.current)
    nowRef.current = null
    setStart(null)
    setNow(null)
    setInput('')
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

  //Fetch Cat pictures from /r/reddit
  useEffect(() => {
    async function getData() {
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
      setCatImgData(catUrlAndLink)
    }
    getData()
  }, [])

  //Capture Key Strokes
  useEffect(() => {

    const keyPress = (event) => {
      if (event.key === 'Escape') {
        resetAll()
        return
      }
      setInput(prev => {
        const newInput = prev + event.key
        if (newInput === KOMAI_TEST) {

          alert('hi')
          resetAll()
          return
        }
        resetTimeout(5)
        if (nowRef.current === null) startTimeout()
        return newInput
      })
    }

    window.addEventListener('keydown', keyPress)
    return () => {
      window.removeEventListener('keydown', keyPress)
      clearInterval(nowRef.current)
    }
  }, [])

  //Global Effect to handle keypress timeout
  useEffect(() => {
    if (startTime === null || now === null) return
    const time = (startTime - now) / 1000
    if (time <= 0) resetAll()
  }, [startTime, now])

  let time = 0
  if (startTime !== null && now !== null) time = (startTime - now) / 1000

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100vh',
    }}>
      <Head>
        <title>Sweet Kittens</title>
        <meta name="your dedicated cat picture feed" content="Cat pictures" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography variant='h3' component='h1' m='24px'> Sweet Kittens</Typography>
      <Typography variant>{time.toFixed(3)}</Typography>
      <Box m='24px' style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {catImgData.length > 0 && catImgData.map(({ url, link }, indx) => {
          return (
            <Link key={indx + link} href={'https://www.reddit.com' + link}>
              <Image
                src={url}
                width={200}
                height={200}
                alt={link}
                style={{
                  borderRadius: '12px',
                  objectFit: 'cover',
                  margin: '2px'
                }}
              />
            </Link>
          )
        })}
      </Box>
    </Box >
  )
}

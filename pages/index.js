import { Card, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [catImgData, setCatImgData] = useState([])

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
    const keyPress = (event) => console.log(event)

    window.addEventListener('keydown', keyPress)
    return () => window.removeEventListener('keydown', keyPress)
  }, [])

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

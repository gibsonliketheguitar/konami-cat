import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import Head from 'next/head'

export default function Home() {

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
      <Box m='24px'>

      </Box>
    </Box >
  )
}

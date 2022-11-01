import Head from 'next/head'
export default function Header() {
    return (
        <Head>
            <title>Sweet Kittens</title>
            <meta name="your dedicated cat picture feed" content="Cat pictures" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}
import Link from 'next/link'
import Image from 'next/image'
import { Box } from '@mui/system'

export default function CatPictures({ data }) {
    if (data.length <= 0) return <></>
    return (
        <Box m='24px' style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {data.map(({ url, link, bonus = false }, indx) => {
                const outBoundLink = !bonus ? 'https://www.reddit.com' + link : link
                return (
                    <Link key={indx + link} href={outBoundLink}>
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
    )
}
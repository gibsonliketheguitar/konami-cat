import Image from 'next/image'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'

export default function Messages({ data }) {
    if (data.length <= 0) return <></>
    return (
        <Box>
            {data.map(((messages, index) => {
                return (
                    <Box key={index + messages.id} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', margin: '12px' }}>
                        <Image
                            src={messages.userAvatar}
                            width={75}
                            height={75}
                            alt={messages.username + ' avatar img'}
                            style={{
                                borderRadius: '45px',
                                objectFit: 'cover',
                                margin: '2px'
                            }} />
                        <Typography ml='12px'>{messages.title}</Typography>
                    </Box>
                )
            }))
            }
        </Box>
    )
}
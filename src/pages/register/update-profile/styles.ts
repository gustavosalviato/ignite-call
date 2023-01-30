import { Box, styled, Text } from '@ignite-ui/react'

export const ProfileBox = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '$6',

  label: {
    marginBottom: '$2',
    marginTop: '$2',
    fontSize: '$md',
    fontFamily: '$default',
  },
})

export const FormAnnotation = styled(Text, {
  color: '$gray200',
  margin: '$2 0',
})

export const AvatarImage = styled('div', {
  width: '64px',
  height: '64px',
  borderRadius: '50%',

  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
})

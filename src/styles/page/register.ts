import { Box, styled, Text, Heading, Button } from '@ignite-ui/react'
export const RegisterContainer = styled('main', {
  maxWidth: 572,
  padding: '0 $4',
  margin: '$20 auto $4',
})

export const Header = styled('main', {
  padding: '0 $6',

  [` > ${Heading}`]: {
    fontWeight: '$bold',
  },

  [` > ${Text}`]: {
    marginTop: '$2',
    marginBottom: '$6',
    color: '$gray200',
    lineHeight: '$base',
  },
})

export const RegisterForm = styled(Box, {
  marginTop: '$6',
  padding: '$6',

  display: 'flex',
  flexDirection: 'column',

  [`${Text}`]: {
    marginBottom: '$2',
  },

  'label + label': {
    marginTop: '$4',
  },

  [` > ${Button}`]: {
    marginTop: '$4',
  },

  '> label + p': {
    color: 'blue',
  },
})

export const FormErrorMessage = styled(Text, {
  marginTop: '$2',
  color: '#dc2626',
})

import { Box, styled, Text } from '@ignite-ui/react'

export const Container = styled(Box, {
  maxWidth: '540',
  margin: '$6 auto 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const Header = styled('div', {
  display: 'flex',
  gap: '$4',
  alignItems: 'center',

  paddingBottom: '$6',
  marginBottom: '$2',

  borderBottom: '1px solid $gray600',

  [`> ${Text}`]: {
    display: 'flex',
    alignItems: 'center',
    gap: '$2',

    svg: {
      width: '$5',
      height: '$5',
      color: '$gray200',
    },
  },
})

export const FormActions = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '$2',
})

export const FormError = styled(Text, {
  color: '#dc2626',
  marginTop: '$2',
})

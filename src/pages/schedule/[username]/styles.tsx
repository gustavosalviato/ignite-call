import { Heading, styled, Text } from "@ignite-ui/react";

export const Container = styled('div', {
  maxWidth: 852,
  padding: '0 $4',
  margin: '$20 auto $4',
})

export const ProfileHeader = styled('header', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  [`> ${Heading}`]: {
    marginTop: '$2',
    lineHeight: '$base'
  },

  [`> ${Text}`]: {
    color: '$gray200'
  }
})
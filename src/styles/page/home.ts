import { styled } from '@ignite-ui/react'
import { Text, Heading } from '@ignite-ui/react'

export const HomeContainer = styled('div', {
    maxWidth: 'calc(100vw - (100vw - 1160px) / 2)',
    marginLeft: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '$20',
    height: '100vh',
})

export const Hero = styled('div', {
    maxWidth: '480px',
    padding: '0 $10',

    [`${Heading}`]: {
        fontSize: '$7xl',
        color: '$white',
        fontWeight: '$bold',



        '@media (max-width:600px)': {
            fontSize: '$6xl',
        }

    },

    [`${Text}`]: {
        color: '$gray200',
        marginTop: '$2',
    }

})

export const PreviewImage = styled('div', {
    padding: '$8',
    overflow: 'hidden',

    '@media (max-width:600px)': {
        display: 'none',
    }
})
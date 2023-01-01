import { Box, styled } from "@ignite-ui/react";
import { Text } from '@ignite-ui/react'
export const Form = styled(Box, {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: '$2',
    padding: '$4',
    marginTop: '$6',

    '@media (max-width:600px)': {
        gridTemplateColumns: '1fr'
    }
})

export const FormAnnotation = styled('div', {
    marginTop: '$4',

    [`> ${Text}`]: {
        color: '$gray400',
    }
})
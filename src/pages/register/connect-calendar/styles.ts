import { Heading, styled, Text, Box, Button } from "@ignite-ui/react";
import { markAssetError } from "next/dist/client/route-loader";

export const Container = styled('main', {
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


export const Modal = styled(Box, {
    display: 'flex',
    flexDirection: 'column',
    padding: '$6',
    marginTop: '$6',
})

export const ModalItem = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '$md',
    border: '1px solid $gray600',
    padding: '$4 $6',

    marginBottom: '$4',

})


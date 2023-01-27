import { styled, Text } from "@ignite-ui/react";
import { FontLoaderManifestPlugin } from "next/dist/build/webpack/plugins/font-loader-manifest-plugin";

export const CalendarContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
  padding: '$6'
})

export const CalendarHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const CalendarTitle = styled(Text, {
  fontWeight: 'medium',

  'span': {
    color: '$red',
  }
})

export const CalendarActions = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '$2',


  button: {
    all: 'unset',
    cursor: 'pointer',
    lineHeight: 0,
    borderRadius: '$sm',

    svg: {
      width: '$5',
      height: '$5',
    },

    '&:hover': {
      color: '$gray200',
    },

    '&:focus': {
      boxShadow: '0 0 0 2px $colors$gray100',
    },
  }
})

export const CalendarBody = styled('table', {
  width: '100%',
  fontFamily: '$default',
  borderSpacing: '0.25rem',
  tableLayout: 'fixed',

  'thead th': {
    color: '$gray200',
    fontWeight: 'medium',
    fontSize: '$sm',
  },


  'tbody:before': {
    contet: '',
    paddingBottom: '0.75rem',
    display: 'block',
  },

  'tbody td': {
    boxSizing: 'border-box',
  }
})

export const CalendarDay = styled('button', {
  all: 'unset',
  width: '100%',
  aspectRatio: '1 / 1',
  backgroundColor: '$gray600',
  textAlign: 'center',
  cursor: 'pointer',
  borderRadius: '$sm',

  '&:disabled': {
    background: 'none',
    cursor: 'default',
    opacity: 0.4,
  },

  '&:hover:not(:disabled)': {
    background: '$gray500',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray100',
  },
})


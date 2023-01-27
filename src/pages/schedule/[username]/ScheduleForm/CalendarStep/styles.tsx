import { Box, styled, Text } from "@ignite-ui/react";

export const Container = styled(Box, {
  margin: '$6 auto 0',
  padding: 0,
  display: 'grid',
  position: 'relative',

  variants: {
    isTimePickerOpen: {
      true: {
        gridTemplateColumns: '1fr 280px'
      },

      false: {
        width: 540,
        gridTemplateColumns: '1fr',

      }
    }
  }

})


export const TimePicker = styled('div', {
  borderLeft: '1px solid $gray600',
  padding: '$6 $6 0',
  overflowY: 'scroll',

  position: 'absolute',
  top: '0',
  bottom: '0',
  right: '0',

  width: 280,
})


export const TimePickerHeader = styled(Text, {
  fontWeight: "$medium",

  span: {
    color: '$gray200'
  }
})


export const TimePickerList = styled('div', {
  marginTop: '$3',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$2',
  padding: '$2 0',

  '@media (max-width:900px)': {
    gridTemplateColumns: '2fr',
  }
})

export const TimePickerItem = styled('button', {
  backgroundColor: '$gray600',
  padding: '$2 0',
  border: 0,
  color: '$white',
  borderRadius: '$sm',
  cursor: 'pointer',
  fontSize: '$sm',
  lineHeight: '$base',

  '&:last-child': {
    marginBottom: '$6',
  },

  '&:disabled': {
    background: 'none',
    cursor: 'default',
    opacity: 0.4,
  },

  '&:hover:not(:disabled)': {
    background: '$gray500',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray200',
  }
})
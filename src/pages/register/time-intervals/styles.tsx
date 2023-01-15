import { styled } from "@ignite-ui/react"
import { Text } from "@ignite-ui/react"
export const BoxContainer = styled("div", {
  display: "flex",
  padding: "$6",
  flexDirection: "column",
  backgroundColor: "$gray800",
  borderRadius: "$md",
  marginTop: "$6",
})

export const BoxContent = styled("div", {
  display: "flex",
  borderRadius: "$md",
  flexDirection: "column",
  border: "1px solid $gray600",
  marginBottom: "$4",
})

export const BoxItem = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "$3 $4",

  "& + &": {
    borderTop: "1px solid $gray600",
  },
})

export const BoxDay = styled("div", {
  display: "flex",
  gap: "$3",
  alignItems: "center",
})

export const BoxTime = styled("div", {
  display: "flex",
  gap: "$2",
  alignItems: "center",

  "input::-webkit-calendar-picker-indicator": {
    filter: "invert(100%) brightness(30%)",
  },
})

export const FormErrorMessage = styled(Text, {
  marginBottom: "$4",
  color: "#dc2626",
})

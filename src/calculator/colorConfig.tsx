import { extendTheme } from "@chakra-ui/react"

export const customTheme = extendTheme({
  colors: {
    calc: {
      10: "#00A9FF",
      20: "#89CFF3",
      30: "#92C7CF",
      40: "#AAD7D9",
      50: "#FBF9F1",
      60: "#E5E1DA",
      70: "#DED0B6",
      80: "#BBAB8C",
      90: "#FF9843",
      100: "#F05941",
      110: "#BE3144",
    },
    currencyCode: {
      negative: "#FF8080", 
      positive: "#79AC78"
    }
  },
})

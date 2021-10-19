import { ChakraTheme, Colors, extendTheme, ThemeConfig } from '@chakra-ui/react'

const colors: Colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

export const theme = extendTheme({ config, colors }) as ChakraTheme

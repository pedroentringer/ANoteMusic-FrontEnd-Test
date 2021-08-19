import React, { ReactNode } from 'react'

import { ChakraProvider, ColorModeProvider, CSSReset } from '@chakra-ui/react'
import { ThemeProvider as EmotionProvider } from '@emotion/react'

import theme from '../../styles/theme'

interface ThemeProviderProps {
  children?: ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider options={{ initialColorMode: 'light' }}>
        <EmotionProvider theme={theme}>
          <CSSReset />
          {children}
        </EmotionProvider>
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default ThemeProvider

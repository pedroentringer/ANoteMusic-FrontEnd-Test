import React from 'react'

import Head from 'next/head'
import type { AppProps } from 'next/app'

import ThemeProvider from '../providers/theme/themeProvider'
import AuthProvider from '../providers/auth/authProvider'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider>
    <AuthProvider>
      <Head>
        <title>ANote Music</title>
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  </ThemeProvider>
)

export default MyApp

import type { AppProps } from 'next/app'

import { ThemeProvider } from '@mui/material'
import { theme } from '@/styles/muiTheme'

import GlobalStyles from '@/styles/globalStyles'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />

      <GlobalStyles />
    </ThemeProvider>
  )
}

export default MyApp

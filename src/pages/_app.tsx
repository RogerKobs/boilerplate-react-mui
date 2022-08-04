import type { AppProps } from 'next/app'

import { ThemeProvider } from '@mui/material'
import { theme } from '@/styles/muiTheme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp

import { createTheme, responsiveFontSizes } from '@mui/material/styles'

import { palette } from './palette'
import { typography } from './typography'
import { components } from './components'

function pxToRem(size: number): string {
  const coef = 16 / 14
  return `${(size * coef) / 16}rem`
}

const theme = createTheme({
  palette,
  typography,
  components,
})

responsiveFontSizes(theme)
export { theme, pxToRem }

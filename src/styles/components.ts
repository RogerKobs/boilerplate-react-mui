import { Components } from '@mui/material'
import { pxToRem } from './muiTheme'

export const components = {
  MuiLink: {
    styleOverrides: {
      root: {
        fontFamily: 'Roboto',
        textDecoration: 'none',
        cursor: 'pointer',
        fontSize: pxToRem(12),
        color: '#000',
        fontWeight: 500,
      },
    },
  },
} as Components

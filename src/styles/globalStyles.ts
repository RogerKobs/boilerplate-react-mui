import { createGlobalStyle } from 'styled-components'
import { palette } from './palette'

/*
  Está função cria todas as variaveis de cor baseadas na do MUI.
  Então sempre que você quiser usar a cor principal num arquivo CSS, por exemplo, basta chamar:
  var(--primary-main).
*/
const colors = Object.entries(palette).map(element =>
  Object.entries(element[1])
    .map(([property, value]) => `--${element[0]}-${property}: ${value};`)
    .join('\n'),
)

export default createGlobalStyle`
  :root {
    ${colors}
  }
`

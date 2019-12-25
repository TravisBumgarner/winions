import { createGlobalStyle } from 'styled-components'

const COLOR = {
    PRIMARY: '#744FC6',
    SECONDARY: '#4CB944',
    TERTIARY: '#FDFFFC'
}

const GlobalStyle = createGlobalStyle`
    html {
        background-color: ${COLOR.SECONDARY};
        color: ${COLOR.PRIMARY}
        font-size: 16px;
    }
`

export {
    COLOR,
    GlobalStyle
}
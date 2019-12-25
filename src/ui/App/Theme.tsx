import { createGlobalStyle } from 'styled-components'

const COLOR = {
    PRIMARY: '#744FC6',
    SECONDARY: '#1f2631',
    ACCENT: '#FDFFFC'
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
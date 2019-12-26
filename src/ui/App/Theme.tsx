import { createGlobalStyle } from 'styled-components'

const COLOR = {
    PRIMARY: '#CCD7C5',
    SECONDARY: '#101935',
    ACCENT: '#9AD4D6'
}

const GlobalStyle = createGlobalStyle`
    html {
        background-color: ${COLOR.SECONDARY};
        color: ${COLOR.PRIMARY}
        font-size: 16px;
        font-family: 'Raleway', sans-serif;
        padding: 2em;
    }
`

export {
    COLOR,
    GlobalStyle
}
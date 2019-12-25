import * as React from 'react'
import styled from 'styled-components'

import { COLOR } from '../../Theme'

const Title = styled.h1`
    font-size: 3em;
    text-transform: uppercase;
`

const HighlightedText = styled.span`
    color: ${COLOR.TERTIARY}
`

const Header = () => {
    const HighlightedTitle = "For The Winions"
        .split(' ')
        .map(word => <><HighlightedText>{word[0]}</HighlightedText>{word.slice(1)}&nbsp;&nbsp;</>)


    return (
        <Title>
            {HighlightedTitle}
        </Title >
    )
}

export default Header
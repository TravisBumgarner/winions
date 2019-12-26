import * as React from 'react'
import styled from 'styled-components'

import { COLOR } from '../../Theme'

const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 6em;
`

const Title = styled.h1`
    font-size: 5em;
    font-weight: 900;
`

const HighlightedText = styled.span`
    color: ${COLOR.ACCENT}
`

const HighlightedTitle = "For The Winions"
    .split(' ')
    .map(word => <><HighlightedText>{word[0]}</HighlightedText>{word.slice(1)}</>)

const Header = () => {
    return (
        <HeaderWrapper>
            <Title>
                <HighlightedText>F</HighlightedText>OR&nbsp;&nbsp;
                <HighlightedText>T</HighlightedText>HE&nbsp;&nbsp;
                <HighlightedText>W</HighlightedText>INIONS
            </Title >
        </HeaderWrapper>
    )
}

export default Header
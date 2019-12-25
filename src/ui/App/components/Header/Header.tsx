import * as React from 'react'
import styled from 'styled-components'

import { COLOR } from '../../Theme'

const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10vh;
`

const Title = styled.h1`
    font-size: 3em;
    font-weight: 900;
`

const HighlightedText = styled.span`
    color: ${COLOR.ACCENT}
`

const HighlightedTitle = "For The Winions"
    .split(' ')
    .map(word => <><HighlightedText>{word[0]}</HighlightedText>{word.slice(1)}</>)

const ItalicTitle = styled.span`
    text-decoration: italics;
    font-style: italic;
    font-weight: 100;
    font-size: 0.75em;
`

const Header = () => {
    return (
        <HeaderWrapper>
            <Title>
                <HighlightedText>F</HighlightedText>OR&nbsp;&nbsp;
                <HighlightedText>T</HighlightedText>HE&nbsp;&nbsp;
                <HighlightedText>W</HighlightedText>INIONS&nbsp;&nbsp;
                <ItalicTitle>(OR FOR YOU)</ItalicTitle>
            </Title >
        </HeaderWrapper>
    )
}

export default Header
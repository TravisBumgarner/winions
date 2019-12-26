import * as React from 'react'
import styled from 'styled-components'

import { SearchBar, Charts, Summoner } from './components'
import { context } from '../../Context'
import { COLOR } from '../../Theme'

const HomeWrapper = styled.div``
const ContentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 50vh;
`

const Message = styled.h2`
    font-size: 2.2em;
    font-weight: 900;
    color: ${COLOR.ACCENT}
`

const Home = () => {
    const { state } = React.useContext(context)

    const {
        isSearching,
        hasErrored,
        hasSearched
    } = state

    let Content

    if (isSearching) {
        Content = <Message>Searching...</Message>
    } else if (!hasSearched) {
        Content = <Message>Enter a Summoner in the Box above.</Message>
    } else if (hasErrored) {
        Content = <Message>Whoops, something went wrong.</Message>
    } else if (hasSearched) {
        Content = <><Summoner /><Charts /></>
    }

    return (
        <HomeWrapper>
            <SearchBar />
            <ContentWrapper>{Content}</ContentWrapper>
        </HomeWrapper>
    )
}

export default Home
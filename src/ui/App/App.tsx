import React from 'react'
import styled from 'styled-components'

import Context from './Context'
import { SearchBar, Charts, Header } from './components'
import { GlobalStyle } from './Theme'

const AppWrapper = styled.div``

const App = () => {
    return (
        <AppWrapper>
            <GlobalStyle />
            <Context>
                <Header />
                <SearchBar />
                <Charts />
            </Context>
        </AppWrapper>


    )
}

export default App
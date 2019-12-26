import React from 'react'
import styled from 'styled-components'

import Context from './Context'
import { Home, Header, Footer } from './components'
import { GlobalStyle } from './Theme'

const AppWrapper = styled.div``


const App = () => {
    return (
        <AppWrapper>
            <GlobalStyle />
            <Context>
                <Header />
                <Home />
                <Footer />
            </Context>
        </AppWrapper>


    )
}

export default App
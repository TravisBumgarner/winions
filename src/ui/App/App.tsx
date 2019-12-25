import React from 'react'

import Context from './Context'
import { SearchBar, Charts } from './components'

const App = () => {
    return (
        <Context>
            <SearchBar />
            <Charts />
        </Context>

    )
}

export default App
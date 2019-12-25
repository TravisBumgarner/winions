import React from 'react'

import Context from './Context'
import { SearchBar } from './components'

const App = () => {
    return (
        <Context>
            <SearchBar />
        </Context>

    )
}

export default App
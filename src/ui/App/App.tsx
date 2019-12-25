import React from 'react'

import { SearchBar, Reducer } from './components'

const App = () => {
    const [state, dispatch] = React.useReducer(Reducer.reducer, Reducer.EMPTY_STATE)
    console.log(state)
    return (
        <div>
            <SearchBar searchTerm={state.searchTerm} dispatch={dispatch} />
        </div >

    )
}

export default App
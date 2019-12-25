import * as React from 'react'
import axios from 'axios'

import { context, Action } from '../Context'

const handleSubmit = (summoner: string, dispatch: React.Dispatch<Action>) => {
    dispatch({ type: 'START_SEARCH' })
    axios.get(`http://localhost:5000/summoners?summoner_name=${encodeURIComponent(summoner)}`)
        .then(({ data }) => { dispatch({ type: 'END_SEARCH', data }) })
        .catch(_error => dispatch({ type: 'ERRORED' }))
}

type Props = {
}

const SearchBar = () => {
    const { state, dispatch } = React.useContext(context)
    console.log(state)
    return (
        <div>
            <label>Summoner Name:</label>
            <input
                type="text"
                name="search"
                value={state.searchTerm}
                onChange={
                    (event: React.ChangeEvent<HTMLInputElement>) => {
                        dispatch({ type: 'NEW_SEARCH_TERM', searchTerm: event.target.value })
                    }
                }
            />
            <button onClick={() => handleSubmit(state.searchTerm, dispatch)}>Search</button>
        </div >
    )
}

export default SearchBar
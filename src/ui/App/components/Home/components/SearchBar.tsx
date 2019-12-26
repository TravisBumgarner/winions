import * as React from 'react'
import axios from 'axios'
import styled from 'styled-components'

import { context, Action } from '../../../Context'
import { COLOR } from '../../../Theme'

const handleSubmit = (summoner: string, dispatch: React.Dispatch<Action>) => {
    dispatch({ type: 'START_SEARCH' })
    axios.get(`http://localhost:5000/summoners?summoner_name=${encodeURIComponent(summoner)}`)
        .then(({ data }) => { dispatch({ type: 'END_SEARCH', data }) })
        .catch(_error => dispatch({ type: 'ERRORED' }))
}

const SearchBarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3em;
`

const SearchInput = styled.input`
    background-color: ${COLOR.PRIMARY};
    color: ${COLOR.SECONDARY};
    border: 0;
    padding: 10px;
    font-size: 1em;
    width: 300px;
`

const SearchButton = styled.button` 
    background-color: ${COLOR.ACCENT}
    color: ${COLOR.SECONDARY};
    border: 0;
    padding: 10px;
    font-size: 1em;
    width: 100px;
    margin-left: 10px;
`

const SearchBar = () => {
    const { state, dispatch } = React.useContext(context)
    return (
        <SearchBarWrapper>
            <SearchInput
                autoComplete="on"
                type="text"
                name="search"
                placeholder="Summoner Name"
                value={state.searchTerm}
                onChange={
                    (event: React.ChangeEvent<HTMLInputElement>) => {
                        dispatch({ type: 'NEW_SEARCH_TERM', searchTerm: event.target.value })
                    }
                }
            />
            <SearchButton onClick={() => handleSubmit(state.searchTerm, dispatch)}>FTW</SearchButton>
        </SearchBarWrapper >
    )
}

export default SearchBar
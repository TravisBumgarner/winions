import * as React from 'react'
import axios from 'axios'

import { Reducer } from './Reducer'

const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event)
    // axios.get(`http://localhost:5000/summoners?summoner_name=${encodeURIComponent(summoner)}`)
    //     .then(response => {
    //         setSummonerDetails(response.data.summonerDetails)
    //         setSummonerMatches(response.data.summonerMatches)
    //         setMatchesMetadata(response.data.matchesMetadata)
    //         setMatchesTimeline(response.data.matchesTimeline)
    //     })
    //     .catch(_error => setHasErrored(true))
    //     .finally(() => setHasSearched(true))
}

type Props = {
    searchTerm: string
    dispatch: (action: Reducer.Action) => void
}

const SearchBar = ({ searchTerm, dispatch }) => {

    return (
        <form onSubmit={handleSubmit}>
            <label>Summoner Name:<input
                type="text"
                value={searchTerm}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: 'NEW_SEARCH_TERM', searchTerm: event.target.value })}
            /></label>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default SearchBar
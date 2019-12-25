import * as React from 'react'
import axios from 'axios'

import { context } from '../Context'

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
}

const SearchBar = () => {
    const { state, dispatch } = React.useContext(context)

    return (
        <form onSubmit={handleSubmit}>
            <label>Summoner Name:<input
                type="text"
                value={state.searchTerm}
                onChange={
                    (event: React.ChangeEvent<HTMLInputElement>) => {
                        dispatch({ type: 'NEW_SEARCH_TERM', searchTerm: event.target.value })
                    }
                }
            /></label>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default SearchBar
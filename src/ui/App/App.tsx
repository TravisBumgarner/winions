import React from 'react'
import axios from 'axios'

import { Summoner, MatchTimeline, Match, MatchMetadata } from '../../shared-types'

const App = () => {
    const [summoner, setSummoner] = React.useState<string>("finx the minx");
    const [summonerDetails, setSummonerDetails] = React.useState<Summoner | null>(null)
    const [summonerMatches, setSummonerMatches] = React.useState<Match[] | null>(null)
    const [matchesMetadata, setMatchesMetadata] = React.useState<MatchMetadata[] | null>(null)
    const [matchesTimeline, setMatchesTimeline] = React.useState<MatchTimeline[] | null>([])
    const [hasErrored, setHasErrored] = React.useState<boolean>(false)
    const [hasSearched, setHasSearched] = React.useState<boolean>(false)

    const handleSubmit = (event) => {
        setHasErrored(false)
        event.preventDefault();
        axios.get(`http://localhost:5000/summoners?summoner_name=${encodeURIComponent(summoner)}`)
            .then(response => {
                setSummonerDetails(response.data.summonerDetails)
                setSummonerMatches(response.data.summonerMatches)
                setMatchesMetadata(response.data.matchesMetadata)
                setMatchesTimeline(response.data.matchesTimeline)
            })
            .catch(_error => setHasErrored(true))
            .finally(() => setHasSearched(true))
    }

    const FormInput = (
        <form onSubmit={handleSubmit}>
            <label>
                Summoner Name:
    <input
                    type="text"
                    value={summoner}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSummoner(event.target.value)}
                />
            </label>
            <input type="submit" value="Submit" />
        </form>
    )

    let SearchResults
    if (hasErrored) {
        SearchResults = <h3>Whoops.</h3>
    } else if (!hasSearched) {
        SearchResults = <h3>Search Something.</h3>
    } else if (hasSearched && summonerDetails && matchesTimeline) {
        const MatchesMinionsKilled = matchesTimeline.map(match => {
            const matchMinionsKilled = match.map(({ minute, participantFrames: participantFramesJson }) => {
                const { minionsKilled } = JSON.parse(participantFramesJson)
                return <li>{minute} - {minionsKilled}</li>
            })
            return <ul>{matchMinionsKilled}</ul>
        })

        SearchResults = (
            <div>
                <h3>{summonerDetails.name} - {summonerDetails.id}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>{MatchesMinionsKilled}</div>
            </div>)
    } else if (hasSearched && !summonerDetails) {
        SearchResults = <h3>No user found.</h3>
    }

    return (
        <React.Fragment>
            <div>
                {FormInput}
                {SearchResults}
            </div >
        </React.Fragment>

    )
}

export default App
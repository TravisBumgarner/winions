import React from 'react'
import axios from 'axios'
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'

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

    const LEGEND = {
        minionsKilled: "Minions Killed"
    }

    const matchDataByMinute = {}
    const lines: string[] = []

    matchesTimeline.forEach((match, index) => {
        const matchMetadata = matchesMetadata.find(({ gameId }) => gameId === match[0].gameId)
        lines.push(`${matchMetadata.gameCreation}`)
        const matchMinionsKilled = match
            .filter(({ minute }) => minute % 5 === 0)
            .forEach(({ minute, participantFrames: participantFramesJson }) => {
                if (!(minute in matchDataByMinute)) {
                    matchDataByMinute[minute] = { name: minute }
                }

                const { minionsKilled } = JSON.parse(participantFramesJson)
                matchDataByMinute[minute][matchMetadata.gameCreation] = minionsKilled
            })
        return matchMinionsKilled
    })

    const Lines = lines.map(line => <Line type="monotone" dataKey={line} stroke="#8884d8" />)

    return (
        <React.Fragment>
            <div>
                {FormInput}
                <LineChart width={730} height={250} data={Object.values(matchDataByMinute)}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    {Lines}
                    <Tooltip />
                    <Legend />

                </LineChart>
            </div >
        </React.Fragment>

    )
}

export default App
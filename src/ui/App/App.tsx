import React from 'react'
import axios from 'axios'
import { ResponsiveContainer, Label, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'

import { Summoner, MatchTimeline, Match, MatchMetadata } from '../../shared-types'

const GenerateChart = (data, minute) => {
    console.log('data', data)
    const keys = Object.keys(data)
    console.log(keys)
    const Keys = keys.filter(key => key !== 'name').map(key => <Bar type="monotone" dataKey={key} fill="#CCCCCC" />)
    return (
        <div style={{ width: '50vw', display: 'inline-block' }}>
            <ResponsiveContainer width={'100%'} aspect={3}>
                <BarChart data={[data]}
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name">
                        <Label value={`${minute} Minutes Minions Killed`} offset={0} position="insideBottom" />
                    </XAxis>
                    <YAxis />
                    {Keys}
                    <Tooltip />
                    <Legend />
                </BarChart>
            </ResponsiveContainer>
        </div>)
}

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

    const chartData = {
        5: {},
        10: {},
        15: {},
        20: {}
    }

    matchesTimeline.forEach((match, index) => {
        const { gameCreation } = matchesMetadata.find(({ gameId }) => gameId === match[0].gameId)
        match
            .filter(({ minute }) => minute % 5 === 0 && minute > 0 && minute <= 20)
            .forEach(({ minute, participantFrames: participantFramesJson }) => {
                const { minionsKilled } = JSON.parse(participantFramesJson)
                chartData[minute][gameCreation] = minionsKilled
            })
    })

    const Charts = Object.keys(chartData).map(minute => GenerateChart(chartData[minute], minute))

    return (
        <React.Fragment>
            <div>
                {FormInput}
                {Charts}
            </div >
        </React.Fragment>

    )
}

export default App
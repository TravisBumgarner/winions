import React from 'react'
import axios from 'axios'
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { Summoner } from '../../shared-types'

const App = () => {
    const [summoner, setSummoner] = React.useState<string>("");
    const [summonerDetails, setSummonerDetails] = React.useState<Summoner | null>(null)
    const [hasErrored, setHasErrored] = React.useState<boolean>(false)
    const [hasSearched, setHasSearched] = React.useState<boolean>(false)

    React.useEffect(() => {
    })

    const getFoo = gql`
    {
        foo
    }`

    const handleSubmit = (event) => {
        event.preventDefault();


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
    } else if (hasSearched && summonerDetails) {
        SearchResults = <h3>{summonerDetails.name} - {summonerDetails.id}</h3>
    } else if (hasSearched && !summonerDetails) {
        SearchResults = <h3>No user found.</h3>
    }

    return (
        <React.Fragment>
            <Query query={getFoo} >
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading…</p>
                    if (error) return <p>Error</p>
                    return <p>{JSON.stringify(data)}</p>
                }}
            </Query>
            <div>
                {FormInput}
                {SearchResults}
            </div >
        </React.Fragment>

    )
}

export default App
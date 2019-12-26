import * as React from 'react'
import styled from 'styled-components'

import { COLOR } from '../../../Theme'
import { context } from '../../../Context'

const SummonerWrapper = styled.div`
    margin: 1em 0;
    border-bottom: 1px solid ${COLOR.PRIMARY};
    border-top: 1px solid ${COLOR.PRIMARY};
    padding: 1em 0;
    width: 100%;
`

const SummonerName = styled.h2`
    font-size: 3em;
    font-weight: 900;
    color: ${COLOR.ACCENT}
`

const SummonerLevel = styled.h3`
    font-size: 2em;
    font-weight: 400;
    color: ${COLOR.PRIMARY}
    margin-bottom: 0.5em;
`

const Summoner = () => {
    const { state: { summonerDetails } } = React.useContext(context)
    if (summonerDetails === null) return null

    const {
        name,
        summonerLevel,
    } = summonerDetails

    return (
        <SummonerWrapper>
            <SummonerName>Summoner: {name}</SummonerName>
            <SummonerLevel>Level: {summonerLevel}</SummonerLevel>
        </SummonerWrapper>
    )
}

export default Summoner
import axios from 'axios'

import config from '../config'
import { Summoner, Match } from '../../shared-types'

const getSummonerDetails = async (summonerName): Promise<Summoner | null> => {
    const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(summonerName)}`
    const response = await axios({
        method: 'GET',
        url: url,
        headers: {
            "X-Riot-Token": config.API_KEY,
        }
    })

    if (response.status === 200) {
        return response.data
    } else if (response.status === 404) {
        return null
    } else {
        throw new Error('Failed to call getSummonerDetails')
    }
}

const getSummonerMatches = async (accountId: string): Promise<Match[] | null> => {
    const url = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}`
    const response = await axios({
        method: 'GET',
        url: url,
        headers: {
            "X-Riot-Token": config.API_KEY,
        }
    })

    if (response.status === 200) {
        const matchesMod = response.data.matches.map(({ timestamp, ...rest }) => ({
            timestamp: new Date(timestamp),
            ...rest,
            accountId
        }))
        return matchesMod
    } else {
        throw new Error('Failed to call getSummonerMatches')
    }
}

export { getSummonerDetails, getSummonerMatches }
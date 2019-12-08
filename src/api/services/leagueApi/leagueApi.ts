import axios from 'axios'

import * as config from '../../../../config'
import { Summoner, Match, MatchMetadata } from '../../../shared-types'

const getSummonerDetails = async (summonerName): Promise<Summoner | null> => {
    const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(summonerName)}`
    try {
        const response = await axios({
            method: 'GET',
            url: url,
            headers: {
                "X-Riot-Token": config.LEAGUE_API_KEY,
            }
        })
        console.log("getSummonerDetails", response.status)
        if (response.status === 200) {
            return response.data
        } else if (response.status === 404) {
            return null
        } else {
            throw new Error(`Failed to call getSummonerDetails: ${response.status}`)
        }
    } catch (error) {
        console.log(`Failed to call getSummonerDetails: ${JSON.stringify(error.message)}`)
        return null
    }
}

const getSummonerMatches = async (accountId: string, beginIndex: number = 0, endIndex: number): Promise<Match[]> => {
    const url = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}`
    const response = await axios({
        method: 'GET',
        url: url,
        headers: {
            "X-Riot-Token": config.LEAGUE_API_KEY,
        },
        params: {
            beginIndex,
            endIndex
        }
    })

    if (response.status === 200) {
        const matchesMod = response.data.matches.map(({ timestamp, ...rest }) => ({
            timestamp: new Date(timestamp),
            ...rest,
            accountId
        }))
        return matchesMod
    }
    if (response.status === 404 || response.status === 429) {
        console.log('Rate Limit exceeded or 404 with getSummonerMatches')
        return []
    } else {
        throw new Error('Failed to call getSummonerMatches')
    }
}

const bootstrapSummonerMatches = async (accountId: string): Promise<Match[] | null> => {
    let beginIndex = 0
    let endIndex = 3 // This can in increased later. For now get it working with this number
    const matches: Match[] = []

    while (beginIndex < 20) { // This can in increased later. For now get it working with 100.
        const response = await getSummonerMatches(accountId, beginIndex, endIndex)

        if (response && response.length) {
            matches.push(...response)
            beginIndex += 100
        } else {
            break
        }
    }
    return matches
}

const getMatchMetadata = async (matchId: number): Promise<MatchMetadata | null> => {
    const url = `https://na1.api.riotgames.com/lol/match/v4/matches/${matchId}`
    const response = await axios({
        method: 'GET',
        url: url,
        headers: {
            "X-Riot-Token": config.LEAGUE_API_KEY,
        },
        params: {
        }
    })

    if (response.status === 200) {
        return response.data
    }
    if (response.status === 404 || response.status === 429) {
        console.log('Rate Limit exceeded or 404 with getMatchMetadata')
        return null
    } else {
        throw new Error('Failed to call getMatchMetadata')
    }
}

export { getSummonerDetails, getSummonerMatches, bootstrapSummonerMatches, getMatchMetadata }
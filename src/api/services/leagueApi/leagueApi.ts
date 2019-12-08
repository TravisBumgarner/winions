import axios from 'axios'

import * as config from '../../../../config'
import { Summoner, Match, MatchMetadata, MatchTimeline } from '../../../shared-types'

const makeLeagueRequest = async (url, apiNameForErrorHandling, params = {}) => {
    try {
        const response = await axios({
            method: 'GET',
            url: url,
            headers: {
                "X-Riot-Token": config.LEAGUE_API_KEY,
            },
            params
        })

        if (response.status === 200) {
            return response.data
        } else if (
            response.status === 404
        ) {
            return null
        } else if (
            response.status === 403
            || response.status === 429
        ) {
            console.log(`Received status code: ${response.status} for ${apiNameForErrorHandling}`)
            return null
        } else {
            throw new Error(`Failed to call ${apiNameForErrorHandling}: ${response.status}`)
        }
    } catch (error) {
        console.log(`Failed to call ${apiNameForErrorHandling}: ${JSON.stringify(error.message)}`)
        return null
    }
}

const getSummonerDetails = async (summonerName): Promise<Summoner | null> => {
    const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(summonerName)}`
    const summonerDetails = await makeLeagueRequest(url, 'getSummonerDetails')
    return summonerDetails
}

const getSummonerMatches = async (accountId: string, beginIndex: number = 0, endIndex: number): Promise<Match[] | null> => {
    const url = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}`
    const params = {
        beginIndex,
        endIndex
    }
    const data = await makeLeagueRequest(url, 'getSummonerMatches', params)

    if (data.matches) {
        const matchesMod = data.matches.map(({ timestamp, ...rest }) => ({
            timestamp: new Date(timestamp),
            ...rest,
            accountId
        }))
        return matchesMod
    } else {
        return null
    }
}

const bootstrapSummonerMatches = async (accountId: string): Promise<Match[] | null> => {
    let beginIndex = 0
    let endIndex = 3 // This can in increased later. For now get it working with this number
    const matches: Match[] = []

    while (beginIndex < 20) { // This can in increased later. For now get it working with 100.
        const matchSubset = await getSummonerMatches(accountId, beginIndex, endIndex)

        if (matchSubset && matchSubset.length) {
            matches.push(...matchSubset)
            beginIndex += 100
        } else {
            break
        }
    }
    return matches
}

const getMatchMetadata = async (gameId: number, accountId: string): Promise<MatchMetadata | null> => {
    const url = `https://na1.api.riotgames.com/lol/match/v4/matches/${gameId}`
    const matchMetadata = await makeLeagueRequest(url, 'getMatchMetadata')

    const {
        seasonId,
        queueId,
        gameVersion,
        platformId,
        gameMode,
        mapId,
        gameType,
        gameDuration,
        gameCreation,
        participantIdentities
    } = matchMetadata

    const { participantId } = participantIdentities.find(({ player }) => { player.accountId === accountId })
    
    return {
        gameId,
        seasonId,
        queueId,
        gameVersion,
        platformId,
        gameMode,
        mapId,
        gameType,
        gameDuration,
        gameCreation: new Date(gameCreation),
        participantId,
        accountId
    }
}

const getMatchTimeline = async (gameId: number): Promise<MatchTimeline | null> => {
    const url = `https://na1.api.riotgames.com/lol/match/v4/timelines/by-match/${gameId}`
    const matchTimeline = await makeLeagueRequest(url, 'getMatchTimeline')

    const matchTimelineMod = matchTimeline.frames.map(({ timestamp, participantFrames, events }) => {
        return {
            timestamp: new Date(timestamp),
            participantFrames: JSON.stringify(participantFrames),
            events: JSON.stringify(events),
            gameId
        }
    })

    return matchTimelineMod
}

export { getSummonerDetails, getSummonerMatches, bootstrapSummonerMatches, getMatchMetadata, getMatchTimeline }
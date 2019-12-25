import axios from 'axios'

import * as config from '../../../../config'
import { Summoner, Match, Metadata, Timeline, ParticipantFrame } from '../../../shared-types'
import { LeagueSummoner, LeagueMatch, LeagueMetadata, LeagueTimeline, LeagueParticipantFrame } from './LeagueApi.types'

const makeLeagueRequest = async (url: string, apiNameForErrorHandling: string, params = {}) => {
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

const getSummonerDetails = async (summonerName: string): Promise<Summoner | null> => {
    const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(summonerName)}`
    const summonerDetails = await makeLeagueRequest(url, 'getSummonerDetails')
    return summonerDetails
}

const getMatches = async (accountId: string, beginIndex: number = 0, endIndex: number): Promise<Match[] | null> => {
    const url = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}`
    const params = {
        beginIndex,
        endIndex
    }
    const data = await makeLeagueRequest(url, 'getSummonerMatches', params)

    if (data.matches) {
        const matchesMod = data.matches.map(({ timestamp, ...rest }: Match) => ({
            timestamp: new Date(timestamp),
            ...rest,
            accountId
        }))
        return matchesMod
    } else {
        return null
    }
}

const bootstrapMatches = async (accountId: string): Promise<Match[] | null> => {
    let beginIndex = 0
    let endIndex = 3 // This can in increased later. For now get it working with this number
    const matches: Match[] = []

    while (beginIndex < 20) { // This can in increased later. For now get it working with 100.
        const matchSubset = await getMatches(accountId, beginIndex, endIndex)

        if (matchSubset && matchSubset.length) {
            matches.push(...matchSubset)
            beginIndex += 100
        } else {
            break
        }
    }
    return matches
}

const getMetadata = async (gameId: number, accountId: string): Promise<Metadata | null> => {
    const url = `https://na1.api.riotgames.com/lol/match/v4/matches/${gameId}`
    const metadata = await makeLeagueRequest(url, 'metadata')

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
    } = metadata

    const { participantId } = participantIdentities.find(({ player }: { player: Summoner }) => player.accountId === accountId)

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

const getTimeline = async (gameId: number, participantId: number): Promise<Timeline | null> => {
    const url = `https://na1.api.riotgames.com/lol/match/v4/timelines/by-match/${gameId}`
    const timeline: LeagueTimeline = await makeLeagueRequest(url, 'getTimeline')

    const getParticipantFrameMod = (participantFrames: ParticipantFrame) => {
        return Object.values(participantFrames).find((participantFrame) => participantFrame.participantId === participantId)
    }

    const millisecondsToMinutes = (ms: number) => Math.round(ms / 60000)

    const timelineMod: Timeline = timeline.frames.map(({ timestamp, participantFrames }) => {
        return {
            timestamp: new Date(timestamp),
            minute: millisecondsToMinutes(timestamp),
            participantFrames: JSON.stringify(getParticipantFrameMod(participantFrames)),
            gameId
        }
    })

    return timelineMod
}

export { getSummonerDetails, getMatches, bootstrapMatches, getMetadata, getTimeline }
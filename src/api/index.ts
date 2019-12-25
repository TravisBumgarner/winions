import express, { Request, Response } from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'

import { leagueApi } from './services'
import * as database from './database'
import { Summoner, Match, Metadata, Timeline } from '../shared-types'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

app.get('/health-check', (request: Request, response: Response) => {
    response.status(200).send('Ok.')
})

app.use('/static', express.static(path.resolve(__dirname + '/dist')))
app.use('/media', express.static(path.resolve(__dirname + '/media')))


const getSummonerDetails = async (request: Request) => {
    let summonerDetails: Summoner | null
    summonerDetails = await database.summoners.selectBySummonerName(request.query.summoner_name)

    if (!summonerDetails) {
        summonerDetails = await leagueApi.getSummonerDetails(request.query.summoner_name)
        if (summonerDetails) {
            await database.summoners.insert(summonerDetails)
        }
    }

    return summonerDetails
}

const getSummonerMatches = async (accountId: string) => {
    let summonerMatches: Match[] | null

    summonerMatches = await database.matches.selectByAccountId(accountId)
    if (!summonerMatches.length) {
        summonerMatches = await leagueApi.bootstrapMatches(accountId)
        if (summonerMatches) {
            await database.matches.insert(accountId, summonerMatches)
        }
    }
    return summonerMatches
}

const getMetadata = async (gameId: number, accountId: string) => {
    let metadata: Metadata | null

    metadata = await database.metadata.selectByGameId(gameId)
    if (!metadata) {
        metadata = await leagueApi.getMetadata(gameId, accountId)
        if (metadata) {
            await database.metadata.insert(metadata)
        }
    }
    return metadata
}

const getMetadataBatch = async (gameIds: number[], accountId: string) => {
    const metadata = await Promise.all(gameIds.map(gameId => getMetadata(gameId, accountId)))

    // Typescript won't let you filter to do type refinement on the return from getMatchMetadata
    const metadataMod: Metadata[] = []
    metadata.forEach(e => e && metadataMod.push(e))

    return metadataMod
}

const getTimeline = async (gameId: number, participantId: number) => {
    let timeline: Timeline | null

    timeline = await database.timeline.selectByGameId(gameId)
    if (!timeline) {
        timeline = await leagueApi.getTimeline(gameId, participantId)
        if (timeline) {
            await database.timeline.insert(gameId, timeline)
        }
    }
    return timeline
}

const getTimelines = async (gameAndParticipantIds: { gameId: number, participantId: number }[]) => {
    const timeline = Promise.all((gameAndParticipantIds).map(({ gameId, participantId }) => getTimeline(gameId, participantId)))
    return timeline
}


app.get('/summoners', async (request: Request, response: Response) => {
    const summonerDetails = await getSummonerDetails(request)
    if (!summonerDetails) {
        return response.status(404).send({ msg: "Summoner not found." })
    }

    const summonerMatches = await getSummonerMatches(summonerDetails.accountId)

    if (!summonerMatches || !summonerMatches.length) {
        return response.status(404).send({ msg: "No matches found for summoner." })
    }

    const gameIds = summonerMatches.map(({ gameId }) => gameId)
    let matchesMetadata = await getMetadataBatch(gameIds, summonerDetails.accountId)
    matchesMetadata = matchesMetadata.filter(a => a)

    const gameAndParticipantIds = matchesMetadata.map(({ participantId, gameId }) => ({ participantId, gameId }))
    const matchesTimeline = await getTimelines(gameAndParticipantIds)

    response
        .status(200)
        .send({
            summonerDetails,
            matches: summonerMatches,
            metadata: matchesMetadata,
            timelines: matchesTimeline
        })
})

const port = 5000
app.listen(port, () => {
    console.log(`Running on port ${port}`)
})
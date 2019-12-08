import express, { Request, Response } from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'

import { leagueApi } from './services'
import * as database from './database'
import { Summoner, Match, MatchMetadata, MatchTimeline } from '../shared-types'

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
        summonerMatches = await leagueApi.bootstrapSummonerMatches(accountId)
        if (summonerMatches) {
            await database.matches.insert(accountId, summonerMatches)
        }
    }
    return summonerMatches
}

const getMatchMetadata = async (gameId: number) => {
    let matchMetadata: MatchMetadata | null

    matchMetadata = await database.matchMetadata.selectByGameId(gameId)
    if (!matchMetadata) {
        matchMetadata = await leagueApi.getMatchMetadata(gameId)
        if (matchMetadata) {
            await database.matchMetadata.insert(matchMetadata)
        }
    }
    return matchMetadata
}

const getMatchesMetadata = async (gameIds: number[]) => {
    const matchesMetadata = Promise.all(gameIds.map(gameId => getMatchMetadata(gameId)))
    return matchesMetadata
}

const getMatchTimeline = async (gameId: number) => {
    let matchTimeline: MatchTimeline | null

    matchTimeline = await database.matchTimeline.selectByGameId(gameId)
    if (!matchTimeline) {
        matchTimeline = await leagueApi.getMatchTimeline(gameId)
        if (matchTimeline) {
            await database.matchTimeline.insert(gameId, matchTimeline)
        }
    }
    return matchTimeline
}

const getMatchesTimeline = async (gameIds: number[]) => {
    const matchesTimeline = Promise.all(gameIds.map(gameId => getMatchTimeline(gameId)))
    return matchesTimeline
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
    const matchesMetadata = await getMatchesMetadata(gameIds)
    const matchesTimeline = await getMatchesTimeline(gameIds)

    response
        .status(200)
        .send({
            summonerDetails,
            summonerMatches,
            matchesMetadata,
            matchesTimeline
        })
})

const port = 5000
app.listen(port, () => {
    console.log(`Running on port ${port}`)
})
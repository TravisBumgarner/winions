import express, { Request, Response } from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'

import { leagueApi } from './services'
import * as database from './database'
import { Summoner, Match } from '../shared-types'

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

// app.get('*', (request: Request, response: Response) => {
//     response.sendFile(path.resolve(__dirname, 'index.html'))
// })

app.get('/summoners', async (request: Request, response: Response) => {
    let summonerDetails: Summoner | null
    summonerDetails = await database.summoners.selectBySummonerName(request.query.summoner_name)[0]

    if (!summonerDetails) {
        summonerDetails = await leagueApi.getSummonerDetails(request.query.summoner_name)
        if (summonerDetails) {
            await database.summoners.insert(summonerDetails)
        }
    }

    if (!summonerDetails) {
        return response.status(404).send({ msg: "Summoner not found." })
    }

    let summonerMatches: Match[] | null
    summonerMatches = await database.matches.selectByAccountId(summonerDetails.accountId)

    if (!summonerMatches.length) {
        summonerMatches = await leagueApi.getSummonerMatches(summonerDetails.accountId)
        if (summonerMatches) {
            await database.matches.insert(summonerDetails.accountId, summonerMatches)
        }
    }

    if (!summonerMatches) {
        return response.status(404).send({ msg: "No matches found for summoner." })
    }

    response
        .status(200)
        .send({
            summonerDetails,
            summonerMatches
        })
})

const port = 5000
app.listen(port, () => {
    console.log(`Running on port ${port}`)
})
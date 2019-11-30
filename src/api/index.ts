import express, { Request, Response } from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'

import { leagueApi } from './services'
import * as database from './database'
import { Summoner } from '../shared-types'

const port = 5000
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

app.use('/static', express.static(path.resolve(__dirname + '/dist')))
app.use('/media', express.static(path.resolve(__dirname + '/media')))

// app.get('*', (request: Request, response: Response) => {
//     response.sendFile(path.resolve(__dirname, 'index.html'))
// })

app.get('/summoners', async (request: Request, response: Response) => {
    let summonerDetails: Summoner | null
    summonerDetails = await database.summoners.select(request.query.summoner_name)[0]

    if (!summonerDetails) {
        summonerDetails = await leagueApi.getSummonerDetails(request.query.summoner_name)

        if (summonerDetails) {
            await database.summoners.insert(summonerDetails)
        }
    }

    response
        .status(200)
        .send(summonerDetails)
})

app.listen(port)
console.log('server started on port ' + port)
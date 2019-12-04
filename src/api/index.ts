import express, { Request, Response } from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import axios from 'axios'

import * as config from './config'

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

app.get('/mbta', async (request: Request, response: Response) => {
    const { data } = await axios.get(`${config.MBTA_BASE_URL}/routes`, {
        params: {

        },
        headers: {
            'x-api-key': config.MBTA_API_KEY
        }
    })
    console.log(data)
})

app.use('/static', express.static(path.resolve(__dirname + '/dist')))
app.use('/media', express.static(path.resolve(__dirname + '/media')))

// app.get('*', (request: Request, response: Response) => {
//     response.sendFile(path.resolve(__dirname, 'index.html'))
// })

const port = 5000
app.listen(port, () => {
    console.log(`Running on port ${port}`)
})
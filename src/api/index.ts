import express, { Request, Response } from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'

import { mbta } from './services'
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

const formatDateToTime = (dateStr) => {
    const date = new Date(dateStr)
    const hours = date.getHours() % 12
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    return `${hours}:${minutes}`
}

const calculateTimeToDeparture = (dateStr) => {
    const now = Date.now()
    const then = new Date(dateStr).getTime()
    const difference_in_seconds = (then - now) / 1000

    const rawMinutes = Math.floor(difference_in_seconds / 60)
    const minutes = rawMinutes < 10 ? '0' + rawMinutes : rawMinutes

    const rawSeconds = Math.round(difference_in_seconds - rawMinutes * 60)
    const seconds = rawSeconds < 10 ? '0' + rawSeconds : rawSeconds
    return `${minutes}:${seconds}`
}

const ROUTE_LOOKUP = {
    '86': '86',
    '91': '91',
    '747': 'CT2'
}

const getStopPredictions = async (stop) => {
    const stopPredictions = await mbta.predictions(stop)

    return stopPredictions.map(prediction => {
        const departure = formatDateToTime(prediction.attributes.departure_time)
        const route = ROUTE_LOOKUP[prediction.relationships.route.data.id]
        const timeToDeparture = calculateTimeToDeparture(prediction.attributes.departure_time)
        return { route, departure, timeToDeparture }
    })
}

app.get('/mbta', async (request: Request, response: Response) => {
    // console.log(await mbta.routeDetails('83'))
    // console.log(await mbta.routeDetails('87'))
    // console.log(await mbta.routeDetails('747')) // CT2
    const routeDetails = await mbta.routeDetails('91')
    const routeStops = await mbta.stopsByRouteAndName('747', 'mcgrath')
    // routeStops.forEach(route => console.log(route.id, route.attributes.name))

    const STOPS = [
        {
            id: '2773',
            intersection: 'Washington St & Merriam St',
            nickname: 'Police Station to Sullivan'
        },
        {
            id: '2774',
            intersection: 'Washington St @ McGrath Hwy ',
            nickname: 'Dealership to Sullivan'
        },
        {
            id: '2610',
            intersection: 'Washington St @ Washington Terr',
            nickname: 'Police Station to Sullivan'
        },
    ]

    const stopPredictions = STOPS.map(async stop => {
        const stopPredictions = await getStopPredictions(stop.id)
        return { ...stop, stopPredictions }
    })

    response.set('Content-Type', 'text/json').send(await Promise.all(stopPredictions))

})

app.use('/static', express.static(path.resolve(__dirname + '/dist')))
app.use('/media', express.static(path.resolve(__dirname + '/media')))

// app.get('*', (request: Request, response: Response) => {
//     response.sendFile(path.resolve(__dirname, 'index.html'))
// })

const port = 5000
app.listen(port, () => {
    console.log(`Running on port ${port} `)
})
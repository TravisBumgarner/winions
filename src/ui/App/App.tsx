import React from 'react'
import styled from 'styled-components'

import { mbta } from './services'
import { useInterval } from './utilities'

const StopWrapper = styled.div`

`

const StopsWrapper = styled.div`
    display: flex;
    width: calc(100vw - 60px);
    justify-content: space-between;
    margin: 30px;
`

const Intersection = styled.h2`

`

const Nickname = styled.h3`
`

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

const STOP_IDS = STOPS.map(({ id }) => id)

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

const getStopPredictions = (stop) => {
    const predictions = mbta
        .predictions(stop)
        .then(predictions => {
            return predictions.map(prediction => {
                const departure = formatDateToTime(prediction.attributes.departure_time)
                const route = ROUTE_LOOKUP[prediction.relationships.route.data.id]
                const timeToDeparture = calculateTimeToDeparture(prediction.attributes.departure_time)
                return { route, departure, timeToDeparture }
            })
        })
    return predictions
}

const getPredictions = () => {
    const predictions = Promise
        .all(STOP_IDS.map(id => getStopPredictions(id)))
        .then(predictionsForStop => {
            const output = {}
            predictionsForStop.forEach((prediction, index) => {
                const stopId = STOP_IDS[index]
                output[stopId] = prediction
            })
            return output
        })
    return predictions
}

const App = () => {
    const [predictions, setPredictions] = React.useState<any>({})

    React.useEffect(() => {
        getPredictions().then(setPredictions)
    }, [])

    useInterval(() => {
        getPredictions().then(setPredictions)
    }, 10000)

    const Predictions = STOP_IDS.map(id => {
        if (!Object.keys(predictions).length) {
            return
        }
        const StopPredictions = predictions[id].map((prediction, index) => <li key={index}>{prediction.route} {prediction.departure} {prediction.timeToDeparture}</li>)
        const { intersection, nickname } = STOPS.find((stop) => stop.id === id)
        const stopNickname = <Nickname>{nickname}</Nickname>
        const stopIntersection = <Intersection>{intersection}</Intersection>

        return (

            <StopWrapper>
                {stopIntersection}
                {stopNickname}
                <ul key={id}>
                    {StopPredictions}
                </ul>
            </StopWrapper>


        )
    })

    return (
        <StopsWrapper>
            {Predictions}
        </StopsWrapper>
    )
}

export default App
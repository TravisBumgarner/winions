import * as React from 'react'

import { context } from '../../Context'
import { MinionsChart } from './components'

const truncateDate = (rawDate: any) => {
    const [date, _time] = rawDate.split('T')
    const [_year, month, day] = date.split('-')
    return `${month}-${day}`

}

const Charts = () => {
    const { state } = React.useContext(context)

    const {
        matches,
        metadata,
        timelines,
        summoner
    } = state

    if (matches === null || metadata === null || timelines === null) return null

    const timelinesBandaid = timelines.reduce((accum, timeline) => [...accum, ...timeline], [])
    const allFilteredTimelines: any[] = []

    metadata
        .forEach(({ gameId, gameCreation }) => {
            const filteredTimelines: any[] = timelinesBandaid.filter(t => {
                return t.minute > 0
                    && t.minute % 5 === 0
                    && t.minute <= 20
                    && t.gameId == gameId
            }).map((timeline) => ({ timeline, gameCreation: truncateDate(gameCreation) }))

            allFilteredTimelines.push(...filteredTimelines)
        })

    const Min5Data: any[] = []
    const Min10Data: any[] = []
    const Min15Data: any[] = []
    const Min20Data: any[] = []

    allFilteredTimelines.forEach(({ timeline: { minute, participantFrames }, gameCreation }) => {
        const { minionsKilled } = JSON.parse(participantFrames)

        if (minute === 5) {
            Min5Data.push({ name: gameCreation, kills: minionsKilled })
        } else if (minute === 10) {
            Min10Data.push({ name: gameCreation, kills: minionsKilled })
        } else if (minute === 15) {
            Min15Data.push({ name: gameCreation, kills: minionsKilled })
        } else if (minute === 20) {
            Min20Data.push({ name: gameCreation, kills: minionsKilled })
        }
    })
    return (
        <div style={{ width: '100vw', height: '400px', display: 'flex' }}>
            <h2>Charts for {summoner}</h2>
            <MinionsChart minute={'5'} data={Min5Data} />
            <MinionsChart minute={'10'} data={Min10Data} />
            <MinionsChart minute={'15'} data={Min15Data} />
            <MinionsChart minute={'20'} data={Min20Data} />
        </div>
    )
}

export default Charts
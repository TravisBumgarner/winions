import * as React from 'react'
import styled from 'styled-components'

import { context } from '../../../../Context'
import { MinionsChart } from './components'
import { COLOR } from '../../../../Theme'

const truncateDate = (rawDate: any) => {
    const [date, _time] = rawDate.split('T')
    const [_year, month, day] = date.split('-')
    return `${month}-${day}`

}

const ChartsWrapper = styled.div`
`

const ChartWrapper = styled.div`
    margin-bottom: 2em;
    margin-top: 2em;
`

const ChartSectionTitle = styled.h2`
    font-size: 2.2em;
    font-weight: 900;
    color: ${COLOR.ACCENT}
    text-align: center;
    margin-bottom: 1em;
`

const MinionsChartWrapper = styled.div`
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: space-between;
`

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
        <ChartsWrapper>
            <ChartWrapper>
                <ChartSectionTitle>{`CS By Minute`}</ChartSectionTitle>
                <MinionsChartWrapper >
                    <MinionsChart minute={'5'} data={Min5Data} />
                    <MinionsChart minute={'10'} data={Min10Data} />
                    <MinionsChart minute={'15'} data={Min15Data} />
                    <MinionsChart minute={'20'} data={Min20Data} />
                </MinionsChartWrapper>
            </ChartWrapper>
        </ChartsWrapper>
    )
}

export default Charts
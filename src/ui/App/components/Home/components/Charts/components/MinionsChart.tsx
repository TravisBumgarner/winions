import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import React from 'react'
import styled from 'styled-components'

import { COLOR } from '../../../../../Theme'

const MinionsChartWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const ChartTitle = styled.h3`
    font-size: 1.5em;
    text-align: center;
    margin-bottom: 0.25em;
    color: ${COLOR.ACCENT};
`

type Props = {
    minute: string
    data: {
        name: string,
        kills: number
    }[]
}

const MinionsChart = ({ minute, data }: Props) => {
    return (
        <MinionsChartWrapper>
            <ChartTitle>{`${minute} Minutes`}</ChartTitle>
            <ResponsiveContainer width={300} height={300}>
                <BarChart data={data} margin={{ top: 0, right: 20, bottom: 20, left: 0 }}>
                    <CartesianGrid stroke={COLOR.ACCENT} strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke={COLOR.ACCENT} />
                    <YAxis stroke={COLOR.ACCENT} width={40} />
                    <Bar
                        dataKey="kills"
                        fill={COLOR.PRIMARY}
                    />
                </BarChart>
            </ResponsiveContainer>
        </MinionsChartWrapper >
    )
}

export default MinionsChart

import { ResponsiveContainer, Label, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import React from 'react'
import styled from 'styled-components'

const MinionsChartWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const ChartTitle = styled.h3`
    font-size: 1.5em;
    text-align: center;
    margin-bottom: 0.25em;
`

import { COLOR } from '../../../Theme'

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
            <ResponsiveContainer width={300} height={300}>
                <BarChart data={data} margin={{ top: 0, right: 20, bottom: 20, left: 0 }}>
                    <CartesianGrid stroke={COLOR.ACCENT} strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke={COLOR.PRIMARY} />
                    <YAxis stroke={COLOR.PRIMARY} width={40} />
                    <Tooltip cursor={{ fill: 'transparent' }} />
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

import { ResponsiveContainer, Label, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import React from 'react'

type Props = {
    minute: string
    data: {
        name: string,
        kills: number
    }[]
}

const MinionsChart = ({ minute, data }: Props) => {
    return (
        <ResponsiveContainer width={300} height="80%">
            <BarChart data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name">
                    <Label
                        value={`Kills at ${minute} Minutes`}
                        offset={0}
                        position="insideTop" />
                </XAxis>
                <YAxis />
                <Tooltip />
                <Bar
                    dataKey="kills"
                    fill="#8884d8"

                />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default MinionsChart

// import { ResponsiveContainer, Label, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'
import React from 'react'

// const GenerateChart = (data, minute) => {
//     console.log('data', data)
//     const keys = Object.keys(data)
//     console.log(keys)
//     const Keys = keys.filter(key => key !== 'name').map(key => <Bar type="monotone" dataKey={key} fill="#CCCCCC" />)
//     return (
//         <div style={{ width: '50vw', display: 'inline-block' }}>
//             <ResponsiveContainer width={'100%'} aspect={3}>
//                 <BarChart data={[data]}
//                     margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name">
//                         <Label value={`${minute} Minutes Minions Killed`} offset={0} position="insideBottom" />
//                     </XAxis>
//                     <YAxis />
//                     {Keys}
//                     <Tooltip />
//                     <Legend />
//                 </BarChart>
//             </ResponsiveContainer>
//         </div>)
// }
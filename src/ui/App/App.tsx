import React from 'react'
import axios from 'axios'

const App = () => {
    React.useEffect(() => {
        axios.get('http://localhost:5000/helloworld').then(response => console.log(response.data))
    })

    return <div>Hello World.</div>
}

export default App
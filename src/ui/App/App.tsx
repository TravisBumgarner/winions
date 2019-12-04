import React from 'react'
import axios from 'axios'

const App = () => {
    const [hasErrored, setHasErrored] = React.useState<boolean>(false)
    const [hasSearched, setHasSearched] = React.useState<boolean>(false)


    let Content
    if (hasErrored) {
        Content = <h3>Whoops.</h3>
    } else if (!hasSearched) {
        Content = <h3>Search Something.</h3>
    } else if (hasSearched) {
        Content = <h3>Hi.</h3>
    }

    return (
        <div>
            {Content}
        </div >
    )
}

export default App
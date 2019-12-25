import * as React from 'react'

type State = {
    hasErrored: boolean
    hasSearched: boolean
    isSearching: boolean
    searchTerm: string
}

const EMPTY_STATE: State = {
    hasErrored: false,
    hasSearched: false,
    isSearching: false,
    searchTerm: 'finx the minx'
}

const context = React.createContext<State>({
    ...EMPTY_STATE
})

type ErroredAction = { type: 'ERRORED' }
type NewSearchTerm = { type: 'NEW_SEARCH_TERM', searchTerm: string }
type NewSearchAction = { type: 'NEW_SEARCH' }

type Action = ErroredAction | NewSearchAction | NewSearchTerm

const reducer = (state: State, action: Action): State => {
    console.log(action)
    switch (action.type) {
        case 'NEW_SEARCH': {
            return { ...state, isSearching: true }
        }
        case 'ERRORED': {
            return { ...state, hasErrored: true, isSearching: false }
        }
        case 'NEW_SEARCH_TERM': {
            console.log('new searrch term')
            return { ...state, searchTerm: action.searchTerm }
        }
    }
}

// const ResultsContext = ({ children }) => {
//     const [state, dispatch] = React.useReducer(reducer, EMPTY_STATE)

//     const Provider = context.Provider

//     return (
//         <Provider value={{ ...state }}>
//             {children}
//         </Provider>
//     )
// }

export { reducer, EMPTY_STATE, Action }

import * as React from 'react'

type State = {
    hasErrored: boolean
    hasSearched: boolean
    isSearching: boolean
}

const EMPTY_STATE: State = {
    hasErrored: false,
    hasSearched: false,
    isSearching: false
}

const context = React.createContext<State>({
    ...EMPTY_STATE
})

type ErroredAction = { type: 'ERRORED' }
type NewSearchAction = { type: 'NEW_SEARCH' }

type ActionType = ErroredAction | NewSearchAction

const reducer = (state: State, action: ActionType): State => {
    switch (action.type) {
        case 'NEW_SEARCH': {
            return { ...state, isSearching: true }
        }
        case 'ERRORED': {
            return { ...state, hasErrored: true, isSearching: false }
        }
    }
}

const ResultsContext = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, EMPTY_STATE)

    const Provider = context.Provider

    return (
        <Provider value={{ ...state }}>
            {children}
        </Provider>
    )
}

export default ResultsContext
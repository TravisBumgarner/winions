import * as React from 'react'

import { Summoner, Match, Metadata, Timeline } from '../../shared-types'

type State = {
    hasErrored: boolean
    hasSearched: boolean
    isSearching: boolean
    searchTerm: string
    summonerDetails: Summoner | null
    matches: Match[] | null
    metadata: Metadata[] | null
    timelines: Timeline[] | null
}

const EMPTY_STATE: State = {
    hasErrored: false,
    hasSearched: false,
    isSearching: false,
    searchTerm: '',
    summonerDetails: null,
    matches: null,
    metadata: null,
    timelines: null
}

const context = React.createContext({ state: EMPTY_STATE, dispatch: () => { } } as { state: State, dispatch: React.Dispatch<Action> })

type EndSearchAction = {
    type: 'END_SEARCH'
    data: {
        summonerDetails: Summoner | null
        matches: Match[] | null
        metadata: Metadata[] | null
        timelines: Timeline[] | null
    }
}
type ErroredAction = { type: 'ERRORED' }
type NewSearchTermAction = { type: 'NEW_SEARCH_TERM', searchTerm: string }
type StartSearchAction = { type: 'START_SEARCH' }

type Action =
    EndSearchAction |
    ErroredAction |
    NewSearchTermAction |
    StartSearchAction

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'END_SEARCH': {
            const { summonerDetails, matches, metadata, timelines } = action.data
            return { ...state, isSearching: false, hasSearched: true, summonerDetails, matches, metadata, timelines }
        }
        case 'ERRORED': {
            return { ...state, hasErrored: true, isSearching: false }
        }
        case 'NEW_SEARCH_TERM': {
            return { ...state, searchTerm: action.searchTerm }
        }
        case 'START_SEARCH': {
            return { ...state, hasErrored: false, isSearching: true, searchTerm: ''}
        }
    }
}

const ResultsContext = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, EMPTY_STATE)

    const Provider = context.Provider

    return (
        <Provider value={{ state, dispatch }}>
            {children}
        </Provider>
    )
}

export default ResultsContext
export { context, Action }

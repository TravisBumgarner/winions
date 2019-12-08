type Summoner = {
    id: string,
    accountId: string,
    puuid: string,
    name: string,
    profileIconId: number,
    revisionDate: number,
    summonerLevel: number
}

// https://riot-api-libraries.readthedocs.io/en/latest/roleid.html
type Match = {
    lane: string
    gameId: number
    champion: number
    platformId: string
    timestamp: number
    queue: number
    role: string
    season: number
    accountId: string
}

type MatchMetadata = {
    seasonId: number,
    queueId: number,
    gameId: number,
    participantIdentities: {
        player: {
            currentPlatformId: string,
            summonerName: string,
            matchHistoryUri: string,
            platformId: string,
            currentAccountId: string,
            profileIcon: number,
            summonerId: string,
            accountId: string
        }
        participantId: number
    }[]
    gameVersion: string
    platformId: string
    gameMode: string
    mapId: number
    gameType: string
    teams: any[] // This can be expanded upon later.
    participants: any[] // This can be expanded upon later.
    gameDuration: number
    gameCreation: number
}

export { Summoner, Match, MatchMetadata }
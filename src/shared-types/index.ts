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

type MatchTimeline = {
    frameInterval: number
    frames: {
        timestamp: number
        events: any[]  // This can be expanded upon later.
        participantFrames: {
            [key: string]: {
                totalGold: number
                teamScore: number
                participantId: number
                level: number
                currentGold: number
                minionsKilled: number
                dominionScore: number
                // position: any  // This can be used later.
                xp: number
                jungleMinionsKilled: number
            }
        }
    }[]
}

export { Summoner, Match, MatchMetadata, MatchTimeline }
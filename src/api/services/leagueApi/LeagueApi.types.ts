type LeagueSummoner = {
    id: string,
    accountId: string,
    puuid: string,
    name: string,
    profileIconId: number,
    revisionDate: number,
    summonerLevel: number
}

// https://riot-api-libraries.readthedocs.io/en/latest/roleid.html
type LeagueMatch = {
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

type LeagueMetadata = {
    seasonId: number,
    queueId: number,
    gameId: number,
    gameVersion: string
    platformId: string
    gameMode: string
    mapId: number
    gameType: string
    participantId: number
    gameDuration: number
    gameCreation: Date
    accountId: string
}

type LeagueParticipantFrame = {
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

type LeagueTimeline = {
    frameInterval: number
    frames: {
        minute: number
        timestamp: number
        participantFrames: LeagueParticipantFrame
    }[]
}

export { LeagueMatch, LeagueMetadata, LeagueParticipantFrame, LeagueSummoner, LeagueTimeline }
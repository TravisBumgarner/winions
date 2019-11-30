// const axios = require('axios')

// const config = require('./config')
// const champions = require('./champions')


// const getUserDetails = async (summonerName) => {
//     const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(summonerName)}`
//     const response = await axios({
//         method: 'GET',
//         url: url, 
//         headers: {
//             "X-Riot-Token": "RGAPI-1944fc55-72e0-4a68-bcd2-831ae37157db",
//         }
//     })

//     if (response.status === 200){
//         return response.data
//     } else {
//         console.log(response.status)
//         throw new Error('whoops')
//     }
// }

// const getMatches = async (encryptedAccountId) => {
//     const url = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${encryptedAccountId}`
//     const response = await axios({
//         method: 'GET',
//         url: url, 
//         headers: {
//             "X-Riot-Token": "RGAPI-1944fc55-72e0-4a68-bcd2-831ae37157db",
//         }
//     })

//     if (response.status === 200){
//         return response.data
//     } else {
//         console.log(response.status)
//         throw new Error('whoops')
//     }
// }

// const getMatchTimeline = async (matchId) => {
//     const url = `https://na1.api.riotgames.com/lol/match/v4/timelines/by-match/${matchId}`
//     const response = await axios({
//         method: 'GET',
//         url: url, 
//         headers: {
//             "X-Riot-Token": "RGAPI-1944fc55-72e0-4a68-bcd2-831ae37157db",
//         }
//     })

//     if (response.status === 200){
//         return response.data
//     } else {
//         console.log(response.status)
//         throw new Error('whoops')
//     }
// }

// const getMatchMetadata = async (matchId) => {
//     const url = `https://na1.api.riotgames.com/lol/match/v4/matches/${matchId}`
//     const response = await axios({
//         method: 'GET',
//         url: url, 
//         headers: {
//             "X-Riot-Token": "RGAPI-1944fc55-72e0-4a68-bcd2-831ae37157db",
//         }
//     })

//     if (response.status === 200){
//         return response.data
//     } else {
//         console.log(response.status)
//         throw new Error('whoops')
//     }
// }

// const findParticipantId = (accountId, participantIdentities) => {
//     for (participantIdentity of participantIdentities){
//         if(participantIdentity.player.accountId === accountId){
//             return participantIdentity.participantId
//         }
//     }   
// }

// const getChampionNameFromId = (id) => {
//     return champions.find(({key, name}) => key === name)
// }

// const main = async () => {

//     const { accountId } = await getUserDetails('finx the minx')
//     const { matches} = await getMatches(accountId)
//     for (match of matches) { 
//         const { gameId, champion, lane, timestamp } = match
//         console.log(champion, lane, timestamp)
//         const {frames} = await getMatchTimeline(gameId)
//         const { participantIdentities } = await getMatchMetadata(gameId)
//         const participantId = findParticipantId(accountId, participantIdentities)
//         frames.forEach(({participantFrames, events, timestamp}) => {
//             const TEN_MINUTES = 60 * 10 * 1000
//             const THIRTY_SECONDS = 30 * 1000
//             if(timestamp > TEN_MINUTES - THIRTY_SECONDS && timestamp < TEN_MINUTES + THIRTY_SECONDS){
//                 console.log(timestamp, participantFrames[participantId].minionsKilled)
//             }
//         })
//     }
// }

// main()
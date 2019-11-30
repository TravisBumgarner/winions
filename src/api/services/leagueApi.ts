import axios from 'axios'

import { summoners } from '../database'
import config from '../config'
// import { summoners } from './database'
import { Summoner } from '../../shared-types'

const getSummonerDetails = async (summonerName): Promise<Summoner | null> => {
    const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(summonerName)}`
    const response = await axios({
        method: 'GET',
        url: url,
        headers: {
            "X-Riot-Token": config.API_KEY,
        }
    })

    if (response.status === 200) {
        return response.data
    } else if (response.status === 400) {
        return null
    } else {
        throw new Error('whoops')
    }
}

export { getSummonerDetails }
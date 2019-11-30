import axios from 'axios'
import { prisma } from './generated/prisma-client'
import uuidv5 from 'uuid/v5'

import config from './config'

type UserDetails = {
    id: string,
    accountId: string,
    puuid: string,
    name: string,
    profileIconId: number,
    revisionDate: number,
    summonerLevel: number
}

const getUserDetails = async (summonerName): Promise<UserDetails> => {
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
    } else {
        console.log(response.status)
        throw new Error('whoops')
    }
}

const main = async () => {
    const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
    const { name, accountId, revisionDate, summonerLevel } = await getUserDetails('finx the minx')
    try {
        const newUser = await prisma.createUser({
            name,
            accountId,
            id: uuidv5(accountId, MY_NAMESPACE) // Prisma won't take accountId as a unique ID. :shrug:
        })
        console.log(`Created new user: ${newUser.name} (ID: ${newUser.accountId})`)

        // Read all users from the database and print them to the console
        const allUsers = await prisma.users()
        console.log(allUsers)
    } catch (response) {
        console.log(response)
    }


}

main()
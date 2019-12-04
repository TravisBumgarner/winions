import axios from 'axios'

import config from '../config'

type Route = {
    attributes: {
        color: string
        description: string
        direction_destinations: any[]
        direction_names: any[]
        fare_class: string
        long_name: string
        short_name: string
        sort_order: number
        text_color: string
        type: number
    }
    id: string
    links: {
        self: string
    }
    relationships: {
        line: any,
        route_patterns: any
    }
    type: 'string'
}

type Stop = {
    "attributes": {
        "address": any,
        "at_street": string,
        "description": any,
        "latitude": number,
        "location_type": number,
        "longitude": number,
        "municipality": string,
        "name": string,
        "on_street": string,
        "platform_code": any,
        "platform_name": any,
        "vehicle_type": number,
        "wheelchair_boarding": number
    },
    "id": string,
    "links": {
        "self": string
    }
}


const routeDetails = async (route: string) => {
    const { data: { data } }: { data: { data: Route } } = await axios.get(`${config.MBTA_BASE_URL}/routes/${route}`, {
        params: {

        },
        headers: {
            'x-api-key': config.MBTA_API_KEY
        }
    })
    return data
}

const allRoutes = async () => {
    const { data: { data } }: { data: { data: Route[] } } = await axios.get(`${config.MBTA_BASE_URL}/routes`, {
        params: {

        },
        headers: {
            'x-api-key': config.MBTA_API_KEY
        }
    })
    const routeIds = data.map(({ id, attributes: { short_name } }) => `${id}-${short_name}\n`).join(',')
    console.log(routeIds)
    return data
}

const stopsByRouteAndName = async (route: string, name: string) => {
    const { data: { data } }: { data: { data: any[] } } = await axios.get(`${config.MBTA_BASE_URL}/stops?filter[route]=${route}`, {
        params: {

        },
        headers: {
            'x-api-key': config.MBTA_API_KEY
        }
    })
    const filteredData = data.filter(({ attributes }) => {
        return attributes.name.toLowerCase().includes(name)
    })

    return filteredData
}

const predictions = async (stop: string) => {
    const { data: { data } }: { data: { data: any[] } } = await axios.get(`${config.MBTA_BASE_URL}/predictions?filter[stop]=${stop}`, {
        params: {

        },
        headers: {
            'x-api-key': config.MBTA_API_KEY
        }
    })
    return data
}

export {
    routeDetails,
    allRoutes,
    stopsByRouteAndName,
    predictions
}
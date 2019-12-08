import Knex from 'knex'

import knexConfig from '../../../knexfile'
import * as summoners from './summoners'
import * as matches from './matches'
import * as matchMetadata from './matchMetadata'
import * as matchTimeline from './matchTimeline'

const config = knexConfig
export default Knex(config)
export { summoners, matches, matchMetadata, matchTimeline }
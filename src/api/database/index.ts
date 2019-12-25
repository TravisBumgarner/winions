import Knex from 'knex'

import knexConfig from '../../../knexfile'
import * as summoners from './summoners'
import * as matches from './matches'
import * as metadata from './metadata'
import * as timeline from './timeline'

const config = knexConfig
export default Knex(config)
export { summoners, matches, metadata, timeline }
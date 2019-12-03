import Knex from 'knex'

import knexConfig from '../../../knexfile'
import * as summoners from './summoners'
import * as matches from './matches'

const config = knexConfig
export default Knex(config)
export { summoners, matches }
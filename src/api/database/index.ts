import Knex from 'knex'

import knexConfig from '../../../knexfile'
import * as summoners from './summoners'

const config = knexConfig
export default Knex(config)
export { summoners }
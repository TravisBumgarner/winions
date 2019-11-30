const config = {
    development: {
        client: 'pg',
        connection: {
            port: '5432',
            host: 'localhost',
            user: 'postgres',
            password: 'postgres',
            database: 'postgres',
            charset: 'utf8'
        },
        migrations: {
            directory: './src/api/database/migrations'
        }
    }
} as const

// Because, Knex.
export default config[process.env.NODE_ENV || 'development']
module.exports = config[process.env.NODE_ENV || 'development']

import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('matches', table => {
        table.string('accountId') // TODO - This won't work with > 1 person.
        table.string('lane')
        table.bigInteger('gameId').primary()
        table.integer('champion')
        table.string('platformId')
        table.timestamp('timestamp')
        table.integer('queue')
        table.string('role')
        table.integer('season')
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('matches')
}

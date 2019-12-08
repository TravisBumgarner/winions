import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('participantFrames', table => {
        table.uuid('id')
        table.integer('participantId')
        table.integer('totalGold')
        table.integer('teamScore')
        table.integer('level')
        table.integer('currentGold')
        table.integer('minionsKilled')
        table.integer('dominionScore')
        table.integer('xp')
        table.integer('jungleMinionsKilled')
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('participantFrames')
}

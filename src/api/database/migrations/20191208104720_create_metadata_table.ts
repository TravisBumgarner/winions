import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('metadata', table => {
        table.integer('seasonId')
        table.integer('queueId')
        table.bigInteger('gameId').primary()
        table.string('gameVersion')
        table.string('platformId')
        table.string('gameMode')
        table.integer('mapId')
        table.string('gameType')
        table.integer('gameDuration')
        table.timestamp('gameCreation')
        table.string('accountId')
        table.integer('participantId')
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('metadata')
}

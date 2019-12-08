import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('matchMetadata', table => {
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
        table.jsonb('participantIdentities')
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('matchMetadata')
}

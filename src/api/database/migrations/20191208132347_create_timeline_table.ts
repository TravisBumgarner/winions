import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('matchTimeline', table => {
        table.bigInteger('gameId')
        table.timestamp('timestamp')
        table.uuid('participantFramesId')
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('matchTimeline')
}
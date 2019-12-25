import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('timeline', table => {
        table.bigInteger('gameId')
        table.timestamp('timestamp')
        table.integer('minute')
        table.jsonb('participantFrames')
        table.jsonb('events')
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('timeline')
}

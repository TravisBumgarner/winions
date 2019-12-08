import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('participantIdentities', table => {
        table.bigInteger('gameId')
        table.string('currentPlatformId')
        table.string('summonerName')
        table.string('matchHistoryUri')
        table.string('platformId')
        table.string('currentAccountId')
        table.string('profileIcon')
        table.string('summonerId')
        table.string('accountId')
        table.integer('participantId')
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('participantIdentities')
}

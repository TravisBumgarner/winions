import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('summoners', table => {
        table.string('accountId').primary()
        table.string('id')
        table.string('puuid')
        table.string('name')
        table.integer('profileIconId')
        table.timestamp('revisionDate')
        table.integer('summonerLevel')
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('summoners')
}

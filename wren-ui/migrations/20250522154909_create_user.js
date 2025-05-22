
/*
table.boolean('secret');
table.boolean('callback');
table.boolean('clientid');
*/

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('user', (table) => {
        table.increments('id').comment('ID');
        table.string('sso_id');
        table.string('email');
        table.string('username');
        table.string('password');
        table.boolean('enabled');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('user');
};

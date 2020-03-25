
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table) {
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        
        table.string('banco_id').notNullable();

        table.foreign('banco_id').references('id').inTable('banco_sangue');
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};

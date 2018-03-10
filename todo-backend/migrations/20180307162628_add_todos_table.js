
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('todos',function(table){
      table.increments('id').primary()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
      table.string('description').notNullable()
      table.boolean('completed').defaultTo(false)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('todos')
};

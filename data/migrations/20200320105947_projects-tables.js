
exports.up = function(knex) {
  return knex.schema
    // PROJECTS
    .createTable('projects', tbl => {
      tbl.increments();

      tbl.string('name', 255)
        .unique()
        .notNullable();

      tbl.text('description', 500)
        .defaultTo('');

      tbl.boolean('completed')
        .notNullable()
        .defaultTo(false);
    })
    // RESOURCES
    .createTable('resources', tbl => {
      tbl.increments();

      tbl.string('name', 255)
        .unique()
        .notNullable();

      tbl.text('description', 500);
    })
    // TASKS
    .createTable('tasks', tbl => {
      tbl.increments();

      tbl.text('description', 500)
        .notNullable();

      tbl.text('notes', 800)
        .defaultTo('');

      tbl.boolean('completed')
        .defaultTo(false);

      tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    // PROJECT RESOURCES
    .createTable('project_resources', tbl => {
      tbl.primary(['project_id', 'resource_id']);

      tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      tbl.integer('resource_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('resources')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('project_resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects');
};

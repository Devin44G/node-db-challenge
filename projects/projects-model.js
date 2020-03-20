const db = require('../data/db-config.js');

module.exports = {
  find,
  findById,
  findResources,
  findTasks,
  findTasksByProj,
  add,
  addResource,
  addTask,
  update,
  remove
}

function find() {
  return db('projects');
}

function findById(id) {
  return db('projects').where({ id }).first();
}

function findResourceById(id) {
  return db('resources').where({ id }).first();
}

function findResources() {
  return db('resources');
}

function findTasks(id) {
  return db('tasks')
    .where({ id })
    .select();
}

function findTasksByProj(id) {
  return db('tasks').join('projects', 'projects.id', 'tasks.project_id')
    .select('tasks.id', 'projects.name', 'projects.description', 'tasks.description', 'tasks.notes', 'tasks.completed')
    .where('tasks.project_id', id);
}

function add(project) {
	return db('projects')
    .insert(project)
		.then(ids => {
			return findById(ids[0]);
		});
}

function addResource(resource) {
  return db('resources')
    .insert(resource)
		.then(ids => {
			return findResourceById(ids[0]);
		});
}

function addTask(task) {
  return db('tasks')
    .insert(task);
}

function update(changes, id) {
  return db('schemes')
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id); // returned updated rows
    });
}

function remove(id) {
  return db('schemes')
    .where('id', id)
    .del(); // did not return object
}

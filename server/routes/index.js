const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;

module.exports = (app) => {
    app
    .get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
    }))
    .get('/api/todos', todosController.list)
    .post('/api/todos', todosController.create)
    .get('/api/todos/:todoId', todosController.retrieve)
    .put('/api/todos/:todoId', todosController.update)
    .delete('/api/todos/:todoId', todosController.destroy)
    
    .post('/api/todos/:todoId/items', todoItemsController.create)
    .put('/api/todos/:todoId/items/:todoItemId', todoItemsController.update)
    .delete('/api/todos/:todoId/items/:todoItemId', todoItemsController.destroy)
    .all('/api/todos/:todoId/items', (req, res) =>
      res.status(405).send({
        message: 'Method Not Allowed',
    }));
};

const express = require('express');
const router = express.Router();

// GET /api/tasks - Get all tasks
router.get('/', (req, res) => {
  res.json([{ message: 'Tasks route is working!' }]);
});

// POST /api/tasks - Create new task
router.post('/', (req, res) => {
  res.status(201).json({ message: 'Task created successfully!' });
});

// GET /api/tasks/:id - Get task by ID
router.get('/:id', (req, res) => {
  res.json({ id: req.params.id, message: 'Task found' });
});

// PUT /api/tasks/:id - Update task
router.put('/:id', (req, res) => {
  res.json({ id: req.params.id, message: 'Task updated' });
});

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', (req, res) => {
  res.json({ message: 'Task deleted successfully' });
});

module.exports = router;
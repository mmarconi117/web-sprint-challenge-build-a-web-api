// Write your "actions" router here!


// actions/actions-router.js
const express = require('express');
const router = express.Router();
const Actions = require('./actions-model');
const { validateActionUpdate } = require('../actions/actions-middlware');

// [GET] /api/actions
router.get('/', async (req, res) => {
  try {
    const actions = await Actions.get();
    res.status(200).json(actions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving actions' });
  }
});

// [GET] /api/actions/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const action = await Actions.get(id);
    if (!action) {
      res.status(404).json({ message: 'Action not found' });
    } else {
      res.status(200).json(action);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving action' });
  }
});

// [POST] /api/actions
router.post('/', async (req, res) => {
  const actionData = req.body;
  try {
    const newAction = await Actions.insert(actionData);
    res.status(201).json(newAction);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error adding action' });
  }
});

// [PUT] /api/actions/:id
router.put('/:id', validateActionUpdate, async  (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const updatedAction = await Actions.update(id, changes);
    if (!updatedAction) {
      res.status(404).json({ message: 'Action not found' });
    } else {
      res.status(200).json(updatedAction);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating action' });
  }
});

// [DELETE] /api/actions/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Actions.remove(id);
    if (!deleted) {
      res.status(404).json({ message: 'Action not found' });
    } else {
      res.status(204).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting action' });
  }
});

module.exports = router;

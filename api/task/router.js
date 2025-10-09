const express = require('express')
const Task = require('./model')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.getAll()
    // Convert task_completed from integer to boolean
    const formattedTasks = tasks.map(task => ({
      ...task,
      task_completed: Boolean(task.task_completed)
    }))
    res.json(formattedTasks)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const task = await Task.create(req.body)
    // Convert task_completed from integer to boolean
    const formattedTask = {
      ...task,
      task_completed: Boolean(task.task_completed)
    }
    res.status(201).json(formattedTask)
  } catch (err) {
    next(err)
  }
})

module.exports = router
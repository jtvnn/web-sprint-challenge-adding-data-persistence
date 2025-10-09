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
    const { task_description, project_id } = req.body
    
    // Validate required fields
    if (!task_description) {
      return res.status(400).json({ message: "task_description is required" })
    }
    if (!project_id) {
      return res.status(400).json({ message: "project_id is required" })
    }
    
    // Check if project_id exists
    const db = require('../../data/dbConfig')
    const project = await db('projects').where('project_id', project_id).first()
    if (!project) {
      return res.status(400).json({ message: "invalid project_id" })
    }
    
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
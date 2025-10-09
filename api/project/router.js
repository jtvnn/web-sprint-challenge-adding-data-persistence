// build your `/api/projects` router here
const express = require('express');
const Project = require("./model");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const projects = await Project.getAll()
        // Convert project.completed from integer to boolean
        const formattedProjects = projects.map(project => ({
            ...project,
            project_completed: Boolean(project.project_completed)
        }))
        res.json(formattedProjects)
    } catch (err) {
        next(err)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const { project_name } = req.body
        if (!project_name) {
            return res.status(400).json({ message: "project_name is required" })
        }
        const project = await Project.create(req.body)
        // Convert project_completed from integer to boolean
        const formattedProject = {
            ...project,
            project_completed: Boolean(project.project_completed)
        }
        res.status(201).json(formattedProject)
    } catch (err) {
        next(err)
    }
})

module.exports = router;

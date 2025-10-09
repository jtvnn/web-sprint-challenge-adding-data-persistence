// build your `/api/resources` router here
const express = require('express');
const Resource = require("./model");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const resources = await Resource.getAll()
        res.json(resources)
    } catch (err) {
        next(err)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const { resource_name } = req.body
        if (!resource_name) {
            return res.status(400).json({ message: "resource_name is required" })
        }
        
        // Check if resource_name already exists
        const existing = await Resource.getAll()
        const isDuplicate = existing.some(resource => resource.resource_name === resource_name)
        if (isDuplicate) {
            return res.status(400).json({ message: "resource_name must be unique" })
        }
        
        const resource = await Resource.create(req.body)
        res.status(201).json(resource)
    } catch (err) {
        // Handle database constraint errors (unique constraint)
        if (err.code === 'SQLITE_CONSTRAINT') {
            return res.status(400).json({ message: "resource_name must be unique" })
        }
        next(err)
    }
})

module.exports = router;

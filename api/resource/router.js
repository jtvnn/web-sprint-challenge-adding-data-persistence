// build your `/api/resources` router here
const express = require('express');
const Resource = require("./model");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const resources = await Resource.getAll()
        res.json(resouces)
    } catch (err) {
        next(err)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const resource = await Resouce.create(req.body)
        res.status(201).json(resource)
    } catch (err) {
        next(err)
    }
})

module.exports = router;

// build your `Resource` model here
const db = require("../../data/dbConfig")

const getAll = () => {
    return db("resources")
}

const getById = (resource_id) => {
    return db("resources").where("resource_id", resource_id).first()
}

const create = async (resource) => {
    const [resource_id] = await db("resources").insert(resource)
    return getById(resource_id)
}

module.exports = {
    getAll,
    getById,
    create,
}
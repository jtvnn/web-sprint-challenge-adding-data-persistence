// build your `Project` model here
const db = require('../../data/dbConfig');

const getAll = () => {
    return db("projects")
}

const getById = (project_id) => {
    return db("projects").where("project_id", project_id).first()
}

const create = async (project) => {
    const [project_id] = await db("projects").insert(project)
    return getById(project_id)
}

module.exports = {
    getAll,
    getById,
    create
}
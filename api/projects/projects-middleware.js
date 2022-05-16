// add middlewares here related to projects
const awesomeP = require('./projects-model')

async function projectExistence (req, res, next) {
    const { id } = req.params
    const awesomeProject = await awesomeP.get(id)

    if (!awesomeProject) {
        return res.status(404).json({ message: 'project with the id does not exist' })
    }

    req.awesomeProject = awesomeProject

    next()
}

async function projectBodyExistence (req, res, next) {
    const { name, description } = req.body 

    if (name === undefined && description === undefined) {
        return res.status(400).json({ message: 'name and description is required ' })
    } else if (name === undefined) {
        return res.status(400).json({ message: 'name is required' })
    } else if (description === undefined) {
        return res.status(400).json({ message: 'description is required' })
    } else {
        next()
    }
}

module.exports = {
    projectExistence,
    projectBodyExistence,
}

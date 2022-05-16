// add middlewares here related to actions
const actionModel = require('./actions-model')

async function actionChecker (req, res, next) {
    const { id } = req.params
    const action = await actionModel.get(id)

    if (!action) {
        return res.status(404).json({ message: 'could not find action with that id' })
    }
    //  else if (!id) {
    //     return res.status(400).json({ message: 'id is required' })
    // }

    req.newAction = action

    next()
}

async function actionBodyChecker (req, res, next) {
    const { project_id, description, notes } = req.body

    if (project_id === undefined && description === undefined && notes === undefined) {
        return res.status(400).json({ message: 'description, notes, and project_id are required' })
    } else if (description === undefined) {
        return res.status(400).json({ message: 'description is required' })
    } else if (notes == undefined) {
        return res.status(400).json({ message: 'notes is required' })
    } else if (project_id === undefined) {
        return res.status(400).json({ message: 'project_id is required'})
    }

    next()
}

module.exports = {
    actionChecker, 
    actionBodyChecker,
}

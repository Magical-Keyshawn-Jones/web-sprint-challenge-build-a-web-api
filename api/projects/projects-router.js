// Write your "projects" router here!
const awesomeP = require('./projects-model')
const express = require('express')
const projectGatekeeper = require('./projects-middleware')

const projects = express.Router()

projects.get('/', (req, res) => {
    awesomeP.get()
    .then(object => {
        if (!object) {
            res.status(200).json([])
        } else {
            res.status(200).json(object)
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'could not retrieve projects' })
    })
})

projects.get('/:id', projectGatekeeper.projectExistence, (req, res) => {
    const { id } = req.params

    awesomeP.get(id)
    .then(results => {
        res.status(200).json(results)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'could not retrieve post' })
    })
})

projects.post('/', projectGatekeeper.projectBodyExistence, (req, res) => {
    const { body } = req

    awesomeP.insert(body)
    .then(results => {
        res.status(201).json(results)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'could not post project' })
    })
})

projects.put('/:id', projectGatekeeper.projectExistence, projectGatekeeper.projectBodyExistence, (req, res) => {
    const { id } = req.params
    const { body } = req
    awesomeP.update(id, body)
    .then(results => {
        res.status(200).json(results)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'could not make changes to project' })
    })
})

projects.delete('/:id', projectGatekeeper.projectExistence, (req, res) => {
    const { id } = req.params

    awesomeP.remove(id)
    .then(results => {
        res.status(200).json(results)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'could not delete post with that id' })
    })
})

projects.get('/:id/actions', projectGatekeeper.projectExistence, (req, res) => {
    const { id } = req.params

    awesomeP.getProjectActions(id)
    .then(results => {
        res.status(200).json(results)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'could not retrieve actions from post with that id' })
    })
})

module.exports = projects

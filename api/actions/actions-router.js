// Write your "actions" router here!
const express = require('express')
const actionThing = require('./actions-model')
const actionMiddleware = require('./actions-middlware')

const actions = express.Router()

actions.get('/', (req, res) => {
    actionThing.get()
    .then(results => {
        res.status(200).json(results)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'could not retrieve actions'})
    })
})

actions.get('/:id', actionMiddleware.actionChecker, (req, res) => {
    res.status(200).json(req.newAction)
})

actions.post('/', actionMiddleware.actionChecker, actionMiddleware.actionBodyChecker, (req, res) => {
    const { body } = req
    
    actionThing.insert(body)
    .then(results => {
        res.status(201).json(results)
    })
    .catch(err => {
        console.log(err)
        res.status(200).json({ message: 'could not create action' })
    })
})

actions.put('/:id', actionMiddleware.actionChecker, actionMiddleware.actionBodyChecker, (req, res) => {
    const { id } = req.params
    const { body } = req

    actionThing.update(id, body)
    .then(results => {
        res.status(200).json(results)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'could not complete changes for actions with that post id' })
    })
})

actions.delete('/:id', actionMiddleware.actionChecker, (req, res) => {
    const { id } = req.params

    actionThing.remove(id)
    .then(results => {
        res.status(200).json(results)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'could not delete action with that id' })
    })
})

module.exports = actions
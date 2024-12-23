const express = require('express')
const port = 3000
const app = express()

app.use(express.urlencoded({ extended: true }))

const { tokenValidation } = require('./utils/utils.js')

app.post('/gettoken', (req, res) => {
    const machineId = req.body.machineId
})

app.post('/signup', (req, res) => {

})

app.post('/tokenvalidation', async (req, res) => {

    const machineId = req.body.machineId
    const token = req.body.token

    const result = await tokenValidation(machineId, token)

    res.json(result)

})

app.listen(port, () => {
    console.log('listing at localhost:' + port)
})

const express = require('express')
const port = 3000
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const { tokenValidation, registerUser } = require('./utils/utils.js')
const { userGetByMachineId } = require('./database/db.js')

app.post('/register', (req, res) => {

    const name = req.body.name
    const machineId = req.body.machineId
    const email = req.body.email

    console.log(req.body)

    const result = registerUser(name, email, machineId)

    return res.status(200).json(result)

})

app.post('/tokenvalidation', async (req, res) => {

    const machineId = req.body.machineId
    const token = req.body.token

    const result = await tokenValidation(machineId, token)

    res.json(result)

})

app.post('/userinformation', async (req, res) => {

    const machineId = req.body.machineId
    // res.set('Content-Type', 'application/json');

    try {
        const user = await userGetByMachineId(machineId)

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'machineId not found'
            })

        }

        return res.status(200).json({
            status: 'success',
            data: {
                user
            }
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            status: 'error',
            message: 'an internal server error',
            details: error.message
        })

    }

})

app.listen(port, () => {
    console.log('listing at localhost:' + port)
})

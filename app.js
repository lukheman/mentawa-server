const express = require('express')

const port = 3000
const app = express()

app.post('/gettoken', (req, res) => {
    const machineId = req.body.machineId
})

app.post('/signup', (req, res) => {

})

app.listen(port, () => {
    console.log('listing at localhost:' + port)
})

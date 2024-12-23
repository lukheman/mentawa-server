const jwt = require('jsonwebtoken')
const { machineIdSync } = require('node-machine-id')

const machineId = machineIdSync({ origina: true })
const email = 'akmal@gmail.com'

const payload = { machineId: 'machine123' }

const secretkey = '01111000'

const token = jwt.sign(payload, secretkey, { expiresIn: '1h', algorithm: 'HS256' })

console.log(token)

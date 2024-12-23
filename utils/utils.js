const jwt = require('jsonwebtoken')
const { getUserByMachineId } = require('../database/db.js')

const secretkey = '01111000'

const tokenValidation = async (machineId, token) => {

    try {
        const user = await getUserByMachineId(machineId);

        if (!user) {
            return {
                status: 'error',
                message: 'machineId not found'
            }
        }

        if (user.token === token) {
            try {
                const decoded = jwt.verify(user.token, secretkey)
                if (decoded.machineId === machineId) {
                    return {
                        status: 'success',
                        data: { user }
                    }
                }

            } catch (error) {
                // TODO: perbaiki response
                return {
                    status: 'error',
                    message: 'an internal server error',
                    details: error.message
                }
            }

        } else {

            return {
                status: 'error',
                message: 'invalid token'
            }

        }

    } catch (error) {
        // TODO: perbaiki response
        return {
            status: false,
            errorMessage: error.message
        }
    }

};

const generateToken = (machineId) => {

    const secretkey = '01111000'
    const payload = { machineId }

    const token = jwt.sign(payload, secretkey, { expiresIn: '1d', algorithm: 'HS256' })
    return token

}

const registerUser = (name, email, machineId) => {

    const token = generateToken(machineId)
    userAdd(name, email, machineId, token)

    return { status: true, message: 'succesfully registered user' }

}
// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWNoaW5lSWQiOiJtYWNoaW5lMTIzIiwiaWF0IjoxNzM0OTM2MzYyLCJleHAiOjE3MzUwMjI3NjJ9.rE5v_vyIn7hy_eJkkW0UJtxRbWPjXHoFQLCBK-ZC-bo'


// const result = tokenValidation('machine123', token)

module.exports = { tokenValidation }

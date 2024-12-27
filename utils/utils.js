const jwt = require('jsonwebtoken')
const { userAdd, userGetByMachineId } = require('../database/db.js');
const { machineIdSync } = require('node-machine-id')
const { nanoid } = require('nanoid')

const tokenValidation = async (machineId, token) => {

    try {
        const user = await userGetByMachineId(machineId);

        if (!user) {
            return {
                status: 'error',
                message: 'machineId not found'
            }
        }

        if (user.token === token) {

            return {
                status: 'success',
                data: { user }
            }

            //try {
            //    const decoded = jwt.verify(user.token, process.env.SECRETKEY)
            //    if (decoded.machineId === machineId) {
            //        return {
            //            status: 'success',
            //            data: { user }
            //        }
            //    }
            //
            //} catch (error) {
            //    // TODO: perbaiki response
            //    console.error(error)
            //    return {
            //        status: 'error',
            //        message: 'an internal server error',
            //        details: error.message
            //    }
            //}

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

const generateToken = () => {

    // const token = jwt.sign({machineId}, process.env.SECRETKEY, { algorithm: 'HS256' })
    const token = nanoid(64)
    return token

}

const registerUser = (name, email, machineId) => {

    const token = generateToken(machineId)
    userAdd(name, email, machineId, token)

    return { status: 'success', message: 'succesfully registered user', data: { token } }

}

// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWNoaW5lSWQiOiJtYWNoaW5lMTIzIiwiaWF0IjoxNzM0OTM2MzYyLCJleHAiOjE3MzUwMjI3NjJ9.rE5v_vyIn7hy_eJkkW0UJtxRbWPjXHoFQLCBK-ZC-bo'


// const result = tokenValidation('machine123', token)

module.exports = {
    tokenValidation,
    registerUser
}

const jwt = require('jsonwebtoken')
const { getUserByMachineId } = require('../database/db.js')

const secretkey = '01111000'

const tokenValidation = async (machineId, token) => {

    try {
        const user = await getUserByMachineId(machineId);

        if (user.token === token) {
            try {
                const decoded = jwt.verify(user.token, secretkey)
                if (decoded.machineId === machineId) {
                    return {
                        valid: true,
                        user
                    }
                }

            } catch (error) {
                // TODO: perbaiki response
                return {
                    error: true,
                    errorMessage: error.message
                }
            }

        } else {

            return {
                error: true,
                errorMessage: 'invalid token'
            }

        }

    } catch (error) {
        // TODO: perbaiki response
        return {
            error: true,
            errorMessage: error.message
        }
    }

};


// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWNoaW5lSWQiOiJtYWNoaW5lMTIzIiwiaWF0IjoxNzM0OTM2MzYyLCJleHAiOjE3MzUwMjI3NjJ9.rE5v_vyIn7hy_eJkkW0UJtxRbWPjXHoFQLCBK-ZC-bo'


// const result = tokenValidation('machine123', token)

module.exports = { tokenValidation }

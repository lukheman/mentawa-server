const jwt = require('jsonwebtoken')
const { getUserByMachineId } = require('../database/db.js')

const secretkey = '01111000'

const checkToken = async (machine_id) => {

    const user = getUserByMachineId(machine_id);

    user.then(result => {
        console.log(result)
        const decoded = jwt.verify(result.token, secretkey)
        console.log(decoded)
    })

    //if (now > new Date(expires_at)) {
    //    console.error('Token has expired');
    //    return;
    //}

    //try {
    //    const decoded = jwt.verify(token, secretkey);
    //    console.log('Token is valid:', decoded);
    //} catch (err) {
    //    if (err.name === 'TokenExpiredError') {
    //        console.error('token has expired')
    //    } else {
    //        console.error('invalid token: ', err.message)
    //    }
    //}

};

checkToken('machine123');

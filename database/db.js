const { machineId } = require('node-machine-id')
const { Pool } = require('pg')

const pool = new Pool({
    user: 'akmal',
    host: 'localhost',
    database: 'mentawa',
    password: '',
    post: 5432
})

const userAdd = (name, email, machineId, token) => {
    pool.query(
        'INSERT INTO users (name, email, machine_id, token) VALUES ($1, $2, $3, $4)',
        [name, email, machineId, token],
        (err, res) => {
            if (err) {
                console.error('error inserting data: ', err)
            } else {
                console.log('data inserted successfully')
            }
        }
    )
}

const userGetByMachineId = async (machineId) => {

    const res = await pool.query(
        'SELECT email, token, name FROM users WHERE machine_id = $1',
        [machineId],
    )

    return res.rows[0]

}

userGetByMachineId('machine123e')
module.exports = { userAdd, userGetByMachineId }

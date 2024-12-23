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

const getUserByMachineId = (machineId) => {

    return new Promise(async (resolve, reject) => {
        const res = await pool.query(
            'SELECT * FROM users WHERE machine_id = $1',
            [machineId],
        )

        if (res.rows.length > 0) {
            resolve(res.rows[0])
        } else {
            reject(new Error('machineId not registered in system'))
        }

    })

}

module.exports = { addUser, getUserByMachineId }

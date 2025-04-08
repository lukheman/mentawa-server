import { Router, Request, Response } from 'express'
import { StatusType } from '../types'
import { userRegister, userTokenValidation } from '../services/userServices'
import { userGetByMachineId } from '../models/model_user'

const router: Router = Router()
export default router

router.get('/', (req: Request, res: Response) => {
    res.send('akmal')
})

router.post('/userRegister', async (req: Request, res: Response) => {

    const { machineId, name, email, password } = req.body

    if (!machineId) {
        res.json({
            status: StatusType.ERROR,
            message: 'machineId is required'
        })
        return
    }

    if (!email) {
        res.json({
            status: StatusType.ERROR,
            message: 'email is required'
        })
        return
    }

    if (!name) {
        res.json({
            status: StatusType.ERROR,
            message: 'name is required'
        })
        return
    }

    if (!password) {
        res.json({
            status: StatusType.ERROR,
            message: 'password is required'
        })
        return
    }

    const result = await userRegister(name, email, password, machineId)
    res.json(result)
    return


})

router.post('/usertokenvalidation', async (req: Request, res: Response) => {

    const { machineId, token, email } = req.body

    console.log(machineId)
    if (!machineId) {
        res.json({
            status: StatusType.ERROR,
            message: 'machineId is required'
        })
        return
    }

    if (!token) {
        res.json({
            status: StatusType.ERROR,
            message: 'token is required'
        })
        return
    }


    const result = await userTokenValidation(email, machineId, token)
    res.json(result)
    return

})

router.post('/ismachineidregistered', async (req: Request, res: Response) => {

    const machineId = req.body.machineId

    if (!machineId) {
        res.json({
            status: StatusType.ERROR,
            message: 'machineId is required'
        })
        return
    }

    const result = await userGetByMachineId(machineId)

    if (result) {
        res.json({
            status: StatusType.SUCCESS,
            message: 'machineId is registered'
        })
        return
    }

    res.json({
        status: StatusType.ERROR,
        message: 'machineId is not registered'
    })
    return

})

import { userAdd, userGetByEmail, userGetByMachineId } from "../models/model_user";
import { generateToken } from "../utils/";
import { User } from '@prisma/client'
import { Message, StatusType } from '../types/'

export async function userRegister(name: string, email: string, password: string, machineId: string): Promise<Message> {


    if (await userGetByEmail(email)) {
        return {
            status: StatusType.ERROR,
            message: 'email already exist'
        }

    }

    if (await userGetByMachineId(machineId)) {
        return {
            status: StatusType.ERROR,
            message: 'machineId already exist'
        }

    }

    // generate token
    const token: string = generateToken()
    await userAdd(name, email, password, machineId, token)

    return {
        status: StatusType.SUCCESS,
        message: 'user successfully registered',
    }

}

export async function userTokenValidation(email: string, machineId: string, token: string): Promise<Message> {
    const user: User | null = await userGetByMachineId(machineId)

    if (!user) {
        return {
            status: StatusType.ERROR,
            message: 'machineId is not registered'
        }
    }

    if (user.token === token && user.email === email) {
        return {
            status: StatusType.SUCCESS,
            message: 'user validated'
        }
    }

    return {
        status: StatusType.ERROR,
        message: 'email or token is invalid'
    }

}

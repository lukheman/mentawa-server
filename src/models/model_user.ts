import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

export async function userAdd(name: string, email: string, password: string, machineId: string, token: string): Promise<User> {
    try {
        const user = await prisma.user.create({
            data: { name, email, machineId, token, password }
        })
        return user
    } catch (error) {
        throw error
    }
}

export async function userGetByEmail(email: string): Promise<User | null> {

    const user = await prisma.user.findUnique({
        where: { email }
    })
    return user

}

export async function userGetByMachineId(machineId: string): Promise<User | null> {

    const user = await prisma.user.findUnique({
        where: { machineId }
    })
    return user

}

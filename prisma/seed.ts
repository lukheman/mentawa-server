import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {


    const akmal = await prisma.user.upsert({
        where: { email: 'akmal@gmail.com' },
        update: {},
        create: {
            email: 'akmal@gmail.com',
            password: 'asdf',
            name: 'akmal',
            machineId: 'machine123',
            token: 'token123',
            active: true
        }
    })

    const citra = await prisma.user.upsert({
        where: { email: 'citra@gmail.com' },
        update: {},
        create: {
            email: 'citra@gmail.com',
            password: 'citra',
            name: 'citra',
            machineId: 'machine1235',
            token: 'token1235',
            active: false
        }
    })

}


main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {

        console.log(e)
        await prisma.$disconnect()
        process.exit(1)

    })


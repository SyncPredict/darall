import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()


async function main() {
    const allUsers = await prisma.user.findMany()
    if (!allUsers.length)
        await prisma.user.create({
            data: {
                name: 'Test',
                email: 'test@prisma.io',
                password: '12345',
            },
        })
}


main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
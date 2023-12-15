import {PrismaClient} from '@prisma/client';

export function initUser(prisma: PrismaClient) {
    async function createUser(userData: { name: string; email: string; password: string }) {
        return prisma.user.create({data: userData});
    }

    async function getUserById(userId: number) {
        return prisma.user.findUnique({
            where: {id: userId},
        });
    }

    async function updateUser(userId: number, updateData: { name: string; email: string; password: string }) {
        return prisma.user.update({where: {id: userId}, data: updateData});
    }

    async function deleteUser(userId: number) {
        return prisma.user.delete({where: {id: userId}});
    }

    return {createUser, getUserById, updateUser, deleteUser};
}

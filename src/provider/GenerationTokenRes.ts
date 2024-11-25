import prismaClient from "../prisma"

import dayjs from "dayjs"


class GenerateRefreshToken{

async Generate(userId: string){
    const expireIn = dayjs().add(15, "second").unix()
    const generateRefreshToken = await prismaClient.tokenRefresh.create({
        data: {
            userId,
            expireIn
        }
    })
    return  {generateRefreshToken}
}
}
export {GenerateRefreshToken}
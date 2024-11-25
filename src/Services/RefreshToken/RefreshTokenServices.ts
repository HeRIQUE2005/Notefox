import prismaClient from "../../prisma";
import { GenerateRefreshTokenProvider } from "../../provider/GenerationTokenProvider";


import dayjs from "dayjs";
import { GenerateRefreshToken } from "../../provider/GenerationTokenRes";
class RefreshtokenUser{
async refreshtoken(refresh_token: string){

    const refreshtoken = await prismaClient.tokenRefresh.findFirst({
        where: {
            id: refresh_token
        }
    })
   if(!refreshtoken){
    throw new Error("Refresh token invalid")
   }

const refreshtokenExpired= dayjs().isAfter(dayjs.unix (refreshtoken.expireIn))

const generateTokenProvider = new GenerateRefreshTokenProvider();
const token = await generateTokenProvider.GenerateProvider(refreshtoken.userId);

if(!refreshtokenExpired){
    await prismaClient.tokenRefresh.deleteMany({
        where: {
            userId: refreshtoken.userId
        }

    })
    const generateRefreshProvider = new GenerateRefreshToken();
    const newRefreshToken = await generateRefreshProvider.Generate(refreshtoken.userId)
    return {token, newRefreshToken}
}

   
   return{token}


}

}
export {RefreshtokenUser}
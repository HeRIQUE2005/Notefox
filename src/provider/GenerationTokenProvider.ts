import {sign} from 'jsonwebtoken'



class GenerateRefreshTokenProvider{
    async GenerateProvider(userId :string){
          const token = sign({},"90bf8ebb-c77c-4298-8e2e-6e44bdc96773",{
            subject: userId,
            expiresIn: "2h"
        })
        return {token}
    }
}
export {GenerateRefreshTokenProvider}
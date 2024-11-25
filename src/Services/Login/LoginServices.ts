import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import {sign} from 'jsonwebtoken'
import { GenerateRefreshToken } from "../../provider/GenerationTokenRes";
import { GenerateRefreshTokenProvider } from "../../provider/GenerationTokenProvider";

interface Login {
    email: string,
    password: string
}

class LoginServices {
    async loginUsuarios({ email, password }: Login) {
        const usuario = await prismaClient.cadastrarUsuarios.findFirst({
            where: {
                email: email,
               
            }
        })
        if (!usuario) {
            throw new Error('Senha do Usuario, esta incorreta')
        }
        const passwordCorreto = await compare (password, usuario.senha)
        if(!passwordCorreto){
            throw new Error('Senha do Usuario, esta incorreta')

        }
     


 const generateTokenProvider = new GenerateRefreshTokenProvider()
 const token = await generateTokenProvider.GenerateProvider(usuario.id)
 await prismaClient.tokenRefresh.deleteMany({
    where:{
        userId: usuario.id
    }
 })


        const generateRefreshToken = new GenerateRefreshToken();
        const tokenRefresh =await generateRefreshToken.Generate(usuario.id)
        return{token, tokenRefresh}

    }
}

export { LoginServices }
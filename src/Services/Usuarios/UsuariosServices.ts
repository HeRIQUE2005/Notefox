import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'

interface cadUsuarios {
    nome: string,
    email: string,
    password: string
}

class UsuariosServices {
    async cadastrarUsuarios({ nome, email, password }: cadUsuarios) {

        const senhaCrypt = await hash(password, 8)
        await prismaClient.cadastrarUsuarios.create({
            data: {
                nome: nome,
                email: email,
                senha: senhaCrypt
            }
        })
        return ({ dados: 'Cadastro Efetuado Com Sucesso' })
    }

    async consultarUsuarios() {
        const resposta = await prismaClient.cadastrarUsuarios.findMany({
            select: {
                id: true,
                nome: true,
                email: true,
                
            }
        })
        return resposta
    }

    async consultarUsuariosUnico(id: string) {
        const resposta = await prismaClient.cadastrarUsuarios.findFirst({
            where: {
                id: id
            },
            select: {
                nome: true,
                email: true,
                senha: true
            }
        })
        return resposta
    }
}
    export { UsuariosServices }
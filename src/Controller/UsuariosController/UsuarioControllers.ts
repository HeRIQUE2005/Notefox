
import { Request, Response } from "express";
import { UsuariosServices } from "../../Services/Usuarios/UsuariosServices";


class UsuariosControllers {
    async cadastrarUsuario(req: Request, res: Response) {
        const { nome, email, password } = req.body
        const enviarDadosServices = new UsuariosServices()
        const resposta = await enviarDadosServices.cadastrarUsuarios({
            nome,
            email,
            password
        })
        return res.json(resposta)
    }

    async consultarUsuarios(req: Request, res: Response) {
        const enviarDadosServices = new UsuariosServices()
        const resposta = await enviarDadosServices.consultarUsuarios()
        return res.json(resposta)
    }

    async consultarUsuariosUnico(req: Request, res: Response) {
        const { id } = req.body
        const enviarDadosServices = new UsuariosServices()
    }

}
export { UsuariosControllers }
import { Router } from 'express'
import { UsuariosControllers } from './Controller/UsuariosController/UsuarioControllers'
import NotaControler from './Controller/Nota/NotaControler';
import upload from './middleware/Uploard';
import { LoginUsuariosControllers } from './Controller/Login/LoginControllers';
import { RefreshtokenController } from './Controller/Refreshtoken/RefreshTokenControler';

const router = Router()




//Usuario login e Cadastro//
router.post('/CadastrarUsuarios',new UsuariosControllers().cadastrarUsuario)
router.post('/login',new LoginUsuariosControllers().loginUsuarios)
router.post('/Refresh',new RefreshtokenController().handle)




// notas funcao//
router.post('/notas', upload.single('imagem'), NotaControler.criarNota);
router.put('/notas/:id', upload.single('imagem'), NotaControler.editarNota);
router.delete('/notas/:id', NotaControler.excluirNota);
router.get('/notas/:id', NotaControler.visualizarNota);
router.get('/notas', NotaControler.buscarNotas);




export default router
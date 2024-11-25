"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuarioControllers_1 = require("./Controller/UsuariosController/UsuarioControllers");
const NotaControler_1 = __importDefault(require("./Controller/Nota/NotaControler"));
const Uploard_1 = __importDefault(require("./middleware/Uploard"));
const LoginControllers_1 = require("./Controller/Login/LoginControllers");
const RefreshTokenControler_1 = require("./Controller/Refreshtoken/RefreshTokenControler");
const router = (0, express_1.Router)();
//Usuario login e Cadastro//
router.post('/CadastrarUsuarios', new UsuarioControllers_1.UsuariosControllers().cadastrarUsuario);
router.post('/login', new LoginControllers_1.LoginUsuariosControllers().loginUsuarios);
router.post('/Refresh', new RefreshTokenControler_1.RefreshtokenController().handle);
// notas funcao//
router.post('/notas', Uploard_1.default.single('imagem'), NotaControler_1.default.criarNota);
router.put('/notas/:id', Uploard_1.default.single('imagem'), NotaControler_1.default.editarNota);
router.delete('/notas/:id', NotaControler_1.default.excluirNota);
router.get('/notas/:id', NotaControler_1.default.visualizarNota);
router.get('/notas', NotaControler_1.default.buscarNotas);
exports.default = router;

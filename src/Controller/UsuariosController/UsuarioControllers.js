"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosControllers = void 0;
const UsuariosServices_1 = require("../../Services/Usuarios/UsuariosServices");
class UsuariosControllers {
    cadastrarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, email, password } = req.body;
            const enviarDadosServices = new UsuariosServices_1.UsuariosServices();
            const resposta = yield enviarDadosServices.cadastrarUsuarios({
                nome,
                email,
                password
            });
            return res.json(resposta);
        });
    }
    consultarUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const enviarDadosServices = new UsuariosServices_1.UsuariosServices();
            const resposta = yield enviarDadosServices.consultarUsuarios();
            return res.json(resposta);
        });
    }
    consultarUsuariosUnico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const enviarDadosServices = new UsuariosServices_1.UsuariosServices();
        });
    }
}
exports.UsuariosControllers = UsuariosControllers;

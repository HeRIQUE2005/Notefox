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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosServices = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
class UsuariosServices {
    cadastrarUsuarios(_a) {
        return __awaiter(this, arguments, void 0, function* ({ nome, email, password }) {
            const senhaCrypt = yield (0, bcryptjs_1.hash)(password, 8);
            yield prisma_1.default.cadastrarUsuarios.create({
                data: {
                    nome: nome,
                    email: email,
                    senha: senhaCrypt
                }
            });
            return ({ dados: 'Cadastro Efetuado Com Sucesso' });
        });
    }
    consultarUsuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            const resposta = yield prisma_1.default.cadastrarUsuarios.findMany({
                select: {
                    id: true,
                    nome: true,
                    email: true,
                }
            });
            return resposta;
        });
    }
    consultarUsuariosUnico(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const resposta = yield prisma_1.default.cadastrarUsuarios.findFirst({
                where: {
                    id: id
                },
                select: {
                    nome: true,
                    email: true,
                    senha: true
                }
            });
            return resposta;
        });
    }
}
exports.UsuariosServices = UsuariosServices;

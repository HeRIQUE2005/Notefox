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
exports.LoginServices = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
const GenerationTokenRes_1 = require("../../provider/GenerationTokenRes");
const GenerationTokenProvider_1 = require("../../provider/GenerationTokenProvider");
class LoginServices {
    loginUsuarios(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            const usuario = yield prisma_1.default.cadastrarUsuarios.findFirst({
                where: {
                    email: email,
                }
            });
            if (!usuario) {
                throw new Error('Senha do Usuario, esta incorreta');
            }
            const passwordCorreto = yield (0, bcryptjs_1.compare)(password, usuario.senha);
            if (!passwordCorreto) {
                throw new Error('Senha do Usuario, esta incorreta');
            }
            const generateTokenProvider = new GenerationTokenProvider_1.GenerateRefreshTokenProvider();
            const token = yield generateTokenProvider.GenerateProvider(usuario.id);
            yield prisma_1.default.tokenRefresh.deleteMany({
                where: {
                    userId: usuario.id
                }
            });
            const generateRefreshToken = new GenerationTokenRes_1.GenerateRefreshToken();
            const tokenRefresh = yield generateRefreshToken.Generate(usuario.id);
            return { token, tokenRefresh };
        });
    }
}
exports.LoginServices = LoginServices;

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
exports.GenerateRefreshToken = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const dayjs_1 = __importDefault(require("dayjs"));
class GenerateRefreshToken {
    Generate(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const expireIn = (0, dayjs_1.default)().add(15, "second").unix();
            const generateRefreshToken = yield prisma_1.default.tokenRefresh.create({
                data: {
                    userId,
                    expireIn
                }
            });
            return { generateRefreshToken };
        });
    }
}
exports.GenerateRefreshToken = GenerateRefreshToken;

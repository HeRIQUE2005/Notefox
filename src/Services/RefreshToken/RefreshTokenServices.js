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
exports.RefreshtokenUser = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const GenerationTokenProvider_1 = require("../../provider/GenerationTokenProvider");
const dayjs_1 = __importDefault(require("dayjs"));
const GenerationTokenRes_1 = require("../../provider/GenerationTokenRes");
class RefreshtokenUser {
    refreshtoken(refresh_token) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshtoken = yield prisma_1.default.tokenRefresh.findFirst({
                where: {
                    id: refresh_token
                }
            });
            if (!refreshtoken) {
                throw new Error("Refresh token invalid");
            }
            const refreshtokenExpired = (0, dayjs_1.default)().isAfter(dayjs_1.default.unix(refreshtoken.expireIn));
            const generateTokenProvider = new GenerationTokenProvider_1.GenerateRefreshTokenProvider();
            const token = yield generateTokenProvider.GenerateProvider(refreshtoken.userId);
            if (!refreshtokenExpired) {
                yield prisma_1.default.tokenRefresh.deleteMany({
                    where: {
                        userId: refreshtoken.userId
                    }
                });
                const generateRefreshProvider = new GenerationTokenRes_1.GenerateRefreshToken();
                const newRefreshToken = yield generateRefreshProvider.Generate(refreshtoken.userId);
                return { token, newRefreshToken };
            }
            return { token };
        });
    }
}
exports.RefreshtokenUser = RefreshtokenUser;

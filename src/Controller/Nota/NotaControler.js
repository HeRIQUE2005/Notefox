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
const prisma_1 = __importDefault(require("../../prisma"));
class NotaController {
    // Criar nova nota
    criarNota(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { titulo, texto, tags, userId } = req.body;
                const imagem = req.file ? req.file.path : null; // Se houver imagem, utiliza o caminho
                // Cria a nota no banco de dados, associando ao usuário
                const novaNota = yield prisma_1.default.nota.create({
                    data: {
                        titulo,
                        texto,
                        imagem,
                        tags: tags ? tags.split(',') : [], // Divide as tags por vírgula
                        userId, // Associa o userId à nota
                    },
                });
                return res.status(201).json(novaNota);
            }
            catch (error) {
                console.error('Erro ao criar nota:', error);
                return res.status(500).json({ message: 'Erro ao criar nota', error: error.message });
            }
        });
    }
    // Editar nota existente
    editarNota(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { titulo, texto, tags, userId } = req.body;
            const imagem = req.file ? req.file.path : null;
            try {
                const notaAtualizada = yield prisma_1.default.nota.update({
                    where: { id: parseInt(id) },
                    data: {
                        titulo,
                        texto,
                        imagem,
                        tags: tags ? tags.split(',') : [], // Divide as tags por vírgula
                        userId, // Atualiza o userId se necessário
                    },
                });
                return res.status(200).json(notaAtualizada);
            }
            catch (error) {
                console.error('Erro ao editar nota:', error);
                return res.status(500).json({ message: 'Erro ao editar nota', error: error.message });
            }
        });
    }
    // Excluir nota
    excluirNota(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield prisma_1.default.nota.delete({
                    where: { id: parseInt(id) },
                });
                return res.status(200).json({ message: 'Nota excluída com sucesso' });
            }
            catch (error) {
                console.error('Erro ao excluir nota:', error);
                return res.status(500).json({ message: 'Erro ao excluir nota', error: error.message });
            }
        });
    }
    // Visualizar uma nota por id
    visualizarNota(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const nota = yield prisma_1.default.nota.findUnique({
                    where: { id: parseInt(id) },
                });
                if (!nota) {
                    return res.status(404).json({ message: 'Nota não encontrada' });
                }
                return res.status(200).json(nota);
            }
            catch (error) {
                console.error('Erro ao visualizar nota:', error);
                return res.status(500).json({ message: 'Erro ao visualizar nota', error: error.message });
            }
        });
    }
    // Buscar notas com filtros
    buscarNotas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { titulo, tags, dataInicio, dataFim } = req.query;
            try {
                const notas = yield prisma_1.default.nota.findMany({
                    where: {
                        titulo: titulo ? { contains: String(titulo), mode: 'insensitive' } : undefined,
                        tags: tags ? { hasSome: String(tags).split(',') } : undefined,
                        criadoEm: dataInicio && dataFim
                            ? {
                                gte: new Date(dataInicio),
                                lte: new Date(dataFim),
                            }
                            : undefined,
                    },
                });
                return res.status(200).json(notas);
            }
            catch (error) {
                console.error('Erro ao buscar notas:', error);
                return res.status(500).json({ message: 'Erro ao buscar notas', error: error.message });
            }
        });
    }
}
exports.default = new NotaController();

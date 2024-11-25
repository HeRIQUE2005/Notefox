"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Garantir que o diretório de upload exista
const uploadDir = './uploads';
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
// Configuração do Multer para salvar arquivos
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Diretório onde os arquivos serão armazenados
    },
    filename: (req, file, cb) => {
        // Gerar um nome único para o arquivo, usando timestamp e a extensão original
        const uniqueName = Date.now() + path_1.default.extname(file.originalname);
        cb(null, uniqueName); // Definir o nome do arquivo
    },
});
// Verificar o tipo de arquivo permitido (por exemplo, imagens apenas)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // Tipos de imagem permitidos
    if (allowedTypes.includes(file.mimetype)) {
        console.log(null, true); // Aceitar o arquivo
    }
    else {
        // Passar o erro corretamente e rejeitar o arquivo
        console.log('LIMIT_FILE_SIZE', 'Tipo de arquivo não permitido. Apenas imagens são aceitas!', false);
    }
};
// Configurar o multer com o tamanho máximo do arquivo e o filtro de tipo
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limitar o tamanho do arquivo para 5MB
    fileFilter,
});
exports.default = upload; // Exportar o objeto 'upload'

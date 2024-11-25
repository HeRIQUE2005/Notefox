import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Garantir que o diretório de upload exista
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do Multer para salvar arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);  // Diretório onde os arquivos serão armazenados
  },
  filename: (req, file, cb) => {
    // Gerar um nome único para o arquivo, usando timestamp e a extensão original
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);  // Definir o nome do arquivo
  },
});

// Verificar o tipo de arquivo permitido (por exemplo, imagens apenas)
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];  // Tipos de imagem permitidos
  if (allowedTypes.includes(file.mimetype)) {
    console.log(null, true);  // Aceitar o arquivo
  } else {
    // Passar o erro corretamente e rejeitar o arquivo
    console.log('LIMIT_FILE_SIZE', 'Tipo de arquivo não permitido. Apenas imagens são aceitas!', false); 
  }
};

// Configurar o multer com o tamanho máximo do arquivo e o filtro de tipo
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },  // Limitar o tamanho do arquivo para 5MB
  fileFilter,
});

export default upload;  // Exportar o objeto 'upload'

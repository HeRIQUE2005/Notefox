import { Request, Response } from 'express';
import prismaClient from '../../prisma';
import multer from 'multer';
import path from 'path';



class NotaController {
  // Criar nova nota
  async criarNota(req: Request, res: Response) {
    try {
      const { titulo, texto, tags, userId } = req.body;
      const imagem = req.file ? req.file.path : null;  // Se houver imagem, utiliza o caminho

      // Cria a nota no banco de dados, associando ao usuário
      const novaNota = await prismaClient.nota.create({
        data: {
          titulo,
          texto,
          imagem,
          tags: tags ? tags.split(',') : [],  // Divide as tags por vírgula
          userId,  // Associa o userId à nota
        },
      });

      return res.status(201).json(novaNota);
    } catch (error) {
      console.error('Erro ao criar nota:', error);
      return res.status(500).json({ message: 'Erro ao criar nota', error: error.message });
    }
  }

  // Editar nota existente
  async editarNota(req: Request, res: Response) {
    const { id } = req.params;
    const { titulo, texto, tags, userId } = req.body;
    const imagem = req.file ? req.file.path : null;

    try {
      const notaAtualizada = await prismaClient.nota.update({
        where: { id: parseInt(id) },
        data: {
          titulo,
          texto,
          imagem,
          tags: tags ? tags.split(',') : [],  // Divide as tags por vírgula
          userId,  // Atualiza o userId se necessário
        },
      });

      return res.status(200).json(notaAtualizada);
    } catch (error) {
      console.error('Erro ao editar nota:', error);
      return res.status(500).json({ message: 'Erro ao editar nota', error: error.message });
    }
  }

  // Excluir nota
  async excluirNota(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await prismaClient.nota.delete({
        where: { id: parseInt(id) },
      });

      return res.status(200).json({ message: 'Nota excluída com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir nota:', error);
      return res.status(500).json({ message: 'Erro ao excluir nota', error: error.message });
    }
  }

  // Visualizar uma nota por id
  async visualizarNota(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const nota = await prismaClient.nota.findUnique({
        where: { id: parseInt(id) },
      });

      if (!nota) {
        return res.status(404).json({ message: 'Nota não encontrada' });
      }

      return res.status(200).json(nota);
    } catch (error) {
      console.error('Erro ao visualizar nota:', error);
      return res.status(500).json({ message: 'Erro ao visualizar nota', error: error.message });
    }
  }

  // Buscar notas com filtros
  async buscarNotas(req: Request, res: Response) {
    const { titulo, tags, dataInicio, dataFim } = req.query;

    try {
      const notas = await prismaClient.nota.findMany({
        where: {
          titulo: titulo ? { contains: String(titulo), mode: 'insensitive' } : undefined,
          tags: tags ? { hasSome: String(tags).split(',') } : undefined,
          criadoEm: dataInicio && dataFim
            ? {
              gte: new Date(dataInicio as string),
              lte: new Date(dataFim as string),
            }
            : undefined,
        },
      });

      return res.status(200).json(notas);
    } catch (error) {
      console.error('Erro ao buscar notas:', error);
      return res.status(500).json({ message: 'Erro ao buscar notas', error: error.message });
    }
  }
}

export default new NotaController();

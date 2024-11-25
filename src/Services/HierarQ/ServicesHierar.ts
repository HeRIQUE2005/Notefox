import prismaClient from '../../prisma'

interface CreateUserData {
  email: string;
  password: string;
  nome: string
}

class UserService {
  async  CreateHierar( { email, password,nome }: CreateUserData) {
    const newUser = await prismaClient.cadastrarUsuarios.create({
      data: {
        email: email,
        senha: password, 
        nome: nome,
        role: 'cliente',
      },
    });
    return newUser;
  }


}

export default new UserService();

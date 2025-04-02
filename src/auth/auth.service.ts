import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { JwtService } from '@nestjs/jwt';
import { UserAuthDto } from './dto/user-auth.dto';
import { comparePassword } from 'utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService, // Corrigido com private
  ) {}

  async signIn(authDto: UserAuthDto): Promise<{
    message: string;
    success: boolean;
    status: HttpStatus;
    user?: { name: string };
    token?: { accessToken: string };
    error?: string;
  }> {
    try {
      // Verifica se email e senha foram fornecidos
      if (!authDto.email || !authDto.password) {
        return {
          message: 'Email ou senha não foram fornecidos',
          success: false,
          status: HttpStatus.BAD_REQUEST,
        };
      }

      // Busca o usuário no banco de dados
      const existUser = await this.prisma.user.findUnique({
        where: { email: authDto.email },
      });

      if (!existUser) {
        return {
          message: 'Usuário não encontrado',
          success: false,
          status: HttpStatus.BAD_REQUEST,
        };
      }

      // Verifica a senha
      const passwordMatch = await comparePassword(authDto.password, existUser.password);
      if (!passwordMatch) {
        return {
          message: 'Senha incorreta',
          success: false,
          status: HttpStatus.BAD_REQUEST,
        };
      }

      // Remove a senha do resultado e cria o payload do token
      const { password, ...result } = existUser;
      const payload = { sub: existUser.id, username: existUser.email };

      // Retorna sucesso com o token
      return {
        message: 'Login bem-sucedido',
        success: true,
        status: HttpStatus.ACCEPTED,
        user: { name: result.name },
        token: {
          accessToken: await this.jwtService.signAsync(payload),
        },
      };
    } catch (error) {
      return {
        message: 'Erro interno no servidor',
        success: false,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      };
    }
  }
}
import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { CreateHistDto } from './dto/create-hist.dto';

@Injectable()
export class HistService {
  constructor(private readonly prisma: PrismaService){}

  async createHist(createHist: CreateHistDto) {
    
    try {
      
      
      await this.prisma.hist.create({
        data:{
          agencia: createHist.agencia,
          numero_conta: createHist.numero_conta,
          valor: createHist.valor,
          user_id: createHist.user_id,
        }
      })
    } catch (error) {
      return{
        message: 'Ocorreu um erro ao registrar no historico',
        success: false,
        status: HttpStatus.NOT_ACCEPTABLE,
        error: error instanceof Error? error.message: 'Ocorreu um erro ao salvar no banco'
      }
    }
  }
}


      

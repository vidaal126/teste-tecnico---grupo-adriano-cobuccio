import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { CreateHistDto } from './dto/create-hist.dto';

@Injectable()
export class HistService {
  constructor(private readonly prisma: PrismaService){}

  async createHist(createHistDto: CreateHistDto) {
    
    try {
      
      
      await this.prisma.hist.create({
        data:{
        sender_id: createHistDto.sender_id,
        sender_account: createHistDto.recipient_account,
        recipient_id: createHistDto.recipient_id,
        recipient_account: createHistDto.sender_account,
        recipient_email:createHistDto.recipient_email,
        valor:createHistDto.valor,
        status_transfer: createHistDto.status_transfer,
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


      

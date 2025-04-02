import { PrismaService } from '@app/prisma';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { HistService } from 'src/hist/hist.service';

@Injectable()
export class TransferService {
  constructor(private readonly prisma: PrismaService,
    private readonly histService: HistService
  ) {}

  async createTransfer(transferDto: CreateTransferDto) {

    try {
      // Buscar remetente e destinatário com seus saldos
      const sender = await this.prisma.user.findUnique({
        where: { email: transferDto.senderEmail },
        include: { balance: true },
      });

      const recipient = await this.prisma.user.findUnique({
        where: { email: transferDto.recipientEmail },
        include: { balance: true },
      });

      // Verificar se ambos os usuários existem
      if (!sender || !recipient) {
        return {
          message: 'Remetente ou destinatário não encontrado',
          success: false,
          status: HttpStatus.NOT_FOUND,
        };
      }

      if (sender.email === recipient.email) {
        return {
          message: 'Você não pode enviar para sí mesmo',
          success: false,
          status: HttpStatus.CONFLICT,
        }
      }

      if (!sender.balance[0].saldo){
        return
      }

      if (sender.balance[0].saldo < transferDto.amount){
        return{

          message: 'Saldo insuficiente',
          success: false,
          status: HttpStatus.NOT_ACCEPTABLE,

        }
      }
      

      await this.prisma.balance.update({

        where:{

          user_id: sender.id

        },
        data:{

          saldo: { decrement: transferDto.amount}
        }
      })

      const updateSaldoSender = await this.prisma.balance.update({

        where:{

          user_id: recipient.id

        },
        data:{
          saldo: { increment: transferDto.amount}
        }
      })

      const createHistDto = {
        agencia: sender.balance[0].agencia,
        numero_conta: sender.balance[0].numero_conta,
        valor: transferDto.amount,
        user_id: sender.id
      }

      await this.histService.createHist(createHistDto)
      // Retornar sucesso
      return {
        message: 'Transferência realizada com sucesso',
        success: true,
        status: HttpStatus.OK,
        data: {
          saldoAtual: updateSaldoSender.saldo
        }
      };

    } catch (error) {
      console.error(error);
      return {
        message: 'Ocorreu um erro durante a transferência',
        success: false,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error instanceof Error? error.message : 'ocorreu um erro durante a transferencia'
      };
    }
  }
}

import { PrismaService } from '@app/prisma';
import { Status } from '@prisma/client';
import { HttpStatus, Injectable } from '@nestjs/common';
import { HistService } from 'src/hist/hist.service';
import { CreateRevertTransferDto } from './dto/create-revert-transfer.dto';
import { FindHistDto } from './dto/find-hist.dto';

@Injectable()
export class RevertTransferService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly histService: HistService,
  ) {}

  async createRevertTransfer(createRevert: CreateRevertTransferDto) {
    try {
      //achar ID da transferencia
      const reverseTransfer = await this.prisma.hist.findUnique({
        where: { id: createRevert.id },
      });

      if (!reverseTransfer) {
        return 'Transferencia não foi encontrada';
      }

      if (reverseTransfer.status_transfer === Status.REVERTED) {
        return {
          message: 'Reembolso já foi realizado',
          success: false,
          status: HttpStatus.CONFLICT,
        };
      }

      await this.prisma.balance.update({
        where: { user_id: reverseTransfer.sender_id },
        data: {
          saldo: { increment: reverseTransfer.valor },
        },
      });

      await this.prisma.balance.update({
        where: { user_id: reverseTransfer.recipient_id },
        data: {
          saldo: { decrement: reverseTransfer.valor },
        },
      });

      await this.prisma.hist.update({
        where: { id: reverseTransfer.id },
        data: {
          status_transfer: Status.REVERTED,
        },
      });

      return {
        message: 'Reembolso realizado com sucesso',
        success: true,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Ocorreu um erro durante o reembolso',
        success: false,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error:
          error instanceof Error
            ? error.message
            : 'ocorreu um erro durante o reembolso',
      };
    }
  }

  async findHistori(findHistDto: FindHistDto) {
    try {
      const hist = await this.prisma.hist.findMany({
        where: {
          sender_id: findHistDto.user_id,
        },
      });
      return hist;
    } catch (error) {}
  }
}

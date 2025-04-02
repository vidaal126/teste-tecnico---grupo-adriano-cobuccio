import { Module } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';
import { PrismaModule } from '@app/prisma';
import { HistModule } from 'src/hist/hist.module';

@Module({
  controllers: [TransferController],
  providers: [TransferService],
  imports: [PrismaModule, HistModule]
})
export class TransferModule {}

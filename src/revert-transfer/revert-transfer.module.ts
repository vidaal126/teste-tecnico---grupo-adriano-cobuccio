import { Module } from '@nestjs/common';
import { RevertTransferService } from './revert-transfer.service';
import { RevertTransferController } from './revert-transfer.controller';
import { PrismaModule } from '@app/prisma';
import { HistModule } from 'src/hist/hist.module';

@Module({
  controllers: [RevertTransferController],
  providers: [RevertTransferService],
  imports: [PrismaModule, HistModule]
})
export class RevertTransferModule {}

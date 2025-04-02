import { Module } from '@nestjs/common';
import { HistService } from './hist.service';
import { HistController } from './hist.controller';
import { PrismaModule } from '@app/prisma';

@Module({
  controllers: [HistController],
  providers: [HistService],
  exports: [HistService],
  imports: [PrismaModule]
})
export class HistModule {}

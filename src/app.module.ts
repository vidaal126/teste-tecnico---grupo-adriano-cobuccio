import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from '@app/prisma';
import { AuthModule } from './auth/auth.module';
import { TransferModule } from './transfer/transfer.module';
import { HistModule } from './hist/hist.module';
import { RevertTransferModule } from './revert-transfer/revert-transfer.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, TransferModule, HistModule, RevertTransferModule],
})
export class AppModule {}

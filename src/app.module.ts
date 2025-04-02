import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from '@app/prisma';
import { AuthModule } from './auth/auth.module';
import { TransferModule } from './transfer/transfer.module';
import { HistModule } from './hist/hist.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, TransferModule, HistModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

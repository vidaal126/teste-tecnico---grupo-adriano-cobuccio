import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { RevertTransferService } from './revert-transfer.service';
import { CreateRevertTransferDto } from './dto/create-revert-transfer.dto';
import { FindHistDto } from './dto/find-hist.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('revert-transfer')
export class RevertTransferController {
  constructor(private readonly revertTransferService: RevertTransferService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post()
  create(@Body() createRevertTransferDto: CreateRevertTransferDto) {
    return this.revertTransferService.createRevertTransfer(
      createRevertTransferDto,
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-find-all')
  @Post('find-all')
  async findAllHist(@Body(new ValidationPipe()) findHistDto: FindHistDto) {
    return this.revertTransferService.findHistori(findHistDto);
  }
  @UseGuards(AuthGuard)
  @ApiBearerAuth('cashback')
  @Post('cashback')
  async reverseSender(@Body(new ValidationPipe()) findHistDto: FindHistDto) {
    return this.revertTransferService.findHistori(findHistDto);
  }
}

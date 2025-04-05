import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { RevertTransferService } from './revert-transfer.service';
import { CreateRevertTransferDto } from './dto/create-revert-transfer.dto';
import { FindHistDto } from './dto/find-hist.dto';

@Controller('revert-transfer')
export class RevertTransferController {
  constructor(private readonly revertTransferService: RevertTransferService) {}

  @Post()
  create(@Body() createRevertTransferDto: CreateRevertTransferDto) {
    return this.revertTransferService.createRevertTransfer(createRevertTransferDto);
  }

  @Post('find-all')
  async findAllHist(@Body(new ValidationPipe) findHistDto: FindHistDto){
    return this.revertTransferService.findHistori(findHistDto)
  }
  @Post('cashback')
  async reverseSender(@Body(new ValidationPipe) findHistDto: FindHistDto){
    return this.revertTransferService.findHistori(findHistDto)
  }
}

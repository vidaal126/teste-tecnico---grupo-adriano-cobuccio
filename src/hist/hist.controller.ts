import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistService } from './hist.service';

@Controller('hist')
export class HistController {
  constructor(private readonly histService: HistService) {}

  
}

import { Controller } from '@nestjs/common';
import { HistService } from './hist.service';

@Controller('hist')
export class HistController {
  constructor(private readonly histService: HistService) {}
}

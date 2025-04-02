import { PartialType } from '@nestjs/mapped-types';
import { CreateHistDto } from './create-hist.dto';

export class UpdateHistDto extends PartialType(CreateHistDto) {}

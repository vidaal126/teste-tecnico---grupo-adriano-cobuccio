import { PartialType } from '@nestjs/mapped-types';
import { CreateRevertTransferDto } from './create-revert-transfer.dto';

export class UpdateRevertTransferDto extends PartialType(CreateRevertTransferDto) {}

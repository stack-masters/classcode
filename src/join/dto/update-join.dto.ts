import { PartialType } from '@nestjs/mapped-types';
import { CreateJoinDto } from './create-join.dto';

export class UpdateJoinDto extends PartialType(CreateJoinDto) {}

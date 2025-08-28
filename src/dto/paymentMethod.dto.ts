import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreatePaymentMethodDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  cardHolderName?: string;

  @IsOptional()
  @IsString()
  cardNumber?: string;

  @IsOptional()
  @IsString()
  expirationDate?: string;

  @IsOptional()
  @IsString()
  cvv?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}

export class UpdatePaymentMethodDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  cardHolderName?: string;

  @IsOptional()
  @IsString()
  cardNumber?: string;

  @IsOptional()
  @IsString()
  expirationDate?: string;

  @IsOptional()
  @IsString()
  cvv?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
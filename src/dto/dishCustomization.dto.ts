import { IsBoolean, IsNumber, IsOptional, IsString, IsIn } from 'class-validator';

export interface IDishCustomizationBase {
  id?: number;
  menuId?: number;
  name: string;
  description?: string;
  isRemovable: boolean;
  additionalPrice: number;
  isDefaultIncluded: boolean;
  isRequired: boolean;
  
}

export interface IOrderItemCustomization {
  customizationId: number;
  isIncluded: boolean;
  notes?: string;
}

export interface IDishCustomizationResponse extends IDishCustomizationBase {
  id: number;
  menuId: number;
  
}

export class CreateDishCustomizationDTO implements Partial<IDishCustomizationBase> {
  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isRemovable = true;

  @IsNumber()
  @IsOptional()
  additionalPrice = 0;

  @IsBoolean()
  @IsOptional()
  isDefaultIncluded = true;

  @IsBoolean()
  @IsOptional()
  isRequired = false;


}

export class UpdateDishCustomizationDTO implements Partial<IDishCustomizationBase> {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isRemovable?: boolean;

  @IsNumber()
  @IsOptional()
  additionalPrice?: number;

  @IsBoolean()
  @IsOptional()
  isDefaultIncluded?: boolean;

  @IsBoolean()
  @IsOptional()
  isRequired?: boolean;

  
}

export class OrderItemCustomizationDTO implements IOrderItemCustomization {
  @IsNumber()
  customizationId!: number;

  @IsBoolean()
  isIncluded!: boolean;

  @IsString()
  @IsOptional()
  notes?: string;
}

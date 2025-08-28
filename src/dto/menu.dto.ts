import { IsString, IsNumber, IsBoolean, IsOptional, IsIn, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDishCustomizationDTO, UpdateDishCustomizationDTO, IDishCustomizationBase } from './dishCustomization.dto';

const DISH_TYPES = ['Entrada', 'Plato Principal', 'Postre', 'Bebida', 'Ensalada', 'Guarnicion'] as const;
export type DishType = typeof DISH_TYPES[number];

// DTO para la creación de un plato del menú
export class CreateMenuDTO {
  @IsString()
  nameDish!: string;

  @IsNumber()
  @Type(() => Number)
  price!: number;

  @IsBoolean()
  @Type(() => Boolean)
  available!: boolean;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsIn(DISH_TYPES, { message: 'Tipo de plato no válido' })
  typeDish!: DishType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDishCustomizationDTO)
  @IsOptional()
  customizations?: CreateDishCustomizationDTO[];
}

// DTO para la actualización de un plato del menú
export class UpdateMenuDTO {
  @IsString()
  @IsOptional()
  nameDish?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  price?: number;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  available?: boolean;

  @IsString()
  @IsOptional()
  imageUrl?: string | null;

  @IsString()
  @IsIn(DISH_TYPES, { message: 'Tipo de plato no válido' })
  @IsOptional()
  typeDish?: DishType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateDishCustomizationDTO)
  @IsOptional()
  customizations?: UpdateDishCustomizationDTO[];
}

// DTO para la respuesta de un plato del menú
export interface IMenuResponse {
  id: number;
  nameDish: string;
  price: number;
  available: boolean;
  imageUrl: string | null;
  typeDish: DishType;
  customizations?: IDishCustomizationResponse[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IDishCustomizationResponse extends IDishCustomizationBase {
  id: number;
  menuId: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class MenuResponseDTO implements IMenuResponse {
  id!: number;
  nameDish!: string;
  price!: number;
  available!: boolean;
  imageUrl!: string | null;
  typeDish!: DishType;
  customizations?: IDishCustomizationResponse[];
  createdAt?: Date;
  updatedAt?: Date;

  constructor(partial: Partial<MenuResponseDTO>) {
    Object.assign(this, partial);
  }
}

export class DishCustomizationResponseDTO implements IDishCustomizationResponse {
  id!: number;
  menuId!: number;
  name!: string;
  description?: string;
  isRemovable!: boolean;
  additionalPrice!: number;
  isDefaultIncluded!: boolean;
  isRequired!: boolean;
  isActive!: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(partial: Partial<DishCustomizationResponseDTO>) {
    Object.assign(this, partial);
  }
}

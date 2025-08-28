import { IsNumber, IsString, IsOptional, IsArray, ValidateNested, IsBoolean, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { IDishCustomizationBase } from './dishCustomization.dto';

export interface IOrderItemCustomization {
  customizationId: number;
  isIncluded: boolean;
  notes?: string;
}

export class OrderItemCustomizationDTO implements IOrderItemCustomization {
  @IsNumber()
  @Min(1, { message: 'El ID de personalización debe ser mayor a 0' })
  customizationId!: number;

  @IsBoolean()
  isIncluded!: boolean;

  @IsString()
  @IsOptional()
  notes?: string;
}

export interface ICreateOrderItemDTO {
  orderId: number;
  menuId: number;
  quantity: number;
  notes?: string;
  customizations?: IOrderItemCustomization[];
}

export class CreateOrderItemDTO implements ICreateOrderItemDTO {
  @IsNumber()
  @Min(1, { message: 'El ID del pedido debe ser mayor a 0' })
  @Type(() => Number)
  orderId!: number;

  @IsNumber()
  @Min(1, { message: 'El ID del menú debe ser mayor a 0' })
  @Type(() => Number)
  menuId!: number;

  @IsNumber()
  @Min(1, { message: 'La cantidad debe ser al menos 1' })
  @Type(() => Number)
  quantity!: number;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemCustomizationDTO)
  @IsOptional()
  customizations?: OrderItemCustomizationDTO[];
}

export interface IUpdateOrderItemDTO {
  quantity?: number;
  notes?: string | null;
  customizations?: IOrderItemCustomization[];
}

export class UpdateOrderItemDTO implements IUpdateOrderItemDTO {
  @IsNumber()
  @Min(1, { message: 'La cantidad debe ser al menos 1' })
  @IsOptional()
  @Type(() => Number)
  quantity?: number;

  @IsString()
  @IsOptional()
  notes?: string | null;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemCustomizationDTO)
  @IsOptional()
  customizations?: OrderItemCustomizationDTO[];
}

export interface IOrderItemCustomizationResponse {
  id: number;
  orderItemId: number;
  customizationId: number;
  isIncluded: boolean;
  notes: string | null;
  customization: IDishCustomizationBase & { id: number };
}

export interface IOrderItemResponse {
  id: number;
  orderId: number;
  menuId: number;
  quantity: number;
  price: number;
  notes: string | null;
  customizations?: IOrderItemCustomizationResponse[];
  menuItem?: {
    id: number;
    nameDish: string;
    price: number;
    typeDish: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export class OrderItemResponseDTO implements IOrderItemResponse {
  id!: number;
  orderId!: number;
  menuId!: number;
  quantity!: number;
  price!: number;
  notes!: string | null;
  customizations?: IOrderItemCustomizationResponse[];
  menuItem?: {
    id: number;
    nameDish: string;
    price: number;
    typeDish: string;
  };
  createdAt?: Date;
  updatedAt?: Date;

  constructor(partial: Partial<OrderItemResponseDTO>) {
    Object.assign(this, partial);
  }
}

export class OrderItemCustomizationResponseDTO implements IOrderItemCustomizationResponse {
  id!: number;
  orderItemId!: number;
  customizationId!: number;
  isIncluded!: boolean;
  notes!: string | null;
  customization!: IDishCustomizationBase & { id: number };

  constructor(partial: Partial<OrderItemCustomizationResponseDTO>) {
    Object.assign(this, partial);
  }
}

import { IsDateString, IsInt, Min } from 'class-validator';

export class CheckAvailabilityDto {
  @IsDateString()
  dateTime!: string;

  @IsInt()
  @Min(1)
  people!: number;
}

export interface AvailableTable {
  id: number;
  tableNum: number;
  availableFrom: Date;
  availableUntil?: Date; // Hacemos este campo opcional
}

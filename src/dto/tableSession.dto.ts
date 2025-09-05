import { IsInt, IsDateString, IsOptional, IsIn, Min } from 'class-validator';

export class CreateTableSessionDto {
  @IsInt()
  tableId: number = 0;

  @IsOptional()
  @IsInt()
  bookingId: number | null = null;

  @IsDateString()
  startedAt: string = new Date().toISOString();

  @IsInt()
  @Min(1)
  partySize: number = 1;
}

export class UpdateTableSessionDto {
  @IsOptional()
  @IsDateString()
  endedAt?: string;

  @IsOptional()
  @IsIn(['active', 'closed'] as const)
  status?: 'active' | 'closed';
}

export class TableSessionResponseDto {
  id: number = 0;
  tableId: number = 0;
  bookingId: number | null = null;
  startedAt: Date = new Date();
  endedAt: Date | null = null;
  partySize: number = 1;
  status: 'active' | 'closed' = 'active';
  
  constructor(session: Partial<TableSessionResponseDto> = {}) {
    Object.assign(this, session);
  }
}

export class TableSessionWithRelationsDto extends TableSessionResponseDto {
  table?: {
    id: number;
    tableNum: number;
    ability: number;
    state: string;
  };
  
  booking?: {
    id: number;
    bookingDate: Date;
    numberPeople: number;
    status: string;
  };
  
  constructor(session: any) {
    super(session);
    if (session.table) {
      this.table = {
        id: session.table.id,
        tableNum: session.table.tableNum,
        ability: session.table.ability,
        state: session.table.state
      };
    }
    
    if (session.booking) {
      this.booking = {
        id: session.booking.id,
        bookingDate: session.booking.bookingDate,
        numberPeople: session.booking.numberPeople,
        status: session.booking.status
      };
    }
  }
}

import { Op } from 'sequelize';
import TableSession from '../models/TableSession';
import Table from '../models/Table';
import Booking from '../models/Booking';
import {
  CreateTableSessionDto,
  UpdateTableSessionDto,
  TableSessionResponseDto,
  TableSessionWithRelationsDto
} from '../dto/tableSession.dto';

class TableSessionService {
  async create(sessionData: CreateTableSessionDto): Promise<TableSessionResponseDto> {
    // Check if table exists and is available
    const table = await Table.findByPk(sessionData.tableId);
    if (!table) {
      throw new Error('Table not found');
    }

    // Check if there's an active session for this table
    const activeSession = await TableSession.findOne({
      where: {
        tableId: sessionData.tableId,
        status: 'active'
      }
    });

    if (activeSession) {
      throw new Error('Table is currently in use');
    }

    // If bookingId is provided, verify it exists and is valid
    if (sessionData.bookingId) {
      const booking = await Booking.findByPk(sessionData.bookingId);
      if (!booking) {
        throw new Error('Booking not found');
      }
    }

    const session = await TableSession.create({
      tableId: sessionData.tableId,
      bookingId: sessionData.bookingId || null,
      startedAt: new Date(sessionData.startedAt),
      partySize: sessionData.partySize,
      status: 'active'
    });

    // Update table status if needed
    await table.update({ state: 'occupied' });

    return new TableSessionResponseDto(session.toJSON());
  }

  async findActiveSessions(): Promise<TableSessionWithRelationsDto[]> {
    const sessions = await TableSession.findAll({
      where: { status: 'active' },
      include: [
        { model: Table, as: 'table' },
        { model: Booking, as: 'booking' }
      ]
    });

    return sessions.map(session => new TableSessionWithRelationsDto(session.toJSON()));
  }

  async findById(id: number): Promise<TableSessionWithRelationsDto | null> {
    const session = await TableSession.findByPk(id, {
      include: [
        { model: Table, as: 'table' },
        { model: Booking, as: 'booking' }
      ]
    });

    return session ? new TableSessionWithRelationsDto(session.toJSON()) : null;
  }

  async update(
    id: number, 
    updateData: UpdateTableSessionDto
  ): Promise<TableSessionResponseDto | null> {
    const session = await TableSession.findByPk(id);
    if (!session) {
      return null;
    }

    // Prepare update data with proper types
    const updateDataCopy: any = { ...updateData };
    
    // If ending the session, update table status
    if (updateData.status === 'closed' || updateData.endedAt) {
      updateDataCopy.endedAt = updateData.endedAt ? new Date(updateData.endedAt).toISOString() : new Date().toISOString();
      
      // Update table status to available
      await Table.update(
        { state: 'available' },
        { where: { id: session.tableId } }
      );
    } else if (updateDataCopy.endedAt) {
      // If just updating the endedAt, ensure it's a string in ISO format
      updateDataCopy.endedAt = new Date(updateDataCopy.endedAt).toISOString();
    }

    // Ensure we only pass defined values to the update
    const updatePayload: any = {};
    if (updateDataCopy.endedAt !== undefined) updatePayload.endedAt = updateDataCopy.endedAt;
    if (updateDataCopy.status !== undefined) updatePayload.status = updateDataCopy.status;

    await session.update(updatePayload);
    return new TableSessionResponseDto((await TableSession.findByPk(id, { 
      include: [
        { model: Table, as: 'table' },
        { model: Booking, as: 'booking' }
      ]
    }))?.toJSON());
  }

  async delete(id: number): Promise<boolean> {
    const session = await TableSession.findByPk(id);
    if (!session) {
      return false;
    }

    // If active session, update table status first
    if (session.status === 'active') {
      await Table.update(
        { state: 'available' },
        { where: { id: session.tableId } }
      );
    }

    await session.destroy();
    return true;
  }

  async getTableSessions(
    tableId: number, 
    startDate?: string, 
    endDate?: string
  ): Promise<TableSessionResponseDto[]> {
    const where: any = { tableId };
    
    if (startDate && endDate) {
      where.startedAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    const sessions = await TableSession.findAll({ 
      where,
      order: [['startedAt', 'DESC']]
    });

    return sessions.map(session => new TableSessionResponseDto(session.toJSON()));
  }
}

export default new TableSessionService();

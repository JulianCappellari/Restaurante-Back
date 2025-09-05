import { Request, Response } from 'express';
import {
  CreateTableSessionDto,
  UpdateTableSessionDto,
  TableSessionWithRelationsDto
} from '../dto/tableSession.dto';
import tableSessionService from '../services/tableSessionService';
import { validateOrReject } from 'class-validator';

export const createTableSessionController = async (req: Request, res: Response) => {
  try {
    const sessionData = new CreateTableSessionDto();
    Object.assign(sessionData, req.body);
    
    await validateOrReject(sessionData);
    
    const session = await tableSessionService.create(sessionData);
    res.status(201).json(session);
  } catch (error) {
    console.error('Error creating table session:', error);
    res.status(400).json({ 
      message: error instanceof Error ? error.message : 'Error creating table session' 
    });
  }
};

export const getActiveSessionsController = async (req: Request, res: Response) => {
  try {
    const sessions = await tableSessionService.findActiveSessions();
    res.json(sessions);
  } catch (error) {
    console.error('Error fetching active sessions:', error);
    res.status(500).json({ message: 'Error fetching active sessions' });
  }
};

export const getSessionByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const session = await tableSessionService.findById(Number(id));
    
    if (!session) {
      return res.status(404).json({ message: 'Table session not found' });
    }
    
    res.json(session);
  } catch (error) {
    console.error('Error fetching table session:', error);
    res.status(500).json({ message: 'Error fetching table session' });
  }
};

export const updateTableSessionController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = new UpdateTableSessionDto();
    Object.assign(updateData, req.body);
    
    await validateOrReject(updateData, { skipMissingProperties: true });
    
    const session = await tableSessionService.update(Number(id), updateData);
    
    if (!session) {
      return res.status(404).json({ message: 'Table session not found' });
    }
    
    res.json(session);
  } catch (error) {
    console.error('Error updating table session:', error);
    res.status(400).json({ 
      message: error instanceof Error ? error.message : 'Error updating table session' 
    });
  }
};

export const deleteTableSessionController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = await tableSessionService.delete(Number(id));
    
    if (!success) {
      return res.status(404).json({ message: 'Table session not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting table session:', error);
    res.status(500).json({ message: 'Error deleting table session' });
  }
};

export const getTableSessionsController = async (req: Request, res: Response) => {
  try {
    const { tableId } = req.params;
    const { startDate, endDate } = req.query;
    
    const sessions = await tableSessionService.getTableSessions(
      Number(tableId),
      startDate as string | undefined,
      endDate as string | undefined
    );
    
    res.json(sessions);
  } catch (error) {
    console.error('Error fetching table sessions:', error);
    res.status(500).json({ message: 'Error fetching table sessions' });
  }
};

export const endTableSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const session = await tableSessionService.update(Number(id), {
      status: 'closed',
      endedAt: new Date().toISOString()
    });
    
    if (!session) {
      return res.status(404).json({ message: 'Table session not found' });
    }
    
    res.json(session);
  } catch (error) {
    console.error('Error ending table session:', error);
    res.status(500).json({ message: 'Error ending table session' });
  }
};

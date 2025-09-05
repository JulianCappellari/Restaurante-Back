import { Request, Response } from 'express';
import { suggestTablesForParty } from '../services/tableCombiner';
import { toDateShift } from '../utils/shift';
import { checkAvailabilitySvc } from '../services/availabilityService';


export const checkAvailability = async (req: Request, res: Response) => {
  try {
    const people = Number(req.body.people);
    const { dateTime, date, shift } = req.body as {
      dateTime?: string; date?: string; shift?: 'lunch'|'dinner'
    };

    if (!people || people < 1 || Number.isNaN(people)) {
      return res.status(400).json({ available: false, message: 'people inválido' });
    }

    let d = date, s = shift;
    if ((!d || !s) && dateTime) ({ date: d, shift: s } = toDateShift(dateTime));
    if (!d || !s) {
      return res.status(400).json({ available: false, message: 'Enviá (date y shift) o (dateTime)' });
    }

    // armamos un ISO cualquiera dentro del turno sólo para el service
    const iso = dateTime ?? `${d}T12:00:00.000Z`;
    const result = await checkAvailabilitySvc(iso, people);

    return res.status(200).json(result);
  } catch {
    return res.status(500).json({ available: false, error: 'Error checking availability' });
  }
};

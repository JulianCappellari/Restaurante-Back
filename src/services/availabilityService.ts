import { Op } from 'sequelize';
import Table from '../models/Table';
import Booking from '../models/Booking';
import { toDateShift } from '../utils/shift';

/** Devuelve las mesas libres para ese dateTime (filtrando por reservas activas del turno) */
export async function findFreeTablesFor(dateTimeISO: string) {
  const { date, shift } = toDateShift(dateTimeISO);

  // Traemos las reservas activas del turno con sus mesas
  const bookings = await Booking.findAll({
    where: {
      date,
      shift,
      status: { [Op.in]: ['confirmed', 'checked_in'] },
    },
    include: [{ model: Table, as: 'assignedTables', attributes: ['id', 'ability', 'tableNum'] }],
  });

  const bookedIds = new Set<number>();
  for (const b of bookings) {
    // @ts-ignore (para evitar quejarse por tipado opcional)
    (b.assignedTables || []).forEach((t: Table) => bookedIds.add(t.id));
  }

  // Mesas libres = todas menos las reservadas (y sin mantenimiento)
  const freeTables = await Table.findAll({
    where: {
      status: { [Op.ne]: 'maintenance' },
      id: { [Op.notIn]: [...bookedIds] },
    },
    order: [['ability', 'ASC'], ['tableNum', 'ASC']],
  });

  return { date, shift, freeTables };
}

/** Elige combinación de mesas (2 y 4) para cubrir `people` con las mesas libres que pasamos */
export function chooseTablesForPeople(people: number, freeTables: Table[]) {
  const twos = freeTables.filter(t => t.ability === 2).map(t => t.id);
  const fours = freeTables.filter(t => t.ability === 4).map(t => t.id);

  // greedy: usar la mayor cantidad posible de 4s
  let use4 = Math.min(Math.floor(people / 4), fours.length);
  let remaining = people - use4 * 4;

  let need2 = Math.ceil(remaining / 2);
  if (need2 <= twos.length) {
    return {
      ok: true,
      tables: [...fours.slice(0, use4), ...twos.slice(0, need2)],
      breakdown: { fours: fours.slice(0, use4), twos: twos.slice(0, need2) },
    };
  }

  // Faltan mesas de 2: reemplazar cada 2 mesas de 2 por 1 mesa de 4
  const missing2 = need2 - twos.length;
  const extra4Needed = Math.ceil(missing2 / 2);

  if (use4 + extra4Needed <= fours.length) {
    use4 += extra4Needed;
    // Con los 4 extra, ya no necesitamos esas 2s faltantes
    const chosenFours = fours.slice(0, use4);
    const chosenTwos = twos; // todas las que hay
    return {
      ok: true,
      tables: [...chosenFours, ...chosenTwos],
      breakdown: { fours: chosenFours, twos: chosenTwos },
    };
  }

  return { ok: false, reason: 'no_combination' as const };
}

export async function checkAvailabilitySvc(dateTimeISO: string, people: number) {
  const { date, shift, freeTables } = await (async () => {
    const r = await findFreeTablesFor(dateTimeISO);
    return { ...r, freeTables: r.freeTables };
  })();

  const pick = chooseTablesForPeople(people, freeTables);
  if (!pick.ok) {
    return { available: false, date, shift };
  }
  return {
    available: true,
    date,
    shift,
    tables: pick.tables,
    breakdown: pick.breakdown,
    requiredPeople: people,
  };
}

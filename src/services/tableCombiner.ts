// src/services/tableCombiner.ts
import { Op } from 'sequelize';
import Table from '../models/Table';

type Combo = { use4: number; use2: number; waste: number; tables: number };

function pickBestCombo(people: number, n2: number, n4: number): { use4: number; use2: number } | null {
  let best: Combo | null = null;

  for (let use4 = 0; use4 <= n4; use4++) {
    for (let use2 = 0; use2 <= n2; use2++) {
      const seats = 4 * use4 + 2 * use2;
      if (seats < people) continue;

      const waste = seats - people;
      const tables = use4 + use2;

      if (
        !best ||
        waste < best.waste ||
        (waste === best.waste && tables < best.tables) ||
        (waste === best.waste && tables === best.tables && use4 > best.use4) // último desempate: más 4-tops
      ) {
        best = { use4, use2, waste, tables };
      }
    }
  }
  return best ? { use4: best.use4, use2: best.use2 } : null;
}

export async function suggestTablesForParty(people: number) {
  // 1) mesas disponibles
  const tables = await Table.findAll({
    where: { status: 'available', ability: { [Op.in]: [2, 4] } },
    order: [['ability', 'ASC'], ['tableNum', 'ASC']],
    raw: true,
  });

  const twos = tables.filter(t => t.ability === 2).map(t => t.id);
  const fours = tables.filter(t => t.ability === 4).map(t => t.id);

  // 2) mejor combinación
  const combo = pickBestCombo(people, twos.length, fours.length);
  if (!combo) return { ok: false, reason: 'capacity_insufficient', tables: [] };

  // 3) ids sugeridos
  const chosen4 = fours.slice(0, combo.use4);
  const chosen2 = twos.slice(0, combo.use2);
  return { ok: true, tables: [...chosen4, ...chosen2], breakdown: { fours: chosen4, twos: chosen2 } };
}
export async function reserveTables(tableIds: number[]) {
    await Table.update({ status: 'reserved' }, { where: { id: tableIds } });
}
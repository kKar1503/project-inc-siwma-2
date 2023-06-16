
export interface Data {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
  active: boolean,
}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  active: boolean,
): Data {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    active
  };
}

export const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3,true),
  createData('Donut', 452, 25.0, 51, 4.9,true),
  createData('Eclair', 262, 16.0, 24, 6.0,true),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0,true),
  createData('Gingerbread', 356, 16.0, 49, 3.9,true),
  createData('Honeycomb', 408, 3.2, 87, 6.5,true),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3,true),
  createData('Jelly Bean', 375, 0.0, 94, 0.0,true),
  createData('KitKat', 518, 26.0, 65, 7.0,true),
  createData('Lollipop', 392, 0.2, 98, 0.0,true),
  createData('Marshmallow', 318, 0, 81, 2.0,true),
  createData('Nougat', 360, 19.0, 9, 37.0,false),
  createData('Oreo', 437, 18.0, 63, 4.0,false),
];
export interface HeadCell {
  id: keyof Data;
  label: string;
}

export const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    label: 'Dessert (100g serving)',
  },
  {
    id: 'calories',
    label: 'Calories',
  },
  {
    id: 'fat',
    label: 'Fat (g)',
  },
  {
    id: 'carbs',
    label: 'Carbs (g)',
  },
  {
    id: 'protein',
    label: 'Protein (g)',
  },
];


import { parametertype, datatype } from '@prisma/client';

interface IParameter {
  id?: number;
  type: parametertype;
  datatype: datatype;
  name: string;
  display_name: string;
  active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

const Parameters: IParameter[] = [
  {
    type: parametertype.MANY_CHOICES,
    datatype: datatype.string,
    name: 'Length (Long Medium Short)',
    display_name: 'Length',
  },
  {
    type: parametertype.DIMENSION,
    datatype: datatype.number,
    name: 'Length (Measurement type)',
    display_name: 'Length',
  },
  {
    type: parametertype.MANY_CHOICES,
    datatype: datatype.string,
    name: 'Width (Long Medium Short)',
    display_name: 'Width',
  },
  {
    type: parametertype.DIMENSION,
    datatype: datatype.number,
    name: 'Width (Measurement type)',
    display_name: 'Width',
  },
  {
    type: parametertype.TWO_CHOICES,
    datatype: datatype.string,
    name: 'Length (Long Short)',
    display_name: 'Length',
  },
  {
    type: parametertype.DIMENSION,
    datatype: datatype.number,
    name: 'Height (Measurement type)',
    display_name: 'Height',
  },
  {
    type: parametertype.WEIGHT,
    datatype: datatype.number,
    name: 'Weight (Measurement type)',
    display_name: 'Weight',
  },
  {
    type: parametertype.DIMENSION,
    datatype: datatype.number,
    name: 'Diameter (Measurement type)',
    display_name: 'Diameter',
  },
  {
    type: parametertype.DIMENSION,
    datatype: datatype.number,
    name: 'Diameter (Hollow Sections)',
    display_name: 'D',
  },
  {
    type: parametertype.DIMENSION,
    datatype: datatype.number,
    name: 'Thickness (Hollow Sections)',
    display_name: 't',
  },
  {
    type: parametertype.DIMENSION,
    datatype: datatype.number,
    name: 'Thickness (Sheet Piles)',
    display_name: 'A',
  },
  {
    type: parametertype.DIMENSION,
    datatype: datatype.number,
    name: 'Width (Channels)',
    display_name: 'A',
  },
  {
    type: parametertype.DIMENSION,
    datatype: datatype.number,
    name: 'Height (Channels)',
    display_name: 'B',
  },
  {
    type: parametertype.DIMENSION,
    datatype: datatype.number,
    name: 'Thickness (Channels)',
    display_name: 'C',
  },
  {
    type: parametertype.DIMENSION,
    datatype: datatype.number,
    name: 'Width (Purlins)',
    display_name: 'B',
  },
  {
    type: parametertype.DIMENSION,
    datatype: datatype.number,
    name: 'Height (Purlins)',
    display_name: 'D',
  },
  {
    type: parametertype.DIMENSION,
    datatype: datatype.number,
    name: 'Thickness (Purlins)',
    display_name: 't',
  },
  {
    type: parametertype.DIMENSION,
    datatype: datatype.number,
    name: 'Width (Angles)',
    display_name: 'B',
  },
  {
    type: parametertype.DIMENSION,
    datatype: datatype.number,
    name: 'Height (Angles)',
    display_name: 'A',
  },
  {
    type: parametertype.DIMENSION,
    datatype: datatype.number,
    name: 'Thickness (Angles)',
    display_name: 'C',
  },
  {
    type: parametertype.DIMENSION,
    datatype: datatype.number,
    name: 'Thickness (Plates)',
    display_name: 'A',
  },
  {
    type: parametertype.DIMENSION,
    datatype: datatype.number,
    name: 'Diameter (Round Bar)',
    display_name: 'A',
  },
  {
    type: parametertype.DIMENSION,
    datatype: datatype.number,
    name: 'Height (Square Bar)',
    display_name: 'A',
  },
  {
    type: parametertype.DIMENSION,
    datatype: datatype.number,
    name: 'Height (Gratings)',
    display_name: 'A',
  },
  {
    type: parametertype.DIMENSION,
    datatype: datatype.number,
    name: 'Thickness (Gratings)',
    display_name: 'B',
  },
  {
    type: parametertype.DIMENSION,
    datatype: datatype.number,
    name: 'Width (Beams)',
    display_name: 'B',
  },
  {
    type: parametertype.DIMENSION,
    datatype: datatype.number,
    name: 'Height (Beams)',
    display_name: 'D',
  },
  {
    type: parametertype.DIMENSION,
    datatype: datatype.number,
    name: 'Thickness (Flange)',
    display_name: 'T',
  },
  {
    type: parametertype.DIMENSION,
    datatype: datatype.number,
    name: 'Thickness (Web)',
    display_name: 't',
  },
  {
    type: parametertype.DIMENSION,
    datatype: datatype.number,
    name: 'Depth of Section',
    display_name: 'D',
  },
  {
    type: parametertype.DIMENSION,
    datatype: datatype.number,
    name: 'Root Radius',
    display_name: 'r',
  },
  {
    type: parametertype.DIMENSION,
    datatype: datatype.number,
    name: 'Ratios for Local Buckling (Flange)',
    display_name: 'b/T',
  },
];

export type { IParameter };
export { Parameters };

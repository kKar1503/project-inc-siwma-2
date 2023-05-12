import { ParameterType, DataType } from '../../../index';

interface IParameter {
  id?: number;
  type: ParameterType;
  dataType: DataType;
  name: string;
  displayName: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  options?: string[];
}

const Parameters: IParameter[] = [
  {
    type: ParameterType.MANY_CHOICES,
    dataType: DataType.string,
    name: 'Length (Long Medium Short)',
    displayName: 'Length',
    options: ['Long', 'Medium', 'Short'],
  },
  {
    type: ParameterType.DIMENSION,
    dataType: DataType.number,
    name: 'Length (Measurement type)',
    displayName: 'Length',
  },
  {
    type: ParameterType.MANY_CHOICES,
    dataType: DataType.string,
    name: 'Width (Long Medium Short)',
    displayName: 'Width',
  },
  {
    type: ParameterType.DIMENSION,
    dataType: DataType.number,
    name: 'Width (Measurement type)',
    displayName: 'Width',
  },
  {
    type: ParameterType.TWO_CHOICES,
    dataType: DataType.string,
    name: 'Length (Long Short)',
    displayName: 'Length',
  },
  {
    type: ParameterType.DIMENSION,
    dataType: DataType.number,
    name: 'Height (Measurement type)',
    displayName: 'Height',
  },
  {
    type: ParameterType.WEIGHT,
    dataType: DataType.number,
    name: 'Weight (Measurement type)',
    displayName: 'Weight',
  },
  {
    type: ParameterType.DIMENSION,
    dataType: DataType.number,
    name: 'Diameter (Measurement type)',
    displayName: 'Diameter',
  },
  {
    type: ParameterType.DIMENSION,
    dataType: DataType.number,
    name: 'Diameter (Hollow Sections)',
    displayName: 'D',
  },
  {
    type: ParameterType.DIMENSION,
    dataType: DataType.number,
    name: 'Thickness (Hollow Sections)',
    displayName: 't',
  },
  {
    type: ParameterType.DIMENSION,
    dataType: DataType.number,
    name: 'Thickness (Sheet Piles)',
    displayName: 'A',
  },
  {
    type: ParameterType.DIMENSION,
    dataType: DataType.number,
    name: 'Width (Channels)',
    displayName: 'A',
  },
  {
    type: ParameterType.DIMENSION,
    dataType: DataType.number,
    name: 'Height (Channels)',
    displayName: 'B',
  },
  {
    type: ParameterType.DIMENSION,
    dataType: DataType.number,
    name: 'Thickness (Channels)',
    displayName: 'C',
  },
  {
    type: ParameterType.DIMENSION,
    dataType: DataType.number,
    name: 'Width (Purlins)',
    displayName: 'B',
  },
  {
    type: ParameterType.DIMENSION,
    dataType: DataType.number,
    name: 'Height (Purlins)',
    displayName: 'D',
  },
  {
    type: ParameterType.DIMENSION,
    dataType: DataType.number,
    name: 'Thickness (Purlins)',
    displayName: 't',
  },
  {
    type: ParameterType.DIMENSION,
    dataType: DataType.number,
    name: 'Width (Angles)',
    displayName: 'B',
  },
  {
    type: ParameterType.DIMENSION,
    dataType: DataType.number,
    name: 'Height (Angles)',
    displayName: 'A',
  },
  {
    type: ParameterType.DIMENSION,
    dataType: DataType.number,
    name: 'Thickness (Angles)',
    displayName: 'C',
  },
  {
    type: ParameterType.DIMENSION,
    dataType: DataType.number,
    name: 'Thickness (Plates)',
    displayName: 'A',
  },
  {
    type: ParameterType.DIMENSION,
    dataType: DataType.number,
    name: 'Diameter (Round Bar)',
    displayName: 'A',
  },
  {
    type: ParameterType.DIMENSION,
    dataType: DataType.number,
    name: 'Height (Square Bar)',
    displayName: 'A',
  },
  {
    type: ParameterType.DIMENSION,
    dataType: DataType.number,
    name: 'Height (Gratings)',
    displayName: 'A',
  },
  {
    type: ParameterType.DIMENSION,
    dataType: DataType.number,
    name: 'Thickness (Gratings)',
    displayName: 'B',
  },
  {
    type: ParameterType.DIMENSION,
    dataType: DataType.number,
    name: 'Width (Beams)',
    displayName: 'B',
  },
  {
    type: ParameterType.DIMENSION,
    dataType: DataType.number,
    name: 'Height (Beams)',
    displayName: 'D',
  },
  {
    type: ParameterType.DIMENSION,
    dataType: DataType.number,
    name: 'Thickness (Flange)',
    displayName: 'T',
  },
  {
    type: ParameterType.DIMENSION,
    dataType: DataType.number,
    name: 'Thickness (Web)',
    displayName: 't',
  },
  {
    type: ParameterType.DIMENSION,
    dataType: DataType.number,
    name: 'Depth of Section',
    displayName: 'D',
  },
  {
    type: ParameterType.DIMENSION,
    dataType: DataType.number,
    name: 'Root Radius',
    displayName: 'r',
  },
  {
    type: ParameterType.DIMENSION,
    dataType: DataType.number,
    name: 'Ratios for Local Buckling (Flange)',
    displayName: 'b/T',
  },
];

export type { IParameter };
export { Parameters };

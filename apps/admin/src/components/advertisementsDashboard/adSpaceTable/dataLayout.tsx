export interface DataType {
  id: string;

  company: string;
  image: string;
  description: string;
  link: string;
  active: boolean;
  createdAt: string;
  startDate: string;
  endDate: string;
}

export interface HeadCell {
  id: keyof DataType;
  label: string;
}

export const headCells: readonly HeadCell[] = [
  {
    id: 'company',
    label: 'Company',
  },
  {
    id: 'image',
    label: 'Advertisement Image',
  },
  {
    id: 'description',
    label: 'Description',
  },
  {
    id: 'link',
    label: 'Link',
  },
  {
    id: 'active',
    label: 'Active',
  },
  {
    id: 'createdAt',
    label: 'Created On',
  },
  {
    id: 'startDate',
    label: 'Start From',
  },
  {
    id: 'endDate',
    label: 'End At',
  }
];

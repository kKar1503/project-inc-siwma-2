interface IRoom {
  id?: string;
  seller: string;
  buyer: string;
  createdAt?: Date;
  listing: number;
}

const Rooms: IRoom[] = [
  {
    id: '20fc42eb-53ce-4935-a187-16a1292b3270',
    seller: '14f9a310-958c-4273-b4b3-4377804642a5',
    buyer: '1965b49b-3e55-4493-bc69-5701cabf8baa',
    listing: 28,
  },
  {
    id: 'de1c669c-a999-4cad-b4e4-7a99e9b49ea1',
    seller: 'a43405b7-74d5-48d4-9155-3622ad3d2970',
    buyer: '1965b49b-3e55-4493-bc69-5701cabf8baa',
    listing: 23,
  },
];

export type { IRoom };
export { Rooms };

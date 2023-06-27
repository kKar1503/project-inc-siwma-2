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
  {
    id: '503d45ba-377a-467e-b53f-caebdd389138',
    seller: 'ba9243d0-8d5e-48bf-b28e-d21cfb9fd126',
    buyer: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
    listing: 52,
  },
  {
    id: 'd1a05616-3815-4c35-a6cf-31bdaa9fa29d',
    seller: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
    buyer: 'ba9243d0-8d5e-48bf-b28e-d21cfb9fd12',
    listing: 64,
  },
  {
    id: 'bd73f357-a882-4c4d-8c36-c1eaa625d2cc',
    seller: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
    buyer: '14f9a310-958c-4273-b4b3-4377804642a5',
    listing: 66,
  },
  {
    id: 'a4cae7fc-5cd3-4263-ae1b-4396f3f4c0a7',
    seller: '14f9a310-958c-4273-b4b3-4377804642a5',
    buyer: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
    listing: 59,
  },
  {
    id: '7b9fa71d-efa8-462a-ac50-fe4ce959b205',
    seller: '14f9a310-958c-4273-b4b3-4377804642a5',
    buyer: 'ba9243d0-8d5e-48bf-b28e-d21cfb9fd126',
    listing: 25,
  },
  {
    id: 'f674c06e-287b-491e-83b8-e31bd440f699',
    seller: 'ba9243d0-8d5e-48bf-b28e-d21cfb9fd126',
    buyer: '14f9a310-958c-4273-b4b3-4377804642a5',
    listing: 52,
  },
];

export type { IRoom };
export { Rooms };

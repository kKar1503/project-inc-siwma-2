import { Prisma, ListingType } from '../../../index';

interface IListings {
  id?: number;
  price?: Prisma.Decimal;
  negotiable?: boolean;
  quantity?: number;
  type: ListingType;
  owner: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  listingItemId: number;
}

const Listings: IListings[] = [
  {
    //1
    price: new Prisma.Decimal(300),
    negotiable: false,
    type: ListingType.SELL,
    owner: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    listingItemId: 1,
    quantity: 15,
  },
  {
    //2
    price: new Prisma.Decimal(100),
    type: ListingType.SELL,
    owner: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    listingItemId: 2,
    quantity: 15,
  },
  {
    //3
    price: new Prisma.Decimal(80),
    type: ListingType.SELL,
    owner: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    listingItemId: 2,
    quantity: 15,
  },
  {

    //4
    price: new Prisma.Decimal(50),
    negotiable: false,
    type: ListingType.BUY,
    owner: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    listingItemId: 4,
    quantity: 15,
  },
  {
    //5
    price: new Prisma.Decimal(69),
    type: ListingType.SELL,
    owner: 'b42f91ca-86e5-4ac6-a8c9-10bda477370e',
    listingItemId: 3,
    quantity: 15,
  },
  {
    //6
    price: new Prisma.Decimal(69),
    type: ListingType.BUY,
    owner: 'b42f91ca-86e5-4ac6-a8c9-10bda477370e',
    listingItemId: 3,
    quantity: 15,
  },
  {
    //7
    price: new Prisma.Decimal(200),
    type: ListingType.SELL,
    owner: 'b42f91ca-86e5-4ac6-a8c9-10bda477370e',
    listingItemId: 3,
    quantity: 15,
  },
  {
    //8
    price: new Prisma.Decimal(30),
    type: ListingType.SELL,
    owner: 'b42f91ca-86e5-4ac6-a8c9-10bda477370e',
    listingItemId: 3,
    quantity: 15,
  },
  {
    //9
    price: new Prisma.Decimal(100),
    type: ListingType.BUY,
    owner: '2a7f0665-57a8-454b-8518-ce2c4f003237',
    listingItemId: 15,
    quantity: 15,
  },
  {
    //10
    price: new Prisma.Decimal(10),
    negotiable: false,
    type: ListingType.SELL,
    owner: '2a7f0665-57a8-454b-8518-ce2c4f003237',
    listingItemId: 23,
    quantity: 15,
  },
  {
    //11
    price: new Prisma.Decimal(3),
    type: ListingType.SELL,
    owner: '2a7f0665-57a8-454b-8518-ce2c4f003237',
    listingItemId: 24,
    quantity: 15,
  },
  {
    //12
    price: new Prisma.Decimal(50),
    type: ListingType.SELL,
    owner: '2a7f0665-57a8-454b-8518-ce2c4f003237',
    listingItemId: 28,
    quantity: 15,
  },
  {
    //13
    price: new Prisma.Decimal(100),
    negotiable: false,
    type: ListingType.SELL,
    owner: '1965b49b-3e55-4493-bc69-5701cabf8baa',
    listingItemId: 27,
    quantity: 15,
  },
  {
    //14
    price: new Prisma.Decimal(237.23),
    type: ListingType.SELL,
    owner: '1965b49b-3e55-4493-bc69-5701cabf8baa',
    listingItemId: 32,
    quantity: 15,
  },
  {
    //15
    price: new Prisma.Decimal(342.14),
    negotiable: false,
    type: ListingType.BUY,
    owner: '1965b49b-3e55-4493-bc69-5701cabf8baa',
    listingItemId: 33,
    quantity: 15,
  },
  {
    //16
    price: new Prisma.Decimal(208.53),
    type: ListingType.SELL,
    owner: '1965b49b-3e55-4493-bc69-5701cabf8baa',
    listingItemId: 14,
    quantity: 15,
  },
  {
    //17
    price: new Prisma.Decimal(236),
    type: ListingType.BUY,
    owner: '4521b840-8c2e-43ba-9c9e-11dc37a86a39',
    listingItemId: 37,
    quantity: 15,
  },
  {
    //18
    price: new Prisma.Decimal(3476.43),
    negotiable: false,
    type: ListingType.BUY,
    owner: '4521b840-8c2e-43ba-9c9e-11dc37a86a39',
    listingItemId: 39,
    quantity: 15,
  },
  {
    //19
    price: new Prisma.Decimal(463.22),
    type: ListingType.BUY,
    owner: '4521b840-8c2e-43ba-9c9e-11dc37a86a39',
    listingItemId: 36,
    quantity: 15,
  },
  {
    //20
    price: new Prisma.Decimal(234.56),
    type: ListingType.SELL,
    owner: '4521b840-8c2e-43ba-9c9e-11dc37a86a39',
    listingItemId: 2,
    quantity: 15,
  },
  {
    //21
    price: new Prisma.Decimal(999),
    negotiable: false,
    type: ListingType.BUY,
    owner: 'a43405b7-74d5-48d4-9155-3622ad3d2970',
    listingItemId: 40,
    quantity: 15,
  },
  {
    //22
    price: new Prisma.Decimal(99),
    type: ListingType.SELL,
    owner: 'a43405b7-74d5-48d4-9155-3622ad3d2970',
    listingItemId: 37,
    quantity: 15,
  },
  {
    //23
    price: new Prisma.Decimal(109),
    type: ListingType.SELL,
    owner: 'a43405b7-74d5-48d4-9155-3622ad3d2970',
    listingItemId: 41,
    quantity: 15,
  },
  {
    //24
    price: new Prisma.Decimal(199),
    type: ListingType.BUY,
    owner: 'a43405b7-74d5-48d4-9155-3622ad3d2970',
    listingItemId: 3,
    quantity: 15,
  },
  {
    //25
    price: new Prisma.Decimal(299),
    type: ListingType.SELL,
    owner: '1965b49b-3e55-4493-bc69-5701cabf8baa',
    listingItemId: 36,
    quantity: 15,
  },
  {
    //26
    price: new Prisma.Decimal(190),
    type: ListingType.SELL,
    owner: '14f9a310-958c-4273-b4b3-4377804642a5',
    listingItemId: 3,
    quantity: 15,
  },
  {
    //27
    price: new Prisma.Decimal(919),
    type: ListingType.BUY,
    owner: '14f9a310-958c-4273-b4b3-4377804642a5',
    listingItemId: 8,
    quantity: 15,
  },
  {
    //28
    price: new Prisma.Decimal(234),
    type: ListingType.SELL,
    owner: '14f9a310-958c-4273-b4b3-4377804642a5',
    listingItemId: 8,
    quantity: 15,
  },
  {
    //29
    price: new Prisma.Decimal(123),
    type: ListingType.BUY,
    owner: 'cb4dbbcd-cb8d-45f7-b6c0-057fb8b0f3c7',
    listingItemId: 24,
    quantity: 15,
  },
  {
    //30
    price: new Prisma.Decimal(98),
    type: ListingType.SELL,
    owner: 'cb4dbbcd-cb8d-45f7-b6c0-057fb8b0f3c7',
    listingItemId: 25,
    quantity: 15,
  },
  {
    //31
    listingItemId: 43,
    quantity: 15,
    price: new Prisma.Decimal(99),
    type: ListingType.SELL,
    owner: 'cb4dbbcd-cb8d-45f7-b6c0-057fb8b0f3c7',
  },
  {
    //32
    price: new Prisma.Decimal(99),
    type: ListingType.SELL,
    owner: 'cb4dbbcd-cb8d-45f7-b6c0-057fb8b0f3c7',
    listingItemId: 49,
    quantity: 15,
  },
  {
    //33
    price: new Prisma.Decimal(99),
    type: ListingType.SELL,
    owner: '27666b0b-491a-4ce8-86bc-ab45f814ee07',
    listingItemId: 51,
    quantity: 15,
  },
  {
    //34
    listingItemId: 6,
    negotiable: false,
    quantity: 15,
    price: new Prisma.Decimal(800.2),
    type: ListingType.SELL,
    owner: 'cb4dbbcd-cb8d-45f7-b6c0-057fb8b0f3c7',
  },
  {
    //35
    price: new Prisma.Decimal(88),
    type: ListingType.SELL,
    owner: '27666b0b-491a-4ce8-86bc-ab45f814ee07',
    listingItemId: 42,
    quantity: 15,
  },
  {
    //36
    listingItemId: 3,
    quantity: 15,
    price: new Prisma.Decimal(100),
    type: ListingType.SELL,
    owner: '27666b0b-491a-4ce8-86bc-ab45f814ee07',
  },
  {
    //37
    listingItemId: 8,
    quantity: 15,
    price: new Prisma.Decimal(100),
    type: ListingType.BUY,
    owner: '84e51e55-b2b7-4751-ab3e-8ce264d94b80',
  },
  {
    //38
    price: new Prisma.Decimal(12312.31),
    type: ListingType.SELL,
    owner: '84e51e55-b2b7-4751-ab3e-8ce264d94b80',
    listingItemId: 18,
    quantity: 15,
  },
  {
    //39
    price: new Prisma.Decimal(4.44),
    type: ListingType.BUY,
    owner: '84e51e55-b2b7-4751-ab3e-8ce264d94b80',
    listingItemId: 53,
    quantity: 15,
  },
  {
    //40
    listingItemId: 45,
    quantity: 15,
    price: new Prisma.Decimal(800),
    type: ListingType.SELL,
    owner: '84e51e55-b2b7-4751-ab3e-8ce264d94b80',
  },
  {
    //41
    price: new Prisma.Decimal(7.77),
    type: ListingType.SELL,
    owner: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    listingItemId: 54,
    quantity: 15,
  },
  {
    //42
    price: new Prisma.Decimal(100),
    type: ListingType.SELL,
    owner: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    listingItemId: 53,
    quantity: 15,
  },
  {
    //43
    listingItemId: 48,
    negotiable: false,
    quantity: 15,
    price: new Prisma.Decimal(13.37),
    type: ListingType.SELL,
    owner: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
  },
  {
    //44
    listingItemId: 49,
    quantity: 15,
    price: new Prisma.Decimal(100),
    type: ListingType.BUY,
    owner: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
  },
  {
    //45
    price: new Prisma.Decimal(134),
    type: ListingType.BUY,
    owner: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    listingItemId: 52,
    quantity: 15,
  },
  {
    //46
    listingItemId: 42,
    negotiable: false,
    quantity: 15,
    price: new Prisma.Decimal(100.12),
    type: ListingType.SELL,
    owner: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
  },
  {
    //47
    listingItemId: 38,
    negotiable: false,
    quantity: 15,
    price: new Prisma.Decimal(236.23),
    type: ListingType.BUY,
    owner: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
  },
  {
    //48
    price: new Prisma.Decimal(1234),
    type: ListingType.SELL,
    owner: 'ba9243d0-8d5e-48bf-b28e-d21cfb9fd126',
    listingItemId: 26,
    quantity: 15,
  },
  {
    //49
    listingItemId: 49,
    quantity: 15,
    price: new Prisma.Decimal(100),
    type: ListingType.BUY,
    owner: 'ba9243d0-8d5e-48bf-b28e-d21cfb9fd126',
  },
  {
    //50
    listingItemId: 35,
    quantity: 15,
    price: new Prisma.Decimal(100),
    type: ListingType.SELL,
    owner: 'ba9243d0-8d5e-48bf-b28e-d21cfb9fd126',
  },
  {
    //51
    price: new Prisma.Decimal(4),
    type: ListingType.BUY,
    owner: 'ba9243d0-8d5e-48bf-b28e-d21cfb9fd126',
    listingItemId: 36,
    quantity: 15,
  },
  {
    //52
    price: new Prisma.Decimal(696),
    type: ListingType.BUY,
    owner: '1965b49b-3e55-4493-bc69-5701cabf8baa',
    listingItemId: 9,
    quantity: 15,
  },
  {
    //53
    price: new Prisma.Decimal(143.23),
    type: ListingType.SELL,
    owner: 'ba9243d0-8d5e-48bf-b28e-d21cfb9fd126',
    listingItemId: 35,
    quantity: 15,
  },
  {
    //54
    price: new Prisma.Decimal(43),
    type: ListingType.SELL,
    owner: 'ba9243d0-8d5e-48bf-b28e-d21cfb9fd126',
    listingItemId: 14,
    quantity: 15,
  },
  {
    //55
    price: new Prisma.Decimal(22),
    type: ListingType.BUY,
    owner: 'ba9243d0-8d5e-48bf-b28e-d21cfb9fd126',
    listingItemId: 30,
    quantity: 15,
  },
  {
    //56
    price: new Prisma.Decimal(130),
    type: ListingType.BUY,
    owner: 'ba9243d0-8d5e-48bf-b28e-d21cfb9fd126',
    listingItemId: 20,
    quantity: 15,
  },
  {
    //57
    price: new Prisma.Decimal(143.23),
    negotiable: false,
    type: ListingType.BUY,
    owner: '14f9a310-958c-4273-b4b3-4377804642a5',
    listingItemId: 9,
    quantity: 15,
  },
  {
    //58
    listingItemId: 19,
    quantity: 15,
    price: new Prisma.Decimal(143.24),
    type: ListingType.SELL,
    owner: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
  },
  {
    //59
    listingItemId: 23,
    quantity: 15,
    price: new Prisma.Decimal(123.23),
    type: ListingType.SELL,
    owner: '14f9a310-958c-4273-b4b3-4377804642a5',
  },
  {
    //60
    price: new Prisma.Decimal(123.23),
    negotiable: false,
    type: ListingType.BUY,
    owner: '14f9a310-958c-4273-b4b3-4377804642a5',
    listingItemId: 4,
    quantity: 15,
  },
  {
    //61
    listingItemId: 23,
    quantity: 15,
    price: new Prisma.Decimal(123.23),
    type: ListingType.SELL,
    owner: '14f9a310-958c-4273-b4b3-4377804642a5',
  },
  {
    //62
    price: new Prisma.Decimal(63.23),
    type: ListingType.SELL,
    owner: '14f9a310-958c-4273-b4b3-4377804642a5',
    listingItemId: 47,
    quantity: 15,
  },
  {
    //63
    listingItemId: 28,
    quantity: 15,
    price: new Prisma.Decimal(123.23),
    type: ListingType.SELL,
    owner: '14f9a310-958c-4273-b4b3-4377804642a5',
  },
  {
    //64
    listingItemId: 15,
    quantity: 15,
    price: new Prisma.Decimal(123.23),
    type: ListingType.SELL,
    owner: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
  },
  {
    //65
    listingItemId: 2,
    quantity: 15,
    price: new Prisma.Decimal(143.33),
    type: ListingType.BUY,
    owner: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
  },
  {
    //66
    listingItemId: 3,
    quantity: 15,
    price: new Prisma.Decimal(666.23),
    type: ListingType.BUY,
    owner: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
  },
  {
    //67
    price: new Prisma.Decimal(133),
    negotiable: false,
    type: ListingType.SELL,
    owner: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
    listingItemId: 51,
    quantity: 15,
  },
  {
    //68
    price: new Prisma.Decimal(430.2),
    type: ListingType.SELL,
    owner: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
    listingItemId: 45,
    quantity: 15,
  },
  {
    //69
    listingItemId: 20,
    quantity: 15,
    price: new Prisma.Decimal(123.23),
    type: ListingType.SELL,
    owner: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
  },
  {
    //70
    price: new Prisma.Decimal(6),
    type: ListingType.BUY,
    owner: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
    listingItemId: 41,
    quantity: 15,
  },
  {
    //71
    listingItemId: 37,
    quantity: 15,
    price: new Prisma.Decimal(46),
    type: ListingType.BUY,
    owner: '1965b49b-3e55-4493-bc69-5701cabf8baa',
  },
  {
    //72
    listingItemId: 18,
    quantity: 15,
    price: new Prisma.Decimal(123.23),
    type: ListingType.SELL,
    owner: '1965b49b-3e55-4493-bc69-5701cabf8baa',
  },
  {
    //73
    listingItemId: 7,
    quantity: 15,
    price: new Prisma.Decimal(12),
    type: ListingType.BUY,
    owner: '1965b49b-3e55-4493-bc69-5701cabf8baa',
  },
  {
    //74
    listingItemId: 28,
    quantity: 15,
    price: new Prisma.Decimal(1234),
    type: ListingType.BUY,
    owner: '27666b0b-491a-4ce8-86bc-ab45f814ee07',
  },
  {
    //75
    listingItemId: 10,
    negotiable: false,
    quantity: 15,
    price: new Prisma.Decimal(0.1),
    type: ListingType.SELL,
    owner: '27666b0b-491a-4ce8-86bc-ab45f814ee07',
  },
  {
    //76
    listingItemId: 34,
    quantity: 15,
    price: new Prisma.Decimal(123.23),
    type: ListingType.BUY,
    owner: '27666b0b-491a-4ce8-86bc-ab45f814ee07',
  },
  {
    //77
    listingItemId: 2,
    quantity: 15,
    price: new Prisma.Decimal(123.6),
    type: ListingType.SELL,
    owner: '2a7f0665-57a8-454b-8518-ce2c4f003237',
  },
  {
    //78
    listingItemId: 13,
    quantity: 15,
    price: new Prisma.Decimal(66),
    type: ListingType.BUY,
    owner: '2a7f0665-57a8-454b-8518-ce2c4f003237',
  },
  {
    //79
    price: new Prisma.Decimal(1),
    type: ListingType.SELL,
    owner: '2a7f0665-57a8-454b-8518-ce2c4f003237',
    listingItemId: 41,
    quantity: 15,
  },
  {
    //80
    price: new Prisma.Decimal(123.23),
    negotiable: false,
    type: ListingType.BUY,
    owner: '4521b840-8c2e-43ba-9c9e-11dc37a86a39',
    listingItemId: 44,
    quantity: 15,
  },
  {
    //81
    listingItemId: 30,
    quantity: 15,
    price: new Prisma.Decimal(457),
    type: ListingType.SELL,
    owner: '4521b840-8c2e-43ba-9c9e-11dc37a86a39',
  },
  {
    //82
    listingItemId: 29,
    quantity: 15,
    price: new Prisma.Decimal(122.4),
    type: ListingType.BUY,
    owner: '4521b840-8c2e-43ba-9c9e-11dc37a86a39',
  },
  {
    //83
    listingItemId: 3,
    quantity: 15,
    price: new Prisma.Decimal(12),
    type: ListingType.SELL,
    owner: '4521b840-8c2e-43ba-9c9e-11dc37a86a39',
  },
  {
    //84
    listingItemId: 21,
    quantity: 15,
    price: new Prisma.Decimal(122.4),
    type: ListingType.SELL,
    owner: '84e51e55-b2b7-4751-ab3e-8ce264d94b80',
  },
  {
    //85
    listingItemId: 20,
    quantity: 15,
    price: new Prisma.Decimal(140.8),
    type: ListingType.SELL,
    owner: '84e51e55-b2b7-4751-ab3e-8ce264d94b80',
  },
  {
    //86
    listingItemId: 19,
    quantity: 15,
    price: new Prisma.Decimal(40.8),
    type: ListingType.SELL,
    owner: '84e51e55-b2b7-4751-ab3e-8ce264d94b80',
  },
  {
    //87
    listingItemId: 15,
    quantity: 15,
    price: new Prisma.Decimal(100.0),
    type: ListingType.BUY,
    owner: 'a43405b7-74d5-48d4-9155-3622ad3d2970',
  },
  {
    //88
    listingItemId: 16,
    quantity: 15,
    price: new Prisma.Decimal(420.1),
    type: ListingType.SELL,
    owner: 'a43405b7-74d5-48d4-9155-3622ad3d2970',
  },
  {
    //89
    listingItemId: 18,
    quantity: 15,
    price: new Prisma.Decimal(23.0),
    type: ListingType.BUY,
    owner: 'a43405b7-74d5-48d4-9155-3622ad3d2970',
  },
  {
    //90
    listingItemId: 13,
    quantity: 15,
    price: new Prisma.Decimal(40.3),
    type: ListingType.BUY,
    owner: 'b42f91ca-86e5-4ac6-a8c9-10bda477370e',
  },
  {
    //91
    listingItemId: 12,
    quantity: 15,
    price: new Prisma.Decimal(530.0),
    type: ListingType.SELL,
    owner: 'b42f91ca-86e5-4ac6-a8c9-10bda477370e',
  },
  {
    //92
    listingItemId: 10,
    negotiable: false,
    quantity: 15,
    price: new Prisma.Decimal(300.1),
    type: ListingType.SELL,
    owner: 'b42f91ca-86e5-4ac6-a8c9-10bda477370e',
  },
  {
    //93
    listingItemId: 9,
    quantity: 15,
    price: new Prisma.Decimal(122.4),
    type: ListingType.SELL,
    owner: 'cb4dbbcd-cb8d-45f7-b6c0-057fb8b0f3c7',
  },
  {
    //94
    listingItemId: 3,
    quantity: 15,
    price: new Prisma.Decimal(12.3),
    type: ListingType.SELL,
    owner: 'cb4dbbcd-cb8d-45f7-b6c0-057fb8b0f3c7',
  },
  {
    //95
    listingItemId: 4,
    quantity: 15,
    price: new Prisma.Decimal(15.0),
    type: ListingType.BUY,
    owner: 'cb4dbbcd-cb8d-45f7-b6c0-057fb8b0f3c7',
  },
  {
    //96
    listingItemId: 8,
    negotiable: false,
    quantity: 15,
    price: new Prisma.Decimal(31.5),
    type: ListingType.SELL,
    owner: 'cb4dbbcd-cb8d-45f7-b6c0-057fb8b0f3c7',
  },
  {
    //97
    listingItemId: 7,
    quantity: 15,
    price: new Prisma.Decimal(50.5),
    type: ListingType.SELL,
    owner: 'cb4dbbcd-cb8d-45f7-b6c0-057fb8b0f3c7',
  },
  {
    //98
    listingItemId: 6,
    quantity: 15,
    price: new Prisma.Decimal(800.2),
    type: ListingType.SELL,
    owner: 'cb4dbbcd-cb8d-45f7-b6c0-057fb8b0f3c7',
  },
  {
    //99
    listingItemId: 5,
    quantity: 15,
    price: new Prisma.Decimal(10.2),
    type: ListingType.SELL,
    owner: 'a43405b7-74d5-48d4-9155-3622ad3d2970',
  },
  {
    //100
    listingItemId: 1,
    quantity: 0,
    price: new Prisma.Decimal(15.5),
    type: ListingType.SELL,
    owner: 'a43405b7-74d5-48d4-9155-3622ad3d2970',
  },
];

export type { IListings };
export { Listings };

import { Prisma } from '../../../index';

interface IOffer {
  id?: number;
  listing: number;
  amount: Prisma.Decimal;
  accepted: boolean;
}

const Offers: IOffer[] = [
  {
    id: 1,
    listing: 28,
    amount: new Prisma.Decimal(150.77),
    accepted: false,
  },
  {
    id: 2,
    listing: 64,
    amount: new Prisma.Decimal(220.0),
    accepted: true,
  },
  {
    id: 3,
    listing: 52,
    amount: new Prisma.Decimal(30.0),
    accepted: false,
  },
  {
    id: 4,
    listing: 66,
    amount: new Prisma.Decimal(120.5),
    accepted: true,
  },
  {
    id: 5,
    listing: 59,
    amount: new Prisma.Decimal(69.42),
    accepted: true,
  },
  {
    id: 6,
    listing: 25,
    amount: new Prisma.Decimal(50.0),
    accepted: true,
  },
  {
    id: 7,
    listing: 52,
    amount: new Prisma.Decimal(110.0),
    accepted: true,
  },
];

export { Offers };

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
];

export { Offers };

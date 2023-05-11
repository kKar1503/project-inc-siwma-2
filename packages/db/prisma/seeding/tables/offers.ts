interface IOffer {
  id?: number;
  listing: number;
  message: number;
  amount: number;
  accepted: boolean;
}

const Offers: IOffer[] = [
  {
    id: 1,
    listing: 28,
    message: 1,
    amount: 150.77,
    accepted: false,
  }
];

export type { IOffer };
export { Offers };

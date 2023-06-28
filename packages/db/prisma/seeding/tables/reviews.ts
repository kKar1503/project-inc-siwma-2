interface IReview {
  id?: number;
  review: string;
  rating: number;
  user: string;
  listing: number;
  createdAt?: Date;
}

const Reviews: IReview[] = [
  {
    review: 'Seller is very responsive and helpful. Would recommend.',
    rating: 5,
    user: 'ba9243d0-8d5e-48bf-b28e-d21cfb9fd126',
    listing: 64,
  },
  {
    review: 'Seller is not responsive and not helpful. Would not recommend.',
    rating: 2,
    user: '14f9a310-958c-4273-b4b3-4377804642a5',
    listing: 66,
  },
  {
    review: 'Seller is very responsive and helpful. Would recommend.',
    rating: 4,
    user: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
    listing: 59,
  },
  {
    review: 'Seller is not responsive and not helpful. Would not recommend.',
    rating: 1,
    user: 'ba9243d0-8d5e-48bf-b28e-d21cfb9fd126',
    listing: 25,
  },
  {
    review: 'Seller is very responsive and helpful. Would recommend.',
    rating: 5,
    user: '14f9a310-958c-4273-b4b3-4377804642a5',
    listing: 52,
  },
];

export type { IReview };
export { Reviews };

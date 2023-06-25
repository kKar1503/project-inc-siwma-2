export type TListing = {
  id: string;
  name: string;
  description: string;
  price: number;
  unitPrice: boolean;
  negotiable: boolean;
  categoryId: string;
  type: 'SELL' | 'BUY';
  multiOffer: boolean;
  owner: {
    id: string;
    name: string;
    email: string;
    company: {
      id: string;
      name: string;
      website: string;
      bio: string;
      image: string;
      visible: boolean;
    };
    profilePic: null;
    mobileNumber: string;
    contactMethod: string;
    bio: null;
  };
  open: boolean;
  rating: number;
  reviewCount: number;
  image: string;
  parameter: Array<{
    paramId: string;
    value: number;
  }>;
  createdAt: string;
};

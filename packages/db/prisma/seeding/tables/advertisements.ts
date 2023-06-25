// TODO: update all the images to valid links

interface IAdvertisement {
  id?: number;
  companyId: number;
  image: string;
  description: string;
  link?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  startDate?: Date;
  endDate?: Date;
}

const Advertisements: IAdvertisement[] = [
  {
    companyId: 2,
    image: 'link-to-image.jpg',
    description:
      'To celebrate our 50th anniversary, Boon Chang Structure will have a 10% discount on all metal sheet products!\n\nFor more information, please visit our website.',
    link: 'https://www.boonchangstructure.com.sg/',
  },
  {
    companyId: 3,
    image: 'link-to-image.jpg',
    description:
      "It's our 5th Anniversary! To celebrate this occasion, all metals will be sold for up to 50% off!!\n\nPromotions ends on 12/12/2022.\nTerms and conditions apply.",
    link: 'https://hshmetal.com/',
  },
  {
    companyId: 5,
    image: 'link-to-image.jpg',
    description:
      'To celebrate the New Year, Global Metal International will have a 10% discount on all metal iron bars!\n\nVisit our page for more information.',
    link: 'https://globalmetal.com.sg/',
  },
  {
    companyId: 7,
    image: 'link-to-image.jpg',
    description: 'Shop at HiMetal Enterprise now to get your first deal up to 30% off!',
    active: false,
  },
  {
    companyId: 6,
    image: 'link-to-image.jpg',
    description:
      'Teck Leong Industries will be have a clearance sale of Circular Hollow Sections at 10% off.',
  },
  {
    companyId: 6,
    image: 'link-to-image.jpg',
    description:
      'Join our Grand Opening ceremony with 15% all metals for the first two weeks of New Years!',
    link: 'http://teckleong.com.sg/',
    active: false,
  },
  {
    companyId: 7,
    image: 'link-to-image.jpg',
    description:
      "Hi-Metal is selling 10 tons of metal sheets!It's our 5th Anniversary! To celebrate this occasion, all metals will be sold for up to 50% off!! Promotions ends on 25/2/2023",
    link: 'https://www.himetal.com.sg',
    active: false,
  },
  {
    companyId: 6,
    image: 'link-to-image.jpg',
    description:
      'To celebrate our 30th anniversary, Teck Leong Structure will have a 10% discount on all metal sheet products!\nFor more information, please visit our website.',
    link: 'https://www.teckleongmetals.com.sg',
    active: false,
  },
];

export type { IAdvertisement };
export { Advertisements };

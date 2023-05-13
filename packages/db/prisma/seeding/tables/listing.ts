import { Prisma, ListingType } from '../../../index';

interface IListings {
  id?: number;
  name: string;
  description: string;
  price?: Prisma.Decimal;
  unitPrice?: boolean;
  negotiable?: boolean;
  open?: boolean;
  visibility?: boolean;
  active?: boolean;
  categoryId: number;
  type: ListingType;
  owner: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const Listings: IListings[] = [
  {
    name: 'Aluminium I-Beams',
    description:
      'Aluminium Universal Beam, also known as, Aluminium I-Beam is an extruded aluminium bar formed in the shape of “I” that is used to distribute weight of walls and floors above an opening. Aluminium I-beams are commonly used for structural and highly stressed applications, where lightweight and corrosion resistance is a priority, such as bridges, overhead support, construction, civil engineering and other heavy machinery. Aluminium I-beam is mostly used to support heavy structures due to its capability to withstand heavy loads, primarily by resisting against bending.',
    price: new Prisma.Decimal(300),
    categoryId: 1,
    type: ListingType.SELL,
    owner: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
  },
  {
    name: 'Stainless Steel Round Bar',
    description: 'brand new clearing price',
    price: new Prisma.Decimal(100),
    negotiable: false,
    categoryId: 8,
    type: ListingType.SELL,
    owner: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
  },
  {
    name: 'FAST SELL Round Bar',
    description: 'clearing stock fast, fast deal',
    price: new Prisma.Decimal(80),
    negotiable: false,
    categoryId: 8,
    type: ListingType.SELL,
    owner: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
  },
  {
    name: 'BUYING Aluminum Round Bar',
    description: 'WTB aluminum round bar for listed price',
    price: new Prisma.Decimal(50),
    categoryId: 8,
    type: ListingType.BUY,
    owner: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
  },
  {
    name: 'Stainless Stell Square Bar 303',
    description: 'Stainless Steel Square Bar 303 for sale, non negotiable',
    price: new Prisma.Decimal(69),
    negotiable: false,
    categoryId: 9,
    type: ListingType.SELL,
    owner: 'b42f91ca-86e5-4ac6-a8c9-10bda477370e',
  },
  {
    name: 'WTB Steel Square Bar',
    description: 'square bar for buy (Stainless steel)',
    price: new Prisma.Decimal(69),
    negotiable: false,
    open: false,
    categoryId: 9,
    type: ListingType.BUY,
    owner: 'b42f91ca-86e5-4ac6-a8c9-10bda477370e',
  },
  {
    name: 'Square Bar [ CLOSING DOWN SALE ]',
    description: 'we going to close down... like... forever',
    price: new Prisma.Decimal(200),
    negotiable: false,
    categoryId: 9,
    type: ListingType.SELL,
    owner: 'b42f91ca-86e5-4ac6-a8c9-10bda477370e',
  },
  {
    name: 'BRAND NEW Stainless Steel Square Bar (FAST DEAL)',
    description:
      'Legally sourced, fast deal\nCompletely brand new, never used before\nNo refund/takebacks\nCash payment only',
    price: new Prisma.Decimal(30),
    categoryId: 9,
    type: ListingType.SELL,
    owner: 'b42f91ca-86e5-4ac6-a8c9-10bda477370e',
  },
  {
    name: '[USED] Round Hollow Bar 10"',
    description: 'Used hollow bar in amazing condition, please buy!',
    price: new Prisma.Decimal(100),
    visibility: false,
    categoryId: 1,
    type: ListingType.BUY,
    owner: '2a7f0665-57a8-454b-8518-ce2c4f003237',
  },
  {
    name: 'Copper Square Bars (Grade CW103C / Cu Co1 Ni1 Be)',
    description: 'WYSWYG.',
    price: new Prisma.Decimal(10),
    categoryId: 9,
    type: ListingType.SELL,
    owner: '2a7f0665-57a8-454b-8518-ce2c4f003237',
  },
  {
    name: 'Stainless Steel Piles [Grade 303]',
    description: 'Need to get rid fast.',
    price: new Prisma.Decimal(3),
    unitPrice: true,
    open: false,
    categoryId: 3,
    type: ListingType.SELL,
    owner: '2a7f0665-57a8-454b-8518-ce2c4f003237',
  },
  {
    name: '(Grade 17-4PH) Stainless Steel Round Bars',
    description: 'Grade 17-4PH',
    price: new Prisma.Decimal(50),
    categoryId: 8,
    type: ListingType.SELL,
    owner: '2a7f0665-57a8-454b-8518-ce2c4f003237',
  },
  {
    name: '90 Degree Grade 304/304L Stainless Steel Angle Bar',
    description: 'Angle Bar. 90 degrees. WYSWYG.',
    price: new Prisma.Decimal(100),
    categoryId: 6,
    type: ListingType.SELL,
    owner: '1965b49b-3e55-4493-bc69-5701cabf8baa',
  },
  {
    name: 'WTS Stainless Steel Hollow Sections URGENT',
    description: 'selling hollow sections, urgent sale',
    price: new Prisma.Decimal(237.23),
    visibility: false,
    categoryId: 1,
    type: ListingType.SELL,
    owner: '1965b49b-3e55-4493-bc69-5701cabf8baa',
  },
  {
    name: 'WTB Iron Sheet piles (must be a pile)',
    description: 'I need a pile of sheet piles\n\nPreferably length of 150cm',
    price: new Prisma.Decimal(342.14),
    categoryId: 3,
    type: ListingType.BUY,
    owner: '1965b49b-3e55-4493-bc69-5701cabf8baa',
  },
  {
    name: 'selling stainless steel channels',
    description: 'I got some steel channels sitting around, please buy if interested',
    price: new Prisma.Decimal(208.53),
    categoryId: 4,
    type: ListingType.SELL,
    owner: '1965b49b-3e55-4493-bc69-5701cabf8baa',
  },
  {
    name: 'Buying Stainless Steel Purlins',
    description: 'buying high grade stainless steel purlins',
    price: new Prisma.Decimal(236),
    categoryId: 5,
    type: ListingType.BUY,
    owner: '4521b840-8c2e-43ba-9c9e-11dc37a86a39',
  },
  {
    name: 'buying copper angles',
    description:
      "i need nice copper angles, don't give me that 36 angle stuff\n\nI ONLY NEED 89 degress ANGLES",
    price: new Prisma.Decimal(3476.43),
    categoryId: 6,
    type: ListingType.BUY,
    owner: '4521b840-8c2e-43ba-9c9e-11dc37a86a39',
  },
  {
    name: 'buying stainless steel plates urgently',
    description: 'buying stainless steel plates urgently',
    price: new Prisma.Decimal(463.22),
    categoryId: 7,
    type: ListingType.BUY,
    owner: '4521b840-8c2e-43ba-9c9e-11dc37a86a39',
  },
  {
    name: 'selling stainless steel round bars LIMITED TIME',
    description:
      'i actually bought normal bars but they gave me round bars?\n\nNeed to get rid of them urgently, selling at a lower price',
    price: new Prisma.Decimal(234.56),
    categoryId: 8,
    type: ListingType.SELL,
    owner: '4521b840-8c2e-43ba-9c9e-11dc37a86a39',
  },
  {
    name: 'ERW SHS RHS Welded Black Square Steel Pipe',
    description: 'Black square steel pipes/hollow sections in good condition',
    price: new Prisma.Decimal(999),
    categoryId: 1,
    type: ListingType.BUY,
    owner: 'a43405b7-74d5-48d4-9155-3622ad3d2970',
  },
  {
    name: 'Selling Purlins',
    description: 'brand new, good and working condition',
    price: new Prisma.Decimal(99),
    categoryId: 5,
    type: ListingType.SELL,
    owner: 'a43405b7-74d5-48d4-9155-3622ad3d2970',
  },
  {
    name: 'CHS Stainless steel tubes',
    description: 'I have spare round steel tubes, feel free to contact for deals',
    price: new Prisma.Decimal(109),
    visibility: false,
    categoryId: 1,
    type: ListingType.SELL,
    owner: 'a43405b7-74d5-48d4-9155-3622ad3d2970',
  },
  {
    name: 'buying square shaped bar of 304 Stainless Steel',
    description:
      'Square bar with excellent mechanical properties, resistance to many corrosive agents needed',
    price: new Prisma.Decimal(199),
    visibility: false,
    categoryId: 9,
    type: ListingType.BUY,
    owner: 'a43405b7-74d5-48d4-9155-3622ad3d2970',
  },
  {
    name: '[BRAND NEW] Selling steel plates',
    description: 'In great condition',
    price: new Prisma.Decimal(299),
    categoryId: 7,
    type: ListingType.SELL,
    owner: '14f9a310-958c-4273-b4b3-4377804642a5',
  },
  {
    name: 'BRAND NEW round bars for sale',
    description: 'Selling round bars in good condition',
    price: new Prisma.Decimal(190),
    categoryId: 8,
    type: ListingType.SELL,
    owner: '14f9a310-958c-4273-b4b3-4377804642a5',
  },
  {
    name: 'buying gratings',
    description: 'this is in good condition, i want it',
    price: new Prisma.Decimal(919),
    categoryId: 10,
    type: ListingType.BUY,
    owner: '14f9a310-958c-4273-b4b3-4377804642a5',
  },
  {
    name: 'selling steel beams',
    description: 'this metal is in good condition',
    price: new Prisma.Decimal(234),
    categoryId: 2,
    type: ListingType.SELL,
    owner: '14f9a310-958c-4273-b4b3-4377804642a5',
  },
  {
    name: 'Buying steel sheet piles',
    description: 'Looking for retaining walls steel sheet pile',
    price: new Prisma.Decimal(123),
    categoryId: 3,
    type: ListingType.BUY,
    owner: 'cb4dbbcd-cb8d-45f7-b6c0-057fb8b0f3c7',
  },
  {
    name: 'Selling Aluminum Channel 6063',
    description: "Aluminum Channel 6063, 'U' shaped channel of 6063 aluminum alloy.",
    price: new Prisma.Decimal(98),
    categoryId: 4,
    type: ListingType.SELL,
    owner: 'cb4dbbcd-cb8d-45f7-b6c0-057fb8b0f3c7',
  },
  {
    name: 'Selling Steel angles',
    description: 'Brand new steel angles (90 degrees) for sale',
    price: new Prisma.Decimal(99),
    categoryId: 6,
    type: ListingType.SELL,
    owner: 'cb4dbbcd-cb8d-45f7-b6c0-057fb8b0f3c7',
  },
  {
    name: 'Stainless steel purlins',
    description: 'Brand new steel purlins for sale',
    price: new Prisma.Decimal(99),
    categoryId: 5,
    type: ListingType.SELL,
    owner: 'cb4dbbcd-cb8d-45f7-b6c0-057fb8b0f3c7',
  },
  {
    name: 'Alloy Steel Plate 4140',
    description:
      'Alloy Steel Plate 4140 is a flat shaped, plate of oil-hardening, chromium-molybdenum 4140 steel.\n\nIt has good strength and wear resistance, excellent toughness and ductility. 4140 Alloy steel has the ability to resist stress and creep at prolonged high temperatures (up to 1000°F).\n\n4140 Alloy Steel is also available in leaded grades which greatly improves machinability. However leaded grades should not be used in applications where the temperature is elevated. This can cause lower ductility in these grades.',
    price: new Prisma.Decimal(99),
    categoryId: 7,
    type: ListingType.SELL,
    owner: '27666b0b-491a-4ce8-86bc-ab45f814ee07',
  },
  {
    name: '[SLIGHTLY USED] Iron angles',
    description: 'Slightly used iron angles for sale',
    price: new Prisma.Decimal(100),
    categoryId: 6,
    type: ListingType.SELL,
    owner: '27666b0b-491a-4ce8-86bc-ab45f814ee07',
  },
  {
    name: 'Steel Sheet Piles for sale',
    description: 'Marine coat steel sheet pile',
    price: new Prisma.Decimal(88),
    categoryId: 3,
    type: ListingType.SELL,
    owner: '27666b0b-491a-4ce8-86bc-ab45f814ee07',
  },
  {
    name: 'square bar',
    description: 'need to get rid of square bars fast',
    price: new Prisma.Decimal(100),
    categoryId: 8,
    type: ListingType.SELL,
    owner: '27666b0b-491a-4ce8-86bc-ab45f814ee07',
  },
  {
    name: 'Mild Steel Bar Grating',
    description:
      'Commercial quality Mild Steel Bar, must be strong and durable for all load bearing applications',
    price: new Prisma.Decimal(100),
    categoryId: 10,
    type: ListingType.BUY,
    owner: '84e51e55-b2b7-4751-ab3e-8ce264d94b80',
  },
  {
    name: 'metal beam for sale',
    description: 'selling metal beam in good condition',
    price: new Prisma.Decimal(12312.31),
    categoryId: 2,
    type: ListingType.SELL,
    owner: '84e51e55-b2b7-4751-ab3e-8ce264d94b80',
  },
  {
    name: 'L Aluminum Metal Angle Stick',
    description: 'The metal is very premium and rigid. Please contact me to buy the rigid stick.',
    price: new Prisma.Decimal(4.44),
    categoryId: 6,
    type: ListingType.BUY,
    owner: '84e51e55-b2b7-4751-ab3e-8ce264d94b80',
  },
  {
    name: 'Selling Circular Hollow Section',
    description:
      'Stainless Steel Circular Hollow Section\n\nHave excess of 10 x 10m.\n\nDetails:\n\nManufactured using high quality pure steel HR coils up to a maximum size of 600mm NB, Tata Structura Circular Hollow Sections are light in weight and having high strength. The sections are easy to bend & ideal for welding making it perfect to construct unique & aesthetically appealing structures without compromising strength, beauty & durability. With an assured yield strengths ranging from 210 MPa, 310 MPa, 355 MPa and 420 MPa, these hollow sections or steel tubes can be designed sustain heavy loads with ease. Unlike other secondary steel sections, the chemical composition of steel will not allow any cracks to develop during welding. Thus, making it more suitable to use for a quality steel construction that saves cost as well as time.\n\nThe HR coils used to manufacture the steel sections are made in accordance with the highest degree of international quality & the steel tubes are manufactured as per IS 1161. The sections also come with a test certificate which is proof that the steel tubes have undergone and passed all the necessary quality tests.\n\nFeel free to message me for more details.',
    price: new Prisma.Decimal(800),
    categoryId: 1,
    type: ListingType.SELL,
    owner: '84e51e55-b2b7-4751-ab3e-8ce264d94b80',
  },
];

export type { IListings };
export { Listings };

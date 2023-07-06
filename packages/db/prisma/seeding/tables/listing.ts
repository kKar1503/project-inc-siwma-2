import { Prisma, ListingType, UnitType, ConditionType } from '../../../index';

interface IListings {
  id?: number;
  name: string;
  description: string;
  price?: Prisma.Decimal;
  unitPrice?: boolean;
  negotiable?: boolean;
  categoryId: number;
  type: ListingType;
  owner: string;
  createdAt?: Date;
  updatedAt?: Date;
  archived?: boolean;
  deletedAt?: Date;
  multiple: boolean;
  hashedUrl?: string;
  unit?: UnitType;
  condition?: ConditionType;
  grading: string;
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
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Stainless Steel Round Bar',
    description: 'brand new clearing price',
    price: new Prisma.Decimal(100),
    negotiable: false,
    categoryId: 8,
    type: ListingType.SELL,
    owner: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'FAST SELL Round Bar',
    description: 'clearing stock fast, fast deal',
    price: new Prisma.Decimal(80),
    negotiable: false,
    categoryId: 8,
    type: ListingType.SELL,
    owner: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'BUYING Aluminum Round Bar',
    description: 'WTB aluminum round bar for listed price',
    price: new Prisma.Decimal(50),
    categoryId: 8,
    type: ListingType.BUY,
    owner: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Stainless Stell Square Bar 303',
    description: 'Stainless Steel Square Bar 303 for sale, non negotiable',
    price: new Prisma.Decimal(69),
    negotiable: false,
    categoryId: 9,
    type: ListingType.SELL,
    owner: 'b42f91ca-86e5-4ac6-a8c9-10bda477370e',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'WTB Steel Square Bar',
    description: 'square bar for buy (Stainless steel)',
    price: new Prisma.Decimal(69),
    negotiable: false,
    categoryId: 9,
    type: ListingType.BUY,
    owner: 'b42f91ca-86e5-4ac6-a8c9-10bda477370e',
    archived: true,
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Square Bar [ CLOSING DOWN SALE ]',
    description: 'we going to close down... like... forever',
    price: new Prisma.Decimal(200),
    negotiable: false,
    categoryId: 9,
    type: ListingType.SELL,
    owner: 'b42f91ca-86e5-4ac6-a8c9-10bda477370e',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'BRAND NEW Stainless Steel Square Bar (FAST DEAL)',
    description:
      'Legally sourced, fast deal\nCompletely brand new, never used before\nNo refund/takebacks\nCash payment only',
    price: new Prisma.Decimal(30),
    categoryId: 9,
    type: ListingType.SELL,
    owner: 'b42f91ca-86e5-4ac6-a8c9-10bda477370e',
    multiple: false,
    grading: 'S275'
  },
  {
    name: '[USED] Round Hollow Bar 10"',
    description: 'Used hollow bar in amazing condition, please buy!',
    price: new Prisma.Decimal(100),
    categoryId: 1,
    type: ListingType.BUY,
    owner: '2a7f0665-57a8-454b-8518-ce2c4f003237',
    archived: true,
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Copper Square Bars (Grade CW103C / Cu Co1 Ni1 Be)',
    description: 'WYSWYG.',
    price: new Prisma.Decimal(10),
    categoryId: 9,
    type: ListingType.SELL,
    owner: '2a7f0665-57a8-454b-8518-ce2c4f003237',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Stainless Steel Piles [Grade 303]',
    description: 'Need to get rid fast.',
    price: new Prisma.Decimal(3),
    unitPrice: true,
    categoryId: 3,
    type: ListingType.SELL,
    owner: '2a7f0665-57a8-454b-8518-ce2c4f003237',
    archived: true,
    multiple: false,
    grading: 'S275'
  },
  {
    name: '(Grade 17-4PH) Stainless Steel Round Bars',
    description: 'Grade 17-4PH',
    price: new Prisma.Decimal(50),
    categoryId: 8,
    type: ListingType.SELL,
    owner: '2a7f0665-57a8-454b-8518-ce2c4f003237',
    multiple: false,
    grading: 'S275'
  },
  {
    name: '90 Degree Grade 304/304L Stainless Steel Angle Bar',
    description: 'Angle Bar. 90 degrees. WYSWYG.',
    price: new Prisma.Decimal(100),
    categoryId: 6,
    type: ListingType.SELL,
    owner: '1965b49b-3e55-4493-bc69-5701cabf8baa',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'WTS Stainless Steel Hollow Sections URGENT',
    description: 'selling hollow sections, urgent sale',
    price: new Prisma.Decimal(237.23),
    categoryId: 1,
    type: ListingType.SELL,
    owner: '1965b49b-3e55-4493-bc69-5701cabf8baa',
    archived: true,
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'WTB Iron Sheet piles (must be a pile)',
    description: 'I need a pile of sheet piles\n\nPreferably length of 150cm',
    price: new Prisma.Decimal(342.14),
    categoryId: 3,
    type: ListingType.BUY,
    owner: '1965b49b-3e55-4493-bc69-5701cabf8baa',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'selling stainless steel channels',
    description: 'I got some steel channels sitting around, please buy if interested',
    price: new Prisma.Decimal(208.53),
    categoryId: 4,
    type: ListingType.SELL,
    owner: '1965b49b-3e55-4493-bc69-5701cabf8baa',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Buying Stainless Steel Purlins',
    description: 'buying high grade stainless steel purlins',
    price: new Prisma.Decimal(236),
    categoryId: 5,
    type: ListingType.BUY,
    owner: '4521b840-8c2e-43ba-9c9e-11dc37a86a39',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'buying copper angles',
    description:
      "i need nice copper angles, don't give me that 36 angle stuff\n\nI ONLY NEED 89 degress ANGLES",
    price: new Prisma.Decimal(3476.43),
    categoryId: 6,
    type: ListingType.BUY,
    owner: '4521b840-8c2e-43ba-9c9e-11dc37a86a39',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'buying stainless steel plates urgently',
    description: 'buying stainless steel plates urgently',
    price: new Prisma.Decimal(463.22),
    categoryId: 7,
    type: ListingType.BUY,
    owner: '4521b840-8c2e-43ba-9c9e-11dc37a86a39',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'selling stainless steel round bars LIMITED TIME',
    description:
      'i actually bought normal bars but they gave me round bars?\n\nNeed to get rid of them urgently, selling at a lower price',
    price: new Prisma.Decimal(234.56),
    categoryId: 8,
    type: ListingType.SELL,
    owner: '4521b840-8c2e-43ba-9c9e-11dc37a86a39',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'ERW SHS RHS Welded Black Square Steel Pipe',
    description: 'Black square steel pipes/hollow sections in good condition',
    price: new Prisma.Decimal(999),
    categoryId: 1,
    type: ListingType.BUY,
    owner: 'a43405b7-74d5-48d4-9155-3622ad3d2970',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Selling Purlins',
    description: 'brand new, good and working condition',
    price: new Prisma.Decimal(99),
    categoryId: 5,
    type: ListingType.SELL,
    owner: 'a43405b7-74d5-48d4-9155-3622ad3d2970',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'CHS Stainless steel tubes',
    description: 'I have spare round steel tubes, feel free to contact for deals',
    price: new Prisma.Decimal(109),
    categoryId: 1,
    type: ListingType.SELL,
    owner: 'a43405b7-74d5-48d4-9155-3622ad3d2970',
    archived: true,
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'buying square shaped bar of 304 Stainless Steel',
    description:
      'Square bar with excellent mechanical properties, resistance to many corrosive agents needed',
    price: new Prisma.Decimal(199),
    categoryId: 9,
    type: ListingType.BUY,
    owner: 'a43405b7-74d5-48d4-9155-3622ad3d2970',
    archived: true,
    multiple: false,
    grading: 'S275'
  },
  {
    name: '[BRAND NEW] Selling steel plates',
    description: 'In great condition',
    price: new Prisma.Decimal(299),
    categoryId: 7,
    type: ListingType.SELL,
    owner: '1965b49b-3e55-4493-bc69-5701cabf8baa',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'BRAND NEW round bars for sale',
    description: 'Selling round bars in good condition',
    price: new Prisma.Decimal(190),
    categoryId: 8,
    type: ListingType.SELL,
    owner: '14f9a310-958c-4273-b4b3-4377804642a5',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'buying gratings',
    description: 'this is in good condition, i want it',
    price: new Prisma.Decimal(919),
    categoryId: 10,
    type: ListingType.BUY,
    owner: '14f9a310-958c-4273-b4b3-4377804642a5',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'selling steel beams',
    description: 'this metal is in good condition',
    price: new Prisma.Decimal(234),
    categoryId: 2,
    type: ListingType.SELL,
    owner: '14f9a310-958c-4273-b4b3-4377804642a5',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Buying steel sheet piles',
    description: 'Looking for retaining walls steel sheet pile',
    price: new Prisma.Decimal(123),
    categoryId: 3,
    type: ListingType.BUY,
    owner: 'cb4dbbcd-cb8d-45f7-b6c0-057fb8b0f3c7',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Selling Aluminum Channel 6063',
    description: "Aluminum Channel 6063, 'U' shaped channel of 6063 aluminum alloy.",
    price: new Prisma.Decimal(98),
    categoryId: 4,
    type: ListingType.SELL,
    owner: 'cb4dbbcd-cb8d-45f7-b6c0-057fb8b0f3c7',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Selling Steel angles',
    description: 'Brand new steel angles (90 degrees) for sale',
    price: new Prisma.Decimal(99),
    categoryId: 6,
    type: ListingType.SELL,
    owner: 'cb4dbbcd-cb8d-45f7-b6c0-057fb8b0f3c7',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Stainless steel purlins',
    description: 'Brand new steel purlins for sale',
    price: new Prisma.Decimal(99),
    categoryId: 5,
    type: ListingType.SELL,
    owner: 'cb4dbbcd-cb8d-45f7-b6c0-057fb8b0f3c7',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Alloy Steel Plate 4140',
    description:
      'Alloy Steel Plate 4140 is a flat shaped, plate of oil-hardening, chromium-molybdenum 4140 steel.\n\nIt has good strength and wear resistance, excellent toughness and ductility. 4140 Alloy steel has the ability to resist stress and creep at prolonged high temperatures (up to 1000°F).\n\n4140 Alloy Steel is also available in leaded grades which greatly improves machinability. However leaded grades should not be used in applications where the temperature is elevated. This can cause lower ductility in these grades.',
    price: new Prisma.Decimal(99),
    categoryId: 7,
    type: ListingType.SELL,
    owner: '27666b0b-491a-4ce8-86bc-ab45f814ee07',
    multiple: false,
    grading: 'S275'
  },
  {
    name: '[SLIGHTLY USED] Iron angles',
    description: 'Slightly used iron angles for sale',
    price: new Prisma.Decimal(100),
    categoryId: 6,
    type: ListingType.SELL,
    owner: '27666b0b-491a-4ce8-86bc-ab45f814ee07',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Steel Sheet Piles for sale',
    description: 'Marine coat steel sheet pile',
    price: new Prisma.Decimal(88),
    categoryId: 3,
    type: ListingType.SELL,
    owner: '27666b0b-491a-4ce8-86bc-ab45f814ee07',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'square bar',
    description: 'need to get rid of square bars fast',
    price: new Prisma.Decimal(100),
    categoryId: 8,
    type: ListingType.SELL,
    owner: '27666b0b-491a-4ce8-86bc-ab45f814ee07',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Mild Steel Bar Grating',
    description:
      'Commercial quality Mild Steel Bar, must be strong and durable for all load bearing applications',
    price: new Prisma.Decimal(100),
    categoryId: 10,
    type: ListingType.BUY,
    owner: '84e51e55-b2b7-4751-ab3e-8ce264d94b80',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'metal beam for sale',
    description: 'selling metal beam in good condition',
    price: new Prisma.Decimal(12312.31),
    categoryId: 2,
    type: ListingType.SELL,
    owner: '84e51e55-b2b7-4751-ab3e-8ce264d94b80',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'L Aluminum Metal Angle Stick',
    description: 'The metal is very premium and rigid. Please contact me to buy the rigid stick.',
    price: new Prisma.Decimal(4.44),
    categoryId: 6,
    type: ListingType.BUY,
    owner: '84e51e55-b2b7-4751-ab3e-8ce264d94b80',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Selling Circular Hollow Section',
    description:
      'Stainless Steel Circular Hollow Section\n\nHave excess of 10 x 10m.\n\nDetails:\n\nManufactured using high quality pure steel HR coils up to a maximum size of 600mm NB, Tata Structura Circular Hollow Sections are light in weight and having high strength. The sections are easy to bend & ideal for welding making it perfect to construct unique & aesthetically appealing structures without compromising strength, beauty & durability. With an assured yield strengths ranging from 210 MPa, 310 MPa, 355 MPa and 420 MPa, these hollow sections or steel tubes can be designed sustain heavy loads with ease. Unlike other secondary steel sections, the chemical composition of steel will not allow any cracks to develop during welding. Thus, making it more suitable to use for a quality steel construction that saves cost as well as time.\n\nThe HR coils used to manufacture the steel sections are made in accordance with the highest degree of international quality & the steel tubes are manufactured as per IS 1161. The sections also come with a test certificate which is proof that the steel tubes have undergone and passed all the necessary quality tests.\n\nFeel free to message me for more details.',
    price: new Prisma.Decimal(800),
    categoryId: 1,
    type: ListingType.SELL,
    owner: '84e51e55-b2b7-4751-ab3e-8ce264d94b80',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Mild Steel Angle',
    description:
      'Mild Steel Angle is a length of steel or iron that is bent at a right angle, commonly used for making frames, racks and for construction purposes. We stock Equal Angles or Unequal Angles, ranging in a variety of sizes. Angle sections are stocked in either 1.5m lengths, 3m lengths or 6m lengths - but all can be cut exactly to your requirements.',
    price: new Prisma.Decimal(7.77),
    categoryId: 6,
    type: ListingType.SELL,
    owner: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Brass flat bars',
    description: 'Brass flat bars for sale',
    price: new Prisma.Decimal(100),
    categoryId: 9,
    type: ListingType.SELL,
    owner: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Copper sheets for sale',
    description: 'Copper sheets for sale in good condition',
    price: new Prisma.Decimal(13.37),
    categoryId: 7,
    type: ListingType.SELL,
    owner: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Buying Ground Shafting Alloy Steel',
    description:
      'Ground Shafting Alloy Steel is a high strength, low alloy steel that finds its best application where there is need for more strength per unit of weight. Less of this material is needed to fulfill given strength requirements than is necessary with regular carbon steels. Grade 4140 is used for applications requiring good mechanical properties and involving moderate to heavy machining, such as forging, upsetting, boring, and reaming. While it is true that many other grades contain chromium, 4140 stands out for its versatility, machinability, and high fatigue strength. It can be heat treated to high strength levels while maintaining good toughness, wear resistance, and fatigue strength levels, combined with good atmospheric corrosion resistance, and strength.',
    price: new Prisma.Decimal(100),
    categoryId: 8,
    type: ListingType.BUY,
    owner: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Buying Mild Steel Plate',
    description:
      'Mild Steel Plate is a structural quality steel plate used for a large variety of general construction and industrial applications. Mild Steel Plates can come in various sizes and grades. Thicknesses available range from 3mm up to as thick as 150mm. Stock sizes range from 2000 x 1000mm up to 4000 x 2000mm, however we can profile any size of plate you may require. Grades available are S275, S355, Hardox. Larger area plate is also available on request such as 6000 x 2000mm upto 12000 x 3000mm. Please contact us for further information on any of our products.',
    price: new Prisma.Decimal(134),
    categoryId: 7,
    type: ListingType.BUY,
    owner: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Selling Mild steel sheet',
    description: 'Mild steel sheet for sale',
    price: new Prisma.Decimal(100.12),
    categoryId: 7,
    type: ListingType.SELL,
    owner: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Hexagonal bars alloy steel buying urgent',
    description:
      'Hexagonal bars alloy steel will be used for applications requiring good mechanical properties and involving moderate to heavy machining, such as forging, upsetting, boring, and reaming. While it is true that many other grades contain chromium, 4140 stands out for its versatility, machinability, and high fatigue strength. It can be heat treated to high strength levels while maintaining good toughness, wear resistance, and fatigue strength levels, combined with good atmospheric corrosion resistance, and strength.',
    price: new Prisma.Decimal(236.23),
    categoryId: 8,
    type: ListingType.BUY,
    owner: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    multiple: false,
    grading: 'S275'
  },
  {
    name: '(SELLING) Aluminium hexagon bar',
    description: 'Aluminium hexagon bar for sale',
    price: new Prisma.Decimal(1234),
    categoryId: 8,
    type: ListingType.SELL,
    owner: 'ba9243d0-8d5e-48bf-b28e-d21cfb9fd126',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Alloy Steel Flat bar needed urgent',
    description: 'Alloy Steel Flat bar buying',
    price: new Prisma.Decimal(239.23),
    categoryId: 9,
    type: ListingType.BUY,
    owner: 'ba9243d0-8d5e-48bf-b28e-d21cfb9fd126',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Buying Aluminium Plates',
    description: 'Plates of Aluminium for sale',
    price: new Prisma.Decimal(100),
    categoryId: 7,
    type: ListingType.SELL,
    owner: 'ba9243d0-8d5e-48bf-b28e-d21cfb9fd126',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Tool steel plates (BUYING)',
    description: 'Buying tool steel plates urgently',
    price: new Prisma.Decimal(4),
    categoryId: 7,
    type: ListingType.BUY,
    owner: 'ba9243d0-8d5e-48bf-b28e-d21cfb9fd126',
    multiple: true,
    grading: 'S275'
  },
  {
    name: 'LF Mild Steel Bar Grating',
    description: 'Looking for Mild Steel Bar Grating to buy',
    price: new Prisma.Decimal(696),
    categoryId: 10,
    type: ListingType.BUY,
    owner: '1965b49b-3e55-4493-bc69-5701cabf8baa',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Plates: Stainless Steel WTS',
    description: 'Selling Stainless Steel Plates for cheap asf',
    price: new Prisma.Decimal(143.23),
    categoryId: 7,
    type: ListingType.SELL,
    owner: 'ba9243d0-8d5e-48bf-b28e-d21cfb9fd126',
    multiple: false,
    grading: 'S275'
  },
  {
    name: '[FIRE SALE] Stainless steel channel',
    description: 'Selling Stainless steel channel fire sale rn',
    price: new Prisma.Decimal(43),
    categoryId: 4,
    type: ListingType.SELL,
    owner: 'ba9243d0-8d5e-48bf-b28e-d21cfb9fd126',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Tool steel drill rods up for purchase',
    description: 'Buying tool steel drill rods for nice price',
    price: new Prisma.Decimal(22),
    categoryId: 8,
    type: ListingType.BUY,
    owner: 'ba9243d0-8d5e-48bf-b28e-d21cfb9fd126',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'stainless steel sheets, looking for 300x',
    description: 'Buying stainless steel sheets, looking for 300x or more in size',
    price: new Prisma.Decimal(130),
    categoryId: 7,
    type: ListingType.BUY,
    owner: 'ba9243d0-8d5e-48bf-b28e-d21cfb9fd126',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'WTB perforated metal sheet',
    description: 'Buying perforated metal sheet because why not',
    price: new Prisma.Decimal(143.23),
    categoryId: 7,
    type: ListingType.BUY,
    owner: '14f9a310-958c-4273-b4b3-4377804642a5',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Steel alloy sheets',
    description: 'Selling steel alloy sheets for cheap pls buy',
    price: new Prisma.Decimal(143.24),
    categoryId: 7,
    type: ListingType.SELL,
    owner: '14f9a310-958c-4273-b4b3-4377804642a5',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'square tube: stainless steel',
    description: 'Selling square tube stainless steel for expensive',
    price: new Prisma.Decimal(12.25),
    categoryId: 1,
    type: ListingType.SELL,
    owner: '14f9a310-958c-4273-b4b3-4377804642a5',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Ground shafting alloy steel',
    description: 'Buying ground shafting alloy steel for very expensive pls sell to me',
    price: new Prisma.Decimal(123.23),
    categoryId: 8,
    type: ListingType.BUY,
    owner: '14f9a310-958c-4273-b4b3-4377804642a5',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Square bars: Copper',
    description: 'Selling square bars copper for cheap pls buy',
    price: new Prisma.Decimal(123.23),
    categoryId: 9,
    type: ListingType.SELL,
    owner: '14f9a310-958c-4273-b4b3-4377804642a5',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Zinc square bars UP FOR SALE',
    description: 'Selling zinc square bars for fire sale cheap',
    price: new Prisma.Decimal(63.23),
    categoryId: 9,
    type: ListingType.SELL,
    owner: '14f9a310-958c-4273-b4b3-4377804642a5',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Angle stainless steel: IN-STOCK 3000 LEFT',
    description: 'Selling angle stainless metal for expensive',
    price: new Prisma.Decimal(123.23),
    categoryId: 6,
    type: ListingType.SELL,
    owner: '14f9a310-958c-4273-b4b3-4377804642a5',
    multiple: true,
    grading: 'S275'
  },
  {
    name: 'SELLING copper plates',
    description: 'Selling copper plates for cheap pls buy',
    price: new Prisma.Decimal(123.23),
    categoryId: 7,
    type: ListingType.SELL,
    owner: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Stainless steel round bars',
    description: 'Buying stainless steel round bars for cheap pls gimmie',
    price: new Prisma.Decimal(143.33),
    categoryId: 8,
    type: ListingType.BUY,
    owner: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'BUYING Tool steel square bar',
    description: 'Buying tool steel square bar for ice cream pls sell to me',
    price: new Prisma.Decimal(666.23),
    categoryId: 9,
    type: ListingType.BUY,
    owner: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'alloy steel plate WTS',
    description: 'Selling alloy steel plate for a boat',
    price: new Prisma.Decimal(133),
    categoryId: 7,
    type: ListingType.SELL,
    owner: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Mild steel tread plate (1x)',
    description: 'Selling mild steel tread plate for a house wiith a 1x',
    price: new Prisma.Decimal(430.2),
    categoryId: 7,
    type: ListingType.SELL,
    owner: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'WTS Zinc round bars',
    description: 'Selling zinc round bars for cheap pls buy',
    price: new Prisma.Decimal(123.23),
    categoryId: 8,
    type: ListingType.SELL,
    owner: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Steel square tube',
    description: 'Buying steel square tube for cheap pls sell to me i need it',
    price: new Prisma.Decimal(6),
    categoryId: 1,
    type: ListingType.BUY,
    owner: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Hexagon bar (alloy steel)',
    description: 'Buying hexagon bar alloy steel for cheap pls sell to me',
    price: new Prisma.Decimal(46),
    categoryId: 8,
    type: ListingType.BUY,
    owner: '1965b49b-3e55-4493-bc69-5701cabf8baa',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Expanded sheet mild sheet',
    description: 'Selling expanded sheet mild sheet for very expensive, baller only',
    price: new Prisma.Decimal(123.23),
    categoryId: 7,
    type: ListingType.SELL,
    owner: '1965b49b-3e55-4493-bc69-5701cabf8baa',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Aluminium Bar Grating',
    description: 'Buying aluminium bar grating for cheap pls sell to me',
    price: new Prisma.Decimal(12),
    categoryId: 10,
    type: ListingType.BUY,
    owner: '1965b49b-3e55-4493-bc69-5701cabf8baa',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'WTB Safety Grip: Aluminium',
    description: 'Buying safety grip aluminium for cheap pls sell to my friend',
    price: new Prisma.Decimal(1234),
    categoryId: 10,
    type: ListingType.BUY,
    owner: '27666b0b-491a-4ce8-86bc-ab45f814ee07',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Rounded mild steel bar',
    description: 'Selling rounded mild steel bar for 10c',
    price: new Prisma.Decimal(0.1),
    categoryId: 8,
    type: ListingType.SELL,
    owner: '27666b0b-491a-4ce8-86bc-ab45f814ee07',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'LF Aluminium Tread Plate',
    description: 'Looking for aluminium tread plate for cheap pls sell to me',
    price: new Prisma.Decimal(123.23),
    categoryId: 7,
    type: ListingType.BUY,
    owner: '27666b0b-491a-4ce8-86bc-ab45f814ee07',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'stainless steel round bars for sale',
    description: 'Selling stainless steel round bars for cheap pls buy or i go homeless',
    price: new Prisma.Decimal(123.6),
    categoryId: 8,
    type: ListingType.SELL,
    owner: '2a7f0665-57a8-454b-8518-ce2c4f003237',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Stainless steel channel',
    description: 'Buying stainless steel channel for cheap pls sell to me',
    price: new Prisma.Decimal(66),
    categoryId: 4,
    type: ListingType.BUY,
    owner: '2a7f0665-57a8-454b-8518-ce2c4f003237',
    multiple: false,
    grading: 'S275'
  },
  {
    name: '[FIRE SALE] Alloy steel round tube',
    description: 'Selling alloy steel round tube for free',
    price: new Prisma.Decimal(1),
    categoryId: 1,
    type: ListingType.SELL,
    owner: '2a7f0665-57a8-454b-8518-ce2c4f003237',
    multiple: true,
    grading: 'S275'
  },
  {
    name: 'Tool steel: Ground Flat Stock',
    description: 'Buying tool steel ground flat stock for cheap pls sell to me',
    price: new Prisma.Decimal(123.23),
    categoryId: 9,
    type: ListingType.BUY,
    owner: '4521b840-8c2e-43ba-9c9e-11dc37a86a39',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Copper flat bars',
    description: 'Selling copper flat bars for expensive 100 bucks or a boat',
    price: new Prisma.Decimal(457),
    categoryId: 9,
    type: ListingType.SELL,
    owner: '4521b840-8c2e-43ba-9c9e-11dc37a86a39',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Aluminum Safety Grips Offer',
    description: 'Buying aluminium safety grips for metal',
    price: new Prisma.Decimal(122.4),
    categoryId: 10,
    type: ListingType.BUY,
    owner: '4521b840-8c2e-43ba-9c9e-11dc37a86a39',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Steel square tubes for sale',
    description: 'Selling steel square tubes for cheap pls buy',
    price: new Prisma.Decimal(12),
    categoryId: 1,
    type: ListingType.SELL,
    owner: '4521b840-8c2e-43ba-9c9e-11dc37a86a39',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Brass plates (x2331)',
    description:
      'Please note that this listing includes a total of 2,331 brass plates, offering ample quantity for various uses.',
    price: new Prisma.Decimal(122.4),
    categoryId: 7,
    type: ListingType.SELL,
    owner: '84e51e55-b2b7-4751-ab3e-8ce264d94b80',
    multiple: true,
    grading: 'S275'
  },
  {
    name: 'Zinc round bars',
    description:
      'For sale: Zinc round bars, perfect for various industrial applications and crafting projects.',
    price: new Prisma.Decimal(140.8),
    categoryId: 8,
    type: ListingType.SELL,
    owner: '84e51e55-b2b7-4751-ab3e-8ce264d94b80',
    multiple: true,
    grading: 'S275'
  },
  {
    name: 'WTS Alloy steel sheets',
    description:
      'Selling alloy steel sheets, offering exceptional strength and versatility for a wide range of applications in construction, manufacturing, and more.',
    price: new Prisma.Decimal(40.8),
    categoryId: 3,
    type: ListingType.SELL,
    owner: '84e51e55-b2b7-4751-ab3e-8ce264d94b80',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Want [x315] Copper plates',
    description: 'Want 315 Copper plates, price negotiable.',
    price: new Prisma.Decimal(100.0),
    categoryId: 7,
    type: ListingType.BUY,
    owner: 'a43405b7-74d5-48d4-9155-3622ad3d2970',
    multiple: true,
    grading: 'S275'
  },
  {
    name: 'Tool steel ground plate stocks selling in bulk!',
    description: 'Available in bulk, up to 100 pcs per person',
    price: new Prisma.Decimal(420.1),
    categoryId: 7,
    type: ListingType.SELL,
    owner: 'a43405b7-74d5-48d4-9155-3622ad3d2970',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Buying Expanded sheets made out of Aluminum',
    description: 'Looking to buy expanded sheets made from aluminum, contact me.',
    price: new Prisma.Decimal(23.0),
    categoryId: 3,
    type: ListingType.BUY,
    owner: 'a43405b7-74d5-48d4-9155-3622ad3d2970',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'WTB Stainless steel channel',
    description:
      'Looking to buy stainless steel channel for construction projects, in need of durable and corrosion-resistant material.',
    price: new Prisma.Decimal(40.3),
    categoryId: 4,
    type: ListingType.BUY,
    owner: 'b42f91ca-86e5-4ac6-a8c9-10bda477370e',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Square bars alloy steel up for sale',
    description: 'Selling square bars made from alloy steel, quite new batch.',
    price: new Prisma.Decimal(530.0),
    categoryId: 8,
    type: ListingType.SELL,
    owner: 'b42f91ca-86e5-4ac6-a8c9-10bda477370e',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Selling for mild steel bars - Only 231 left!',
    description: 'Selling good quality mild steel bars, only 231 left in stock.',
    price: new Prisma.Decimal(300.1),
    categoryId: 8,
    type: ListingType.SELL,
    owner: 'b42f91ca-86e5-4ac6-a8c9-10bda477370e',
    multiple: true,
    grading: 'S275'
  },
  {
    name: 'Aluminum Perforated Sheet purchase in bulk for discounts',
    description:
      'Seeking to buy aluminum perforated sheets in bulk? Take advantage of our discounted prices and enhance your projects with these versatile and durable sheets. ',
    price: new Prisma.Decimal(122.4),
    categoryId: 3,
    type: ListingType.SELL,
    owner: 'cb4dbbcd-cb8d-45f7-b6c0-057fb8b0f3c7',
    multiple: true,
    grading: 'S275'
  },
  {
    name: '[Warehouse Clearance] Stainless Steel Square Bars',
    description:
      'Do not miss out on our warehouse clearance sale! We are offering stainless steel square bars at unbeatable prices. Limited stock available.',
    price: new Prisma.Decimal(12.3),
    categoryId: 9,
    type: ListingType.SELL,
    owner: 'cb4dbbcd-cb8d-45f7-b6c0-057fb8b0f3c7',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Round bars: Aluminum [WTB]',
    description: 'Looking for high quality bars, price is negotiable.',
    price: new Prisma.Decimal(15.0),
    categoryId: 8,
    type: ListingType.BUY,
    owner: 'cb4dbbcd-cb8d-45f7-b6c0-057fb8b0f3c7',
    multiple: false,
    grading: 'S275'
  },
  {
    name: '(WTS) Mild steel grating',
    description:
      'For sale: Mild steel grating, a durable and reliable option for industrial and commercial applications.',
    price: new Prisma.Decimal(31.5),
    categoryId: 8,
    type: ListingType.SELL,
    owner: 'cb4dbbcd-cb8d-45f7-b6c0-057fb8b0f3c7',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'Grating: Aluminum FOR SALE',
    description: 'Selling Durable Aluminum Gratings while stocks last, rates are per pc.',
    price: new Prisma.Decimal(50.5),
    categoryId: 2,
    type: ListingType.SELL,
    owner: 'cb4dbbcd-cb8d-45f7-b6c0-057fb8b0f3c7',
    multiple: false,
    grading: 'S275'
  },
  {
    name: 'High Quality Rectangular Steel Tubing',
    description:
      'High-quality rectangular steel tubing, known for its versatility and sturdy construction. Perfect for structural projects, fabrication, and more. ',
    price: new Prisma.Decimal(800.2),
    categoryId: 8,
    type: ListingType.SELL,
    owner: 'cb4dbbcd-cb8d-45f7-b6c0-057fb8b0f3c7',
    multiple: true,
    grading: 'S275'
  },
  {
    name: 'Selling Zinc sheets for cheap',
    description: 'Selling zinc sheets at a discounted price, non-negotiable price.',
    price: new Prisma.Decimal(10.2),
    categoryId: 3,
    type: ListingType.SELL,
    owner: 'a43405b7-74d5-48d4-9155-3622ad3d2970',
    multiple: false,
    grading: 'S275'
  },
  {
    name: '(WTS) Aluminum beams',
    description:
      'Grab your high-quality alumnium beams here! Available while stocks last. Price is non-negotiable.',
    price: new Prisma.Decimal(15.5),
    categoryId: 2,
    type: ListingType.SELL,
    owner: 'a43405b7-74d5-48d4-9155-3622ad3d2970',
    multiple: false,
    grading: 'S275'
  },
];

export type { IListings };
export { Listings };

interface IListingItems {
  id?: number;
  name: string;
  chineseName?: string;
  unit: string;
  chineseUnit?: string;
  description: string;
  categoryId: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

const ListingItems: IListingItems[] = [
  {
    name: 'Aluminium I-Beams',
    description:
      'Aluminium Universal Beam, also known as, Aluminium I-Beam is an extruded aluminium bar formed in the shape of “I” that is used to distribute weight of walls and floors above an opening. Aluminium I-beams are commonly used for structural and highly stressed applications, where lightweight and corrosion resistance is a priority, such as bridges, overhead support, construction, civil engineering and other heavy machinery. Aluminium I-beam is mostly used to support heavy structures due to its capability to withstand heavy loads, primarily by resisting against bending.',
    unit: 'kg',
    categoryId: 1,
  },
  {
    name: 'Stainless Steel Round Bar',
    description: 'brand new clearing price',
    unit: 'kg',
    categoryId: 1,
  },
  {
    name: 'Stainless Steel Square Bar',
    description: 'WTB aluminum round bar for listed price',
    unit: 'kg',
    categoryId: 9,
  },
  {
    name: 'Aluminum Round Bar',
    description: 'WTB aluminum round bar for listed price',
    unit: 'kg',
    categoryId: 8,
  },
  {
    name: 'Zinc Sheets',
    description: 'Selling zinc sheets at a discounted price, non-negotiable price.',
    unit: 'kg',
    categoryId: 3,
  },
  {
    name: 'Rectangular Steel Tubing',
    description:
      'High-quality rectangular steel tubing, known for its versatility and sturdy construction. Perfect for structural projects, fabrication, and more.',
    unit: 'kg',
    categoryId: 8,
  },
  {
    name: 'Aluminium Grating',
    description: 'Durable Aluminum Gratings while stocks last, rates are per pc.',
    unit: 'unit',
    categoryId: 2,
  },
  {
    name: 'Mild Steel Grating',
    description:
      'Mild steel grating, a durable and reliable option for industrial and commercial applications.',
    unit: 'unit',
    categoryId: 8,
  },
  {
    name: 'Aluminium Perforated Sheet',
    description:
      'Seeking to buy aluminum perforated sheets in bulk? Take advantage of our discounted prices and enhance your projects with these versatile and durable sheets.',
    unit: 'kg',
    categoryId: 3,
  },
  {
    name: 'Mild Steel Bars',
    description:
      'Mild steel grating, a durable and reliable option for industrial and commercial applications.',
    unit: 'unit',
    categoryId: 8,
  },
  {
    name: 'Ground shafting alloy steel',
    description: 'Buying ground shafting alloy steel for very expensive pls sell to me',
    unit: 'unit',
    categoryId: 8,
  },
  {
    name: 'Alloy Square Bars',
    description: 'Selling square bars made from alloy steel, quite new batch.',
    unit: 'unit',
    categoryId: 3,
  },
  {
    name: 'Stainless Steel Channel',
    description:
      'stainless steel channel for construction projects, in need of durable and corrosion-resistant material.',
    unit: 'unit',
    categoryId: 8,
  },
  {
    name: 'Round Hollow Bar',
    description: 'Used hollow bar in amazing condition, please buy!',
    unit: 'unit',
    categoryId: 1,
  },
  {
    name: 'Copper Plates',
    description: 'Price Negotiable.',
    unit: 'kg',
    categoryId: 8,
  },
  {
    name: 'Steel Ground Plates',
    description: 'Available in bulk, up to 100 pcs per person',
    unit: 'kg',
    categoryId: 7,
  },
  {
    name: 'metal beam',
    description: 'selling metal beam in good condition.',
    unit: 'kg',
    categoryId: 8,
  },
  {
    name: 'Aluminium Expanded Sheets',
    description: 'expanded sheets made from aluminum',
    unit: 'kg',
    categoryId: 3,
  },
  {
    name: 'Alloy Steel Sheets',
    description:
      'alloy steel sheets, offering exceptional strength and versatility for a wide range of applications in construction, manufacturing, and more.',
    unit: 'unit',
    categoryId: 3,
  },
  {
    name: 'Zinc Round Bars',
    description:
      'Zinc round bars, perfect for various industrial applications and crafting projects.',
    unit: 'unit',
    categoryId: 8,
  },
  {
    name: 'Brass Plates',
    description:
      'Please note that this listing includes a total of 2,331 brass plates, offering ample quantity for various uses.',
    unit: 'unit',
    categoryId: 7,
  },
  {
    name: 'Copper Square Bars',
    description: 'WYSWYG.',
    unit: 'unit',
    categoryId: 9,
  },
  {
    name: 'Stainless Steel Piles',
    description: 'Need to get rid fast.',
    unit: 'unit',
    categoryId: 3,
  },
  {
    name: 'Aluminum Channel',
    description: 'Aluminum Channel 6063, shaped channel of 6063 aluminum alloy.',
    unit: 'unit',
    categoryId: 7,
  },
  {
    name: 'Aluminium hexagon bar',
    description: 'Aluminium hexagon bar for sale',
    unit: 'unit',
    categoryId: 3,
  },
  {
    name: 'Stainless Steel Angle Bar',
    description: 'Angle Bar. 90 degrees. WYSWYG.',
    unit: 'unit',
    categoryId: 6,
  },
  {
    name: 'Stainless Steel Round Bars',
    description: 'Grade 17-4PH',
    unit: 'unit',
    categoryId: 8,
  },
  {
    name: 'Aluminium Safety Grips',
    description: 'Buying aluminium safety grips for metal',
    unit: 'unit',
    categoryId: 10,
  },
  {
    name: 'Steel drill rods',
    description: 'Buying tool steel drill rods for nice price',
    unit: 'unit',
    categoryId: 6,
  },
  {
    name: 'Copper Flat Bars',
    description: 'copper flat bars for expensive 100 bucks or a boat',
    unit: 'unit',
    categoryId: 9,
  },
  {
    name: 'Stainless Steel Hollow Sections',
    description: 'selling hollow sections, urgent sale',
    unit: 'unit',
    categoryId: 1,
  },
  {
    name: 'Iron Sheet piles',
    description: 'I need a pile of sheet piles\n\nPreferably length of 150cm',
    unit: 'unit',
    categoryId: 3,
  },
  {
    name: 'Stainless steel channel',
    description: 'Selling Stainless steel channel fire sale rn',
    unit: 'unit',
    categoryId: 1,
  },
  {
    name: 'Aluminium Plate',
    description: 'Cheap',
    unit: 'kg',
    categoryId: 7,
  },
  {
    name: 'Stainless Steel Plates',
    description: 'Selling Stainless Steel Plates for cheap asf',
    unit: 'unit',
    categoryId: 6,
  },
  {
    name: 'Stainless Steel Purlins',
    description: 'buying high grade stainless steel purlins',
    unit: 'unit',
    categoryId: 5,
  },
  {
    name: 'Alloy Hexagon Bar',
    description: 'hexagon bar alloy steel for cheap pls sell to me',
    unit: 'unit',
    categoryId: 6,
  },
  {
    name: 'Copper angles',
    description:
      "i need nice copper angles, don't give me that 3Purlins6 angle stuff\n\nI ONLY NEED 89 degress ANGLES",
    unit: 'unit',
    categoryId: 6,
  },
  {
    name: 'Welded Black Square Steel Pipe',
    description: 'Black square steel pipes/hollow sections in good condition',
    unit: 'unit',
    categoryId: 1,
  },
  {
    name: 'Stainless steel tubes',
    description: 'I have spare round steel tubes, feel free to contact for deals',
    unit: 'unit',
    categoryId: 1,
  },
  {
    name: 'Mild Steel Sheets',
    description:
      'Mild steel grating, a durable and reliable option for industrial and commercial applications.',
    unit: 'unit',
    categoryId: 8,
  },
  {
    name: 'Steel angles',
    description:
      'Mild steel grating, a durable and reliable option for industrial and commercial applications.',
    unit: 'unit',
    categoryId: 8,
  },
  {
    name: 'Ground Flat Stock',
    description: 'Buying tool steel ground flat stock for cheap pls sell to me',
    unit: 'unit',
    categoryId: 8,
  },
  {
    name: 'Mild steel tread plate',
    description: 'Selling mild steel tread plate for a house wiith a 1x',
    unit: 'unit',
    categoryId: 7,
  },
  {
    name: 'Circular Hollow Section',
    description:
      'Stainless Steel Circular Hollow Section\n\nHave excess of 10 x 10m.\n\nDetails:\n\nManufactured using high quality pure steel HR coils up to a maximum size of 600mm NB, Tata Structura Circular Hollow Sections are light in weight and having high strength. The sections are easy to bend & ideal for welding making it perfect to construct unique & aesthetically appealing structures without compromising strength, beauty & durability. With an assured yield strengths ranging from 210 MPa, 310 MPa, 355 MPa and 420 MPa, these hollow sections or steel tubes can be designed sustain heavy loads with ease. Unlike other secondary steel sections, the chemical composition of steel will not allow any cracks to develop during welding. Thus, making it more suitable to use for a quality steel construction that saves cost as well as time.\n\nThe HR coils used to manufacture the steel sections are made in accordance with the highest degree of international quality & the steel tubes are manufactured as per IS 1161. The sections also come with a test certificate which is proof that the steel tubes have undergone and passed all the necessary quality tests.\n\nFeel free to message me for more details.',
    unit: 'kg',
    categoryId: 1,
  },
  {
    name: 'Zinc square bars',
    description: 'Selling zinc square bars for fire sale cheap',
    unit: 'unit',
    categoryId: 9,
  },
  {
    name: 'Copper Sheets',
    description: 'WYSWYG.',
    unit: 'unit',
    categoryId: 7,
  },
  {
    name: 'Stainless steel purlins',
    description: 'Brand new steel purlins for sale.',
    unit: 'unit',
    categoryId: 7,
  },
  {
    name: 'Alloy Ground Shafting',
    description:
      'Ground Shafting Alloy Steel is a high strength, low alloy steel that finds its best application where there is need for more strength per unit of weight. Less of this material is needed to fulfill given strength requirements than is necessary with regular carbon steels. Grade 4140 is used for applications requiring good mechanical properties and involving moderate to heavy machining, such as forging, upsetting, boring, and reaming. While it is true that many other grades contain chromium, 4140 stands out for its versatility, machinability, and high fatigue strength. It can be heat treated to high strength levels while maintaining good toughness, wear resistance, and fatigue strength levels, combined with good atmospheric corrosion resistance, and strength.',
    unit: 'unit',
    categoryId: 3,
  },
  {
    name: 'Alloy steel plate',
    description: 'Selling alloy steel plate for a boat',
    unit: 'unit',
    categoryId: 7,
  },
  {
    name: 'Mild Steel Plate',
    description:
      'Mild Steel Plate is a structural quality steel plate used for a large variety of general construction and industrial applications. Mild Steel Plates can come in various sizes and grades. Thicknesses available range from 3mm up to as thick as 150mm. Stock sizes range from 2000 x 1000mm up to 4000 x 2000mm, however we can profile any size of plate you may require. Grades available are S275, S355, Hardox. Larger area plate is also available on request such as 6000 x 2000mm upto 12000 x 3000mm. Please contact us for further information on any of our products.',
    unit: 'unit',
    categoryId: 7,
  },
  {
    name: 'Aluminum Metal Angle Stick',
    description: 'The metal is very premium and rigid. Please contact me to buy the rigid stick.',
    unit: 'unit',
    categoryId: 6,
  },
  {
    name: 'Brass flat bars',
    description: 'Brass flat bars for sale',
    unit: 'unit',
    categoryId: 7,
  },
  {
    name: 'Mild Steel Angle',
    description:
      'Mild Steel Angle is a length of steel or iron that is bent at a right angle, commonly used for making frames, racks and for construction purposes. We stock Equal Angles or Unequal Angles, ranging in a variety of sizes. Angle sections are stocked in either 1.5m lengths, 3m lengths or 6m lengths - but all can be cut exactly to your requirements.',
    unit: 'unit',
    categoryId: 6,
  },
];

export type { IListingItems };
export { ListingItems };

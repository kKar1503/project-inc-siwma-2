// TODO: change the image and crossSectionImage to links to the images in the cloud

interface ICategory {
  id?: number;
  name: string;
  description: string;
  image: string;
  crossSectionImage: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const Categories: ICategory[] = [
  {
    name: 'Hollow Sections',
    description:
      'Hollow Sections are rigid steel structures which have a high strength to weight ratio.',
    image: 'fedcebe1-7574-4851-a006-e5433494da7d',
    crossSectionImage: '996f0779-0062-4b4c-8898-52375dea6c17',
  },
  {
    name: 'Beams',
    description:
      'Universal beams are commonly in architecture and construction, creating columns and beam of various dimensions, grades, and specifications.',
    image: '132990fc-e5a1-4154-88e9-61102de1ea33',
    crossSectionImage: '359c99ed-221c-424b-b817-f4945ab79180',
  },
  {
    name: 'Sheet Piles',
    description:
      'Structural steel sections with vertical interlocking edges that are driven into the ground to create a continuous retaining wall against soil or water.',
    image: '5b41acd4-4c77-4f32-ab78-2192b451b1f8',
    crossSectionImage: '57b6ddfe-6f21-463f-ba0c-16f6b88c3162',
  },
  {
    name: 'Channels',
    description:
      'Structural steel product having a profile of a specific cross section, like a squarish C, commonly used in construction and manufacturing.',
    image: 'a2b6c0f6-60fd-4804-b984-776704db0dac',
    crossSectionImage: '876bde8b-b5b2-499e-b29a-322d0a91503d',
  },
  {
    name: 'Purlins',
    description: 'Horizontal steel member commonly used to support roof structures.',
    image: '5b4974e6-c47a-4f5b-b58e-edf16f6c89f0',
    crossSectionImage: 'b221a91a-dcae-41d7-9c00-de97393fdd5d',
  },
  {
    name: 'Angles',
    description:
      'L-shape steel angles that can have equal or unequal legs, commonly used in construction where structural stability is required by joining with other steel.',
    image: '6cb71c29-1a47-40f2-99de-8f04477bec0b',
    crossSectionImage: 'f191101c-ce8f-41e1-baa5-16c438703c9d',
  },
  {
    name: 'Plates',
    description:
      'Flat steel product that can be used for structural and construction applications, shipbuilding and offshore equipment.',
    image: 'ccc80805-40f6-49c2-908c-bbf3485c827d',
    crossSectionImage: 'ede368ba-b6d9-4160-aaea-ee1810e69274',
    active: false,
  },
  {
    name: 'Round Bar',
    description:
      'Stainless Steel Round Bar is measured by its diameter.\n\nIts resistance to corrosion, staining, and rust make it well-suited for many industries and applications. This includes architecture and cookware.',
    image: '95e0daa8-539f-43f4-b76b-15a082f7f54d',
    crossSectionImage: '597c829b-ee50-4f9e-b232-b2e08f692656',
    active: false,
  },
  {
    name: 'Square Bar',
    description:
      'Alloy Steel has alloying elements added to it such as manganese and nickel. These elements improve the strength, hardness and toughness of the metal. The added elements make Alloy Steel ideal for highly-demanding industrial applications.',
    image: 'dad000a1-1330-4027-b928-6a7a73ed1b67',
    crossSectionImage: '1e5f802a-ddcd-4952-91a9-efd5327262df',
  },
  {
    name: 'Gratings',
    description:
      'Steel gratings are manufactured using a simultaneous application of heat and pressure on the load bar and cross bar at their intersection points, welding them together.',
    image: '3e079082-0b9c-484f-862a-672b80fec7b4',
    crossSectionImage: '4c993521-4e6b-4277-9cb9-9c770925d130',
  },
];

export { Categories };
export type { ICategory };

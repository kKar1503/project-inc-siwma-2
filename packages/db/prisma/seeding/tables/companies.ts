interface ICompanies {
  id?: number;
  name: string;
  bio?: string;
  website?: string;
  logo?: string;
  visibility?: boolean;
  createdAt?: Date;
  comments?: string;
}

const Companies: ICompanies[] = [
  {
    name: 'AIK LIAN METAL & GLAZING PTE.LTD.',
    bio: 'AIK LIAN METAL & GLAZING PTE. LTD. (the "Company") is a Exempt Private Company Limited by Shares, incorporated on 28 July 2011 (Thursday) in Singapore . The address of the Company\'s registered office is at the E9 PREMIUM building. The Company current operating status is live and has been operating for 11 years. This Company\'s principal activity is other construction installation n.e.c. with metal product services n.e.c. as the secondary activity.',
    website: 'https://www.sgpbusiness.com/company/Aik-Lian-Metal-Glazing-Pte-Ltd',
    comments:
      'The SIWMA website has really automated some of our company\'s processes. We now spend less time doing manual work. It\'s making advertising and selling our metals very easy for us.',
  },
  {
    name: 'BOON CHANG STRUCTURE PTE.LTD.',
    bio: 'BOON CHANG STRUCTURE PTE LTD was incorporated on 9 June 1994 (Thursday) as a Exempt Private Company Limited by Shares in Singapore',
    website: 'https://www.boonchangstructure.com.sg/page02.html',
    comments:
      'SIWMA is the firm to work with if you want to keep up to high standards. The professional workflows they stick to result in exceptional quality.',
  },
  {
    name: 'Hock Seng Hoe Metal Company Pte Ltd',
    bio: 'HOCK SENG HOE METAL COMPANY was established in Singapore in Year 2009 and is now a reputable structural steel provider. Our core business includes providing quality steel materials for the construction, shipyard, oil and gas and the offshore marine industries.',
    website: 'https://www.hshmetal.com/',
    logo: 'hock-seng-hoe-metal-company-squarelogo-1627623379366.png',
    comments:
      'The system has produced a significant competitive advantage in the industry thanks to SIWMA well-thought opinions',
  },
  {
    name: 'Kian Huat Metal',
    bio: 'Kian Huat Metal is the leading distributor of Aluminium and Stainless Steel products, recognized for its reliability, efficiency, and commitment to quality. With over 30 years of experience in the industry, the Company has a wide distribution network that spans over 20 countries in the Asia Pacific region.\n\nKian Huat Metal offers an extensive range of Aluminium and Stainless Steel products, sourced worldwide with major footprints in China, Indonesia, Thailand, and Malaysia.',
    website: 'https://kianhuatmetal.com/',
    visibility: false,
    logo: 'logo-Placeholder.jpg',
    comments:
      'They are very sharp and have a high-quality team. We expect quality from people, and they have the kind of team we can work with. They were upfront about everything that needed to be done.',
  },
  {
    name: 'Global Metal International',
    bio: 'Global Metal International (GMI) is a steel based stockist with focus on Stainless Steel products in Singapore, supplying regional markets in South East Asia, to both retail and project business. We are also developing our trading arm in Stainless Steel and non ferrous, trade indent material for productions or projects.',
    website: 'https://globalmetal.com.sg/',
    comments:
      "We are impressed by SIWMA's prices, especially for the project we wanted to do and in comparison to the quotes we received from a lot of other companies.",
  },
  {
    name: 'Teck Leong Industries Pte Ltd',
    bio: 'As time went by, Chop Teck Leong grew in stature and became a prominent supplier of ferrous and non-ferrous metals.  Three generations of his descendants have succeeded him in this trade and developed the business to trade in greater range of products and services and to support broader spectrum of industries.',
    website: 'http://www.copper.asia/default.aspx',
  },
  {
    name: 'HiMetal Enterprise Pte Ltd',
    bio: 'HiMetal Enterprise specialises in supplying Stainless Steel products in Singapore. We supply a wide range of flat and long products to our valued customers for retail, wholesale and project order. We also engage in trading business for indent orders of Stainless Steel, Ferrous and Non-Ferrous materials.',
    website: 'https://www.himetal.com.sg/',
  },
  {
    name: 'ACE OVERSEA INVESTMENT',
  },
  {
    name: 'ASIA GALVANIZING (S) PTE.LTD.',
  },
  {
    name: 'A&G EQUIPMENT PTE.LTD.',
  },
  {
    name: 'Singapore Foundries',
  },
];

export type { ICompanies };
export { Companies };

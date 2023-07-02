import { UserContacts } from '../../../index';

// all passwords are:
// name - all lowercase remove spaces
// phone
// eg. elonmusk69694202

interface IUsers {
  id?: string;
  email: string;
  name: string;
  phone: string;
  profilePicture?: string;
  password: string;
  contact: UserContacts;
  permissions?: number;
  enabled?: boolean;
  companyId: number;
  createdAt?: Date;
  bio?: string;
  comments?: string;
  whatsappNumber?: string;
  telegramUsername?: string;
}

const Users: IUsers[] = [
  {
    id: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    email: 'chieftweetcomplainthotline@twittermail.com',
    name: 'Elon Musk',
    phone: '69694202',
    // password: 'elonmusk69694202',
    password: '$2a$10$P70WFifUqlyENCxFZi7Cu.VnmJRrz7Kup2SnqUonZlsdDCVqOSCiC',
    contact: UserContacts.email,
    companyId: 1,
    comments: 'Great place to buy metals online, trustworthy website!',
  },
  {
    id: 'b42f91ca-86e5-4ac6-a8c9-10bda477370e',
    email: 'zaw.kaungkhant16@gmail.com',
    name: 'Khant Zaw',
    phone: '12356789',
    profilePicture: 'oni profile.jpg',
    // password: 'khantzaw12356789',
    password: '$2a$10$P70WFifUqlyENCxFZi7Cu.VnmJRrz7Kup2SnqUonZlsdDCVqOSCiC',
    contact: UserContacts.phone,
    companyId: 2,
    comments: 'Excellent customer service, transaction was smooth overall',
  },
  {
    id: '2a7f0665-57a8-454b-8518-ce2c4f003237',
    email: 'pinghowng@gmail.com',
    name: 'Ng Ping How',
    phone: '91234568',
    // password: 'ngpinghow91234568',
    password: '$2a$10$P70WFifUqlyENCxFZi7Cu.VnmJRrz7Kup2SnqUonZlsdDCVqOSCiC',
    contact: UserContacts.whatsapp,
    companyId: 3,
  },
  {
    id: '1965b49b-3e55-4493-bc69-5701cabf8baa',
    email: 'javier@ichat.sp.edu.sg',
    name: 'Fok Yanrui Javier',
    phone: '91287659',
    // password: 'fokyanruijavier91287659',
    password: '$2a$10$P70WFifUqlyENCxFZi7Cu.VnmJRrz7Kup2SnqUonZlsdDCVqOSCiC',
    contact: UserContacts.whatsapp,
    companyId: 4,
    comments: 'You can find whatever you want or need easily.',
  },
  {
    id: '4521b840-8c2e-43ba-9c9e-11dc37a86a39',
    email: 'jonathan@gmail.com',
    name: 'Jonathan Tan',
    phone: '88493883',
    // password: 'jonathantan88493883',
    password: '$2a$10$P70WFifUqlyENCxFZi7Cu.VnmJRrz7Kup2SnqUonZlsdDCVqOSCiC',
    contact: UserContacts.telegram,
    companyId: 5,
    comments:
      'Never had problems with sellers or buyers on that page all went successfuly until today.',
  },
  {
    id: 'a43405b7-74d5-48d4-9155-3622ad3d2970',
    email: 'timothy_yeo@gmail.com',
    name: 'Timothy Yeo',
    phone: '99440301',
    // password: 'timothyyeo99440301',
    password: '$2a$10$P70WFifUqlyENCxFZi7Cu.VnmJRrz7Kup2SnqUonZlsdDCVqOSCiC',
    contact: UserContacts.facebook,
    companyId: 6,
    comments: 'Smooth deals, I recommed this app',
  },
  {
    id: '14f9a310-958c-4273-b4b3-4377804642a5',
    email: 'topg_andrewtate@gmail.com',
    name: 'Andrew Tate',
    phone: '88908732',
    // password: 'andrewtate88908732',
    password: '$2a$10$P70WFifUqlyENCxFZi7Cu.VnmJRrz7Kup2SnqUonZlsdDCVqOSCiC',
    contact: UserContacts.telegram,
    companyId: 7,
  },
  {
    id: 'cb4dbbcd-cb8d-45f7-b6c0-057fb8b0f3c7',
    email: 'yeoxhshelby@gmail.com',
    name: 'Shelby Yeo',
    phone: '98838422',
    // password: 'shelbyyeo98838422',
    password: '$2a$10$P70WFifUqlyENCxFZi7Cu.VnmJRrz7Kup2SnqUonZlsdDCVqOSCiC',
    contact: UserContacts.telegram,
    companyId: 8,
  },
  {
    id: '27666b0b-491a-4ce8-86bc-ab45f814ee07',
    email: 'jamestanmetals@gmail.com',
    name: 'James Tan',
    phone: '95648321',
    // password: 'jamestan95648321',
    password: '$2a$10$P70WFifUqlyENCxFZi7Cu.VnmJRrz7Kup2SnqUonZlsdDCVqOSCiC',
    contact: UserContacts.facebook,
    companyId: 9,
  },
  {
    id: '84e51e55-b2b7-4751-ab3e-8ce264d94b80',
    email: 'onghinjourn@gmail.com',
    name: 'Ong Hin Journ',
    phone: '94554371',
    // password: 'onghinjourn94554371',
    password: '$2a$10$P70WFifUqlyENCxFZi7Cu.VnmJRrz7Kup2SnqUonZlsdDCVqOSCiC',
    contact: UserContacts.whatsapp,
    companyId: 10,
  },
  {
    id: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
    email: 'xavier@example.com',
    name: 'xavier',
    phone: '91234567',
    // excuse me @Axiver what kind of password is password :skull:
    // password: 'password'
    password: '$2a$10$P70WFifUqlyENCxFZi7Cu.VnmJRrz7Kup2SnqUonZlsdDCVqOSCiC',
    contact: UserContacts.whatsapp,
    permissions: 1,
    companyId: 1,
  },
  {
    id: 'ba9243d0-8d5e-48bf-b28e-d21cfb9fd126',
    email: 'test@ksapps.com',
    name: 'karan',
    phone: '87970222',
    password: '$2a$10$P70WFifUqlyENCxFZi7Cu.VnmJRrz7Kup2SnqUonZlsdDCVqOSCiC',
    contact: UserContacts.whatsapp,
    permissions: 1,
    companyId: 2,
  },
];

export type { IUsers };
export { Users };

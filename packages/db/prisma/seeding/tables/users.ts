import { usercontacts } from '@prisma/client';

// TODO: update all password to hashed password

interface IUsers {
  id?: string;
  email: string;
  name: string;
  phone: string;
  profile_picture?: string;
  bio?: string;
  password: string;
  contact: usercontacts;
  permissions?: number;
  enabled?: boolean;
  company_id: number;
  created_at?: Date;
}

const Users: IUsers[] = [
  {
    id: 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af',
    email: 'chieftweetcomplainthotline@twittermail.com',
    name: 'Elon Musk',
    phone: '69694202',
    password: 'elonmusk69694202',
    contact: usercontacts.email,
    company_id: 1,
  },
  {
    id: 'b42f91ca-86e5-4ac6-a8c9-10bda477370e',
    email: 'zaw.kaungkhant16@gmail.com',
    name: 'Khant Zaw',
    phone: '12356789',
    profile_picture: 'oni profile.jpg',
    password: 'khantzaw12356789',
    contact: usercontacts.phone,
    company_id: 2,
  },
  {
    id: '2a7f0665-57a8-454b-8518-ce2c4f003237',
    email: 'pinghowng@gmail.com',
    name: 'Ng Ping How',
    phone: '91234568',
    password: 'ngpinghow91234568',
    contact: usercontacts.whatsapp,
    company_id: 3,
  },
  {
    id: '1965b49b-3e55-4493-bc69-5701cabf8baa',
    email: 'javier@ichat.sp.edu.sg',
    name: 'Fok Yanrui Javier',
    phone: '91287659',
    password: 'fokyanruijavier91287659',
    contact: usercontacts.whatsapp,
    company_id: 4,
  },
  {
    id: '4521b840-8c2e-43ba-9c9e-11dc37a86a39',
    email: 'jonathan@gmail.com',
    name: 'Jonathan Tan',
    phone: '88493883',
    password: 'jonathantan88493883',
    contact: usercontacts.telegram,
    company_id: 5,
  },
  {
    id: 'a43405b7-74d5-48d4-9155-3622ad3d2970',
    email: 'timothy_yeo@gmail.com',
    name: 'Timothy Yeo',
    phone: '99440301',
    password: 'timothyyeo99440301',
    contact: usercontacts.facebook,
    company_id: 6,
  },
  {
    id: '14f9a310-958c-4273-b4b3-4377804642a5',
    email: 'topg_andrewtate@gmail.com',
    name: 'Andrew Tate',
    phone: '88908732',
    password: 'andrewtate88908732',
    contact: usercontacts.telegram,
    company_id: 7,
  },
  {
    id: 'cb4dbbcd-cb8d-45f7-b6c0-057fb8b0f3c7',
    email: 'yeoxhshelby@gmail.com',
    name: 'Shelby Yeo',
    phone: '98838422',
    password: 'shelbyyeo98838422',
    contact: usercontacts.telegram,
    company_id: 8,
  },
  {
    id: '27666b0b-491a-4ce8-86bc-ab45f814ee07',
    email: 'jamestanmetals@gmail.com',
    name: 'James Tan',
    phone: '95648321',
    password: 'jamestan95648321',
    contact: usercontacts.facebook,
    company_id: 9,
  },
  {
    id: '84e51e55-b2b7-4751-ab3e-8ce264d94b80',
    email: 'onghinjourn@gmail.com',
    name: 'Ong Hin Journ',
    phone: '94554371',
    password: 'onghinjourn94554371',
    contact: usercontacts.whatsapp,
    company_id: 10,
  },
];

export type { IUsers };
export { Users };

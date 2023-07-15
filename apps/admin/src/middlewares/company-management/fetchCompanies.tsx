import apiClient from '@/utils/api/client/apiClient';
import companies, { Company } from '@/utils/api/client/zod/companies';

const sampleData = [
  {
    id: '1',
    name: 'Tan Metals1',
    bio: 'We sell metals',
    website: 'tanmetals.com',
    visible: true,
    image: '550e8400-e29b-41d4-a716-446655440000.png',
    comments: 'something',
    createdAt: '2023-01-17 07:12:56.840013+00',
  },
  {
    id: '2',
    name: 'Tan Metals2',
    bio: 'We sell metals',
    website: 'tanmetals.com',
    visible: true,
    image: '550e8400-e29b-41d4-a716-446655440000.png',
    comments: 'something',
    createdAt: '2023-01-17 07:12:56.840013+00',
  },
  {
    id: '3',
    name: 'Tan Metals3',
    bio: 'We sell metals',
    website: 'tanmetals.com',
    visible: true,
    image: '550e8400-e29b-41d4-a716-446655440000.png',
    comments: 'something',
    createdAt: '2023-01-17 07:12:56.840013+00',
  },
  {
    id: '4',
    name: 'Tan Metals4',
    bio: 'We sell metals',
    website: 'tanmetals.com',
    visible: true,
    image: '550e8400-e29b-41d4-a716-446655440000.png',
    comments: 'something',
    createdAt: '2023-01-17 07:12:56.840013+00',
  },
  {
    id: '5',
    name: 'Tan Metals5',
    website: 'tanmetals.com',
    visible: true,
    image: '550e8400-e29b-41d4-a716-446655440000.png',
    comments: 'something',
    createdAt: '2023-01-17 07:12:56.840013+00',
  },
];

const fetchCompanies = async () => {
  const response = await apiClient.get(`/v1/companies`);

  const parsedCompanies = companies.getAll.parse(response.data.data);

  return parsedCompanies;
};

export default fetchCompanies;

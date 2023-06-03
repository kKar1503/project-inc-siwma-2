import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import ListingBookmarks from '@/components/marketplace/bookmarks/listingBookmarks';
import UserBookmarks from '@/components/marketplace/bookmarks/userBookmarks';
import CompanyBookmarks from '@/components/marketplace/bookmarks/companyBookmarks';

import fetchUser from '@/middlewares/fetchUser';
import fetchListing from '@/middlewares/fetchListing';
import fetchCompany from '@/middlewares/fetchCompany';
import { Listing } from '@/utils/api/client/zod/listings';
import { Company } from '@/utils/api/client/zod/companies';
import { User } from '@/utils/api/client/zod/users';

import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';

export type BookmarkTypeProps = 'LISTINGS' | 'USERS' | 'COMPANIES';

export type RawUserProps = {
  data: User[];
};

const useGetUserQuery = (userUuid: string) => {
  const { data } = useQuery('user', async () => fetchUser(userUuid), {
    enabled: userUuid !== undefined,
  });

  return data;
};

const Bookmarks = () => {
  const [selectedButton, setSelectedButton] = useState('COMPANIES');
  const [listings, setListings] = useState<Listing[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [bookmarkData, setBookmarkData] = useState(null); // New state for bookmark data

  const handleButtonClick = (type: BookmarkTypeProps) => {
    setSelectedButton(type);
  };

  const transformUserData = (data: RawUserProps[]) => {
    const users: User[] = [];
    data.forEach((item: RawUserProps) => {
      users.push(item.data[0]);
    });

    return users;
  };

  const findListings = async (listingIDs: string[]) => {
    if (listingIDs.length === 0) return;

    const listingPromises = listingIDs.map(async (id) => {
      const data = await fetchListing(id);
      return data;
    });

    const listings = await Promise.all(listingPromises);

    setListings(listings);
  };

  const findUsers = async (userIDs: string[]) => {
    if (userIDs.length === 0) return;

    const userPromises = userIDs.map(async (id) => {
      const data = await fetchUser(id);
      return data ? data.data : null;
    });

    const userData = await Promise.all(userPromises);
    const users = transformUserData(userData);

    setUsers(users);
  };

  const findCompanies = async (companyIDs: string[]) => {
    if (companyIDs.length === 0) return;

    const companyPromises = companyIDs.map(async (id) => {
      const data = await fetchCompany(id);
      return data;
    });

    const companies = await Promise.all(companyPromises);

    setCompanies(companies);
  };

  const user = useSession();
  const loggedUserUuid = user.data?.user.id as string;
  const userDetails = useGetUserQuery(loggedUserUuid);

  useEffect(() => {
    if (userDetails) {
      const { bookmarks } = userDetails.data.data[0];

      findListings(bookmarks.listings);
      findUsers(bookmarks.users);
      findCompanies(bookmarks.companies);

      setBookmarkData(bookmarks); // Update the bookmark data state
    }
  }, [userDetails, bookmarkData]); // Add bookmarkData as a dependency

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} display="flex" justifyContent="center">
          <Grid item xs={4} md={4}>
            <Button
              size="large"
              variant={selectedButton === 'LISTINGS' ? 'contained' : 'outlined'}
              onClick={() => handleButtonClick('LISTINGS')}
              fullWidth
            >
              LISTINGS
            </Button>
          </Grid>
          <Grid item xs={4} md={4}>
            <Button
              size="large"
              variant={selectedButton === 'USERS' ? 'contained' : 'outlined'}
              onClick={() => handleButtonClick('USERS')}
              fullWidth
            >
              USERS
            </Button>
          </Grid>
          <Grid item xs={4} md={4}>
            <Button
              size="large"
              variant={selectedButton === 'COMPANIES' ? 'contained' : 'outlined'}
              onClick={() => handleButtonClick('COMPANIES')}
              fullWidth
            >
              COMPANIES
            </Button>
          </Grid>
        </Grid>
        {selectedButton === 'LISTINGS' && <ListingBookmarks data={listings} />}
        {selectedButton === 'USERS' && <UserBookmarks data={users} />}
        {selectedButton === 'COMPANIES' && <CompanyBookmarks data={companies} />}
      </Grid>
    </Container>
  );
};

export default Bookmarks;

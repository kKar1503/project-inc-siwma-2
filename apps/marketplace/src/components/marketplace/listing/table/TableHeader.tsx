// ** React Imports
import React from 'react';

// ** Mui Imports
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// ** Hooks Imports
import { useTranslation } from 'react-i18next';

// ** Custom Components Import
import HeaderCell from './HeaderCell';

const TableHeader = () => {
  // ** Hooks
  const { t } = useTranslation();

  return (
    <TableHead>
      <TableRow>
        <HeaderCell sortByValue="name" sortable>{`${t('TableListingName')}`}</HeaderCell>
        <HeaderCell sortByValue="price" sortable>{`${t('TableListingPrice')}`}</HeaderCell>
        <HeaderCell sortByValue="quantity" sortable>{`${t('TableListingQuantity')}`}</HeaderCell>
        <HeaderCell>{`${t('TableListingType')}`}</HeaderCell>
        <HeaderCell sortByValue="createdAt" sortable>{`${t('TableListingPosted')}`}</HeaderCell>
        <HeaderCell>{`${t('TableActions')}`}</HeaderCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;

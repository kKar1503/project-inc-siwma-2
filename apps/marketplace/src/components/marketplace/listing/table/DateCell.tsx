// ** React Imports
import React from 'react';

// ** MUI Imports
import TableCell from '@mui/material/TableCell';

// ** DateTime Imports
import { DateTime } from 'luxon';

// ** i18n Imports
import { useTranslation } from 'react-i18next';

export interface DateCellProps {
  isoDateString: string;
}

const DateCell = (props: DateCellProps) => {
  // ** Props
  const { isoDateString } = props;

  // ** Hooks
  const { i18n } = useTranslation();

  // ** Vars
  const { language } = i18n;
  const locale = language === 'en' ? 'en-US' : 'zh-CN';
  const relativeDateString = DateTime.fromISO(isoDateString).toRelative({ locale });

  return (
    <TableCell align="center" sx={{ minWidth: 150, width: 150 }}>
      {relativeDateString}
    </TableCell>
  );
};

export default DateCell;

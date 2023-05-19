import { ReactNode } from 'react';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: ReactNode;
  dir?: string;
  index: number;
  value: number;
  height: string;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, height, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3, height: { height }, overflowY: 'auto' }}>{children}</Box>
      )}
    </div>
  );
};

export default TabPanel;

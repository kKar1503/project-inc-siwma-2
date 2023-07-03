import Paper from '@mui/material/Paper';
import { ReactNode } from 'react';

export type ModuleBaseProps = {
  children: ReactNode;
  noFlex?: boolean;
}

const ModuleBase = ({ children, noFlex }: ModuleBaseProps) => <Paper
  sx={{
    display: noFlex ? 'block' : 'flex',
    justifyContent: 'space-between',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#fff',
    borderRadius: '0.3em',
    px: '1rem',
    py: '0.5rem',
  }}
>
  {children}
</Paper>;

export default ModuleBase;

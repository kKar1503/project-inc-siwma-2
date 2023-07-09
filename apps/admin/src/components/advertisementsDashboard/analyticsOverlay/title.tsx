import Box from '@mui/material/Box';

export interface TitleProps {
  title: string;
  subtitle?: string;
}

const Title = ({ title, subtitle }: TitleProps) =>
  <Box style={{position:'absolute'}}>
    <Box sx={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Box>
    <Box sx={{ fontSize: 14, color: 'text.secondary' }}>{subtitle}</Box>
  </Box>;

export default Title;

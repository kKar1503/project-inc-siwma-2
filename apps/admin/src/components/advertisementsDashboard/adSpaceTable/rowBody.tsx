import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { Advertisment } from '@/utils/api/client/zod/advertisements';

interface Props {
  row: Advertisment & { companyName: string };
  index: number;
  isSelected: boolean;
  onSelect: (element: Advertisment) => void;
  onViewImage: (src: string | null) => void;
}

const ExternalLink = ({ link, display, displayInvalid }: {
  link: string | null;
  display: string,
  displayInvalid?: string,
}) => link ? (
  <Button onClick={() => window.open(link, '_blank')}>{display}</Button>
) : (
  <Button disabled>{displayInvalid}</Button>
);
const ExternalImage = ({ src, onViewImage, display, displayInvalid }: {
  src: string | null;
  display: string,
  displayInvalid?: string,
  onViewImage: (src: string | null) => void;
}) => src && src !== '' ? (
  <Button onClick={() => onViewImage(src)}>{display}</Button>
) : (
  <Button disabled>{displayInvalid}</Button>
);

const parseDate = (date: string | undefined) => {
  if (!date) return 'unknown';
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString();
};

const RowBody = ({
                   row,
                   index,
                   isSelected,
                   onSelect,
                   onViewImage,
                 }: Props) => {

  const labelId = `enhanced-table-checkbox-${index}`;


  const linkDisplay = row.link?.toLowerCase()
    .replace(`https://`, '')
    .replace(`http://`, '')
    .replace(`www.`, '')
    .replace(/\/$/, '');
  const linkDisplayLength = 20;
  const linkPreview = linkDisplay.length > linkDisplayLength ? `${linkDisplay.substring(0, linkDisplayLength - 3)}...` : linkDisplay;

  const descriptionDisplayLength = 150;
  const descriptionPreview = row.description.length > descriptionDisplayLength ? `${row.description.substring(0, descriptionDisplayLength - 3)}...` : row.description;

  return (
    <TableRow
      hover
      role='checkbox'
      aria-checked={isSelected}
      tabIndex={-1}
      key={row.id}
      selected={isSelected}
      sx={{ cursor: 'pointer' }}
    >
      <TableCell onClick={() => onSelect(row)} padding='checkbox'>
        <Checkbox
          color='primary'
          checked={isSelected}
          inputProps={{
            'aria-labelledby': labelId,
          }}
        />
      </TableCell>
      <TableCell align='left'>{row.companyName}</TableCell>
      <TableCell align='left'><ExternalImage src={row.image} display='View Image' onViewImage={onViewImage}
                                             displayInvalid='No Image' /></TableCell>
      <TableCell align='left'>{descriptionPreview}</TableCell>
      <TableCell align='left'><ExternalLink link={row.link} display={linkPreview}
                                            displayInvalid='No Link' /></TableCell>
      <TableCell align='left'>{row.active ? 'YES' : 'NO'}</TableCell>
      <TableCell align='left'>{parseDate(row.createdAt)}</TableCell>
      <TableCell align='left'>{parseDate(row.startDate)}</TableCell>
      <TableCell align='left'>{parseDate(row.endDate)}</TableCell>
    </TableRow>
  );
};

export default RowBody;

import React from 'react';
import Box from '@mui/material/Box';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useRouter } from 'next/router';

export type MoreProfileIconProps = {
  productId: string;
};

const MoreProfileIcon = ({ productId }: MoreProfileIconProps) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = anchorEl !== null;
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    // stops click from propogating through to Link tag
    event.preventDefault();
    // anchors menu to where "More" VertIcon was clicked
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    // send user to page to edit listing
    router.push(`${productId}/edit-listing`);
    setAnchorEl(null);
  };

  const handleArchiveClick = () => {
    // set listing to archived state endpoint
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    // delete listing endpoint
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton onClick={handleClick} size="small">
        <MoreVertIcon sx={({ palette }) => ({ color: palette.common.black })} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* change handle close functions to handleEdit, handleArchive, handleDelete with relevant APIs */}
        <MenuItem onClick={handleEditClick}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit Listing
        </MenuItem>
        <MenuItem onClick={handleArchiveClick}>
          <ListItemIcon>
            <ArchiveIcon fontSize="small" />
          </ListItemIcon>
          Archive Listing
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete Listing
        </MenuItem>
      </Menu>
    </Box>
  );
};
export default MoreProfileIcon;
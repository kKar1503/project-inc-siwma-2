import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import MoreIcon from '@mui/icons-material/MoreVert';
import ReportModal from '../modal/ReportModal';
import DeleteChat from '../modal/DeleteChat';

export type ChatHeaderProps = {
  profilePic: string;
  companyName: string;
  available: boolean;
};

const ChatHeader = ({ profilePic, companyName, available }: ChatHeaderProps) => {
  const [openMenu, setOpenMenu] = useState<null | HTMLElement>(null);
  const [openReport, setOpenReport] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectInput, setSelectInput] = useState<string>('');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenMenu(event.currentTarget);
  };

  const handleClose = () => {
    setOpenMenu(null);
  };

  return (
    <Box
      sx={({ spacing, palette }) => ({
        borderBottom: 1,
        padding: spacing(2),
        borderColor: palette.grey[300],
        display: 'flex',
        mx: spacing(2),
      })}
    >
      <IconButton
        sx={({ spacing }) => ({
          p: spacing(0),
        })}
      >
        <Avatar alt="company profile picture" src={profilePic} />
      </IconButton>
      <Typography
        sx={({ spacing, typography }) => ({
          fontSize: typography.h4,
          marginLeft: spacing(4),
          flexGrow: 1,
        })}
      >
        {companyName}
      </Typography>
      <Button
        sx={({ palette, spacing, typography }) => ({
          fontSize: typography.subtitle1,
          bgcolor: available ? palette.info.main : palette.success.main,
          color: palette.common.white,
          px: available ? spacing(3) : spacing(4),
        })}
        disabled
      >
        {available ? 'Available' : 'Sold'}
      </Button>
      <IconButton
        aria-label="display more actions"
        edge="end"
        color="inherit"
        onClick={handleClick}
      >
        <MoreIcon />
      </IconButton>
      <Menu anchorEl={openMenu} open={Boolean(openMenu)} onClose={handleClose}>
        <MenuItem
          onClick={() => setOpenDelete(true)}
          sx={({ typography }) => ({ fontSize: typography.subtitle1 })}
        >
          Delete Chat
        </MenuItem>
        <DeleteChat open={openDelete} setOpen={setOpenDelete} />
        <Divider sx={({ spacing }) => ({ mx: spacing(1) })} />
        <MenuItem
          onClick={() => setOpenReport(true)}
          sx={({ typography }) => ({ fontSize: typography.subtitle1 })}
        >
          Report User
        </MenuItem>
        <ReportModal open={openReport} setOpen={setOpenReport} />
      </Menu>
    </Box>
  );
};

export default ChatHeader;

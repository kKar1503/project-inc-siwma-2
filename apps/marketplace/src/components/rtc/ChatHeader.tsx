import React from 'react';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import MoreIcon from '@mui/icons-material/MoreVert';

export type ChatHeaderProps = {
  profilePic: string;
  companyName: string;
  progressStatus: 'In Progress' | 'Sold';
};

const ChatHeader = ({ profilePic, companyName, progressStatus }: ChatHeaderProps) => {
  const [openMenu, setOpenMenu] = React.useState<null | HTMLElement>(null);

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
          mx: spacing(2)
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
          sx={({ spacing }) => ({
            fontSize: 'h5',
            marginLeft: spacing(4),
            flexGrow: 1,
            fontWeight: 'bold',
          })}
        >
          {companyName}
        </Typography>
        <Button
          sx={({ palette, spacing }) => ({
            fontSize: 'h6',
            bgcolor: progressStatus === 'In Progress' ? palette.info.main : palette.success.main,
            color: palette.common.white,
            px: progressStatus === 'In Progress' ? spacing(2) : spacing(4),
          })}
          disabled
        >
          {progressStatus}
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
          <MenuItem onClick={handleClose} sx={{ fontSize: 'h5' }}>
            Delete Chat
          </MenuItem>
          <Divider sx={({ spacing }) => ({ mx: spacing(1) })} />
          <MenuItem onClick={handleClose} sx={{ fontSize: 'h5' }}>
            Report User
          </MenuItem>
        </Menu>
      </Box>
  );
};

export default ChatHeader;

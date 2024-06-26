import React, { useEffect, useMemo, useState } from 'react';
import { useResponsiveness } from '@inc/ui';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
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
  username: string;
  handleBack: () => void;
};

const ChatHeader = ({ profilePic, username, handleBack }: ChatHeaderProps) => {
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const { spacing, palette, typography } = useTheme();
  const { t } = useTranslation();
  const [openMenu, setOpenMenu] = useState<null | HTMLElement>(null);
  const [openReport, setOpenReport] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const chatHeaderStyles = useMemo(() => {
    if (isSm) {
      return {
        basePadding: {
          borderBottom: 1,
          padding: spacing(2),
          borderColor: palette.grey[300],
          backgroundColor: palette.common.white,
          display: 'flex',
          alignItems: 'center',
          mx: spacing(0),
        },
        companyName: {
          fontSize: '1rem',
          fontWeight: 500,
          marginLeft: spacing(1),
          flexGrow: 1,
        },
        profilePic: {
          width: 28,
          height: 28,
        },
        backButton: {
          color: palette.common.black,
        },
      };
    }
    if (isMd) {
      return {
        basePadding: {
          borderBottom: 1,
          padding: spacing(2),
          borderColor: palette.grey[300],
          backgroundColor: palette.common.white,
          display: 'flex',
          alignItems: 'center',
          // mx: spacing(2),
        },
        companyName: {
          fontSize: typography.h6,
          marginLeft: spacing(2),
          flexGrow: 1,
        },
        profilePic: {
          width: 40,
          height: 40,
        },
        backButton: {
          color: palette.common.black,
          display: 'none',
        },
      };
    }
    if (isLg) {
      return {
        basePadding: {
          borderBottom: 1,
          padding: spacing(2),
          borderColor: palette.grey[300],
          backgroundColor: palette.common.white,
          display: 'flex',
          alignItems: 'center',
          // mx: spacing(2),
        },
        companyName: {
          fontSize: typography.h6,
          marginLeft: spacing(2),
          flexGrow: 1,
        },
        profilePic: {
          width: 50,
          height: 50,
        },
        backButton: {
          color: palette.common.black,
          display: 'none',
        },
      };
    }
    return {
      basePadding: {
        borderBottom: 1,
        padding: spacing(2),
        borderColor: palette.grey[300],
        backgroundColor: palette.common.white,
        display: 'flex',
        alignItems: 'center',
        mx: spacing(2),
      },
      companyName: {
        fontSize: typography.h4,
        marginLeft: spacing(4),
        flexGrow: 1,
      },
      profilePic: {
        width: 50,
        height: 50,
      },
    };
  }, [isSm, isMd, isLg]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenMenu(event.currentTarget);
  };

  const handleClose = () => {
    setOpenMenu(null);
  };

  useEffect(() => {
    if (!openReport) {
      setOpenMenu(null);
    }
  }, [openReport]);

  return (
    <Box sx={chatHeaderStyles?.basePadding}>
      <IconButton
        sx={({ spacing }) => ({
          p: spacing(0),
        })}
      >
        <ArrowBackIosIcon sx={chatHeaderStyles?.backButton} onClick={handleBack} />
        {!isSm && <Avatar alt="User profile picture" src={profilePic} />}
      </IconButton>
      <Typography sx={chatHeaderStyles?.companyName}>{username}</Typography>
      <IconButton
        aria-label={t('display more actions').toString()}
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
          {t('Delete Chat')}
        </MenuItem>
        <DeleteChat open={openDelete} setOpen={setOpenDelete} />
        <Divider sx={({ spacing }) => ({ mx: spacing(1) })} />
        <MenuItem
          onClick={() => setOpenReport(true)}
          sx={({ typography }) => ({ fontSize: typography.subtitle1 })}
        >
          {t('Report User')}
        </MenuItem>
        <ReportModal open={openReport} setOpen={setOpenReport} />
      </Menu>
    </Box>
  );
};

export default ChatHeader;

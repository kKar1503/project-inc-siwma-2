import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

export type ChatHeaderProps = {
  profilePic: string;
  itemName: string;
  itemPrice: number;
  progressStatus: 'In Progress' | 'Sold';
  makeOffer: boolean;
  setMakeOffer: (val: boolean) => void;
};

const ChatSubHeader = ({
  profilePic,
  itemName,
  itemPrice,
  progressStatus,
  makeOffer,
  setMakeOffer,
}: ChatHeaderProps) => {
  const handleMakeOffer = () => {
    setMakeOffer(true);
  };
  return (
    <Box
      sx={({ spacing, palette }) => ({
        borderBottom: 1,
        padding: spacing(2),
        borderColor: palette.grey[300],
        display: 'flex',
        marginLeft: spacing(1)
      })}
    >
      <IconButton
        sx={({ spacing }) => ({
          p: spacing(0),
        })}
      >
        <Box
          sx={({ shadows }) => ({
            position: 'relative',
            display: 'inline-block',
            boxShadow: shadows[2],
          })}
        >
          <Avatar
            alt="company profile picture"
            src={profilePic}
            variant="square"
            sx={{
              width: 70,
              height: 70,
              borderRadius: 2,
            }}
          />
          <Typography
            variant="subtitle1"
            sx={({ spacing }) => ({
              position: 'absolute',
              bottom: spacing(0),
              width: '100%',
              textAlign: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              color: 'white',
              padding: '2px',
              borderRadius: 2,
            })}
          >
            Reserved
          </Typography>
        </Box>
      </IconButton>
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          sx={({ spacing }) => ({
            fontSize: 'h5',
            marginLeft: spacing(4),
          })}
        >
          {itemName}
        </Typography>
        <Typography
          sx={({ spacing }) => ({
            fontSize: 'h5',
            marginLeft: spacing(4),
            fontWeight: 'bold',
          })}
        >
          ${itemPrice.toFixed(2)}
        </Typography>
      </Box>

      <Button
        onClick={handleMakeOffer}
        sx={({ palette, spacing }) => ({
          fontSize: 'h6',
          bgcolor: palette.primary.main,
          color: palette.common.white,
          px: spacing(2),
          pt: 0,
          marginRight: spacing(4),
          my: spacing(1),
        })}
      >
        Make Offer
      </Button>
    </Box>
  );
};

export default ChatSubHeader;

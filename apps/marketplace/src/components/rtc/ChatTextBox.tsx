import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export type ChatTextBoxProps = {
  selectedFile: File | null;
  setSelectedFile: (val: File | null) => void;
  inputText: string;
  setInputText: (val: string) => void;
  onClickSend: React.MouseEventHandler<HTMLButtonElement>;
};

const ChatTextBox = ({
  selectedFile,
  setSelectedFile,
  inputText,
  setInputText,
  onClickSend,
}: ChatTextBoxProps) => {
  const { t } = useTranslation();
  const [fileName, setFileName] = useState<string>('');
  const [uploadType, setUploadType] = useState<string>('');
  const imageFileRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileObj = event.target.files[0];
      if (!fileObj) {
        return;
      }
      setSelectedFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileObj = event.target.files[0];
      if (!fileObj) {
        return;
      }
      setSelectedFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
    }
  };

  const handleFileClick = () => {
    if (fileRef.current) {
      fileRef.current?.click();
    }
  };

  const handleImageClick = () => {
    if (imageFileRef.current) {
      imageFileRef.current?.click();
    }
  };

  const handleDelete = () => {
    setSelectedFile(null);
    setFileName('');
  };

  return (
    <Box
      id="chat-text-box"
      sx={({ spacing, palette }) => ({
        display: 'flex',
        alignItems: 'center',
        bgcolor: palette.grey[300],
        px: spacing(2),
      })}
    >
      <IconButton
        component="label"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <AttachFileIcon sx={{ fontSize: 40 }} />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={handleImageClick} disabled={fileName !== ''}>
          <ImageOutlinedIcon sx={({ spacing }) => ({ mr: spacing(2) })} />
          {t('Image')}
          <input
            hidden
            ref={imageFileRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
          />
        </MenuItem>
        <MenuItem onClick={handleFileClick} disabled={fileName !== ''}>
          <InsertDriveFileOutlinedIcon sx={({ spacing }) => ({ mr: spacing(2) })} />
          File
          <input hidden ref={fileRef} type="file" onChange={handleFileSelect} />
        </MenuItem>
      </Menu>
      {fileName !== '' && (
        <Box sx={{ width: 1 }}>
          <Chip
            label={fileName}
            onDelete={handleDelete}
            deleteIcon={
              <CancelOutlinedIcon
                sx={({ palette }) => ({
                  // backgroundColor: palette.common.white,
                  // color: palette.common.white,
                  fill: palette.common.white,
                })}
              />
            }
            sx={({ palette, typography }) => ({
              backgroundColor: palette.primary[100],
              color: palette.common.white,
              fontSize: 'body1',
            })}
          />
        </Box>
      )}
      {fileName === '' && (
        <InputBase
          placeholder={t(`Type your message here`).toString()}
          value={inputText}
          fullWidth
          sx={({ spacing, typography }) => ({
            fontSize: typography.body1,
            py: spacing(1),
            // TODO: Need to add a fix to the above div getting pushed up when the height here is increased
            // maxHeight: '150px',
            height: '56px',
            overflow: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: 'transparent transparent',
          })}
          onChange={(e) => setInputText(e.target.value)}
          multiline
        />
      )}

      <IconButton onClick={onClickSend}>
        <SendIcon sx={{ fontSize: 40 }} />
      </IconButton>
    </Box>
  );
};

export default ChatTextBox;

import React from 'react';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';

export type ChatTextBoxProps = {
  selectedFile: File | null;
  setSelectedFile: (val: File | null) => void;
  inputText: string;
  setInputText: (val: string) => void;
  onSend: boolean;
  setOnSend: (val: boolean) => void;
};

const ChatTextBox = ({
  selectedFile,
  setSelectedFile,
  inputText,
  setInputText,
  onSend,
  setOnSend,
}: ChatTextBoxProps) => {

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <Box
      sx={({ spacing, palette }) => ({
        display: 'flex',
        alignItems: 'center',
        bgcolor: palette.grey[300],
        px: spacing(2),
      })}
    >
      <IconButton component="label">
        <AttachFileIcon sx={{ fontSize: 40 }} />
        <input hidden type="file" onChange={handleFileSelect} />
      </IconButton>

      <InputBase
        placeholder="Type your message here"
        fullWidth
        sx={({ spacing, typography }) => ({
          fontSize: typography.body1,
          py: spacing(1),
          maxHeight: '150px',
          overflow: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: 'transparent transparent',
        })}
        onChange={(e) => setInputText(e.target.value)}
        multiline
      />
      <IconButton onClick={() => setOnSend(true)}>
        <SendIcon sx={{ fontSize: 40 }} />
      </IconButton>
    </Box>
  );
};

export default ChatTextBox;

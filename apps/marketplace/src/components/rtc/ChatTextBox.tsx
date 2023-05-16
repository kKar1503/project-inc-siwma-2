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
  const imageMimeType = /image\/(png|jpg|jpeg)/i;

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const imageFile = event.target.files[0];
      if (!imageFile.type.match(imageMimeType)) {
        // will change to notification when notification component is added 
        alert('Only Image file is allowed');
        return;
      }
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <Box
      sx={({ spacing, palette }) => ({
        display: 'flex',
        alignItems: 'center',
        height: 80,
        bgcolor: palette.grey[300],
        borderRadius: '0 0 20px 20px',
        px: spacing(2),
      })}
    >
      <IconButton component="label">
        <AttachFileIcon sx={{ fontSize: 45 }} />
        <input hidden accept="image/*" multiple type="file" onChange={handleFileSelect} />
      </IconButton>

      <InputBase
        placeholder="Type your message here"
        fullWidth
        sx={{ fontSize: 'h6' }}
        onChange={(e) => setInputText(e.target.value)}
      />
      <IconButton onClick={() => setOnSend(true)}>
        <SendIcon sx={{ fontSize: 45 }} />
      </IconButton>
    </Box>
  );
};

export default ChatTextBox;

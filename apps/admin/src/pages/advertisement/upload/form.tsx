import React from 'react';
import { Box, TextField, Button } from '@mui/material';

const form = () => {
    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
        >
            <Box sx={{ display: 'flex', width: '100%' }}>
                <TextField
                    label="Company to tag"
                    variant="outlined"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'black' },
                            '&.Mui-focused fieldset': { borderColor: 'black' },
                        },
                        '& .MuiInputBase-input': { color: 'black' },
                        backgroundColor: 'lightgray',
                        mr: 1,
                        width: '50%',
                    }}
                />
                <TextField
                    label="Company link"
                    variant="outlined"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'black' },
                            '&.Mui-focused fieldset': { borderColor: 'black' },
                        },
                        '& .MuiInputBase-input': { color: 'black' },
                        backgroundColor: 'lightgray',
                        width: '50%',
                    }}
                />
            </Box>
            <Box sx={{ width: '100%' }}>
                <TextField
                    label="Advertisement title"
                    variant="outlined"
                    fullWidth
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'black' },
                            '&.Mui-focused fieldset': { borderColor: 'black' },
                        },
                        '& .MuiInputBase-input': { color: 'black' },
                        backgroundColor: 'lightgray',
                    }}
                />
            </Box>
            <TextField
                label="Advertisement description"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'black' },
                        '&.Mui-focused fieldset': { borderColor: 'black' },
                    },
                    '& .MuiInputBase-input': { color: 'black' },
                    backgroundColor: 'lightgray',
                }}
            />
            <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: 'blue', color: 'white', mt: 2 }}
            >
                Submit
            </Button>
        </Box>
    );
};

export default form;

import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const CreateEditForm = () => {
    const fields = [
        { label: 'Parameter Name' },
        { label: 'Display Name' },
        { label: 'Parameter Type' },
        { label: 'Data Type' },
    ];

    return (
        <Box sx={{ width: 1504, height: 770 }}>
            <Box
                sx={{
                    width: 1491,
                    height: 770,
                    p: '6px 14px 14px 8px',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bgcolor: 'white',
                    boxShadow: 1,
                    borderRadius: 1,
                }}
            >
                <Box sx={{ width: 430, mb: 2 }}>
                    <Typography variant="h5">Create Parameter</Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Enter values to create a new Parameter
                    </Typography>
                    <Box sx={{ width: '100%', height: '1px', bgcolor: 'lightgray' }} />
                </Box>

                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {fields.map((field) => (
                        <>
                            <Typography variant="body1" sx={{ width: '100%', height: 'auto', mb: 1 }}>
                                {field.label}
                            </Typography>
                            <TextField
                                variant="outlined"
                                sx={{ width: '100%', height: 59, bgcolor: 'lightgray' }}
                            />
                        </>
                    ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button variant="contained" color="primary" sx={{ fontSize: '1.2rem', px: 3 }}>
                        CONFIRM
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default CreateEditForm;

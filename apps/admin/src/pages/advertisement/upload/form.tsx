import { useState, useMemo } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { useTheme } from '@mui/material/styles';

const Form = () => {
    const theme = useTheme();
    const { spacing } = theme;
    const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);


    const gridCols = useMemo(() => {
        if (isSm) {
            return {
                py: spacing(3),
                px: '20px',
                height: '100%;',
                width: '100%',
                justifyContent: 'center',
            };
        }
        if (isMd) {
            return {
                py: spacing(3),
                px: '40px',
                height: '100%;',
                width: '100%',
                justifyContent: 'center',
            };
        }
        if (isLg) {
            return {
                py: spacing(3),
                px: '60px',
                height: '100%;',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
            };
        }
        return {
            py: spacing(3),
            px: '20px',
            height: '100%;',
            width: '100%',
        };
    }, [isSm, isMd, isLg]);

    return (
        <Grid sx={gridCols}>
            <Box
                component="form"
                sx={() => ({
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                })}
            >
                <Box
                    sx={() => ({
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                    })}
                >
                    <TextField
                        label="Company to tag"
                        variant="outlined"
                        sx={({ spacing, palette }) => ({
                            mr: spacing(2),
                            bgcolor: palette.grey[400],
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: palette.grey[800] },
                                '&.Mui-focused fieldset': { borderColor: palette.grey[800] },
                            },
                            '& .MuiInputBase-input': { color: palette.grey[800] },
                            width: '100%',
                        })}
                    />

                    <TextField
                        label="Company link"
                        variant="outlined"
                        sx={({ palette }) => ({
                            bgcolor: palette.grey[400],
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: palette.grey[800] },
                                '&.Mui-focused fieldset': { borderColor: palette.grey[800] },
                            },
                            '& .MuiInputBase-input': { color: palette.grey[800] },
                        })}
                    />
                </Box>

                <TextField
                    label="Advertisement title"
                    variant="outlined"
                    fullWidth
                    sx={({ spacing, palette }) => ({
                        mt: spacing(2),
                        bgcolor: palette.grey[400],
                        width: '100%',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: palette.grey[800] },
                            '&.Mui-focused fieldset': { borderColor: palette.grey[800] },
                        },
                        '& .MuiInputBase-input': { color: palette.grey[800] },
                    })}
                />

                <TextField
                    label="Advertisement description"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    sx={({ spacing, palette }) => ({
                        mt: spacing(2),
                        bgcolor: palette.grey[400],
                        width: '100%',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: palette.grey[800] },
                            '&.Mui-focused fieldset': { borderColor: palette.grey[800] },
                        },
                        '& .MuiInputBase-input': { color: palette.grey[800] },
                    })}
                />
                <Box
                    sx={({ spacing }) => ({
                        width: '100%',
                        mt: spacing(2),
                        display: 'flex',
                        justifyContent: 'flex-end',
                    })}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        sx={({ spacing }) => ({
                            width: '10%',
                            mt: spacing(1),
                            mb: spacing(1),
                        })}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Grid>
    );
};

export default Form
import React, { useMemo } from 'react';
import SelectedListings from './SelectedListings';
import CompareDifferences from './CompareDifferences';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { useTheme } from '@mui/material';

const data = [
    {
        listingName: 'John Doe',
        price: 25,
        quantity: 'Male',
        nego: 'yes',
        type: 'buy',
        created: '3 days',
        isBookmarked: true,
    },
    {
        listingName: 'John Doe',
        price: 25,
        quantity: 'Male',
        nego: 'yes',
        type: 'buy',
        created: '3 days',
        isBookmarked: false,
    },
];

const Compare = () => {
    const theme = useTheme();
    const { spacing } = theme;
    const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
    const tableStyle = useMemo(() => {
        if (isSm) {
            return {
                py: spacing(3),
                px: '20px',
            };
        }
        if (isMd) {
            return {
                py: spacing(3),
                px: '40px',
            };
        }
        if (isLg) {
            return {
                py: spacing(3),
                px: '60px',
            };
        }
        return {
            py: spacing(3),
            px: '20px',
        };
    }, [isSm, isMd, isLg]);

    return (
        <Container>
            <Typography
                sx={({ spacing, typography }) => ({
                    py: spacing(3),
                    fontSize: typography.h5,
                    fontWeight: 'bold',
                })}
            >
                Selected Listings
            </Typography>
            <SelectedListings data={data} />

            <Box
                sx={({ spacing }) => ({
                    mb: spacing(2),
                })}
            >
                <Typography
                    sx={({ spacing, typography }) => ({
                        py: spacing(3),
                        fontSize: typography.h5,
                        fontWeight: 'bold',
                    })}
                >
                    Compare Differences
                </Typography>
                <CompareDifferences />
            </Box>
        </Container>
    );
};

export default Compare;

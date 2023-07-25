import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CompareDifferences from './CompareDifferences';
import useResponsiveness from '@inc/ui/lib/hook/useResponsiveness';
import { useTheme } from '@mui/material';

type CompareDifferencesProps = {
  productIds: string[];
};

const Compare = ({ productIds }: CompareDifferencesProps) => {
    const validProductIds = productIds || [];
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
                <CompareDifferences productIds={validProductIds}  />
            </Box>
        </Container>
    );
};

export default Compare;

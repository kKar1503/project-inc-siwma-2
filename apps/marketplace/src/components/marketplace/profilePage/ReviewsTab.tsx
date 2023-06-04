import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { SelectComponent, StarsRating, useResponsiveness } from '@inc/ui';
import { useTheme } from '@mui/material';
import { useMemo } from 'react';
import ReviewMessage, { ReviewProps } from './ReviewMessage';
import FilterChips from './FilterChips';

// pass filter values to select component
const sortValues = ['Newest', 'Oldest', 'Highest Rating', 'Lowest Rating'];

export type ReviewsTabProps = {
  allReviews: ReviewProps[];
  userRating: number;
  totalReviews: number;
  filterReviews: (newData: string) => void;
  sortByReviews: (newData: string) => void;
};

const ReviewsTab = ({
  allReviews,
  userRating,
  totalReviews,
  filterReviews,
  sortByReviews,
}: ReviewsTabProps) => {
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const { spacing } = useTheme();

  const stylesReview = useMemo(() => {
    if (isSm) {
      return {
        mb: spacing(2),
        alignItems: 'center',
      };
    }
    if (isMd || isLg) {
      return {
        display: 'flex',
        height: '20%',
        mb: spacing(3),
        alignItems: 'center',
      };
    }
    return {
      mb: spacing(2),
      alignItems: 'center',
    };
  }, [isSm, isMd, isLg]);

  return (
    <Box sx={{ height: '100vh' }}>
      {/* top portion */}
      <Box sx={stylesReview}>
        {/* left box of rating and total reviews */}
        <Box
          sx={({ spacing }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            ...(isSm ? { pl: spacing(0) } : { pl: spacing(2) }),
          })}
        >
          <Typography
            sx={({ typography }) => ({
              fontSize: typography.h1,
            })}
          >
            {userRating}
          </Typography>
          <StarsRating rating={userRating} />
          <Typography
            sx={({ typography }) => ({
              fontSize: typography.subtitle1,
            })}
          >
            ({totalReviews} {totalReviews === 1 ? ' Review' : ' Reviews'})
          </Typography>
        </Box>
        {isSm ? (
          <Divider sx={{ height: '10%', my: spacing(2) }} />
        ) : (
          <Divider
            orientation="vertical"
            sx={({ spacing }) => ({ height: '100%', mt: spacing(2), ml: 2 })}
          />
        )}
        {/* right box with filter chips */}
        <Box sx={({ spacing }) => ({ pl: spacing(3), display: 'flex', flexDirection: 'column' })}>
          <Typography
            sx={({ typography, spacing }) => ({ fontSize: typography.body1, mb: spacing(1) })}
          >
            Filter Reviews:
          </Typography>
          {/* filter chips */}
          <FilterChips onData={filterReviews} />
        </Box>
        {/* Select Components */}
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
          <Typography
            sx={({ typography, spacing }) => ({ pl: spacing(3), fontSize: typography.body1 })}
          >
            Sort By:
          </Typography>
          <SelectComponent onData={sortByReviews} values={sortValues} />
        </Box>
      </Box>
      {/* horizontal divider */}
      <Divider />
      {/* lower portion showing marketplace cards */}
      <Box>
        {allReviews.map((review) => (
          <ReviewMessage data={review} />
        ))}
      </Box>
    </Box>
  );
};

export default ReviewsTab;

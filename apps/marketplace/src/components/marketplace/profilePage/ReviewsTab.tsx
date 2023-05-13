import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { SelectComponent, StarsRating } from '@inc/ui';
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
}: ReviewsTabProps) => (
  <Box sx={{ height: '100vh' }}>
    {/* top portion */}
    <Box
      sx={({ spacing }) => ({
        display: 'flex',
        height: '15%',
        mb: spacing(3),
        alignItems: 'center',
      })}
    >
      {/* left box of rating and total reviews */}
      <Box
        sx={({ spacing }) => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pl: spacing(1),
          pr: spacing(3),
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
          ({totalReviews} Reviews)
        </Typography>
      </Box>
      {/* vertial divider */}
      <Divider orientation="vertical" sx={({ spacing }) => ({ height: '100%', mt: spacing(2) })} />
      {/* right box with filter chips */}
      <Box sx={({ spacing }) => ({ pl: spacing(3), display: 'flex', flexDirection: 'column' })}>
        <Typography
          sx={({ typography, spacing }) => ({ fontSize: typography.body1, mb: spacing(1) })}
        >
          Filter reviews:
        </Typography>
        {/* filter chips */}
        <FilterChips onData={filterReviews} />
      </Box>
      {/* Select Components */}
      <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
        <Typography sx={({ spacing }) => ({ mr: spacing(1), fontSize: '12px' })}>
          Sort By:
        </Typography>
        <SelectComponent onData={sortByReviews} values={sortValues} />
      </Box>
    </Box>
    {/* horizontal divider */}
    <Divider />
    {/* lower portion showing marketplace cards */}
    <Box>
      {allReviews.map(
        ({
          ownerId,
          noOfReviews,
          createdAt,
          profilePic,
          rating,
          username,
          companyName,
          body,
          buyer,
        }) => (
          <ReviewMessage
            ownerId={ownerId}
            noOfReviews={noOfReviews}
            createdAt={createdAt}
            profilePic={profilePic}
            rating={rating}
            username={username}
            companyName={companyName}
            body={body}
            buyer={buyer}
          />
        )
      )}
    </Box>
  </Box>
);

export default ReviewsTab;

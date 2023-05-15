import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem'; 

export type FilterProps = {
  filter: string;
  setFilter: (val: string) => void;
  sort: string;
  setSort: (val: string) => void;
};

const ProfilePageFilter = ({ filter, setFilter, sort, setSort }: FilterProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
    setSort(event.target.value as string);
  };
  return (
    <Box
      display="flex"
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <>
        {/* Here goes the Searchbar */}

        <Typography
          noWrap
          sx={({ spacing, typography }) => ({
            ml: spacing(1),
            mt: spacing(1),
            fontSize: typography.caption,
          })}
        >
          Filter:
        </Typography>
        <Select
          onChange={handleChange}
          sx={({ spacing, typography }) => ({
            ml: spacing(1),
            mt: spacing(1),
            height: spacing(3),
            fontSize: typography.caption,
            width: 'fill',
          })}
        >
          <MenuItem
            value="All Listings"
            sx={({ typography }) => ({
              fontSize: typography.caption,
            })}
          >
            All Listings
          </MenuItem>
          <MenuItem
            value="Buying"
            sx={({ typography }) => ({
              fontSize: typography.caption,
            })}
          >
            Buying
          </MenuItem>
          <MenuItem
            value="Selling"
            sx={({ typography }) => ({
              fontSize: typography.caption,
            })}
          >
            Selling
          </MenuItem>
        </Select>
        <Typography
          noWrap
          sx={({ spacing, typography }) => ({
            ml: spacing(1),
            mt: spacing(1),
            fontSize: typography.caption,
          })}
        >
          Sort:
        </Typography>
        <Select
          onChange={handleChange}
          sx={({ spacing, typography }) => ({
            ml: spacing(1),
            mt: spacing(1),
            width: 'fill',
            height: spacing(3),
            fontSize: typography.caption,
          })}
        >
          <MenuItem
            value="Newest"
            sx={({ typography }) => ({
              fontSize: typography.caption,
            })}
          >
            Newest
          </MenuItem>
          <MenuItem
            value="Oldest"
            sx={({ typography }) => ({
              fontSize: typography.caption,
            })}
          >
            Oldest
          </MenuItem>
        </Select>
      </>
    </Box>
  );
};

export default ProfilePageFilter;

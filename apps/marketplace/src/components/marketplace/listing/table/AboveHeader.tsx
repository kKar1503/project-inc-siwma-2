// ** React Imports
import React from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import CompareIcon from '@mui/icons-material/Compare';
import ClearIcon from '@mui/icons-material/Clear';

// ** Stores Imports
import { useTableSelection } from '@/stores/table';

// ** AboveHeader Props Types
export interface AboveHeaderProps {
  header: string;
}

const AboveHeader = (props: AboveHeaderProps) => {
  // ** Props
  const { header } = props;

  // ** Stores
  const [selections, selectionActions] = useTableSelection();

  // ** Vars
  const hasSelections = selections.length !== 0;

  return (
    <Toolbar
      sx={{
        px: { sm: 3 },
        py: 2,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 100%' }}>
        <Typography variant="h4" id="listing-table-header" component="h1">
          {header}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 1,
            visibility: hasSelections ? 'visible' : 'hidden',
          }}
          id="search-count"
          component="span"
        >
          {`${selections.length} listings selected`}
        </Typography>
      </Box>
      <Tooltip title="Share">
        <IconButton sx={{ ml: 1 }} disabled={!hasSelections}>
          <ShareIcon fontSize="medium" color={hasSelections ? 'primary' : 'disabled'} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Download">
        <IconButton sx={{ ml: 1 }} disabled={!hasSelections}>
          <DownloadIcon fontSize="medium" color={hasSelections ? 'primary' : 'disabled'} />
        </IconButton>
      </Tooltip>
      <Tooltip
        title={
          !hasSelections || selections.length > 3
            ? 'Cannot compare more than 3 listings'
            : 'Compare'
        }
      >
        <span>
          <IconButton sx={{ ml: 1 }} disabled={!hasSelections || selections.length > 3}>
            <CompareIcon
              fontSize="medium"
              color={!hasSelections || selections.length > 3 ? 'disabled' : 'primary'}
            />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Clear Selections">
        <IconButton
          sx={{ ml: 1 }}
          disabled={!hasSelections}
          onClick={() => selectionActions.clearSelected()}
        >
          <ClearIcon fontSize="medium" color={hasSelections ? 'primary' : 'disabled'} />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default AboveHeader;

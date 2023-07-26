// ** React Imports
import React, { useEffect } from 'react';

// ** NextJs Imports
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

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

// ** Hooks Imports
import useShareListings from '@/services/listings/useShareListings';

// ** Types Imports
import type { Listing } from '@/utils/api/server/zod/listingTable';

// ** Stores Imports
import { useTableSelection } from '@/stores/table';
import useProductStore from '@/stores/products';
import useParamStore from '@/stores/parameters';
import { DateTime } from 'luxon';

// ** AboveHeader Props Types
export interface AboveHeaderProps {
  header: string;
  listings: Listing[];
}

const AboveHeader = (props: AboveHeaderProps) => {
  // ** Props
  const { header, listings } = props;

  // ** Stores
  const [selections, selectionActions] = useTableSelection();
  const products = useProductStore((state) => state.products);
  const params = useParamStore((state) => state.params);

  // ** Hooks
  const session = useSession();
  const userId = session.data!.user.id;
  const {
    data: shareUrl,
    refetch: generateShareUrl,
    isError: isShareUrlError,
    isFetched: isShareUrlFetched,
    isFetching: isShareUrlFetching,
  } = useShareListings(userId, selections);
  const router = useRouter();

  // ** Vars
  const hasSelections = selections.length !== 0;

  // ** Handlers
  const handleGenerateShareUrl = () => {
    if (isShareUrlFetching) return;

    if (userId === undefined) return;

    // this should not be possible
    if (selections.length === 0) {
      alert('No listings to share!');
      return;
    }

    generateShareUrl();
  };

  const handleDownload = () => {
    const headers = [
      'Name',
      'Price ($)',
      'Quantity',
      'Tags',
      'Posted on',
      'Owner',
      'Company',
      'Parameters',
    ];
    const values = listings.map(
      (l) =>
        [
          products[l.product].name,
          l.price.toFixed(2),
          l.quantity,
          `"${l.negotiable ? `Negotiable,` : ''}${l.type.toLowerCase()}"`,
          `"${DateTime.fromISO(l.createdAt).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}"`,
          l.owner.name,
          l.owner.company.name,
          `"${l.parameters
            .map(
              (p) =>
                `${params[p.parameterId].displayName}:${p.value}${
                  /* eslint-disable-next-line no-nested-ternary */
                  params[p.parameterId].type === 'WEIGHT'
                    ? ' kg'
                    : params[p.parameterId].type === 'DIMENSION'
                    ? ' mm'
                    : ''
                }`
            )
            .join(',')}"`,
        ] as const
    );

    let csv = 'data:text/csv;charset=utf-8,';

    csv += `${headers.join(',')}\n`;

    values.forEach((v) => {
      csv += `${v.join(',')}\n`;
    });

    const uri = encodeURI(csv);
    const link = document.createElement('a');
    link.setAttribute('href', uri);
    link.setAttribute('download', 'siwma_listings.csv');
    document.body.appendChild(link);
    link.click();
  };

  const handleCompareListings = () => {
    const ids = selections.join(',');
    selectionActions.clearSelected();
    window.open(`/compare/${ids}`, '_blank', 'noreferrer');
  };

  // ** Effects
  useEffect(() => {
    if (isShareUrlFetching) return;

    if (isShareUrlError) {
      router.replace('/500');
      return;
    }

    if (shareUrl !== undefined) {
      // Create a popup here
      return;
    }

    if (isShareUrlFetched && shareUrl === undefined)
      // How you even reach here??!?!?!?!?!
      router.replace('/500');
  });

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
        <IconButton
          sx={{ ml: 1 }}
          disabled={!hasSelections}
          onClick={() => handleGenerateShareUrl()}
        >
          <ShareIcon fontSize="medium" color={hasSelections ? 'primary' : 'disabled'} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Download">
        <IconButton sx={{ ml: 1 }} disabled={!hasSelections} onClick={() => handleDownload()}>
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
          <IconButton
            sx={{ ml: 1 }}
            disabled={!hasSelections || selections.length > 3}
            onClick={() => handleCompareListings()}
          >
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

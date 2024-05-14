import {
  Box,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import fetchCategories from '@/services/fetchCategories';
import SuccessModal from '@/components/modals/SuccessModal';
import { ProductResponseBody } from '@/utils/api/client/zod';
import fetchListingItemById from '@/services/fetchListingItemById';
import updateListingItemData from '@/services/updateListingItem';

export type EditListingItemProps = {
  data: ProductResponseBody[];
};

type PutListingItemRequestBody = {
  name: string;
  chineseName: string;
  description: string;
  categoryId: string;
  unit: string;
  chineseUnit: string;
};

const GetCategoryQuery = () => {
  const { data } = useQuery('cat', async () => fetchCategories());
  return data;
};

const useGetLisitngItemQuery = (listingItemId: string) => {
  const { data } = useQuery('category', async () => fetchListingItemById(listingItemId), {
    enabled: listingItemId !== undefined,
  });
  return data;
};

const ListingItemForm = () => {
  const [editItem, setEditItem] = useState<boolean>(false);
  const router = useRouter();
  const id = router.query.id as string;
  const queryClient = useQueryClient();

  const listingItemData = useGetLisitngItemQuery(id);
  const [LIName, setName] = useState<string>(listingItemData?.name || '');
  const [LIChineseName, setChineseName] = useState<string>(listingItemData?.chineseName || '');
  const [LIDescription, setDescription] = useState<string>(listingItemData?.description || '');
  const [LICategory, setCategory] = useState<string>(listingItemData?.categoryId || '');
  const [LIUnit, setUnit] = useState<string>(listingItemData?.unit || '');
  const [LICUnit, setChineseUnit] = useState<string>(listingItemData?.chineseUnit || '');

  const [nameError, setNameError] = useState<string | null>(null);
  const [nameChineseError, setNameChineseError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [unitError, setUnitError] = useState<string | null>(null);
  const [unitChineseError, setUnitChineseError] = useState<string | null>(null);

  const useUpdateListingItemMutation = (listingItemId: string) =>
    useMutation(
      (updatedListingItemData: PutListingItemRequestBody) =>
        updateListingItemData(updatedListingItemData, listingItemId),
      {
        onSuccess: () => {
          queryClient.invalidateQueries('product');
          setEditItem(true);
        },
      }
    );
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleChineseNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChineseName(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  const handleUnitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUnit(event.target.value);
  };

  const handleChineseUnitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChineseUnit(event.target.value);
  };

  const mutation = useUpdateListingItemMutation(id);

  const handleConfirm = async () => {
    // Validate input data
    let hasError = false;
    if (!LIName) {
      setNameError('Listing Item Name is required');
      hasError = true;
    } else {
      setNameError(null);
    }

    if (!LIChineseName) {
      setNameChineseError('Listing Item Name (Chinese)  is required');
      hasError = true;
    } else {
      setNameChineseError(null);
    }

    if (!LIDescription) {
      setDescriptionError('Description is required');
      hasError = true;
    } else {
      setDescriptionError(null);
    }

    if (!LICategory) {
      setCategoryError('Category is required');
      hasError = true;
    } else {
      setCategoryError(null);
    }

    if (!LIUnit) {
      setUnitError('Unit is required');
      hasError = true;
    } else {
      setUnitError(null);
    }
    if (!LICUnit) {
      setUnitChineseError('Unit (Chinese) is required');
      hasError = true;
    } else {
      setUnitChineseError(null);
    }

    if (hasError) {
      return;
    }
    console.log(LIName);
    const requestBody: PutListingItemRequestBody = {
      name: LIName,
      chineseName: LIChineseName ?? undefined,
      description: LIDescription,
      categoryId: LICategory,
      unit: LIUnit,
      chineseUnit: LICUnit ?? undefined,
    };
    mutation.mutate(requestBody);
  };

  const handleCancel = async () => {
    router.push('/listing/listing-items');
  };

  useEffect(() => {
    if (listingItemData) {
      setName(listingItemData.name || '');
      setChineseName(listingItemData.chineseName || '');
      setDescription(listingItemData.description || '');
      setCategory(listingItemData.categoryId || '');
      setUnit(listingItemData.unit || '');
      setChineseUnit(listingItemData.chineseUnit || '');
    }
  }, [listingItemData]);

  useEffect(() => {
    if (mutation.isSuccess) {
      queryClient.invalidateQueries('listingItems');
    }
  }, [mutation.isSuccess, queryClient, router, id]);

  const cat = GetCategoryQuery();

  return (
    <Box
      sx={{
        alignItems: 'center',
        height: 'max',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        paddingX: 2,
        marginX: 2,
        marginY: 2,
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h5" sx={{ pt: '10px' }}>
        Edit listing item
      </Typography>
      <Typography variant="body1">Edit a listing item</Typography>
      <Box>
        <TextField
          fullWidth
          name="name"
          id="name"
          label="Listing Item Name"
          placeholder="Listing Item name"
          value={LIName}
          autoFocus
          margin="normal"
          onChange={handleNameChange}
          error={!!nameError}
          helperText={nameError}
        />
        <TextField
          fullWidth
          name="chineseName"
          id="chineseName"
          label="Listing Item Name (Chinese)"
          placeholder="Listing Item name in chinese"
          value={LIChineseName}
          autoFocus
          margin="normal"
          onChange={handleChineseNameChange}
          error={!!nameChineseError}
          helperText={nameChineseError}
        />
        <TextField
          fullWidth
          name="description"
          id="description"
          label="Description"
          placeholder="Short description of the listing item"
          value={LIDescription}
          autoFocus
          margin="normal"
          onChange={handleDescriptionChange}
          error={!!descriptionError}
          helperText={descriptionError}
        />
        {cat && (
          <Box sx={{ py: '15px' }}>
            <FormControl fullWidth>
              <InputLabel id="category">Category</InputLabel>
              <Select
                value={LICategory}
                id="category"
                label="Category"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                {cat.map((categoryItem) => (
                  <MenuItem value={categoryItem.id} key={categoryItem.id}>
                    {categoryItem.name}
                  </MenuItem>
                ))}
              </Select>
              {categoryError && (
                <Typography variant="caption" color="error">
                  {categoryError}
                </Typography>
              )}
            </FormControl>
          </Box>
        )}
        <TextField
          fullWidth
          name="unit"
          id="unit"
          label="Unit"
          placeholder="Appropriate unit"
          value={LIUnit}
          autoFocus
          margin="normal"
          onChange={handleUnitChange}
          error={!!unitError}
          helperText={unitError}
        />
        <TextField
          fullWidth
          name="chineseUnit"
          id="chineseUnit"
          label="Unit (Chinese)"
          placeholder="Appropriate chinese unit"
          value={LICUnit}
          autoFocus
          margin="normal"
          onChange={handleChineseUnitChange}
          error={!!unitChineseError}
          helperText={unitChineseError}
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
            variant="contained"
            onClick={handleCancel}
            sx={({ spacing, palette }) => ({
              mb: spacing(2),
              mr: spacing(3),
              backgroundColor: palette.error.main,
            })}
          >
            CANCEL
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={handleConfirm}
            sx={({ spacing }) => ({
              mb: spacing(2),
            })}
          >
            UPDATE
          </Button>
        </Box>
      </Box>
      <SuccessModal
        title="Successfully Edited!"
        content="Listing Item has been successfully edited"
        open={editItem}
        setOpen={setEditItem}
        buttonText="Return"
        path="/listing/listing-items"
      />
    </Box>
  );
};

export default ListingItemForm;

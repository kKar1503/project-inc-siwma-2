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
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import fetchCategories from '@/services/fetchCategories';
import createListingItem from '@/services/createListingItem';
import SuccessModal from '@/components/modals/SuccessModal';

const GetCategoryPageQuery = () => {
  const { data } = useQuery('cat', async () => fetchCategories());
  return data;
};

export type CreateListingItemProps = {
  name: string;
  chineseName: string;
  description: string;
  categoryId: string;
  unit: string;
  chineseUnit: string;
};

const ListingItemForm = () => {
  const [createItem, setCreateItem] = useState<boolean>(false);
  const [LIName, setName] = useState('');
  const [LIChineseName, setChineseName] = useState('');
  const [LIDescription, setDescription] = useState('');
  const [LICategory, setCategory] = useState('');
  const [LIUnit, setUnit] = useState('');
  const [LICUnit, setChineseUnit] = useState('');

  const [nameError, setNameError] = useState<string | null>(null);
  const [nameChineseError, setNameChineseError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [unitError, setUnitError] = useState<string | null>(null);
  const [unitChineseError, setUnitChineseError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const cat = GetCategoryPageQuery();

  const usePostListingItemMutation = useMutation(
    (listingItemData: CreateListingItemProps) =>
      createListingItem(
        listingItemData.name,
        listingItemData.chineseName,
        listingItemData.description,
        listingItemData.categoryId,
        listingItemData.unit,
        listingItemData.chineseUnit
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('product');
        setCreateItem(true);
      },
    }
  );

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
    const requestBody: CreateListingItemProps = {
      name: LIName,
      chineseName: LIChineseName ?? undefined,
      description: LIDescription,
      categoryId: LICategory,
      unit: LIUnit,
      chineseUnit: LICUnit ?? undefined,
    };
    console.log(requestBody);
    await usePostListingItemMutation.mutateAsync(requestBody);
  };

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
        Create listing item
      </Typography>
      <Typography variant="body1">Create a listing item</Typography>

      <Box>
        <TextField
          fullWidth
          name="name"
          id="name"
          label="Listing Item Name"
          placeholder="Listing Item name"
          autoFocus
          margin="normal"
          onChange={(e) => setName(e.target.value)}
          error={!!nameError}
          helperText={nameError}
        />
        <TextField
          fullWidth
          name="chineseName"
          id="chineseName"
          label="Listing Item Name (Chinese)"
          placeholder="Listing Item name in chinese"
          autoFocus
          margin="normal"
          onChange={(e) => setChineseName(e.target.value)}
          error={!!nameChineseError}
          helperText={nameChineseError}
        />
        <TextField
          fullWidth
          name="description"
          id="description"
          label="Description"
          placeholder="Short description of the listing item"
          autoFocus
          margin="normal"
          onChange={(e) => setDescription(e.target.value)}
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
          autoFocus
          margin="normal"
          onChange={(e) => setUnit(e.target.value)}
          error={!!unitError}
          helperText={unitError}
        />
        <TextField
          fullWidth
          name="chineseUnit"
          id="chineseUnit"
          label="Unit (Chinese)"
          placeholder="Appropriate chinese unit"
          autoFocus
          margin="normal"
          onChange={(e) => setChineseUnit(e.target.value)}
          error={!!unitChineseError}
          helperText={unitChineseError}
        />
        <Box
          sx={({ spacing }) => ({
            width: '98%',
            mt: spacing(2),
            display: 'flex',
            justifyContent: 'flex-end',
          })}
        >
          <Button
            type="submit"
            variant="contained"
            onClick={handleConfirm}
            sx={({ spacing }) => ({
              mb: spacing(2),
            })}
          >
            SUBMIT
          </Button>
        </Box>
      </Box>
      <SuccessModal
        title="Successfully Created!"
        content="Listing Item has been successfully created"
        open={createItem}
        setOpen={setCreateItem}
        buttonText="Return"
        path="/listing/listing-items"
      />
    </Box>
  );
};

export default ListingItemForm;

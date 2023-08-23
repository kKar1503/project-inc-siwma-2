import {
  Box,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import fetchCategories from '@/services/fetchCategories';
import createListingItem from '@/services/createListingItem';
import SuccessModal from '@/components/modals/SuccessModal';
import fetchListingItems from '@/services/fetchListingItems';

const GetCategoryPageQuery = () => {
  const { data } = useQuery('cat', async () => fetchCategories());
  return data;
};

const GetProductsCount = () => {
  const { data } = useQuery('products', async () => fetchListingItems({ limit: 0 }));
  return data;
};

const CheckDupeName = (countData: number | undefined) => {
  const { data } = useQuery(
    'products',
    async () => fetchListingItems({ limit: countData as number }),
    {
      enabled: !!countData,
    }
  );
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

export type names = {
  totalCount: number;
  listingItemsData: {
    categoryId: string;
    id: string;
    name: string;
    description: string;
    chineseName: string | null;
    unit: string;
    chineseUnit: string | null;
  }[];
};

const ListingItemForm = () => {
  const [createItem, setCreateItem] = useState<boolean>(false);
  const [LIName, setName] = useState('');
  const [LIChineseName, setChineseName] = useState('');
  const [LIDescription, setDescription] = useState('');
  const [LICategory, setCategory] = useState('');
  const [LIUnit, setUnit] = useState('');
  const [LICUnit, setChineseUnit] = useState('');
  const [LINamesArr, setNames] = useState<names>();

  const queryClient = useQueryClient();
  const cat = GetCategoryPageQuery();
  const products = GetProductsCount();
  const names = CheckDupeName(products?.totalCount);

  useEffect(() => {
    if (names && names.listingItemsData.length > 0) {
      setNames(names);
    }
    console.log(LINamesArr);
  }, [names]);

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

  const validator = (inputString: string, input: string) => {
    if (inputString === '' && input === 'english') {
      return true;
    }
    if (
      LINamesArr?.listingItemsData.find(
        (e) => e.name === inputString || e.chineseName === inputString
      ) !== undefined
    ) {
      return true;
    }
    return false;
  };

  const errorMessage = (dupeName: boolean) => {
    if (dupeName) {
      return 'Duplicate name found. Please enter another name';
    }
    return 'Name is required';
  };

  const handleConfirm = async () => {
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
          required
          fullWidth
          name="name"
          id="name"
          label="Listing Item Name"
          placeholder="Listing Item name"
          autoFocus
          margin="normal"
          onChange={(e) => setName(e.target.value)}
          error={validator(LIName, 'english')}
          helperText={
            validator(LIName, 'english')
              ? errorMessage(
                  LINamesArr?.listingItemsData.find((e) => e.name === LIName) !== undefined
                )
              : ''
          }
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
          error={validator(LIChineseName, 'chinese')}
          helperText={
            validator(LIChineseName, 'chinese')
              ? errorMessage(
                  LINamesArr?.listingItemsData.find((e) => e.chineseName === LIChineseName) !==
                    undefined
                )
              : ''
          }
        />
        <TextField
          required
          fullWidth
          name="description"
          id="description"
          label="Description"
          placeholder="Short description of the listing item"
          autoFocus
          margin="normal"
          onChange={(e) => setDescription(e.target.value)}
          value={LIDescription}
          error={LIDescription === ''}
          helperText={LIDescription === '' ? 'Please enter a description!' : ' '}
        />
        {cat && (
          <Box sx={{ py: '15px' }}>
            <FormControl required fullWidth error={LICategory === ''}>
              <InputLabel id="category">Category</InputLabel>
              <Select
                required
                value={LICategory}
                id="category"
                label="Category"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                error={LICategory === ''}
              >
                {cat.map((categoryItem) => (
                  <MenuItem value={categoryItem.id} key={categoryItem.id}>
                    {categoryItem.name}
                  </MenuItem>
                ))}
              </Select>
              {LICategory === '' && <FormHelperText>Please select a category!</FormHelperText>}
            </FormControl>
          </Box>
        )}
        <TextField
          required
          fullWidth
          name="unit"
          id="unit"
          label="Unit"
          placeholder="Appropriate unit"
          autoFocus
          margin="normal"
          onChange={(e) => setUnit(e.target.value)}
          value={LIUnit}
          error={LIUnit === ''}
          helperText={LIUnit === '' ? 'Please enter a unit!' : ' '}
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
          value={LICUnit}
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

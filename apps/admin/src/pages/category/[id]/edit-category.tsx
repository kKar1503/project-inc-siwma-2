import Upload, { AcceptedFileTypes, FileUploadProps } from '@/components/FileUpload/FileUploadBase';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { CategoryResponseBody } from '@/utils/api/client/zod';
import { useRouter } from 'next/router';
import fetchCategoryById from '@/middlewares/fetchCategoryById';
import updateCategoryData from '@/middlewares/updateCategories';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useResponsiveness } from '@inc/ui';
import Spinner from '@/components/fallbacks/Spinner';

export type EditCategoryProps = {
  data: CategoryResponseBody[];
};

type PutCategoryRequestBody = {
  name: string;
  description: string;
  image?: File;
  crossSectionImage?: File;
  parameters?: { parameterId: number; required: boolean }[];
};

const useGetCategoryQuery = (catId: string) => {
  const { data, error, isError, isFetched } = useQuery(
    'category',
    async () => fetchCategoryById(catId),
    {
      enabled: catId !== undefined,
    }
  );
  return { data, error, isError, isFetched };
};

const useUpdateUserMutation = (userUuid: string, image?: File, crossSectionImage?: File) =>
  useMutation((updatedUserData: PutCategoryRequestBody) =>
    updateCategoryData(updatedUserData, userUuid, image, crossSectionImage)
  );

const EditCategory = () => {
  const [isSm, isMd, isLg] = useResponsiveness(['sm', 'md', 'lg']);
  const router = useRouter();
  const id = router.query.id as string;
  const queryClient = useQueryClient();

  const categoryData = useGetCategoryQuery(id);
  const [selectedCatFile, setSelectedCatFile] = useState<File | null>(null);
  const [selectedCrossSectionFile, setSelectedCrossSectionFile] = useState<File | null>(null);
  const [categoryName, setCategoryName] = useState<string>(categoryData.data?.name || '');
  const [categoryNameChinese, setCategoryNameChinese] = useState<string>(
    categoryData.data?.name || ''
  );
  const [categoryDescription, setCategoryDescription] = useState<string>(
    categoryData.data?.description || ''
  );

  const handleCatFileChange: FileUploadProps['changeHandler'] = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedCatFile(event.target.files[0]);
    }
  };

  const handleCrossSectionFileChange: FileUploadProps['changeHandler'] = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedCrossSectionFile(event.target.files[0]);
    }
  };

  const handleCategoryNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const handleCategoryNameChineseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryNameChinese(event.target.value);
  };

  const handleCategoryDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryDescription(event.target.value);
  };

  const mutation = useUpdateUserMutation(
    id,
    selectedCatFile ?? undefined,
    selectedCrossSectionFile ?? undefined
  );

  const handleConfirmClick = () => {
    const requestBody: PutCategoryRequestBody = {
      name: categoryName,
      description: categoryDescription,
      image: selectedCatFile ?? undefined,
      crossSectionImage: selectedCrossSectionFile ?? undefined,
      parameters: [],
    };

    mutation.mutate(requestBody);
  };

  useEffect(() => {
    if (categoryData.isFetched) {
      if (categoryData.isError) {
        if ('status' in (categoryData.error as any) && (categoryData.error as any).status === 404) {
          router.replace('/404');
        } else {
          router.replace('/500');
        }
      } else if (categoryData.data === undefined) {
        router.replace('/500');
      } else {
        setCategoryName(categoryData.data?.name || '');
        setCategoryNameChinese(categoryData.data?.name || '');
        setCategoryDescription(categoryData.data?.description || '');
      }
    }
  }, [categoryData.isFetched, categoryData.isError, categoryData.data, router]);

  useEffect(() => {
    if (mutation.isSuccess) {
      queryClient.invalidateQueries('category');
      router.push(`/category`);
    }
    if (mutation.isError) {
      router.push('/404');
    }
  }, [mutation.isSuccess, mutation.isError, queryClient, router, id]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
      <Card sx={{ width: '95%', mt: isSm ? 1 : 3 }}>
        <Box sx={{ ml: 3, mt: 2 }}>
          <Typography variant="h6">Edit Category</Typography>
          <Typography variant="body1" gutterBottom component="div">
            Upload .jpg or .png image
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
          <Divider sx={{ width: '95%' }} />
        </Box>
        {/* where the details of category starts */}
        <Box sx={{ ml: 3 }}>
          <Typography variant="h6">Category Details</Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: isSm ? 'column' : 'row',
              gap: '2%',
              mb: 2,
              mt: 2,
            }}
          >
            <TextField
              label="Category Name"
              placeholder="Category Name"
              InputLabelProps={{ shrink: true }}
              onChange={handleCategoryNameChange}
              value={categoryName}
              sx={{ width: isSm ? '94%' : '47%', mb: isSm ? 3 : 0 }}
            />
            <TextField
              label="Category Name (Chinese)"
              placeholder="Category Name (Chinese)"
              InputLabelProps={{ shrink: true }}
              onChange={handleCategoryNameChineseChange}
              value={categoryNameChinese}
              sx={{ width: isSm ? '94%' : '47%' }}
            />
          </Box>
          <Box>
            <TextField
              label="Category Description"
              placeholder="Your category description"
              InputLabelProps={{ shrink: true }}
              onChange={handleCategoryDescriptionChange}
              value={categoryDescription}
              sx={{ width: isSm ? '94%' : '96%', my: 2 }}
            />
          </Box>
        </Box>
        <Box>
          <Upload
            id="categoryImage"
            title="Upload Category Image"
            description="Click to upload or drag and drop SVG, PNG or JPG (MAX. 800 x 400px)"
            selectedFile={selectedCatFile}
            changeHandler={handleCatFileChange}
            accept={[AcceptedFileTypes.JPG, AcceptedFileTypes.PNG]}
            maxWidth="200px"
            maxHeight="200px"
          />
        </Box>
        <Box>
          <Upload
            id="crossSectionImage"
            title="Upload Cross Section Image"
            description="Click to upload or drag and drop SVG, PNG or JPG (MAX. 800 x 400px)"
            selectedFile={selectedCrossSectionFile}
            changeHandler={handleCrossSectionFileChange}
            accept={[AcceptedFileTypes.JPG, AcceptedFileTypes.PNG]}
            maxWidth="200px"
            maxHeight="200px"
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 3, mb: 3 }}>
          <Button variant="contained" onClick={handleConfirmClick}>
            Confirm
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default EditCategory;

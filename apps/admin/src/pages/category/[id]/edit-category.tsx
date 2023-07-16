import Upload, { AcceptedFileTypes, FileUploadProps } from '@/components/FileUpload/FileUploadBase';
import { Box, Button, Card, Divider, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { CategoryResponseBody } from '@/utils/api/client/zod';
import { useRouter } from 'next/router';
import fetchCatById from '@/middlewares/fetchCategoryById';
import updateCatData from '@/middlewares/updateCategories';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export type EditCategoryProps = {
  data: CategoryResponseBody[];
};

type PutCategoryRequestBody = {
  name: string;
  description: string;
  image?: string;
  crossSectionImage?: string;
  parameters?: { parameterId: number; required: boolean }[];
};

const useGetCatQuery = (catId: string) => {
  const { data } = useQuery('category', async () => fetchCatById(catId), {
    enabled: catId !== undefined,
  });
  return data;
};

const useUpdateUserMutation = (userUuid: string, categoryImage?: File) =>
  useMutation((updatedUserData: PutCategoryRequestBody) =>
    updateCatData(updatedUserData, userUuid, categoryImage)
  );

const EditCategory = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const queryClient = useQueryClient();

  const catData = useGetCatQuery(id);
  const [selectedCatFile, setSelectedCatFile] = useState<File | null>(null);
  const [selectedCrossSectionFile, setSelectedCrossSectionFile] = useState<File | null>(null);
  const [categoryName, setCategoryName] = useState<string>(catData?.name || '');
  const [categoryNameChinese, setCategoryNameChinese] = useState<string>(catData?.name || '');
  const [categoryDescription, setCategoryDescription] = useState<string>(catData?.description || '');

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

  const mutation = useUpdateUserMutation(id, selectedCatFile ?? undefined);

  const handleConfirmClick = () => {
    const requestBody: PutCategoryRequestBody = {
      name: categoryName,
      description: categoryDescription,
      image: '', 
      crossSectionImage: '', 
      parameters: [], 
    };

    // Call the mutation function
    mutation.mutate(requestBody);
  };

  useEffect(() => {
    if (catData) {
      setCategoryName(catData.name || '');
      setCategoryNameChinese(catData.name || '');
      setCategoryDescription(catData.description || '');
    }
  }, [catData]);

  useEffect(() => {
    if (mutation.isSuccess) {
      queryClient.invalidateQueries('category');
      router.push(`/category`);
    }
  }, [mutation.isSuccess, queryClient, router, id]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
      <Card sx={{ width: '80%', mt: 3 }}>
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
          <Box sx={{ display: 'flex', gap: '1%', mb: 2, mt: 2 }}>
            <TextField
              label="Category Name"
              placeholder="Category Name"
              InputLabelProps={{ shrink: true }}
              onChange={handleCategoryNameChange}
              value={categoryName}
              sx={{ width: '48%' }}
            />
            <TextField
              label="Category Name (Chinese)"
              placeholder="Category Name (Chinese)"
              InputLabelProps={{ shrink: true }}
              onChange={handleCategoryNameChineseChange}
              value={categoryNameChinese}
              sx={{ width: '48%' }}
            />
          </Box>
          <Box>
            <TextField
              label="Category Description"
              placeholder="Your category description"
              InputLabelProps={{ shrink: true }}
              onChange={handleCategoryDescriptionChange}
              value={categoryDescription}
              sx={{ width: '97%', my: 2 }}
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

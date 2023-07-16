import Upload, { AcceptedFileTypes, FileUploadProps } from '@/components/FileUpload/FileUploadBase';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { CategoryResponseBody } from '@/utils/api/client/zod';

export type CreateCategoryProps = {
  data: CategoryResponseBody[];
};

const CreateCategory = () => {
  const [selectedCatFile, setSelectedCatFile] = useState<File | null>(null);
  const [selectedCrossSectionFile, setSelectedCrossSectionFile] = useState<File | null>(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryNameChinese, setCategoryNameChinese] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');

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

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
      <Card sx={{ width: '80%', mt: 3 }}>
        <Box sx={{ ml: 3, mt: 2 }}>
          <Typography variant="h6">Create a Category</Typography>
          <Typography variant="body1" gutterBottom component="div">
            Upload .jpg or .png image.
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
              // value={categoryName}
              sx={{ width: '48%' }}
            />
            <TextField
              label="Category Name (Chinese)"
              placeholder="Category Name (Chinese)"
              InputLabelProps={{ shrink: true }}
              onChange={handleCategoryNameChineseChange}
              // value={categoryNameChinese}
              sx={{ width: '48%' }}
            />
          </Box>
          <Box>
            <TextField
              label="Category Description"
              placeholder="Your category description"
              InputLabelProps={{ shrink: true }}
              onChange={handleCategoryDescriptionChange}
              // value={categoryDescription}
              sx={{ width: '97%', my: 2 }}
            />
          </Box>
        </Box>
        <Box>
          <Upload
            id="categoryImage"
            title="Upload Category Image"
            description="Click to upload or drag and drop SVG, PNG or JPG"
            selectedFile={selectedCatFile}
            changeHandler={handleCatFileChange}
            accept={[AcceptedFileTypes.JPG, AcceptedFileTypes.PNG]}
            maxWidth="200px"
            maxHeight="200px"
          />
          <Upload
            id="crossSectionImage"
            title="Upload Cross Section Image"
            description="Click to upload or drag and drop SVG, PNG or JPG"
            selectedFile={selectedCrossSectionFile}
            changeHandler={handleCrossSectionFileChange}
            accept={[AcceptedFileTypes.JPG, AcceptedFileTypes.PNG]}
            maxWidth="200px"
            maxHeight="200px"
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 3, mb: 3 }}>
            <Button variant="contained">
              Confirm
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default CreateCategory;

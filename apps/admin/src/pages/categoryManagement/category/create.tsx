import { useState } from 'react';
import Head from 'next/head';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Image from 'next/image';
import FileUpload, {
  FileUploadProps,
  AcceptedFileTypes,
} from '@/components/FileUpload/FileUploadBase';

const CreateCategoryPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [crossSectionImage, setCrossSectionImage] = useState<File | null>(null);

  const handleCategoryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCategoryImage(file);
    }
  };

  const handleCrossSectionImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCrossSectionImage(file);
    }
  };

  const handleSubmit = () => {
    // Handle form submission logic here
  };

  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
        width: '95%',
        boxSizing: 'border-box',
        margin: '2rem auto',
        borderRadius: '5px',
      }}
    >
      <Head>
        <title>Create Category</title>
        <meta name="description" content="Create Category Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Create Category</h1>
        <p>Upload .jpg or .png image</p>
        <hr />
        <Grid container>
          <Grid item xs={4}>
            <div>
              <div>
                <h2>Category Image</h2>
                <div>
                  <Image src="/images/admin-bg.png" alt="sample image" width={400} height={400} />
                  {/* Display preview of category image here */}
                </div>
              </div>
              <div>
                <h2>Cross Section Image</h2>
                <div>
                  <Image src="/images/admin-bg.png" alt="sample image" width={400} height={400} />
                  {/* Display preview of cross section image here */}
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={8}>
            <div style={{ marginTop: '2em' }}>
              <div>
                <label style={{ display: 'block' }} htmlFor="categoryName">
                  Category Name
                </label>
                <input
                  style={{
                    backgroundColor: 'lightgray',
                    border: '1px solid black',
                    borderRadius: '5px',
                    padding: '10px',
                    marginTop: '10px',
                    width: '100%',
                    marginBottom: '10px',
                  }}
                  type="text"
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
              <div>
                <label style={{ display: 'block' }} htmlFor="categoryDescription">
                  Category Description
                </label>
                <textarea
                  style={{
                    backgroundColor: 'lightgray',
                    border: '1px solid black',
                    borderRadius: '5px',
                    padding: '10px',
                    marginTop: '10px',
                    width: '100%',
                    maxWidth: '100%',
                    resize: 'vertical',
                  }}
                  id="categoryDescription"
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                ></textarea>
              </div>
              <FileUpload
                title="Upload Category Image"
                description=""
                selectedFile={categoryImage}
                changeHandler={handleCategoryImageChange}
                accept={[AcceptedFileTypes.JPG, AcceptedFileTypes.PNG]}
                maxWidth="200px"
                maxHeight="200px"
              />
              <FileUpload
                title="Upload Cross Section Image"
                description=""
                selectedFile={crossSectionImage}
                changeHandler={handleCrossSectionImageChange}
                accept={[AcceptedFileTypes.JPG, AcceptedFileTypes.PNG]}
                maxWidth="200px"
                maxHeight="200px"
              />
              <div style={{ float: 'right', marginTop: '2em' }}>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  style={{ backgroundColor: '#2962FF', color: 'white' }}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </main>
    </Box>
  );
};

CreateCategoryPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* <AdminSideBar /> */}
      <Box sx={{ flex: '1' }}>{page}</Box>
    </Box>
  );
};

export default CreateCategoryPage;

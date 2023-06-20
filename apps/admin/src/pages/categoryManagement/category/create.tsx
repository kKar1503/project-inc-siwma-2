import React, { useState } from 'react';
import Head from 'next/head';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Container, Grid } from '@mui/material';
import Image from 'next/image';
import FileUpload, { AcceptedFileTypes } from '@/components/FileUpload/FileUploadBase';

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

  // Add this function to create a URL from the File object
  const getObjectURL = (file: File | null) => {
    return file ? URL.createObjectURL(file) : null;
  };

  // Add these lines to create URLs from the File objects
  const categoryImageUrl = React.useMemo(() => getObjectURL(categoryImage), [categoryImage]);
  const crossSectionImageUrl = React.useMemo(
    () => getObjectURL(crossSectionImage),
    [crossSectionImage]
  );

  // Clean up when component unmounts or when new images are selected
  React.useEffect(() => {
    return () => {
      if (categoryImageUrl) {
        URL.revokeObjectURL(categoryImageUrl);
      }
      if (crossSectionImageUrl) {
        URL.revokeObjectURL(crossSectionImageUrl);
      }
    };
  }, [categoryImageUrl, crossSectionImageUrl]);

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
      <Container maxWidth="lg">
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4}>
              <div>
                <div>
                  <h2>Category Image</h2>
                  <div
                    style={{
                      maxWidth: '100%',
                      height: 0,
                      paddingBottom: '100%',
                      position: 'relative',
                      backgroundColor: 'gray',
                      border: '2px dotted black',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '3em',
                        textAlign: 'center',
                      }}
                    >
                      {categoryImageUrl ? (
                        <Image
                          src={categoryImageUrl}
                          alt="Category image"
                          layout="fill"
                          objectFit="contain"
                        />
                      ) : (
                        'PREVIEW'
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <h2>Cross Section Image</h2>
                  <div
                    style={{
                      maxWidth: '100%',
                      height: 0,
                      paddingBottom: '100%',
                      position: 'relative',
                      backgroundColor: 'gray',
                      border: '2px dotted black',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '3em',
                        textAlign: 'center',
                      }}
                    >
                      {crossSectionImageUrl ? (
                        <Image
                          src={crossSectionImageUrl}
                          alt="Cross section image"
                          layout="fill"
                          objectFit="contain"
                        />
                      ) : (
                        'PREVIEW'
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
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
                  id="categoryImage"
                  title="Upload Category Image"
                  description=""
                  selectedFile={categoryImage}
                  changeHandler={handleCategoryImageChange}
                  accept={[AcceptedFileTypes.JPG, AcceptedFileTypes.PNG]}
                  maxWidth="200px"
                  maxHeight="200px"
                />
                <FileUpload
                  id="crossSectionImage"
                  title="Upload Cross Section Image"
                  description=""
                  selectedFile={crossSectionImage}
                  changeHandler={handleCrossSectionImageChange}
                  accept={[AcceptedFileTypes.JPG, AcceptedFileTypes.PNG]}
                  maxWidth="200px"
                  maxHeight="200px"
                />
                <div style={{ float: 'right', marginTop: '2em' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: { xs: 'center', sm: 'flex-end' },
                      mt: 2,
                    }}
                  >
                    <Button
                      onClick={handleSubmit}
                      variant="contained"
                      style={{ backgroundColor: '#2962FF', color: 'white' }}
                    >
                      Confirm
                    </Button>
                  </Box>
                </div>
              </div>
            </Grid>
          </Grid>
        </main>
      </Container>
    </Box>
  );
};

CreateCategoryPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box sx={{ flex: '1' }}>{page}</Box>
    </Box>
  );
};

export default CreateCategoryPage;

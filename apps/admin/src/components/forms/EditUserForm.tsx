import {
  FormControl,
  OutlinedInput,
  Grid,
  Box,
  IconButton,
  Typography,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { FiImage, FiUpload } from 'react-icons/fi';
import Image from 'next/image';
import { Company } from '@/utils/api/client/zod/companies';
import { useResponsiveness } from '@inc/ui';

const Companies = [
  {
    id: '1',
    name: 'AIK LIAN METAL & GLAZING PTE.LTD.',
    website: 'https://www.sgpbusiness.com/company/Aik-Lian-Metal-Glazing-Pte-Ltd',
    bio: 'AIK LIAN METAL & GLAZING PTE. LTD. (the "Company") is a Exempt Private Company Limited by Shares, incorporated on 28 July 2011 (Thursday) in Singapore . The address of the Company\'s registered office is at the E9 PREMIUM building. The Company current operating status is live and has been operating for 11 years. This Company\'s principal activity is other construction installation n.e.c. with metal product services n.e.c. as the secondary activity.',
    image: '001892c0b1d1a71b38ae8e6d8aaf5dd7.jpeg',
    visible: true,
    comments:
      "The SIWMA website has really automated some of our company's processes. We now spend less time doing manual work. It's making advertising and selling our metals very easy for us.",
    createdAt: '2023-07-06T16:29:41.562Z',
  },
  {
    id: '2',
    name: 'BOON CHANG STRUCTURE PTE.LTD.',
    website: 'https://www.boonchangstructure.com.sg/page02.html',
    bio: 'BOON CHANG STRUCTURE PTE LTD was incorporated on 9 June 1994 (Thursday) as a Exempt Private Company Limited by Shares in Singapore',
    image: '001892c0b1d1aa9e73b2febc50186df7.jpeg',
    visible: true,
    comments:
      'SIWMA is the firm to work with if you want to keep up to high standards. The professional workflows they stick to result in exceptional quality.',
    createdAt: '2023-07-06T16:29:41.562Z',
  },
  {
    id: '3',
    name: 'Hock Seng Hoe Metal Company Pte Ltd',
    website: 'https://www.hshmetal.com/',
    bio: 'HOCK SENG HOE METAL COMPANY was established in Singapore in Year 2009 and is now a reputable structural steel provider. Our core business includes providing quality steel materials for the construction, shipyard, oil and gas and the offshore marine industries.',
    image: '001892c0b1d1ae19689d8383b09e5b04.jpeg',
    visible: true,
    comments:
      'The system has produced a significant competitive advantage in the industry thanks to SIWMA well-thought opinions',
    createdAt: '2023-07-06T16:29:41.562Z',
  },
  {
    id: '4',
    name: 'Kian Huat Metal',
    website: 'https://kianhuatmetal.com/',
    bio: 'Kian Huat Metal is the leading distributor of Aluminium and Stainless Steel products, recognized for its reliability, efficiency, and commitment to quality. With over 30 years of experience in the industry, the Company has a wide distribution network that spans over 20 countries in the Asia Pacific region.\n\nKian Huat Metal offers an extensive range of Aluminium and Stainless Steel products, sourced worldwide with major footprints in China, Indonesia, Thailand, and Malaysia.',
    image: 'logo-Placeholder.jpg',
    visible: false,
    comments:
      'They are very sharp and have a high-quality team. We expect quality from people, and they have the kind of team we can work with. They were upfront about everything that needed to be done.',
    createdAt: '2023-07-06T16:29:41.562Z',
  },
  {
    id: '5',
    name: 'Global Metal International',
    website: 'https://globalmetal.com.sg/',
    bio: 'Global Metal International (GMI) is a steel based stockist with focus on Stainless Steel products in Singapore, supplying regional markets in South East Asia, to both retail and project business. We are also developing our trading arm in Stainless Steel and non ferrous, trade indent material for productions or projects.',
    image: '001892c0b1d1b2dd4036527beca2f802.jpeg',
    visible: true,
    comments:
      "We are impressed by SIWMA's prices, especially for the project we wanted to do and in comparison to the quotes we received from a lot of other companies.",
    createdAt: '2023-07-06T16:29:41.562Z',
  },
];

type TextInputProps = {
  label: string;
  placeholder: string;
  multiline?: boolean;
};

type SelectInputProps = {
  label: string;
  data: Company[];
};

const TextInput = ({ label, placeholder, multiline }: TextInputProps) => (
  <FormControl
    sx={{
      paddingRight: 2,
      width: '100%',
    }}
  >
    <Typography variant="body1">{label}</Typography>
    <OutlinedInput
      fullWidth
      multiline={multiline || false}
      minRows={multiline ? 3 : 0}
      placeholder={placeholder}
      sx={{
        marginTop: 1,
      }}
      size="small"
    />
  </FormControl>
);

const SelectInput = ({ label, data }: SelectInputProps) => (
  <FormControl
    sx={{
      paddingRight: 2,
      width: '100%',
    }}
  >
    <Typography variant="body1">{label}</Typography>
    <Select
      value={data.length !== 0 ? data[0].id : 0}
      size="small"
      sx={{
        marginTop: 1,
      }}
      inputProps={{ 'aria-label': 'Without label' }}
    >
      {data.map((company) => (
        <MenuItem value={company.id} key={company.id}>
          {company.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

const EditUserForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isXs, isSm, isMd] = useResponsiveness(['xs', 'sm', 'md']);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    if (event.target.files.length === 1) {
      setFile(event.target.files[0]);
    } else if (event.target.files.length > 1) {
      setFile(null);
      alert('Please Select Only One Picture');

      return;
    } else {
      setFile(null);
      alert('Please Select a Picture');

      return;
    }

    if (event.target.files[0].size > 10000000) {
      setFile(null);
      alert('Please Select a File Smaller Than 10 MB');
    }
  };

  return (
    <Grid container>
      <Grid item sm={12} md={4}>
        <Typography variant="body1">Profile Picture (Optional)</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: isSm ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isSm ? 'normal' : 'center',
            height: '100%',
          }}
        >
          <Box
            sx={{
              width: isXs || isSm ? '80px' : '100%',
              border: '1px solid primary.main',
              borderStyle: 'dotted',
              height: isXs || isSm ? '80px' : '100%',
              marginTop: 1,
              marginRight: 2,
            }}
          >
            <label
              htmlFor="profile"
              style={{
                cursor: 'pointer',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {file === null || !file.type.startsWith('image/') ? (
                  <IconButton component="span">
                    {file === null ? <FiUpload color="black" /> : <FiImage />}
                  </IconButton>
                ) : (
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    style={{
                      objectFit: 'contain',
                      display: 'block',
                      height: '100%',
                      width: '100%',
                      margin: 'auto',
                    }}
                    width={10}
                    height={10}
                  />
                )}
              </Box>
              {!(isXs || isSm) && (
                <Typography variant="body1" textAlign="center">
                  {file != null
                    ? file.name
                    : 'Click to upload or drag and drop SVG, PNG or JPG (MAX. 800 x 400px)'}
                </Typography>
              )}
            </label>
            <input
              id="profile"
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              accept="image/*"
            />
          </Box>
          {(isXs || isSm) && (
            <Button
              sx={{
                width: '140px',
              }}
              variant="contained"
              color="error"
            >
              Delete Image
            </Button>
          )}
        </Box>
      </Grid>

      <Grid item sm={12} md={8}>
        <Grid container marginTop={isXs || isSm ? 4 : 0} rowGap={2}>
          <Grid item xs={12} sm={6}>
            <SelectInput label="Companies" data={Companies} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput label="Fullname" placeholder="Fullname" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput label="E-mail" placeholder="E-mail" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput label="Mobile Number" placeholder="Mobile Number" />
          </Grid>
          <Grid item xs={12}>
            <TextInput label="Bio (optional)" placeholder="Bio" multiline />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput label="Change Password" placeholder="Password" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput label="Change Password" placeholder="New Password" />
          </Grid>
          <Grid item xs={12}>
            <TextInput label="Comments (optional)" placeholder="Comment" multiline />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} marginTop={4}>
        <Grid container>
          <Grid item md={2}>
            {!(isXs || isSm) && <Button variant="contained">Go Back</Button>}
          </Grid>
          <Grid item md={2}>
            {!(isXs || isSm) && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  marginRight: 2,
                }}
              >
                <Button variant="contained" color="error">
                  Delete Image
                </Button>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}
            >
              <Button fullWidth={isXs || isSm} variant="contained">
                Save Changes
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EditUserForm;

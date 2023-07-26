import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AddCompaniesModal from '@/components/modals/AddCompaniesModal';

export type BulkRegisterCompanyCardProps = {
  updateData: () => void;
};

const BulkRegisterCompanyCard = ({ updateData }: BulkRegisterCompanyCardProps) => {
  const [openAddModal, setOpenAddModal] = React.useState<boolean>(false);

  const handleSubmit = () => {
    setOpenAddModal(true);
  };

  return (
    <>
      <Card sx={{ elevation: 10, boxShadow: 9 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Bulk register companies
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Register multiple companies through a file upload
          </Typography>
          <Box sx={{ mt: 2, width: '100%' }}>
            <Button variant="outlined" color="primary" onClick={handleSubmit} fullWidth>
              Bulk Register Companies
            </Button>
          </Box>
        </CardContent>
      </Card>
      <AddCompaniesModal
        open={openAddModal}
        setOpen={() => setOpenAddModal(false)}
        updateData={updateData}
      />
    </>
  );
};

export default BulkRegisterCompanyCard;

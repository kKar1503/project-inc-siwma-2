import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import AddCompanyModal from '@/components/modals/AddCompanyModal';

export type RegisterCompanyCardProps = {
  updateData: () => void;
};

const RegisterCompanyCard = ({ updateData }: RegisterCompanyCardProps) => {
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

  const handleSubmit = () => {
    setOpenAddModal(true);
  };

  return (
    <>
      <Card sx={{ elevation: 10, boxShadow: 9 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Register an individual company
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Register an individual company profile into the system
          </Typography>
          <Box sx={{ mt: 2, width: '100%' }}>
            <Button variant="outlined" color="primary" onClick={handleSubmit} fullWidth>
              Register Company
            </Button>
          </Box>
        </CardContent>
      </Card>
      <AddCompanyModal
        open={openAddModal}
        setOpen={() => setOpenAddModal(false)}
        updateData={updateData}
      />
    </>
  );
};

export default RegisterCompanyCard;

import { useState } from 'react';
import Button from '@mui/material/Button';
import { Alert } from '@inc/ui';

const TestNotifi = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  };
  return (
    <>
      <Button variant="contained" size="medium" sx={{ mx: 3, mb: 2 }} onClick={handleClick}>
        Create Listing
      </Button>
      <Alert
        open={open}
        setOpen={setOpen}
        alertTitle="Success"
        alertContent="New content has been successfully add!"
        severity="success"
      />
    </>
  );
};

export default TestNotifi;

import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

type SetParameterProps = {
  setParameters: (parameters: ParameterProps[]) => void;
  category: string;
};

export type ParameterProps = {
  id: string;
  name: string;
  displayName: string;
  type: string;
  dataType: string;
};

const ParameterForm = ({ setParameters, category }: SetParameterProps) => {
  useEffect(() => {
    // Get parameters from backend using category
    setParameters([]);
  }, [category]);
  return (
    <>
      <Grid item xs={12} md={12} sx={{ width: '100%' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Category Parameters
        </Typography>
        <Typography variant="body1">
          Enter the parameters specific to the chosen category
        </Typography>

        <Divider sx={{ my: 2 }} />
      </Grid>
    </>
  );
};

export default ParameterForm;

import React from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

interface ConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
}

const ConfirmationDialog = ({ open, onClose }: ConfirmationDialogProps) => {
    return (
        <Box>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>
                    <IconButton sx={{ color: 'blue' }}>
                        <InfoIcon />
                    </IconButton>
                    Confirmation
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Advertisement has been successfully added!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={onClose}
                        variant="contained"
                        sx={{ backgroundColor: 'blue', color: 'white' }}
                    >
                        Back to Dashboard
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ConfirmationDialog;

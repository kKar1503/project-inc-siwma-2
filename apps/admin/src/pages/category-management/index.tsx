import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';

const CategoryList: React.FC = () => {
    return (
        <Card
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <Box>
                <Box display="flex" justifyContent="space-between" marginBottom="10px">
                    <Box>
                        <Box color="black" fontWeight="bold">
                            Categories
                        </Box>
                        <Box color="gray">Showing 1-2 of 20 categories</Box>
                        <Button color="primary" startIcon={<span>≡</span>}>
                            Filters
                        </Button>
                    </Box>
                    <Box>
                        <Button variant="contained" color="primary">
                            Create Category
                        </Button>
                    </Box>
                </Box>
                <Box display="flex" justifyContent="flex-end" marginBottom="10px">
                    <Input type="text" style={{ width: '120px' }} placeholder="Search" />
                </Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox />
                            </TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Add rows here */}
                    </TableBody>
                </Table>
            </Box>
        </Card>
    );
};

export default CategoryList;

import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';

const fakeData = [
    {
        category: 'Category 1',
        description: 'Description 1',
        status: 'Active',
    },
    {
        category: 'Category 2',
        description: 'Description 2',
        status: 'Inactive',
    },
];

const CategoryList: React.FC = () => {
    return (
        <Card
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '80%',
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
                    <Box display="flex" alignItems="center">
                        <TextField type="text" style={{ width: '120px' }} placeholder="Search" />
                        <Button variant="contained" color="primary">
                            Create Category
                        </Button>
                    </Box>
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
                        {fakeData.map((row) => (
                            <TableRow key={row.category}>
                                <TableCell padding="checkbox">
                                    <Checkbox />
                                </TableCell>
                                <TableCell>{row.category}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>{row.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Card>
    );
};

export default CategoryList;

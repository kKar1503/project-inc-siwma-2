import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import fetchListing from '@/middlewares/fetchListing';
import { Listing } from '@/utils/api/client/zod/listings';

interface TableRowData {
    id: string;
    data: string[];
}

interface TableData {
    sideHeaders: string[];
    rows: TableRowData[];
}

interface CompareDifferencesProps {
    productIds: string[];
}




const CompareDifferences: React.FC<CompareDifferencesProps> = ({ productIds }) => {
    productIds = ['1', '2', '3'];
    const [listings, setListings] = useState<Listing[]>([]);
    console.log('Product IDs:', productIds);
    useEffect(() => {
        const fetchListings = async () => {
            const listings = await Promise.all(productIds.map((id) => fetchListing(id)));
            setListings(listings);
        };

        fetchListings();
    }, [productIds]);

    console.log('Listings:', listings);

    const tableData: TableData = {
        sideHeaders: [
            'Dimensions',
            'Price ($)',
            'Stock',
            'Condition',
            'Category',
            'Negotiable',
            'Metal Grade',
            'Cross Section Image',
            'Type',
            'Company',
        ],
        rows: [
            { id: 'row1', data: ['Length: 355, Width: 255, Height: 44, Density: 150', 'Length: 400, Width: 300, Height: 50, Density: 200', 'Length: 450, Width: 350, Height: 55, Density: 250'] },
            { id: 'row2', data: ['$ 999 / kg', '$ 1099 / kg', '$ 1199 / kg'] },
            { id: 'row3', data: ['1000kg', '2000kg', '3000kg'] },
            { id: 'row4', data: ['Good', 'Excellent', 'Fair'] },
            { id: 'row5', data: ['Round Bars', 'Square Bars', 'Hexagonal Bars'] },
            { id: 'row6', data: ['No', 'Yes', 'No'] },
            { id: 'row7', data: ['S233', 'S244', 'S255'] },
            { id: 'row8', data: ['S233', 'S244', 'S255'] },
            { id: 'row9', data: ['image1', 'image2', 'image3'] },
            { id: 'row10', data: ['Hi Metals Pte Ltd', 'MetalWorks Inc.', 'SteelCorp Ltd.'] },
        ],
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Key Specs</TableCell>
                        <TableCell>Steel Metal Bar 1</TableCell>
                        <TableCell>Steel Metal Bar 2</TableCell>
                        <TableCell>Steel Metal Bar 3</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.sideHeaders.map((header, index) => (
                        <TableRow key={header}>
                            <TableCell>{header}</TableCell>
                            {tableData.rows[index]?.data.map((cellData) => (
                                <TableCell key={cellData}>{cellData}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CompareDifferences;

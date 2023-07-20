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

const CompareDifferences = ({ productIds }: CompareDifferencesProps) => {
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
            { id: 'row1', data: listings.map(listing => listing.parameters ? `Length: ${listing.parameters.find(param => param.paramId === "2")?.value}, Width: ${listing.parameters.find(param => param.paramId === "4")?.value}, Height: ${listing.parameters.find(param => param.paramId === "21")?.value}` : '') },
            { id: 'row2', data: listings.map(listing => `$ ${listing.price} / ${listing.unit}`) },
            { id: 'row3', data: listings.map(listing => `${listing.quantity}`) },
            { id: 'row4', data: listings.map(listing => listing.description) },
            { id: 'row5', data: listings.map(listing => listing.categoryId) },
            { id: 'row6', data: listings.map(listing => listing.negotiable ? 'Yes' : 'No') },
            { id: 'row7', data: [] },
            { id: 'row8', data: [] },
            { id: 'row9', data:  listings.map(listing => listing.type) },
            { id: 'row10', data: listings.map(listing => listing.owner.company.name) },
        ],
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>Key Specs</TableCell>
                    {listings.map((listing, index) => (
                        <TableCell key={index}>{listing.name}</TableCell>
                    ))}
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

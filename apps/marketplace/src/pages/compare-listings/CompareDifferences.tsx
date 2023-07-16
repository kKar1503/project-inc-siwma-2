import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface TableRowData {
    id: string;
    data: string;
}

interface TableData {
    sideHeaders: string[];
    rows: TableRowData[];
}

const CompareDifferences: React.FC = () => {
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
            { id: 'row1', data: 'Length: 355, Width: 255, Height: 44, Density: 150' },
            { id: 'row2', data: '$ 999 / kg' },
            { id: 'row3', data: '1000kg' },
            { id: 'row4', data: 'Good' },
            { id: 'row5', data: 'Round Bars' },
            { id: 'row6', data: 'No' },
            { id: 'row7', data: 'S233' },
            { id: 'row8', data: 'S233' },
            { id: 'row9', data: 'image' },
            { id: 'row10', data: 'Hi Metals Pte Ltd' },
        ],
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Key Specs</TableCell>
                        <TableCell>Steel Metal Bar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.sideHeaders.map((header, index) => (
                        <TableRow key={header}>
                            <TableCell>{header}</TableCell>
                            <TableCell>{tableData.rows[index]?.data}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CompareDifferences;

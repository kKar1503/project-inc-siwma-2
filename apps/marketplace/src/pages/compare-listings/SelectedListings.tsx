// import React, { useState } from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import IconButton from '@mui/material/IconButton';
// import Collapse from '@mui/material/Collapse';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
// import ChatIcon from '@mui/icons-material/Chat';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
// import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

// interface RowData {
//     listingName: string;
//     price: number;
//     quantity: string;
//     nego: string;
//     type: string;
//     created: string;
//     isBookmarked: boolean;
// }

// interface RowProps {
//     row: RowData;
// }

// interface CollapsibleTableProps {
//     data: RowData[];
// }

// const Row = ({ row }) => {
//     const [open, setOpen] = useState(false);

//     return (
//         <>
//             <TableRow sx={{ width: '100%' }}>
//                 <TableCell>
//                     <IconButton size="small" onClick={() => setOpen(!open)}>
//                         {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
//                     </IconButton>
//                 </TableCell>
//                 <TableCell>{row.listingName}</TableCell>
//                 <TableCell>{row.price}</TableCell>
//                 <TableCell>{row.quantity}</TableCell>
//                 <TableCell>{row.nego}</TableCell>
//                 <TableCell>{row.type}</TableCell>
//                 <TableCell>{row.created}</TableCell>
//                 <TableCell>
//                     <IconButton>{row.isBookmarked ? <BookmarkIcon /> : <BookmarkIcon />}</IconButton>
//                 </TableCell>
//                 <TableCell>
//                     <IconButton>
//                         <ChatIcon />
//                     </IconButton>
//                 </TableCell>
//                 <TableCell>
//                     <IconButton>
//                         <CheckBoxIcon />
//                     </IconButton>
//                 </TableCell>
//             </TableRow>

//             <TableRow>
//                 <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
//                     <Collapse in={open} timeout="auto" unmountOnExit>
//                         <Table size="small" aria-label="details">
//                             <TableBody>
//                                 <TableRow>
//                                     <TableCell>Listing Name: {row.listingName}</TableCell>
//                                     <TableCell>Price: {row.price}</TableCell>
//                                     <TableCell>Quantity: {row.quantity}</TableCell>
//                                     <TableCell>Negotiable: {row.nego}</TableCell>
//                                     <TableCell>Type: {row.type}</TableCell>
//                                     <TableCell>Created: {row.created}</TableCell>
//                                 </TableRow>
//                                 {/* Add more details here if needed */}
//                             </TableBody>
//                         </Table>
//                     </Collapse>
//                 </TableCell>
//             </TableRow>
//         </>
//     );
// };

// const SelectedListings = ({ data }) => (
//     <TableContainer component={Paper}>
//         <TableContainer aria-label="collapsible table">
//             <TableHead>
//                 <TableRow>
//                     <TableCell />
//                     <TableCell>Listing Name</TableCell>
//                     <TableCell>Price ($)</TableCell>
//                     <TableCell>Quantity</TableCell>
//                     <TableCell>Negotiable</TableCell>
//                     <TableCell>Type</TableCell>
//                     <TableCell>Created</TableCell>
//                 </TableRow>
//             </TableHead>
//             <TableBody>
//                 {data.map((row) => (
//                     <Row key={row.listingName} row={row} />
//                 ))}
//             </TableBody>
//         </TableContainer>
//     </TableContainer> 
// );

// export default SelectedListings;

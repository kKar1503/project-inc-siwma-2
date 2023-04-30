import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#F2F3F4',
  marginRight: '1.5rem',
  marginLeft: '0.5rem',
  width: '33%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderTopLeftRadius: theme.shape.borderRadius,
  borderBottomLeftRadius: theme.shape.borderRadius,
  backgroundColor: '#2962FF',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: '4rem',
    // transition: theme.transitions.create('width'),
    
    fontSize: '10px',
    color: '#424242',
  },
  width: '96%',
}));

export default function SearchBar() {

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon sx={{color: 'white', fontSize: '16px'}}/>
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search for listings…"
      />
    </Search>
  )

}



// import { makeStyles } from "@mui/material";
// import { InputBase, IconButton, Paper } from "@mui/material";
// import { Search as SearchIcon } from "@mui/icons-material";

// // const useStyles = {
// //   root: {
// //     padding: "2px 4px",
// //     display: "flex",
// //     alignItems: "center",
// //     width: 400,
// //     // borderRadius: theme.shape.borderRadius,
// //     // backgroundColor: theme.palette.common.white,
// //     // [theme.breakpoints.down("sm")]: {
// //       width: "100%",
// //     },
// //   },
// //   input: {
// //     marginLeft: theme.spacing(1),
// //     flex: 1,
// //   },
// //   iconButton: {
// //     padding: 10,
// //   },
// // }));

// export default function SearchBar() {
//   // const classes = useStyles();

//   return (
//     <Paper component="form">
//       <InputBase
//         // className={input}
//         placeholder="Search…"
//         inputProps={{ "aria-label": "search" }}
//       />
//       <IconButton
//         type="submit"
//         // className={iconButton}
//         aria-label="search"
//       >
//         <SearchIcon />
//       </IconButton>
//     </Paper>
//   );
// }

// // export function SearchBar({}) {

// //   const searchBarStyle = {
// //     borderRadius: '6px',
// //     padding: '10px',
// //     border: '0px',
// //     backgroundColor: '#F2F3F4'
// //   }

// //   return (
// //     <>
// //       <input placeholder="Search for listings..." style={searchBarStyle}/>
    
// //     </>
// //   )
// // }
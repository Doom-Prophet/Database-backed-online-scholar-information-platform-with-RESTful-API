import {useContext, useState, useEffect} from 'react';
import {UserContext} from '../context/UserContext'
import {Link, Navigate} from "react-router-dom";
import PaperItem from '../components/PaperItem';
import SearchBar from '../components/SearchBar';
import {Box, Stack, Typography, ToggleButton, ToggleButtonGroup} from '@mui/material';
import {GetPaperList} from "../data/API";


const sortFunc = (key) => {
    return (a, b) => {
      if (a[key] > b[key]) return -1;
      if (a[key] < b[key]) return 1; 
      return 0;
    }
}

function sortResult(data, sortKey, sortOrder) {
    data.sort(sortFunc(sortKey));
    if (sortOrder === "DESC") {
      data = data.reverse();
    }
    return data;
};
  
  

function Search (props) {
    const { user } = useContext(UserContext);
    const [results, setResults] = useState([]);
    const [sortKey, setSortKey] = useState('Created_date');
    const [sortOrder, setSortOrder] = useState("ASC");
    // if (!user || !user.auth) return <Navigate to="/login" />;

    const handleInputChange = (event) => {
        event.preventDefault();
        GetPaperList(event.target.value)
          .then((paperList) => {
            setResults(paperList);
          })
          .catch((error) => {
            console.log(error);
          })
    }

    const sortedResult = () => {
        return sortResult(results,sortKey, sortOrder);
    }

    return (
        <Stack spacing={2} sx={{mt:5}} alignItems='center'>
            <Box sx={{ width:500 }}>
                <SearchBar onChange={handleInputChange} />
            </Box>
            <Box >
                <Stack direction="row" spacing={5} justifyContent='space-evenly'>
                    <ToggleButtonGroup
                        color="primary"
                        value={sortOrder}
                        exclusive
                        onChange={(e)=>setSortOrder(e.target.value)}
                        aria-label="sort order"
                        >
                        <ToggleButton value="ASC">Most</ToggleButton>
                        <ToggleButton value="DESC">Least</ToggleButton>
                    </ToggleButtonGroup>  
                    <ToggleButtonGroup
                        color="primary"
                        value={sortKey}
                        exclusive
                        onChange={(e)=>setSortKey(e.target.value)}
                        aria-label="sort key"
                        >
                        <ToggleButton value="year">Recent</ToggleButton>
                        <ToggleButton value="citations">Citations</ToggleButton>
                    </ToggleButtonGroup>          
                                 
                </Stack>
            </Box>
            {!results ? false:
            <Box sx={{ width: 800 }}>
                <Stack>
                    {sortedResult().map((paper)=>{return (
                        <Link className='nonstyLink' key={paper._id} to={`../paper/${paper.id}`}>
                            <PaperItem key={paper._id} id={paper._id} />
                        </Link>
                    )
                        })}
                </Stack>
            </Box>
            }
        </Stack>
    );
}

export default Search;
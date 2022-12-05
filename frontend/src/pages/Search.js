import {useContext, useState, useEffect} from 'react';
import {UserContext} from '../context/UserContext'
import {Link, Navigate} from "react-router-dom";
import {papers} from "../data/mock_data";
import PaperItem from '../components/PaperItem';
import SearchBar from '../components/SearchBar';
import {Box, Stack, Typography, ToggleButton, ToggleButtonGroup} from '@mui/material';



const sortFunc = (key) => {
    return (a, b) => {
      if (a[key] > b[key]) return 1;
      if (a[key] < b[key]) return -1; 
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
    const [results, setResults] = useState(papers);
    const [sortKey, setSortKey] = useState('date');
    const [sortOrder, setSortOrder] = useState("ASC");
    if (!user || !user.auth) return <Navigate to="/login" />;

    const handleInputChange = (event) => {
        console.log(event.target.value);
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
                        <ToggleButton value="DESC">Least</ToggleButton>
                        <ToggleButton value="ASC">Most</ToggleButton>
                    </ToggleButtonGroup>  
                    <ToggleButtonGroup
                        color="primary"
                        value={sortKey}
                        exclusive
                        onChange={(e)=>setSortKey(e.target.value)}
                        aria-label="sort key"
                        >
                        <ToggleButton value="Created_date">Recent</ToggleButton>
                        <ToggleButton value="citations">Citations</ToggleButton>
                    </ToggleButtonGroup>          
                                 
                </Stack>
            </Box>
            <Box sx={{ width: 800 }}>
                <Stack>
                    {sortedResult().map((paper)=>{return (
                        <Link className='nonstyLink' key={paper.id} to={`../paper/${paper.id}`}>
                            <PaperItem key={paper.id} data={paper} />
                        </Link>
                    )
                        })}
                </Stack>
            </Box>
        </Stack>
    );
}

export default Search;
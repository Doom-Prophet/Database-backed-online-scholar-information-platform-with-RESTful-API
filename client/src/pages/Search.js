import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

// define the sub component for the search page
function SearchItem (props) {
    return (
      <div id="search-item" className='nes-container with-title is-centered is-rounded'>
        <p id="title" className='title'>#{props.id}</p>
        <Link to={`../detail/${props.id}`}><img id="pokemon-img" src={props.data.image} alt={props.name}></img></Link>
        <p className='nes-text'>{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</p>
        <br></br>
      </div>
    );
};
  

const Search = () => {
const [searchInput, setSearchInput] = useState("");
const [sortKey, setSortKey] = useState("id");
const [sortOrder, setSortOrder] = useState("ASC");

const handleInputChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
};

const handleSortKeyChange = (e) => {
    setSortKey(e.target.value);
};

const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
};

const getPokemonList = (data, searchInput, sortKey, sortOrder) => {
    const ret = filterPokemon(data, searchInput);
    return sortPokemon(ret, sortKey, sortOrder);
};

return (
<div>
    <div id='search-bar'>
    <input  className="nes-input is-primary"
    type="search"
    placeholder="Search here"
    onChange={handleInputChange}
    value={searchInput} />

    <div id="filter-bar">
        <span className='nes-text'>Sort By</span> 
        <div id="sort-key" className="nes-select">
        <select value={sortKey} onChange={handleSortKeyChange}>
            <option value="id">ID</option>
            <option value="name">NAME</option>
        </select>          
        </div>
        <div id="sort-order" className="nes-select">
        <select value={sortOrder} onChange={handleSortOrderChange}>
        <option value="ASC">ASC</option>
        <option value="DESC">DESC</option>
        </select>          
        </div>

    </div>   

    </div>
    

    </div>
    )
};

export default Search;
  
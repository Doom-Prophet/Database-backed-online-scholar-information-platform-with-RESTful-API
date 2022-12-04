import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import NoMatch from "./NoMatch";
import PropTypes from 'prop-types';


// define sub component of Paper information of pokemon
const PaperItem = (props) => {
  return (
    <div>
      <h1>#{props.id} {props.name.charAt(0).toUpperCase() + props.name.slice(1)}</h1>
      <div id="Paper-subcontainer">  
        {["front_female", "back_default", "front_default", "front_shiny", "back_shiny", "front_shiny_female"].map((item, idx) => {
          if (props.data[item]) {
            let classname = "Paper-image " + (idx < 3 ? "is-flip" : "");
            return (
                        <img key={item} className={classname} src={props.data[item]} alt={item+props.name}></img>
                    )
          }
          return false;
          })}
      </div>
      <ul id="Paper-info">
        {props.data.types.map( (type) => { return (
          <li key={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</li>);})
        }        
      </ul>
    </div>
  );
};


// define navigation button Prev an Next
const NavButton = (props) => {
  if (props.type === "Prev" && props.id > 0) {
    return (<Link to={`../Paper/${props.id}`} id="prev" className="nes-btn">Prev</Link>);
  }
  else if (props.type === "Next" && props.id <= 898) {
    return (<Link to={`../Paper/${props.id}`} id="next" className="nes-btn">Next</Link>);
  }
    
};


// define the helper function that selects only the neccessary information
function normalizeList (data) {
  const types = [];
  for (let type in data.types) {
    types.push(data.types[type].type.name);
  }
  return  {
    name: data.name,
    id: data.id,
    types: types,
    front_default: data.sprites.front_default,
    front_shiny: data.sprites.front_shiny,
    back_default: data.sprites.back_default,
    back_shiny: data.sprites.back_shiny,
    front_female: data.sprites.front_female,
    front_shiny_female: data.sprites.front_shiny_female,
  };
}

normalizeList.propTypes = {
  data: PropTypes.array.isRequired
}


// define the main function of the Paper pages
const Paper = () => {
  let {id} = useParams();
  const [fetchStatus, setFetchStatus] = useState(false);
  const [fetchResult, setFetchResult] = useState({});
  const [isMatch, setIsMatch] = useState(true);

  const fetchPokemon = () => {
    if (!id) {
      setIsMatch(false);
      return;
    }
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    axios.get(url)
    .then(result => {
      if (!("data" in result)) {
        setIsMatch(false);
        return;
      }
      setFetchResult(normalizeList(result.data));
      setFetchStatus(true);
    })
    .catch((err) => {
      // console.log(err);
      setIsMatch(false);
    });
  }
  
  useEffect(fetchPokemon,[id]);

  if (!isMatch) {
    return <NoMatch />;
  }
  return (
  <div id="Paper-container" className="nes-container">
    <NavButton id={fetchResult.id - 1} type="Prev"/>
    <NavButton id={fetchResult.id + 1} type="Next"/>
    { fetchStatus ?
      <PaperItem key={fetchResult.id} id={fetchResult.id} name={fetchResult.name} data={fetchResult}/>
      : false
    }     
  </div>
  );
};

Paper.propTypes = {
  id: PropTypes.number
};

export default Paper;

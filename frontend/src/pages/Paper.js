import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import NoMatch from "./NoMatch";
import PropTypes from 'prop-types';
import {paper} from "../data/mock_data";
import { Card } from "@mui/material";


// define the main function of the Paper pages
const Paper = () => {
  let {id} = useParams();

  return (
    <>
      <Card>
        <CardHeader></CardHeader>
      </Card>
    </>
  );
};

Paper.propTypes = {
  id: PropTypes.number
};

export default Paper;

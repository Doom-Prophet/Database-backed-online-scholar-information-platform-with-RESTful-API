import {useContext, useState} from 'react';
import {UserContext} from '../context/UserContext'
import {Link, Navigate} from "react-router-dom";

function UserProfile (props) {
    const { user } = useContext(UserContext);
    if (!user || !user.auth) return <Navigate to="/login" />;

    return (
        <>
            <h1>Hi, {user.name}</h1>
            <div id="fav-papers">

            </div>
            <div id="my-posts">

            </div>
        </>
    );
}

export default UserProfile;
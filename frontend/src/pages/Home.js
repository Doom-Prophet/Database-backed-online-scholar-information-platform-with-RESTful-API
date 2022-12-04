import { Outlet, Link } from "react-router-dom";
import {useContext} from 'react';
import {UserContext} from '../context/UserContext';



const Layout = () => {
  const { user, logout } = useContext(UserContext);
  return (
    <>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="search">Search</Link>
          </li>
          <li>
            <Link to="discuss">Discuss</Link>
          </li>
          <li>
            <Link to="profile">Profile</Link>
          </li>
          {user && user.auth ? <li>
            <button onClick={logout}>Log out</button>
          </li> : false}          
        </ul>
      </nav>      
    </div>


      <Outlet />      
    </>
  )
};

export default Layout;

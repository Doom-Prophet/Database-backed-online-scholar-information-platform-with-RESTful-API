import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="paper">Search</Link>
          </li>
          <li>
            <Link to="discuss">Discuss</Link>
          </li>
          <li>
            <Link to="profile">Profile</Link>
          </li>
        </ul>
      </nav>      
    </div>


      <Outlet />
    </>
  )
};

export default Layout;

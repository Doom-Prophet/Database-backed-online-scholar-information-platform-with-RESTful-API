import {createContext, useState} from 'react';
import axios from 'axios';

const UserContext = createContext({ email: '', name: '', field: '', auth: false });

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ email: '', name: '', field: '', auth: false });
  
    const login = (email, password) => {
    
      setUser((user) => ({
        name: user.name,
        email: user.email,
        field: user.field,
        auth: true,
      }));
    };

    const signup = (user) => {
        setUser((user) => ({
            name: user.name,
            email: user.email,
            field: user.field,
            auth: true,
          }));
    };
  
    const logout = () => {
      setUser((user) => ({ email: '', name: '', field: '', auth: false }));
    };
  
    return (
      <UserContext.Provider value={{ user, login, signup, logout }}>
        {children}
      </UserContext.Provider>
    );
  };

export {UserContext, UserProvider};
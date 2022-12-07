import {createContext, useState} from 'react';


const UserContext = createContext({ email: '', name: '', field: '', auth: false });


const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ email: '', name: '', field: '', auth: false });
    
    const login = (user) => {
          setUser({
            id: user.id,
            name: user.name,
            email: user.email,
            field: user.field,
            auth: true,
          });
        };

    const signup = (user) => {
        setUser({
            id: user.id,
            name: user.name,
            email: user.email,
            field: user.field,
            auth: true,
          });
    };
  
    const logout = () => {
      setUser({ id:'', email: '', name: '', field: '', auth: false });
    };
  
    return (
      <UserContext.Provider value={{ user, login, signup, logout }}>
        {children}
      </UserContext.Provider>
    );
  };

export {UserContext, UserProvider};
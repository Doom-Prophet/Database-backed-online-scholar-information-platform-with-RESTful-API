import {createContext, useState} from 'react';


const UserContext = createContext();


const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [user_posts, setPosts] = useState([]);
    const [user_fav_papers, setPapers] = useState([]);
    
    const login = (user) => {
          setUser({
            id: user.id,
            name: user.name,
            email: user.email,
            field: user.field
          });
          setPapers(user.papers);
          setPosts(user.posts);
        };

    const signup = (user) => {
        setUser({
            id: user.id,
            name: user.name,
            email: user.email,
            field: user.field
          });
        setPapers(user.papers);
        setPosts(user.posts);
    };
  
    const logout = () => {
      setUser(null);
      setPapers([]);
      setPosts([]);
    };

    const addPost = (postID) => {
      const currposts = user_posts || [];
      setPosts([...currposts, postID]);
    }
    
    const removePost = (postID) => {

      setPosts(user_posts.filter((id) => id !== postID));
    }

    const addPaper = (paperID) => {
      const currpapers = user_fav_papers || [];
      setPapers([...currpapers, paperID]);
    }
  
    const removePaper = (paperID) => {
      setPapers(user_fav_papers.filter((id) => id !== paperID));
    }


    return (
      <UserContext.Provider value={{ user, user_posts, user_fav_papers, login, signup, logout, addPost, removePost, addPaper, removePaper }}>
        {children}
      </UserContext.Provider>
    );
  };

export {UserContext, UserProvider};
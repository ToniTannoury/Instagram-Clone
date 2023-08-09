import React from 'react';
import { useState , useEffect , useContext } from 'react';
import { FaSearch, FaBell, FaEnvelope } from 'react-icons/fa'; // Import the icons
import '../styles/Navbar.css';
import useDebounce from '../customHooks/useDebounce'
import UserContext from '../context/UserContext';
import UserSearchItem from './UserSearchItem';


const Navbar = () => {
  const [inputValue, setInputValue] = useState('');
  const debouncedSearchValue = useDebounce(inputValue, 700);
  const { userState , userDispatch } = useContext(UserContext);
  console.log(userState)
  useEffect(() => {
   
    const searchForUser = async()=>{
      const response = await fetch(`http://127.0.0.1:8000/api/user/search-users?query=${debouncedSearchValue}` , {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
  
      const data = await response.json();
      
      userDispatch({ type: 'SET_USERS_SEARCH_RESULTS', payload: data.users })
      return data;
    }
    searchForUser()
        
 
  }, [debouncedSearchValue]);
  return (
    <>
    <div className="navbar">
      <div className="navbar-left">
        <div className="search-input">
          <input type="text" placeholder="Search" value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}/>
          <FaSearch className="search-icon" />
        </div>
      </div>
      <div className="navbar-right">
        <FaBell className="navbar-icon" />
        <FaEnvelope className="navbar-icon" />
        <button className="add-photo-button">Add Photo</button>
      </div>
      

    </div>
      {debouncedSearchValue && userState.usersSearchResults.map(user=><UserSearchItem user={user} debouncedSearchVal={debouncedSearchValue}/>)}   
    </>
  );
}

export default Navbar;

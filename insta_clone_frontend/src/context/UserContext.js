import { createContext, useContext, useReducer } from "react";

const initialUserState = {
  user: null, 
  followingPictures: [],
  following:[],
  followers:[],
  posts:[],
  userposts:[],
  usersSearchResults: [], 
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_POSTS":
      return { ...state, posts: action.payload };
    case "SET_USER_POSTS":
      console.log(action.payload)
      if(action.payload.length==0){
        return { ...state, userposts: action.payload }
      }
      if(action.payload.length>1){
        return { ...state, userposts: action.payload }
      }
      return { ...state, userposts: [...state.userposts, action.payload] };
    case "SET_FOLLOWING":
      console.log(action.payload)
      return { ...state, following: action.payload };
    case "SET_FOLLOWERS":
     
      return { ...state, followers: action.payload };
    case "ADD_FOLLOWING":
      return { ...state, following: [...state.following, action.payload] }
    case "REMOVE_FOLLOWING":
      const updatedFollowing = state.following.filter(user => user.id !== action.payload.id);
      return { ...state, following: updatedFollowing };
    case "SET_FOLLOWING_PICTURES":
      return { ...state, followingPictures: action.payload };
    case "SET_USERS_SEARCH_RESULTS":
      return { ...state, usersSearchResults: action.payload };
    default:
      return state;
  }
};

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use UserContext
export default UserContext

import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../context/UserContext';
import "../styles/PofileInfoBar.css"
const PofileInfoBar = () => {
  const [profileInfo, setProfileInfo] = useState({
    followers: [],
    followings: [],
    posts: [],
  });
  
  const { userState , userDispatch } = useContext(UserContext);
  useEffect(() => {
    async function fetchProfileInfo() {
      try {
        const followersData = await getFollowers();
        const followingsData = await getFollowings();
        // const postsData = await getPosts();
      } catch (error) {
        console.error('Error fetching profile info:', error);
      }
    }

    fetchProfileInfo();
  }, []);

  const getFollowers = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/user/get-followers", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });

    const data = await response.json();
    userDispatch({ type: 'SET_FOLLOWERS', payload: data.followers})
    console.log(data)
    return data;
  }

  const getFollowings = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/user/get-followings", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });

    const data = await response.json();
    if(!data.error){
      userDispatch({ type: 'SET_FOLLOWING', payload: data.followings})
    }
    
    return data;
  }

  // const getPosts = async () => {
  //   const response = await fetch("http://127.0.0.1:8000/api/user/get-posts", {
  //     method: "GET",
  //     headers: {
  //       "Accept": "application/json",
  //       "Authorization": `Bearer ${localStorage.getItem("token")}`
  //     }
  //   });

  //   const data = await response.json();
  //   if(!data.error){
  //     userDispatch({ type: 'SET_POSTS', payload: data.posts})
  //   }
    
  //   return data;
 
  // }

  return (
    <div>
      <div className='profile-bar'>
        <div className='bar-division'>
          <p>Followers</p>
          <p>{userState.followers?.length}</p>
        </div>
        <div className='bar-division'>
        <p>Following</p>
          <p>{userState.following?.length}</p>
        </div>
        <div className='bar-division'>
          <p>Posts</p>
          <p>{userState.userposts?.length}</p>
        </div>
      </div>
    </div>
  )
}

export default PofileInfoBar;

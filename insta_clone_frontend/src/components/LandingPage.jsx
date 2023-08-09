import React from 'react'
import { useEffect  , useState ,useContext} from 'react'
import UserContext from '../context/UserContext'
import '../styles/LandingPage.css'
import PofileInfoBar from './PofileInfoBar'
import Navbar from './Navbar';
import Carousel from './Carousel'
import Post from './Post'
const LandingPage = () => {
  const [user , setUser] = useState('')
  const {userState , userDispatch}  = useContext(UserContext)
  console.log(userState)
  useEffect(()=>{
    setUser(getUser())
    getPosts()
  },[])
 
  const getUser = async()=>{
  
    const response = await fetch("http://127.0.0.1:8000/api/user/get-profile" , {
      method:"GET",
      headers:{
        "Accept":"application/json",
        "Authorization":`Bearer ${localStorage.getItem("token")}`
      }
    })
    
    const data = await response.json()
    setUser(data.user)
  }
  const getPosts = async()=>{
    const response = await fetch('http://127.0.0.1:8000/api/user/following-posts', {
      method:"GET",
      headers:{
        "Accept":"application/json",
        "Authorization":`Bearer ${localStorage.getItem("token")}`
      }
    })
    const data = await response.json()
    console.log('posts',data)
    userDispatch({ type: 'SET_POSTS', payload: data.following_posts})
  }
  
  return (
    <div className='landing-page'>
      <div className='left-side'>
        <div className='left-header'>
         <img className="image"  src={require("../assets/94409a775c02d7658dd6e7ba88429b63-removebg-preview.png")} />
         <h2 className='left-title'>Instagram</h2>
        </div>
        <div className="profile-image">
          <img  className="profile-pic-image"  src={`http://127.0.0.1:8000/images/${user.pic_url}`} />
        </div>
        <div className='left-names'>
          <h3>{user.username}</h3>
          <p>{user.name}</p>
        </div>
        <div>
          <PofileInfoBar/>
        </div>
      </div>
      <div className='right-container'>
      <div className='right-side'>
        <Navbar/>
        
        <Carousel followings={userState.following}/>
        {userState.posts.map((post)=>
          
          <Post post={post}/>
        )}
        
      </div>
     
      </div>
      
    </div>
  )
}

export default LandingPage

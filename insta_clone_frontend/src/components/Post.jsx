import React, { useState, useEffect } from 'react';
import '../styles/Post.css';
import { FaHeart } from 'react-icons/fa';

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
console.log(11111111111111111111111111111111111111111 , post)
  useEffect(() => {
    // Check if the user has liked the post and update the state
    const checkLiked = async()=>{
      const response = await fetch(`http://127.0.0.1:8000/api/user/posts/${post.id}/liked`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      const data = await response.json()
      setLiked(data.liked);
    }
    checkLiked()
  },[]);

  const handleLike = async () => {
    if (liked) {
      const response = await fetch(`http://127.0.0.1:8000/api/user/posts/${post.id}/unlike`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      setLikeCount(likeCount - 1);
    } else {
      const response = await fetch(`http://127.0.0.1:8000/api/user/posts/${post.id}/like`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      console.log(22222222222222222222222222,data)
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="post">
      <div className="post-header">
        <img className="user-avatar" src={`http://127.0.0.1:8000/images/${post.user.pic_url}`} alt="User Avatar" />
        <span className="username">{`${post.user.username}`}</span>
      </div>
      <div className="post-image">
        <img src={`http://127.0.0.1:8000/images/${post.image_url}`} alt="Post" />
      </div>
      <div className="post-likes">
        <button className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLike}>
          <span className={`heart-icon ${liked ? 'red-heart' : ''}`}>
            <FaHeart />
          </span>
        </button>
        {` ${likeCount} likes`}
      </div>
    </div>
  );
};

export default Post;

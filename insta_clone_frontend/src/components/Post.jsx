// import React, { useState } from 'react';
// import '../styles/Post.css';

// const Post = ({ post }) => {
//   const [liked, setLiked] = useState(false);
//   console.log(post)
//   const handleLike = () => {
//     setLiked(!liked);
//   };

//   return (
//     <div className='post'>
//       <div className='post-header'>
//         <img className='post-profile-pic' src={`http://127.0.0.1:8000/images/${post.image_url}`} alt='Profile' />
//         <span className='post-username'>{post.username}</span>
//       </div>
//       <img className='post-image' src={post.imageUrl} alt='Post' />
//       <div className='post-actions'>
//         <button className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLike}>
//           <span className='heart-icon'>{liked ? '❤️' : '♡'}</span>
//         </button>
//       </div>
//       <div className='post-caption'>
//         <span className='post-likes'>{post.likes} likes</span>
//         <span className='post-text'>{post.caption}</span>
//       </div>
//     </div>
//   );
// };

// export default Post;
import React from 'react';
import '../styles/Post.css'; // Create this CSS file to style your Post component

const Post = ({ post }) => {
  return (
    <div className="post">
      <div className="post-header">
        <img
          className="user-avatar"
          src={`http://127.0.0.1:8000/images/${post.user.pic_url}`}
          alt="User Avatar"
        />
        <span className="username">example_user</span>
      </div>
      <div className="post-image">
        <img src={`http://127.0.0.1:8000/images/${post.image_url}`} />
      </div>
      <div className="post-likes">Likes: 1000</div>
      <div className="post-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
        aliquam enim non bibendum.
      </div>
    </div>
  );
};

export default Post;

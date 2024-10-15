import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css' 
import { useContext, useRef } from "react";
import { PostList } from "../store/post-list-store";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {

  const navigate = useNavigate();
  const {addPost} = useContext(PostList)

  const userIDElement = useRef();
  const posttitleElement = useRef();
  const postbodyElement = useRef();
  const reactionsElement = useRef();
  // const likedElement = useRef();
  // const dislikedElement = useRef();
  const tagsElement = useRef();


  const handleSubmit = (event) => {

    event.preventDefault();


    const userID = userIDElement.current.value;
    const postTitle = posttitleElement.current.value; 
    const postBody = postbodyElement.current.value;
    const reactions = reactionsElement.current.value;
    // const likes = likedElement.current.value;
    // const dislikes = dislikedElement.current.value;
    const tags = tagsElement.current.value.split(' ');

    userIDElement.current.value = "";
    posttitleElement.current.value = "";
    postbodyElement.current.value = "";
    reactionsElement.current.value = "";
    // dislikedElement.current.value = "";
    // likedElement.current.value = "";
    tagsElement.current.value = ""

    fetch('https://dummyjson.com/posts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: postTitle,
        body: postBody,
        tags: tags,
        reactions: reactions,
        // likes: likes,
        // dislikes: dislikes,
        userId: userID,
    })
    })
    .then(res => res.json())
    .then(post => 
      addPost(post),
      
      navigate("/")
    );

  }

  
  return (

    <form className="create-post" onSubmit={handleSubmit}>
      <div className="mb-3">

        <label htmlFor="UserID" className="form-label">
          Enter User ID
        </label>
        <input
          ref={userIDElement}
          type="text"
          className="form-control"
          id="UserID"
          placeholder="Enter User Id"
        /> 

        <label htmlFor="title" className="form-label">
          Post Title
        </label>
        <input
          ref={posttitleElement}
          type="text"
          className="form-control"
          id="title"
          placeholder="Enter Title"
        />

        <label htmlFor="body" className="form-label">
          Post Body
        </label>
        <textarea
          ref={postbodyElement}
          rows="4"
          type="text"
          className="form-control"
          id="body"
          placeholder="Tell the Content"
        />

        <label htmlFor="reactions" className="form-label ">
          Number of Reactions
        </label>
        <input
          ref={reactionsElement}
          type="number"
          className="form-control w-50"
          id="reactions"
          placeholder="How many people liked this post"
        />
        
        <label htmlFor="tags" className="form-label">
          Add Tags
        </label>
        <input
          ref={tagsElement}
          type="text"
          className="form-control"
          id="tags"
          placeholder="Add tags to your posts"
        />
        
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>

    </form>
  );
};

export default CreatePost;

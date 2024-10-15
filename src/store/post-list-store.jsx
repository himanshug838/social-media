import { useCallback, useEffect, useState } from "react";
import { useReducer } from "react";
import { createContext } from "react";


export const PostList = createContext({
    postList: [],
    fetching: false,
    updatePost: () => {},
    addPost: () => {},
    deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
    let newPostList = currPostList;
  
    if (action.type === "ADD_POST") {
        newPostList = [action.payload, ...currPostList];
      } else if (action.type === "ADD_INITIAL_POSTS") {
      newPostList = action.payload.posts;
    } else if (action.type === "UPDATE_POST") {
      newPostList = currPostList.map((post) => post.id === action.payload.post.id ? action.payload.post : post);
    } else if (action.type === "DELETE_POST") {
      newPostList = currPostList.filter((post) => post.id !== action.payload.postId);
    } 
  
    return newPostList;
  };
  

const PostListProvider = ({children}) => {
    
    const[postList, dispatchPostList] = useReducer(postListReducer, [])
    const [fetching, setFetching] = useState(false)

   

    const addPost = (post) => {

        dispatchPostList({
            type: "ADD_POST",
            payload: post,
        })
    }

    const updatePost = useCallback((postId, updatedTitle) => {
        fetch(`https://dummyjson.com/posts/${postId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: updatedTitle })
        })
        .then(res => res.json())
        .then(updatedPost => {
            dispatchPostList({
                type: "UPDATE_POST",
                payload: { post: updatedPost },
            });
        });
    }, [dispatchPostList]);


    const addInitialPosts = useCallback((posts) => {
        dispatchPostList({
            type: "ADD_INITIAL_POSTS",
            payload:{
                posts
            } 
        })
    }, [dispatchPostList])

    const deletePost = useCallback((postId) => {
        fetch(`https://dummyjson.com/posts/${postId}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(() => {
            // Use correct payload to remove the post by its ID
            dispatchPostList({
              type: "DELETE_POST",
              payload: { postId }, // Make sure you pass the postId here
            });
          });
      }, [dispatchPostList]);
      

    useEffect(() => {

        const controller = new AbortController;
        const signal = controller.signal
    
        setFetching(true)
        fetch('https://dummyjson.com/posts', signal)
          .then((res) => res.json())
          .then((data)=> {
            addInitialPosts(data.posts);
            setFetching(false)
          });
    
          return () => {
            controller.abort()
          }
    
      }, []);



    return ( <PostList.Provider value={{ postList, fetching, addPost, deletePost, updatePost }}>
        {children}
    </PostList.Provider>
    )
}


export default PostListProvider;
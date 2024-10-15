import React, { useState, useContext } from "react";
import { MdDelete } from "react-icons/md";
import { PostList } from "../store/post-list-store";

const Post = ({ post }) => {
  const { deletePost, updatePost } = useContext(PostList);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(post.title);

  const handleEdit = () => {
    if (isEditing) {
      updatePost(post.id, newTitle);
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    deletePost(post.id);
  };

  return (
    <div className="card post-card">
      <div className="card-body">
        {isEditing ? (
          <div>
            <input
              style={{ marginRight: "20px" }}
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <button
              className=""
             onClick={handleEdit}>Update</button>
          </div>
        ) : (
          <h5 className="card-title">
            {post.title}
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              onClick={handleDelete} // Trigger handleDelete on delete icon click
              style={{ cursor: "pointer" }}
            >
              <MdDelete />
            </span>
            <span
              className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-primary"
              onClick={handleEdit}
              style={{ cursor: "pointer" }}
            >
              Edit Title
            </span>
          </h5>
        )}
        <p className="card-text">{post.body}</p>

        {post.tags.map((tag) => (
          <span key={tag} className="badge text-bg-primary hashtag">
            {tag}
          </span>
        ))}
        <div className="alert alert-success reactions" role="alert">
          This post has {post.reactions.likes} likes and {post.reactions.dislikes} dislikes.
        </div>
      </div>
    </div>
  );
};

export default Post;

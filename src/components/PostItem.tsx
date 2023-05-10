import React from "react";
import { IPost } from "../models/models";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { deletePost, fetchFriendsPosts, fetchLikePost } from "../store/actions/postsActions";
import { postImage } from "../config";

interface PostProps {
  post: IPost,
  owner: boolean
}

function PostItem({ post, owner }: PostProps) {

  const dispatch = useAppDispatch();
  const { access, id } = useAppSelector(state => state.auth);
  const { friends } = useAppSelector(state => state.auth);

  const isLiked = post.likes.some(i => i === id);

  const likeHandler = async () => {
    if (access) {
      await dispatch(fetchLikePost(post._id, access));
      await dispatch(fetchFriendsPosts(friends));
    }
  }

  const postLogo = post.image ? `${process.env.REACT_APP_BASE_URL + post.image }` : postImage;

  const deleteHandler = async () => {
    if (access) {
      await dispatch(deletePost(post._id, access));
    }
  }

  return (
    <li className="posts__card">
      <img src={postLogo}
        alt="фото новости" className="posts__image" />
      <p className="posts__desc">{post.description}</p>
      <div className="posts__bottom">
        <span className="posts__date">{post.date}</span>
        <div className="posts__likes">
          <button onClick={likeHandler}
                className={`posts__like posts__like_list ${isLiked && " posts__like_active"}`} ></button>
          {post.likes.length > 0 && <span className="posts__like-count">{post.likes.length}</span> }
        </div>
        {owner && <button className="posts__button" onClick={deleteHandler}>Удалить</button>}
      </div>
    </li>);
}

export default PostItem;

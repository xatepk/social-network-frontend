import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import avatarLogo from '../img/icons/auth/avatar.svg';
import { IUser } from "../models/models";
import { fetchOwnerPosts } from "../store/actions/postsActions";
import PostItem from "./PostItem";
import PostsFormSubmit from "./PostsFormSubmit";

interface ProfileProps {
  owner: boolean
  userData: IUser | null
}

function UserProfile({ owner = false, userData }: ProfileProps) {

  const dispatch = useAppDispatch();
  const { posts } = useAppSelector(state => state.posts);
  const { loading } = useAppSelector(state => state.auth);

  const avatarImage = userData?.avatar ? `${process.env.REACT_APP_BASE_URL + userData?.avatar}` : avatarLogo;

  useEffect(() => {
    (async () => {
      await dispatch(fetchOwnerPosts(userData?._id || ''));
    })()
  }, [dispatch, userData?._id])

  return (
    <>
      {loading && <p className="friends__desc">Идет загрузка, подождите, пожалуйста</p>}
      {!loading &&
        <>
          <div className="mainpage__user">
            {owner && <h2 className="mainpage__title">Добро пожаловать, {userData?.username}</h2>}
            <div className="mainpage__profile">
              <div className="mainpage__profile-desc">
                <img className="mainpage__avatar" src={avatarImage} alt="" />
                {!owner && !!userData?.username && <p className="mainpage__user-info">{userData.username}</p>}
                {!!userData?.age && <p className="mainpage__user-info">Возраст: {userData.age}</p>}
                {!!userData?.university && <p className="mainpage__user-info">Вуз: {userData.university}</p>}
              </div>
              {owner && <NavLink to='/profile' className='mainpage__profile-edit'></NavLink>}
            </div>
          </div>
          {owner && <PostsFormSubmit />}
          {posts.length === 0 && owner && <p className="posts__none">У вас пока нет ни одного опубликованного поста</p>}
          {posts.length === 0 && !owner && <p className="posts__none">Пользователь пока не опубликовал ни одного поста</p>}
          {posts.length > 0 &&
            <>
              <ul className="posts__list">
                {posts
                  .map((post) => <PostItem key={post._id} post={post} owner={owner} />)
                }
              </ul>
            </>
          }
        </>
      }
    </>
  );
}

export default UserProfile;

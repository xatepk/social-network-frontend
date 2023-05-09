import React from "react";
import { IUser } from "../models/models";
import avatarLogo from '../img/icons/auth/avatar.svg';
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchAddFriend, getUsers } from "../store/actions/authActions";
import { useNavigate } from "react-router-dom";

interface FriendProps {
  friend: IUser
  add: boolean
}

function FriendItem({friend, add}: FriendProps) {

  const navigate = useNavigate();

  const openUser = () => {
    navigate('/friends/' + friend._id);
  }

  const dispatch = useAppDispatch();
  const { access } = useAppSelector(state => state.auth);

  const avatarImage = friend.avatar ? `${process.env.REACT_APP_BASE_URL + friend.avatar}` : avatarLogo;

  const addHandler = () => {
    (async ()=> {
      await dispatch(fetchAddFriend(friend._id, access));
      await dispatch(getUsers());
    })();
  }

  return (
    <li className={`posts__card ${!add ? "friends__card" : ""}`}>
      <img src={avatarImage}
        onClick={openUser}
        alt="фото профиля"
        className={`friends__image ${!add ? "friends__image_ma" : ""}`} />
      <div className={`posts__bottom ${!add && "posts__bottom_none"}`}>
        <p className={`friends__name ${!add && "friends__name_mr"}`}>{friend.username}</p>
        {add && <button className="posts__button" onClick={addHandler}>Добавить</button>}
        {!add && <button className="posts__button" onClick={addHandler}>Удалить</button>}
      </div>
    </li>
   );
}

export default FriendItem;

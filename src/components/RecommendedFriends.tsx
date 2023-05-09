import React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getUsers } from "../store/actions/authActions";
import FriendItem from "./FriendItem";

function RecommendedFriends() {
  const dispatch = useAppDispatch();
  const { friends, recommend } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch])

  return (
    <div className="friends__recommended">
      {friends.length === 0 && <p className="friends__desc">Вы пока не добавили друзей, возможно, вам кто-то знаком из списка ниже</p>}
      {friends.length !== 0 &&
        <>
          <ul className="posts__list friends__list friends__list_row">
            {friends
              .map((friend) => <FriendItem key={friend._id} friend={friend} add={false} />)
            }
          </ul>
        </>
      }
      {recommend.length !== 0 &&
        <>
          <ul className="posts__list friends__list">
            {recommend
              .map((friend) => <FriendItem key={friend._id} friend={friend} add={true}/>)
            }
          </ul>
        </>
      }
    </div>
  );
}

export default RecommendedFriends;

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import UserProfile from "../components/UserProfile";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getUserDataById } from "../store/actions/authActions";

function FriendsDetailPage() {

  const params = useParams<'id'>();
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(getUserDataById(params.id!));
  }, [dispatch, params.id]);

  return (
    <section className="friend">
      <Navigation />
      <UserProfile owner={false} userData={userData}/>
    </section>
   );
}

export default FriendsDetailPage;

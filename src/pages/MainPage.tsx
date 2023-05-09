import React, { useEffect } from "react";
import Navigation from "../components/Navigation";
import UserProfile from "../components/UserProfile";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getUserDataById } from "../store/actions/authActions";

function MainPage() {

  const dispatch = useAppDispatch();
  const { userData, id } = useAppSelector(state => state.auth);

  useEffect(() => {
    (async () => {
      await dispatch(getUserDataById(id));
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <>
      <section className="mainpage">
        <Navigation />
        <UserProfile owner={true} userData={userData}/>
      </section>
    </>

   );
}

export default MainPage;

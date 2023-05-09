import React from "react";
import Navigation from "../components/Navigation";
import RecommendedFriends from "../components/RecommendedFriends";

function FriendsPage() {
  return (
    <section className="friends">
      <Navigation />
      <RecommendedFriends />
    </section>
   );
}

export default FriendsPage;

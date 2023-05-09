import React, { useEffect } from "react";
import Navigation from "../components/Navigation";
import PostItem from "../components/PostItem";
import RecommendedFriends from "../components/RecommendedFriends";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getUsers } from "../store/actions/authActions";
import { fetchFriendsPosts } from "../store/actions/postsActions";

function NewsPage() {

  const dispatch = useAppDispatch();
  const { friends } = useAppSelector(state => state.auth);
  const { filteredPosts } = useAppSelector(state => state.posts);

  useEffect(() => {
    async function fetchData() {
      await dispatch(getUsers());
      await dispatch(fetchFriendsPosts(friends));
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <section className="news">
      <Navigation />
      {friends.length === 0 && <RecommendedFriends />}
      {filteredPosts.length === 0 && friends.length !== 0 && <p className="friends__desc">Ваши друзья еще не опубликовали посты, возможно, они сделают это в скором времени</p>}
      {filteredPosts.length > 0 &&
            <>
              <ul className="posts__list news__list">
                {filteredPosts
                  .map((post) => <PostItem key={post._id} post={post} owner={false} />)
                }
              </ul>
            </>
          }
    </section>
   );
}

export default NewsPage;

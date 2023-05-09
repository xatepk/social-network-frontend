import React, { useState, useEffect } from "react";
import { IPost } from "../models/models";

interface InfiniteProps {
  data: IPost[]
  renderItem(item: IPost): JSX.Element;
}

const InfiniteScroll = ({ data, renderItem }: InfiniteProps) => {
  const [list, setList] = useState(data.slice(0, 3));
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      setLoading(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!loading) return;
    if (page * 6 >= data.length) return setLoading(false);
    setTimeout(() => {
      setList(list.concat(data.slice(page * 3, page * 3 + 3)));
      setPage(page + 1);
      setLoading(false);
    }, 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <>
      {list.map(renderItem)}
      {loading && <p>Loading...</p>}
    </>
  );
};

export default InfiniteScroll;


import React from "react";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { PostData } from "../models/models";
import { createPost, fetchOwnerPosts } from "../store/actions/postsActions";

interface FormValues {
  description: string;
  image: File | null ;
  id: string;
}

function PostsFormSubmit() {

  const dispatch = useAppDispatch();
  const { id } = useAppSelector(state => state.auth);

  const [postsData, setPostsData] = useState<FormValues>({image: null, description: '', id: ''});


  const changeHandler = async (event: ChangeEvent<HTMLInputElement>) => {

    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    const input = document.querySelector('.profiles__input-file');
    input?.classList.add('profiles__input-file-done');
    setPostsData({
      ...postsData,
      image: file,
    })
  };

  const submitHandler = useCallback( async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!postsData.description) return;

    await dispatch(createPost({...postsData, owner: id} as PostData));

    setPostsData({
      ...postsData,
      image: null,
      description: ''
    })

    const input = document.querySelector('.profiles__input-file');
    if (input?.classList.contains('profiles__input-file-done'))
    input?.classList.remove('profiles__input-file-done');

    await dispatch(fetchOwnerPosts(id));

  }, [dispatch, id, postsData]);

  useEffect(() => {
    setPostsData({
      ...postsData,
      id: id,
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <div className="posts posts__form">
      <form id="posts-form" method="POST" action="#" name="posts-form" noValidate onSubmit={submitHandler}>
        <div className="posts__form-group">
          <label htmlFor="description" className="posts__control-label">Ваше сообщение</label>
          <textarea
            value={postsData.description}
            id="description"
            name="description"
            className="posts__form-control"
            rows={5}
            placeholder="Сообщение" minLength={20} maxLength={500}
            required
            onChange={(e: React.FormEvent<HTMLTextAreaElement>) =>
              setPostsData({
                ...postsData,
                description: (e.target as HTMLTextAreaElement).value,
              })
            }></textarea>
        </div>
        <div className="posts__form-group">
          <label htmlFor="image" className="posts__control-label">Добавить изображение</label>
          <input  id="image" name="image" accept="img/*" type="file" placeholder="Загрузить изображение" className='profiles__input-file' value={''} onChange={changeHandler} />
        </div>
        <div className="posts__form-submit">
          <button type="submit" className="posts__form-button">Отправить</button>
        </div>
      </form>
    </div>
  );
}

export default PostsFormSubmit;

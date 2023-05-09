
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getUserData, uploadAvatar, uploadData } from '../store/actions/authActions';


const Profile = () => {

  const { access, age, university, loading } = useAppSelector(state => state.auth);
  const [inputAge, setInputAge] = useState<number>(0);
  const [inputUni, setInputUni] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const input = document.querySelector('.profiles__input-file');
    input?.classList.add('profiles__input-file-done');

    await dispatch(uploadAvatar(file, access));
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(uploadData({ age: inputAge, university: inputUni }, access))
    navigate('/');
  }

  useEffect(() => {
    dispatch(getUserData(access));
    if (!!age) setInputAge(age);
    setInputUni(university);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <>
      <Navigation />
      {!loading && <div className="auth__content profiles">
        <form method="POST" action="#" className="auth__form profiles__form" onSubmit={submitHandler}>
          <h2 className="auth__title profiles__title">Редактировать профиль</h2>
          <div className='profiles__input'>
            <p className="profiles__input-desc">Выберите фото профиля</p>
            <input accept="img/*" onChange={changeHandler} type="file" placeholder="Загрузить аватар" className='profiles__input-file' title=" " />
          </div>
          <div className='profiles__input'>
            <p className="profiles__input-desc">Сколько вам лет?</p>
            <input className='auth__form-item' type="string" placeholder="полных лет" value={inputAge} onChange={e => setInputAge(Number(e.target.value))} />
          </div>
          <div className='profiles__input'>
            <p className="profiles__input-desc">Вуз</p>
            <input className='auth__form-item' type="text" placeholder="наименование" value={inputUni} onChange={e => setInputUni(e.target.value)} />
          </div>
          <input className="auth__button-container profiles__button" type="submit" value="Сохранить" />
        </form>
      </div>}
    </>
  );
};

export default Profile;

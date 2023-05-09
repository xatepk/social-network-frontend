import { Link, useNavigate } from "react-router-dom";
import InputComponent from "../components/InputComponent";
import login from '../img/icons/auth/login.svg';
import password from '../img/icons/auth/password.svg';
import mail from '../img/icons/auth/mail.svg';
import { useFormWithValidation } from "../components/FormValidation";
import ReCAPTCHA from "react-google-recaptcha";
import React, { FormEvent } from "react";
import { useAppDispatch } from "../hooks/redux";
import { register } from "../store/actions/authActions";

function RegistrationPage() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    values,
    errors,
    isValid,
    handleChange
  } = useFormWithValidation({});

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(register(values));
    navigate('/');
  }


  return (
    <section className="register auth">
      <div className="auth__content register__con">
        <h2 className="auth__title auth__title_mb">Регистрация</h2>
        <form method="POST" action="#" className="auth__form" onSubmit={submitHandler}>
          <InputComponent
            value={values.username}
            onChange={handleChange}
            minLength={2}
            pattern="^[а-яА-ЯёЁa-zA-Z -]+$"
            name="username" type="text"
            placeholder="Ваше имя"
            img={login}
            error={errors.username} />
          <InputComponent
            value={values.email}
            onChange={handleChange}
            name="email" type="email"
            placeholder="Электронная почта"
            img={mail}
            error={errors.email} />
          <InputComponent
            value={values.password}
            onChange={handleChange}
            minLength={6}
            pattern="^[а-яА-ЯёЁa-zA-Z -._%+-@]+$"
            name="password"
            type="password"
            placeholder="Пароль"
            img={password}
            error={errors.password} />
          <InputComponent
            value={values.repeatpassword}
            onChange={handleChange}
            minLength={6}
            pattern="^[а-яА-ЯёЁa-zA-Z -._%+-@]+$"
            name="repeatpassword"
            type="password"
            placeholder="Повторите пароль"
            img={password}
            error={errors.repeatpassword} />

          <ReCAPTCHA
            sitekey={`${process.env.REACT_APP_RECAPTCHA_SITE_KEY}`}
          />

          <p className="auth__register auth__register_mt">Уже есть аккаунт?
            <Link to='/auth' className="auth__register-link"> Войдите</Link>
          </p>
          {!isValid && <button className="auth__form-error">Ошибка ввода</button>}
          <input className="auth__button-container auth__button-container_mt" type="submit" value="Зарегистрироваться" disabled={!isValid} />
        </form>
      </div>

    </section>
  );
}

export default RegistrationPage;

import { Link, useNavigate } from "react-router-dom";
import InputComponent from "../components/InputComponent";
import mail from '../img/icons/auth/mail.svg';
import password from '../img/icons/auth/password.svg';
import { useFormWithValidation } from "../components/FormValidation";
import React, { FormEvent } from "react";
import { useAppDispatch } from "../hooks/redux";
import { autorization } from "../store/actions/authActions";

function AuthPage() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    values,
    isValid,
    handleChange
  } = useFormWithValidation({});

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(autorization(values));
    navigate('/');
  }

  return (
    <section className="auth">
      <div className="auth__content">
        <h2 className="auth__title">Авторизация</h2>
        <p className="auth__desc">Авторизируйтесь, чтобы начать публиковать свои посты</p>
        <form method="POST" action="#" className="auth__form" onSubmit={submitHandler}>
          <InputComponent
            value={values.email}
            onChange={handleChange}
            name="email" type="email"
            placeholder="Электронная почта"
            img={mail} />
          <InputComponent
            value={values.password}
            onChange={handleChange}
            minLength={6}
            pattern="^[а-яА-ЯёЁa-zA-Z -._%+-@]+$"
            name="password"
            type="password"
            placeholder="Пароль"
            img={password} />
          <div className="auth__form-que">
            <div className="auth__form-remember form-check form-switch">
              <input type="checkbox"
                className="auth__remember-radio form-check-input" role="switch" name="rememberMe" id="flexSwitchCheckChecked" />
              <label htmlFor="flexSwitchCheckChecked" className="auth__remember-label form-check-label">Запомнить меня</label>
            </div>
            <Link to='/' className="auth__form-link">Забыли пароль?</Link>
          </div>
          <input className="auth__button-container" type="submit" value="Войти" disabled={!isValid}/>
        </form>
        <p className="auth__register">Еще нет аккаунта?
        <Link to='/register' className="auth__register-link"> Создайте аккаунт</Link>
        </p>
      </div>

    </section>
   );
}

export default AuthPage;

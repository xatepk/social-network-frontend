import React from 'react';
import errorImg from '../img/icons/auth/error.svg';

interface InputComponentProps {
  value?: string;
  onChange?: (event: any) => void;
  minLength?: number;
  pattern?: string;
  type: string;
  name: string;
  placeholder: string;
  img: string;
  error?: any;

}

function InputComponent({
  type, name, placeholder,
  img, error, value, onChange,
  minLength, pattern}: InputComponentProps) {


  return (
    <div className={`auth__form-item ${error && "auth__form-item_error"}`}>
      <img src={img} alt="иконка инпута"
      className="auth__form-item-img" />
      {error && <img src={errorImg} alt="иконка ошибки" className='auth__form-input-error' /> }
      <input
      value={value}
      onChange={onChange}
      minLength={minLength}
      pattern={pattern}
      type={type}
      className="auth__form-input"
      required
      name={name} placeholder={placeholder} autoComplete="off" />
      {error === "Пароли не совпадают" && <span className="auth__form-password-error">Пароли не совпадают</span> }
    </div>
   );
}

export default InputComponent;

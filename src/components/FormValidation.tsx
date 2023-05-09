import React from "react";

export function useFormWithValidation(userData: any) {


  const [values, setValues] = React.useState(userData);
  const [errors, setErrors] = React.useState({ username: '', password: '', email: '', repeatpassword: '' });
  const [isValid, setIsValid] = React.useState(true);

  const handleChange = (event: any) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    if (name === 'repeatpassword') {
      if (values.password !== value) {

        setErrors({ ...errors, [name]: "Пароли не совпадают" });
      } else {
        setErrors({ ...errors, [name]: "" });
      }

    } else {
      setErrors({ ...errors, [name]: target.validationMessage });
    }
    setIsValid(target.closest("form").checkValidity());
  };

  return { values, handleChange, errors, isValid };
}

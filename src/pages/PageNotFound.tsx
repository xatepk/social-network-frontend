import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <section className="notfound">
      <h1 className="notfound__title">Ошибка 404</h1>
      <p className="notfound__desc">Возможно, у вас опечатка в адресе страницы, или её просто не существует</p>
      <Link to="/" className="notfound__back">Вернуться на главную</Link>
    </section>
  );
}

export default PageNotFound;

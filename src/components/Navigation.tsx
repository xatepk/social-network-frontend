import React from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";
import { authSlice } from "../store/slices/authSlice";

function Navigation() {

  const dispatch = useAppDispatch();

  const logoutHandler = (event: React.MouseEvent) => {
    event.preventDefault()
    dispatch(authSlice.actions.logout());
  }

  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink to="/" className={({ isActive }) => (isActive ? "navigation__link navigation__link_active" : "navigation__link")}>Профиль</NavLink>
        </li>
        <li className="navigation__item">
          <NavLink to="/friends" className={({ isActive }) => (isActive ? "navigation__link navigation__link_active" : "navigation__link")}>Друзья</NavLink>
        </li>
        <li className="navigation__item">
          <NavLink to="/news" className={({ isActive }) => (isActive ? "navigation__link navigation__link_active" : "navigation__link")}>Новости</NavLink>
        </li>
        <li className="navigation__item">
          <NavLink to="/auth" className={({ isActive }) => (isActive ? "navigation__link navigation__link_active" : "navigation__link")} onClick={logoutHandler}>Выйти</NavLink>
        </li>
      </ul>
    </nav>
   );
}

export default Navigation;

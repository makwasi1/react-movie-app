/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useContext } from "react";
import { Menu } from "antd";
import { Link, useHistory } from "react-router-dom";
import userContext from "../../../context/userContext";

function LoggedNav(props) {
  //using context api to handle logged in state
  const { userData, setUserData } = useContext(userContext);
  const history = useHistory();

  const logoutHandler = () => {
    setUserData({
      token: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/login");
  };
  if (!userData.token) {
    //!localstotage has a token
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <Link to="/login">Signin</Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/register">Signup</Link>
        </Menu.Item>
      </Menu>
    );
  } else {
      return(
    <Menu mode={props.mode}>
      <Menu.Item key="logout">
        <a onClick={logoutHandler}>Logout</a>
      </Menu.Item>
    </Menu>
      
      )}
}
export default LoggedNav;

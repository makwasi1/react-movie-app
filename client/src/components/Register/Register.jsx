import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import Icon from "@ant-design/icons";
import axios from "axios";
import {useHistory } from "react-router-dom"

const { Title } = Typography;

function Register(props) {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const history = useHistory()
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const reggedUser = {
      email: email,
      username: username,
      password: password,
      confirmpassword: confirmpassword,
    };
    const regUser = await axios.post(
      "https://movie-crispy.herokuapp.com/api/user/signup",
      reggedUser
    );
    console.log(regUser);
    history.push("/login");
  };

  return (
    <div className="app">
      <Title level={2}>Sign In</Title>
      <form onSubmit={onSubmit} style={{ width: "350px" }}>
        <Form.Item required>
          <Input
            id="username"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Enter your username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item required>
          <Input
            id="email"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Enter your email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>

        <Form.Item required>
          <Input
            id="password"
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Enter your password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item required>
          <Input
            id="checkpassword"
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Confirm your password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Checkbox
            id="rememberMe"
            onChange={handleRememberMe}
            checked={rememberMe}
          >
            Remember me
          </Checkbox>
          <div>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ minWidth: "100%" }}
            >
              Sign up
            </Button>
          </div>
          Or <a href="/login">Login!</a>
        </Form.Item>
      </form>
    </div>
  );
}

export default Register;

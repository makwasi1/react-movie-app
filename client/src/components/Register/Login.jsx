import React, { useState, useContext } from "react";
import { withRouter,useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import userContext from "../../context/userContext"
import axios from "axios"
// import Icon from "@ant-design/icons";

const { Title } = Typography;

function Login(props) {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const {setUserData} = useContext(userContext)
  const history = useHistory()

  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  const onSubmit = async (e)=>{
     e.preventDefault();
     const LoggedUser = {
      
       email: email,
       password: password
       
     };

     const loginRes = await axios.post(
       "https://movie-crispy.herokuapp.com/api/user/login",
       LoggedUser
     );

     setUserData({
       token: loginRes.data.token, 
       user: loginRes.data.user,
     })
     console.log(loginRes)
     localStorage.setItem("auth-token",loginRes.data.Token)
     // localStorage.setItem("userId",loginRes.data.user.id)
     history.push("/")
  }

  return (
    <div className="app">
      <Title level={2}>Log In</Title>
      <form onSubmit={onSubmit} style={{ width: "350px" }}>
        <Form.Item required>
          <Input
            rules={[
              {
                required: true,
                message: "Please input a valid email",
              },
            ]}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Enter your email"
            type="email"
          />
        </Form.Item>

        <Form.Item required>
          <Input
            id="password"
            rules={[
              {
                required: true,
                message: "Please provide a correct password",
              },
            ]}
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Enter your password"
            type="password"
            onChange={(e)=> setPassword(e.target.value)}
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
          <a
            className="login-form-forgot"
            href="/reset_user"
            style={{ float: "right" }}
          >
            forgot password
          </a>
          <div>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ minWidth: "100%" }}
            >
              Log in
            </Button>
          </div>
          Or <a href="/register">register now!</a>
        </Form.Item>
      </form>
    </div>
  );
}

export default withRouter(Login);

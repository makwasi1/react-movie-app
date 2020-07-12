import React, { useState } from "react";
import Headers from "./Header";
import LoggedNav from "./LoggedNav";
import { Drawer, Button } from "antd";
import Icon from "@ant-design/icons";
import "./nav.css";
//import { Link } from "react-router-dom";


function NavBar() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div className="menu__logo">
        <a href="/">Logo</a>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <Headers mode="horizontal" />
        </div>
        <div className="menu_rigth">
          <LoggedNav mode="horizontal" />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <Icon type="align-right" />
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <Headers mode="inline" />
          <LoggedNav mode="inline" />
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar
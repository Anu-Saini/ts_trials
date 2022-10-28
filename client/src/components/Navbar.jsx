import { Layout, Menu } from "antd";
import React, { useState } from "react";
import {Link } from 'react-router-dom';
const { Header, Footer, Sider, Content } = Layout;
const items = [
  {
    label: <a href="/">Home</a>,
    key: "home",
  },
  {
    label: <a href="/locations">Locations</a>, 
    key: "maps",
  },
  {
    label: <a href="/allanimals">All Animals</a>,
    key: "animals",
  },
  {
    label: <a href="/guess">Guess the Animal</a>,
    key: "game",
  },
  {
    label: (<a href="/login">login</a>),
    key: "login",
  },
  {
    label: (<a href="/register">Sign up</a>),
    key: "register",
  },
];

const Navbar = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
 
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    setCurrent(e.key);
    switch (e.key) {
      case "login": {
        setIsModalOpen(true);
        break;
      }
      case "game":
        {
          
          break;
        }

    }
  };
  return (
    <>
<Menu
            onClick={onClick}
            selectedKeys={[current]}
            items={items}
            mode="horizontal"
          />
      {/* <Layout>
        <Content>
         
        
          
        </Content>

        <Sider>
          <RightMenu />
        </Sider>
        <Sider></Sider>
      </Layout>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <LoginPage></LoginPage>
      </Modal> */}
    </>
  );
};
export default Navbar;

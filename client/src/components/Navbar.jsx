import { Layout, Menu } from "antd";
import React, { useState } from "react";
import {Link, useNavigate } from 'react-router-dom';
const { Header, Footer, Sider, Content } = Layout;




function Navbar() {
  var auth = false;;
  function checkForAuth(){
    const user = localStorage.getItem('user');
    if(user)
    {
      auth = true;
    }
    else{auth = false}

  }
  checkForAuth();
  const navigate = useNavigate();
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
    !auth ? 
    {
      label:(<a href="/signup">Sign Up</a>) ,
      key: "register",
    } : null,
    !auth ? 
     {
      label:  (<Link to="/login">Login</Link>),
      key: "login",
    } : null,
    auth ?
    {
      label: "Log Off" ,
      key: "logoff",
    } : null,  
    auth ?
    {
      label: "User" ,
      key: "new Animal",
    } : null,  
  ];
    const onClick = (e) => {
      setCurrent(e.key);
      if(e.key === 'logoff')
      {
        localStorage.clear();
        setCurrent("login");
        navigate("/login");
      }
    };
    const [current, setCurrent] = useState("mail");
  
  return (
    <>
<Menu        onClick={onClick}
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

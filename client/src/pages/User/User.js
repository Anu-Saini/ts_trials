import { Tabs } from 'antd';
import React from 'react';
import NewAnimal from './NewAnimal';



const User = () => (


  <Tabs defaultActiveKey="1">
    <Tabs.TabPane tab="Add New" key="1">
      <NewAnimal></NewAnimal>
    </Tabs.TabPane>
    <Tabs.TabPane tab="User Added" key="2">
      Content of Tab Pane 2
    </Tabs.TabPane>
   
  </Tabs>
);
export default User;
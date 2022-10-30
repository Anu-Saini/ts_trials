import { Tabs } from 'antd';
import React from 'react';
import AnimalsByUser from './AnimalsByUser';
import NewAnimal from './NewAnimal';



const User = () => (


  <Tabs defaultActiveKey="1" centered>
    <Tabs.TabPane tab="Add New" key="1">
      <NewAnimal></NewAnimal>
    </Tabs.TabPane>
    <Tabs.TabPane tab="Animals" key="2">
      <AnimalsByUser/>
    </Tabs.TabPane>
  </Tabs>
);
export default User;
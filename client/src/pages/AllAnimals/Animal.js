import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';
import React from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_PROFILES } from '../../queries/AnimalQuery';
import './Animals.css'



const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
const AllAnimals = () => {
  const { loading, data } = useQuery(QUERY_PROFILES);
  if(loading)
  {
    return (<div> Loading.....</div>)
  }
  else{
  return ( 
<div className='aniaml-list-container'>
  <List
    itemLayout="vertical"
    size="large"
   
    dataSource={data.animals}

    renderItem={(item) => (
      <List.Item
        key={item._id}
        actions={[
          <p>Typically found in {item.location.join(", ")}</p>
        ]}
        extra={
          <img
            width={272}
            height={272}
            alt={item.animalName}
            src={item.image[1]}
          />
          
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.image[0]} />}
          title={<a href={item.href}>{item.animalName}</a>}
          description={item.family} 
          
        />
        {item.description}
      </List.Item>
    )}
  /></div>)
      }};
export default AllAnimals;
import { Col, Row } from "antd";
import React from "react";
import { Avatar, List, Space } from 'antd';
function AnimalList(props) {
    debugger
    const data = props.props.map((_, i) => ({
        href: 'https://ant.design',
        title: _.animalName,
        
        family:
          _.family,
        content:
        _.description
      }));
  return (<> 
    <List
    itemLayout="vertical"
    size="large"
   
    dataSource={data}

    renderItem={(item) => (
      <List.Item
        key={item.title}
        // actions={[
        //   <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
        //   <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
        //   <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        // ]}
        extra={
          <img
            width={272}
            alt="logo"
            src={item.image[0]}
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />
);

  </>);
}
export default AnimalList;

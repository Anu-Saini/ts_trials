import { LikeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar, List, Space, notification } from "antd";
import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  ANIMAL_BY_USER,
  DELETE_ANIMAL,
  QUERY_PROFILES,
} from "../../queries/AnimalQuery";
import { Button, Radio } from "antd";
import "../AllAnimals/Animals.css";
import { Image } from "antd";
import NewAnimal from "./NewAnimal";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const openNotification = (message, title) => {
  notification.open({
    message: title,
    description: message,
    onClick: () => {
      console.log("Notification Clicked!");
    },
  });
};

function AnimalsByUser() {
  const [userEmail, setUserEmail] = useState(
    JSON.parse(localStorage.getItem("user")).email
  );
  const [size, setSize] = useState("small");
  const { loading, data } = useQuery(ANIMAL_BY_USER, {
    variables: {
      animalId: userEmail,
    },
  });

  const [DeleteAnimal, { dataDelete, loadingDelete, error }] =
    useMutation(DELETE_ANIMAL);

  async function deleteAnimal(e) {
    console.log(e);
    try {
      const { temp } = await DeleteAnimal({
        variables: {
          animalId: e,
        },
      }).then((data) => {
        openNotification(
          `${data.data.deleteAnimal.animalName} has been deleted`,
          "Success"
        );
        window.location.reload();
      });
    } catch (err) {
      console.error(err.message);
    }
  }

  function editAnimal(e) {
    
  }

  const animalData = data || undefined;
  if (!loading && animalData) {
    return (
      <div className="aniaml-list-container">
        <List
          itemLayout="vertical"
          size="large"
          dataSource={animalData.animal}
          renderItem={(item) => (
            <List.Item
              key={item._id}
              actions={[
                <div>
                  <Button
                    type="primary"
                    shape="round"
                    icon={<DeleteOutlined />}
                    size={size}
                    onClick={() => {
                      editAnimal(item._id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    type="primary"
                    shape="round"
                    icon={<EditOutlined />}
                    size={size}
                    onClick={() => {
                      deleteAnimal(item._id);
                    }}
                  >
                    Delete
                  </Button>
                </div>,
              ]}
              extra={item.image.map((img) => {
                return (
                  <Image
                    width={100}
                    height={100}
                    alt={item.animalName}
                    src={img}
                  />
                );
              })}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.image[0]} />}
                title={<a href={item.href}>{item.animalName}</a>}
                description={item.family}
              />
              {item.description}
            </List.Item>
          )}
        />
      </div>
    );
  } else {
    return <div> Loading.....</div>;
  }
}
export default AnimalsByUser;

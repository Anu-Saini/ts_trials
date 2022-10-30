import { LikeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar, List, Space, notification, Modal  } from "antd";
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
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const showModal = () => {
      setOpen(true);
    };
    const handleOk = () => {
      setModalText('The modal will be closed after two seconds');
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 2000);
    };
    const handleCancel = () => {
      console.log('Clicked cancel button');
      setOpen(false);
    };
  const [userEmail, setUserEmail] = useState(
    JSON.parse(localStorage.getItem("user")).email
  );
  const [modalTitle, setmodalTitle] = useState("Update"  );
  
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
  const [animalToUpdate, setAnimalToUpdate] =  useState({});
  

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
                        deleteAnimal(item._id);
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    type="primary"
                    shape="round"
                    icon={<EditOutlined />}
                    size={size}
                    onClick={() => {
                        setAnimalToUpdate(item);  
                        setmodalTitle(item.animalName);
                        setOpen(true);
                      
                    }}
                  >
                    Edit
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
         <Modal
        title={modalTitle}
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        
       <NewAnimal props={animalToUpdate}></NewAnimal>
      </Modal>
      </div>
      
    );
  } else {
    return <div> Loading.....</div>;
  }
}
export default AnimalsByUser;

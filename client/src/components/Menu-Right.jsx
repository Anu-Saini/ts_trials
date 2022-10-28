import React  from "react";
import { AudioOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Input, Space } from 'antd';
import LoginMenu from "./loginMenu";


const RightMenu = () =>{
    const { Search } = Input;
    const onSearch = (searchText) =>{
        console.log(searchText);
    }
    return (
        <div>
              <Space direction="vertical">
                <Search
                    placeholder="input search text"
                    onSearch={onSearch}
                    style={{
                    margin: 10,    
                    width: 200,
                    }}
                />
             </Space>
           
        </div>
    )
}
export default RightMenu;
import React, { useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography, Space } from 'antd';
import { EditTwoTone, UploadOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { useEffect, useRef } from 'react';
import { getUsers, uploadIdentity, deleteUser, updateUser } from './UsersApi'
import { CheckCircleTwoTone } from '@ant-design/icons';
import UserDetailsModal from './UserDetailsModal';
import Highlighter from 'react-highlight-words';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const UserDetails = () => {

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [data, setData] = useState([]);
  const [enabled, setEnabled] = useState(false);
  const [phone, setPhone] = useState();
  const isEditing = (record) => record.id === editingKey;

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  useEffect(() => {
    getUsers(setData)
  }, []);  

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  

  

  const handleAdd = () => {
    setEnabled(!enabled)
  };

  const handleDelete = (key) => {
    const newData = data.filter((item) => item.id !== key);
    setData(newData);
    deleteUser(key)
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    console.log("uploading identiy")
    console.log(phone)
    uploadIdentity(phone, file, onSuccess, onError)
  }

  const edit = (record) => {
    form.setFieldsValue({
      created: '',
      name: '',
      age: '',
      phone: '',
      email: '',
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
        updateUser(key, row)
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const columns = [
    {
      title: "user details",
      render: (record) => (
        <React.Fragment>
          {record.created}
          <br />
          {record.name}
          <br />
          {record.age}
          <br />
          {record.id}
          <br />
          {record.email}
        </React.Fragment>
      ),
      responsive: ["xs"]
    },
    {
      title: 'created',
      dataIndex: 'created',
      width: '25%',
      editable: false,
      defaultSortOrder: 'ascend',
      sorter: (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime(),
      responsive: ["sm","md","xl","xxl"]
    },
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
      ...getColumnSearchProps('name'),
      responsive: ["sm","md","xl","xxl"]
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
      editable: true,
      sorter: (a, b) => a.age - b.age,
      responsive: ["sm","md","xl","xxl"]
    },
    {
      title: 'phone',
      dataIndex: 'id',
      width: '40%',
      editable: false,
      ...getColumnSearchProps('id'),
      responsive: ["sm","md","xl","xxl"]
    },
    {
      title: 'email',
      dataIndex: 'email',
      width: '40%',
      editable: true,
      responsive: ["sm","md","xl","xxl"]
    },
    {
      title: 'operation',
      dataIndex: 'delete',
      render: (_, record) =>
      data.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
            <DeleteOutlined style={{color:"#d42215", outline: 'none', paddingLeft: 22}}/>
          </Popconfirm>
        ) : null,
    },
    {
      title: 'edit',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            <EditTwoTone></EditTwoTone>
          </Typography.Link>
        );
      },
      responsive: ["sm","md","xl","xxl"]
    },
    {
        title: 'identity',
        dataIndex: 'identity_path',
        render: (_, record) => {
          if(record.identity_path === null){
            console.log(record)
            console.log(record.identity_path)
            setPhone(record.id)
            return (

                <Upload customRequest={customRequest}>
                  <Button style={{outline: 'none', border:'none', paddingRight: 15}} icon={<UploadOutlined  style={{color:"#52c41a", outline: 'none'}}/>}></Button>
                </Upload>
              
            );
          }else{
            return(
              <CheckCircleTwoTone twoToneColor="#52c41a"/>
            )
          }
          
        },
      },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  // console.log(data)
  return (
    
    <div style={{marginTop:20, height:'80pc'}}>
    <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button>
    {enabled?<UserDetailsModal/> : null}
    <Form form={form} component={false}>
        
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
    </div>
  );
};
export default UserDetails;
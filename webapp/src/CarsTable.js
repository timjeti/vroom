import React, { useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography, Space } from 'antd';
import { EditTwoTone, UploadOutlined, DeleteOutlined, SearchOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Button, Upload, Row, Col, Divider } from 'antd';
import { useEffect, useRef } from 'react';
import UserDetailsModal from './UserDetailsModal';
import Highlighter from 'react-highlight-words';
import CarApi, { getCars, updateCar, uploadCar } from './CarApi';
import NewCar from './NewCar';
import { logout } from './CarManager';

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
const CarsTable = () => {

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [data, setData] = useState([]);
  const [enabled, setEnabled] = useState(false);
  const [carId, seatCarId] = useState();
  const isEditing = (record) => record.car_id === editingKey;
  const [uploadRowKey, setUploadRowKey] = useState('')

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [showComponent, setShowComponent] = useState(false);
  const searchInput = useRef(null);

  useEffect(() => {
    getCars(setData)
  }, []);  

  const saveUploadKey = async (key) => {
    setUploadRowKey(key)
  }

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
    const newData = data.filter((item) => item.car_id !== key);
    setData(newData);
    CarApi.deleteCar(key)
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    console.log("uploading car photo")
    uploadCar(uploadRowKey, false, file, onSuccess, onError)
  }

  const edit = (record) => {
    form.setFieldsValue({
      car_number: '',
      name: '',
      price: '',
      car_type: '',
      available: '',
      ...record,
    });
    setEditingKey(record.car_id);
  };

  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.car_id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
        updateCar(key, row)
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
      title: 'car_number',
      dataIndex: 'car_id',
      width: '8%',
      editable: false,
      ...getColumnSearchProps('car_id'),
      responsive: ["xs","sm","md","xl","xxl"]
      // defaultSortOrder: 'ascend',
      // sorter: (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()
    },
    
    {
      title: "trip details",
      width: '10%',
      render: (record) => (
        <React.Fragment>
          {record.car_name}
          <br />
          {record.car_price}
          <br />
          {record.car_type}
          <br />
          {record.available}
        </React.Fragment>
      ),
      responsive: ["xs"]
    },
    {
      title: 'name',
      dataIndex: 'car_name',
      width: '25%',
      editable: true,
      ...getColumnSearchProps('car_name'),
      responsive: ["sm","md","xl","xxl"]
    },
    {
      title: 'price',
      dataIndex: 'car_price',
      width: '15%',
      editable: true,
      sorter: (a, b) => a.car_price - b.car_price,
      responsive: ["sm","md","xl","xxl"]
    },
    {
      title: 'car_type',
      dataIndex: 'car_type',
      width: '15%',
      editable: true,
      sorter: (a, b) => a.car_price - b.car_price,
      responsive: ["sm","md","xl","xxl"]
    },
    {
      title: 'available',
      dataIndex: 'available',
      width: '15%',
      editable: true,
      render: (_, record) => 
        record.available == 1 ? (
          <p> Available</p>
        ):
        (
          <p>Unavailable</p>
        ),
        responsive: ["sm","md","xl","xxl"]
    },
    {
      title: 'delete',
      dataIndex: 'delete',
      render: (_, record) =>
      data.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.car_id)}>
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
              onClick={() => save(record.car_id)}
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
    },
    {
        title: 'car_image',
        // dataIndex: 'car_path',
        render: (_, record) => {
          seatCarId(record.car_id)
            return (
              <Typography.Link >
                <Upload customRequest = {(record) => customRequest(record)} onChange={() => saveUploadKey(record.car_id)}>
                  <Button style={{outline: 'none', border:'none', paddingRight: 15}} icon={<UploadOutlined  style={{color:"#52c41a", outline: 'none'}}/>}></Button>
                </Upload>
                </Typography.Link>
            );
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

const toggleComponent = () => {
    setShowComponent(!showComponent);
};

const addCarSnip = () => {
  return(
    <Row>
    <Col>
      <Button onClick={toggleComponent}><PlusCircleFilled /> Add Car
      </Button>
      {showComponent && <NewCar/>}
    </Col>
  </Row>
  )
}
  return (
    
    <div style={{marginTop:20, height:'80pc'}}>
    <Divider orientation="center">Add or Update a Car</Divider>
    <Space direction="vertical" size="middle" style={{display: 'flex',}}>
      <Row>
        <Col>
            {addCarSnip()}
        </Col>
        <Col span={16}>
            {logout()}
        </Col>

      </Row>
      <Form form={form} component={false}>
          
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
          size="small"
          bordered={false}
        />
      </Form>
    </Space>
    </div>
  );
};
export default CarsTable;
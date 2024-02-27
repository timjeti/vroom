import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, InputNumber, Table, Popconfirm, message, Typography} from 'antd';
import { Button} from 'antd';
import { DeleteOutlined, SearchOutlined, CheckCircleOutlined, UpCircleOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { getAllTrips, updateTrip } from './UserTripsApi';
import UserTripModal from './UserTripModal';
import UserInfoDrawer from './UserInfoDrawer'
import { footerCollapse } from './store';
import { deleteTrip } from './UserTripsApi'
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


const info = () => {
  message.success('Trip has been verified');
};



const UserTrips = () => {

  const [form] = Form.useForm();
  const [enabled, setEnabled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [editingKey, setEditingKey] = useState('');
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [userId, setUserId] = useState('');
  const searchInput = useRef(null);
  const isEditing = (record) => record.key === editingKey;
  const dispatch = useDispatch();

  useEffect(() => {
      // Reset the collapse state to its default when the component is unmounted
      getAllTrips(setData)
      dispatch(footerCollapse(true));
      //Cleanup code below to reset footer state
      return () => {
        dispatch(footerCollapse(false)); // Assuming false is the default value
      };
      
  }, [dispatch]);
  
  const handleDelete = (key) => {
    const newData = data.filter((item) => item.id !== key);
    setData(newData);
    deleteTrip(key)
  };

  //for opening profile drawer
  const handleIdClick = (key) => {
    setUserId(key)
    setDrawer(!drawer)
  };

  const handleVerify = (key) => {
    const rowIndex = data.findIndex((item) => key === item.id);
    if (rowIndex > -1) {
      const oldData = [...data];
      oldData[rowIndex] = { ...oldData[rowIndex], approve: 1}
      setData(oldData);
      updateTrip(key, oldData[rowIndex])
    }
    info()
  };

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
  


  const cancel = () => {
    setEditingKey('');
  };
  const columns = [
    {
      title: "trip details",
      width: '10%',
      render: (record) => (
        <React.Fragment>
          {record.car_id}
          <br />
          {record.city}
          <br />
          {record.start}
          <br />
          {record.end}
        </React.Fragment>
      ),
      responsive: ["xs"]
    },

    {
      title: 'phone',
      // dataIndex: 'tenant_phone',
      width: '20%',
      editable: true,
      render: (record) => (
          <Typography.Link onClick={() => handleIdClick(record.tenant_phone)}>
              {record.tenant_phone}
          </Typography.Link>
      ),
      // ...getColumnSearchProps('tenant_phone'),
      responsive: ["xs","sm","md","xl","xxl"]
    },

    {
      title: 'car',
      dataIndex: 'car_id',
      width: '5%',
      editable: true,
      responsive: ["sm","md","xl","xxl"]
    },
    {
      title: 'trip',
      dataIndex: 'city',
      width: '8%',
      editable: true,
      responsive: ["sm","md","xl","xxl"]
    },
    {
      title: 'start',
      dataIndex: 'start',
      width: '19%',
      editable: true,
      responsive: ["sm","md","xl","xxl"]
    },
    {
      title: 'end',
      dataIndex: 'end',
      width: '19%',
      editable: true,
      responsive: ["sm","md","xl","xxl"]
    },
    {
      title: 'operation',
      width: '5%',
      render: (_, record) =>
      data.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
            <DeleteOutlined style={{color:"#d42215", outline: 'none', paddingLeft: 22}}/>
          </Popconfirm>
        ) : null,
    },
    {
      title: 'approve',
      width: '5%',
      dataIndex: 'approve',
      render: (_, record) => {
        const approved = (record.approve === 1)
        return approved ? (
                <CheckCircleOutlined style={{color:"#52c41a", outline: 'none', paddingLeft: 22}}/>
            ) :  (
              <Popconfirm title="Confirm Verification?" onConfirm={() => handleVerify(record.id)}>
                <Button type="primary" size="small" style={{backgroundColor:"#1B73E8"}}>Approve</Button>
              </Popconfirm>
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

  const handleAdd = () => {
    // console.log("Open modal")
    setEnabled(!enabled)
    //  return !enabled;
    
    };

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

    {enabled?<UserTripModal/> : null}
    {drawer? <UserInfoDrawer openCmd={drawer} userId={userId}/>: null}
    {/* <p>Hello</p> */}
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
    <UserInfoDrawer drawerState="true"/>
    </div>
  );
};
export default UserTrips;



  
//   export default NewCar;
import {
  BarChartOutlined,
  DownloadOutlined,
  FilterOutlined,
  IdcardOutlined,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Image, Input, Select, Space, Table } from "antd";
import { SyntheticEvent, useEffect, useState } from "react";

const UserListing = () => {
  const [fetchedData, setfetchedData] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [drawerData, setdrawerData] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  // console.log(drawerData.company.name);
  //   const [records, setRecords] = useState([]);

  const options = [
    {
      value: "aadhar card",
      label: "Aadhar",
    },
    {
      value: "pan card",
      label: "PAN",
    },
    {
      value: "voter id",
      label: "Voter Id",
    },
    {
      value: "Driving license",
      label: "Driving License",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const fetching = await fetch("https://dummyjson.com/users");
      const jsondata = await fetching.json();
      setfetchedData(jsondata);
      //   setRecords(jsondata);
    };

    fetchData();
  }, []);

  const base64Decode = (base64String: string) => {
    return JSON.parse(atob(base64String));
  };

  const data = localStorage.getItem("user-info");
  const dataArray = data ? base64Decode(data) : [];
  console.log("asdfghjkl;lkjhgfds", dataArray);

  useEffect(() => {
    // Filter data based on searchQuery
    if (searchQuery.trim() === "") {
      setFilteredData([]);
    } else {
      const filtered = fetchedData.users.filter((user: any) =>
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, fetchedData.users]);

  //   const rowSelection =

  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (record: any, data: any) => {
        return `${data.firstName} ${data.lastName}`;
      },
      width: "150px",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "150px",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "150px",
      key: "email",
    },
  ];

  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <section className="w-full">
        <div className="flex justify-between mx-5 mt-10 md:mx-20 ">
          <div>
            <h1 className="text-2xl">Users</h1>
            <p>Here are all the users for this project</p>
          </div>
          <Button className="hidden md:flex">+ Add user</Button>
        </div>
        <div className="searchBar flex">
          <div>
            <Input
              className="w-60 mt-10 mx-5 md:mx-20 rounded-3xl"
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={handleSearch}
            />
          </div>
          <div className="mt-10 flex">
            <FilterOutlined className="text-gray-300" />
            <p className="ml-3 mt-1 text-gray-300">filter</p>
          </div>
        </div>
        <div className="overflow-hidden p-5 w-full">
          <div className="min-[350px] overflow-x-auto">
            <Table
              className="custom-table"
              rowClassName={"border !m-5 !p-5"}
              columns={columns}
              dataSource={searchQuery ? filteredData : fetchedData?.users}
              rowKey="id"
              onRow={(record) => ({
                onClick: (e: SyntheticEvent) => {
                  setOpen(true);
                  setdrawerData(record);
                  console.log("event", e);
                  console.log("record", record);
                },
              })}
            />
          </div>
        </div>
        <Drawer
          title="User Details"
          onClose={() => {
            setOpen(false);
          }}
          open={open}
        >
          <div className="flex">
            <Image
              className="rounded-full"
              width={100}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
            <div className="ml-8 mt-5">
              <h1 className="text-lg">
                {drawerData.firstName} {drawerData.lastName}
              </h1>
              <p>Birth:- {drawerData.birthDate}</p>
            </div>
          </div>
          <div>
            <hr className="mt-4" />
            <div className="text-lg mt-5 flex">
              <UserOutlined />
              <p className="ml-3">Basic & account details</p>
            </div>
            <h1 className="text-lg mt-3">
              {drawerData?.firstName} {drawerData?.lastName}
            </h1>
            <p className="text-gray-500">Full name</p>
            <h1 className="text-lg mt-4">{drawerData?.company?.name}</h1>
            <p className="text-gray-500">{drawerData?.company?.title}</p>
          </div>
          <hr className="mt-5" />
          <div className="text-lg mt-5 flex">
            <BarChartOutlined />
            <p className="ml-3">User data</p>
          </div>
          <h1 className="text-base mt-3">
            Address:- {drawerData?.address?.address} ,{" "}
            {drawerData?.address?.city} ,
          </h1>
          <h1 className="text-base">{drawerData?.address?.state},</h1>
          <h1 className="text-base">{drawerData?.address?.postalCode}</h1>
          <h1 className="text-base mt-2">{drawerData?.address?.country}</h1>
          <div>
            <hr className="mt-5" />
            <div className="text-lg mt-5 flex">
              <IdcardOutlined />
              <p className="ml-3">Govt Id</p>
              <Button
                type="primary"
                className="ml-44"
                icon={<PlusOutlined />}
                size={"small"}
              />
            </div>
            <div className="mt-5">
              <Space.Compact>
                <Select defaultValue="aadhar card" options={options} />
                <Input defaultValue="" />
              </Space.Compact>
            </div>
          </div>
        </Drawer>
      </section>
    </>
  );
};

export default UserListing;

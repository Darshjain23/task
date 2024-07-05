import { Outlet, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

const Layout = () => {
  const navigate = useNavigate();

  const handleClearLocalStorage = () => {
    console.log("Clicked");
    localStorage.clear();
    navigate("/Login")
    console.log("cleared successfully!");
  };

  const items = [
    {
      key: "1",
      icon: (
        <DashboardOutlined
          onClick={() => {
            navigate("/Dashboard");
          }}
          style={{
            fontSize: "30px",
            color: "#08c",
            display: "flex",
            justifyContent: "center",
          }}
        />
      ),
    },
    {
      key: "2",
      icon: (
        <UserOutlined
          onClick={() => {
            navigate("/UserListing");
          }}
          style={{
            fontSize: "30px",
            color: "#08c",
            display: "flex",
            justifyContent: "center",
          }}
        />
      ),
    },
    {
      key: "3",
      icon: (
        <LogoutOutlined
          onClick={() => {
            // navigate("/Login");
            handleClearLocalStorage();
          }}
          style={{
            fontSize: "30px",
            color: "#08c",
            display: "flex",
            justifyContent: "center",
          }}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen flex">
      <div className="min-h-screen border hidden md:flex">
        <Menu
          style={{
            width: 100,
          }}
          //   defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          onChange={(e) => {
            console.log("menu", e);
          }}
          items={items}
        />
      </div>
      <div className="min-h-screen w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

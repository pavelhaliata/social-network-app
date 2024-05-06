import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UserOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Typography } from "antd";
import { Link, Outlet } from "react-router-dom";

const { Title } = Typography;

const { Header, Sider, Content, Footer } = Layout;

export const AppLayout = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: <Link to="/">Profile</Link>,
            },
            {
              key: "2",
              icon: <TeamOutlined />,
              label: <Link to="users">Users</Link>,
            },
            {
              key: "3",
              icon: <WechatOutlined />,
              label: "Chat",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 10,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <Title level={4} style={{ marginLeft: "auto" }}>
            Communication platform
          </Title>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            height: "100%",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center", color: "black" }}>
          ©{new Date().getFullYear()} Created by Pawl_H
          <a
            style={{ display: "block" }}
            href="https://github.com/pavelhaliata"
            target="_blank"
          >
            GitHub
          </a>
        </Footer>
      </Layout>
    </Layout>
  );
};

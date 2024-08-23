import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UserOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Typography } from "antd";
import { Link, matchPath, Outlet, useLocation } from "react-router-dom";

const { Title } = Typography;
const { Header, Sider, Content, Footer } = Layout;

const useRouteMatch = (patterns: readonly string[]) => {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }
  return null;
};

export const AppLayout = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const routeMatch = useRouteMatch(["self-profile", "users", "chat"]);
  const currentTab = routeMatch?.pattern?.path || "self-profile";

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="max-w-[1380px] m-auto max-h-full h-auto">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[currentTab]}
          items={[
            {
              key: "self-profile",
              icon: <UserOutlined />,
              label: <Link to="self-profile">Profile</Link>,
            },
            {
              key: "users",
              icon: <TeamOutlined />,
              label: <Link to="users">Users</Link>,
            },
            {
              key: "chat",
              icon: <WechatOutlined />,
              label: <Link to="chat">Chat</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className={`p-[10px] bg-${colorBgContainer} flex items-center`}
          style={{
            background: colorBgContainer,
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
            height: "100vh",
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

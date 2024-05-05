import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UserOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Typography } from "antd";
import { UsersPage } from "../../pages/usersPage";

const { Title } = Typography;

const { Header, Sider, Content, Footer } = Layout;

export const AppLayout = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [currentKey, setCurrentKey] = useState<"1" | "2" | "3">("1");

  const renderWindow = () => {
    switch (true) {
      case currentKey === "1": {
        return "Profile";
      }
      case currentKey === "2": {
        return <UsersPage />;
      }
    }
  };
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
              label: "Profile",
              onClick: () => {
                setCurrentKey("1");
              },
            },
            {
              key: "2",
              icon: <TeamOutlined />,
              label: "Users",
              onClick: () => {
                setCurrentKey("2");
              },
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
          {renderWindow()}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ©{new Date().getFullYear()} Created by Pawl_H
          <Typography>https://github.com/pavelhaliata</Typography>
        </Footer>
      </Layout>
    </Layout>
  );
};

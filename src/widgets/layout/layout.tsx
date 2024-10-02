import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UserOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { Link, matchPath, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import { TopProfileLink } from "../../shared/components/LogOutButton/TopProfileLink.tsx";
import { useLogoutMutation } from "../../features/auth/api/authApi.ts";
import { useUserProfileData } from "../../entities/selfProfile/lib/hooks/useUserProfileData.ts";

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

  const routeMatch = useRouteMatch(["self-profile", "users", "messenger"]);

  const currentTab = routeMatch?.pattern?.path || "";

  const userLogin = useAppSelector<string>(
    (state) => state.auth.authUserData.login,
  );
  const userPhoto = useAppSelector<string>(
    (state) => state.profile.selfProfile.photos.large,
  );
  const [logOut] = useLogoutMutation();

  useUserProfileData();

  const logOutHandler = () => {
    logOut().unwrap();
  };

  return (
    <Layout className="max-w-[1380px] m-auto">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {!collapsed && (
          <h2 className="text-center text-base font-semibold text-light-700 my-4">
            Communication <br /> platform
          </h2>
        )}
        <Menu
          className="my-4"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[currentTab]}
          items={[
            {
              key: "self-profile",
              icon: <UserOutlined />,
              label: <Link to="self-profile">My Profile</Link>,
            },
            {
              key: "users",
              icon: <TeamOutlined />,
              label: <Link to="users">Users</Link>,
            },
            {
              key: "messenger",
              icon: <WechatOutlined />,
              label: <Link to="messenger">Messenger</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className="p-2.5 bg-light-100 flex items-center justify-between">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="w-16 h-16"
            style={{
              fontSize: "16px", // TODO: разобраться со стилями
              width: 64,
              height: 64,
            }}
          />
          <TopProfileLink
            userLogin={userLogin}
            userPhoto={userPhoto}
            logOutCallback={logOutHandler}
          />
        </Header>
        <Content className="min-h-[85vh] my-6 mx-4 p-6 rounded-lg bg-light-100">
          <Outlet />
        </Content>
        <Footer className="flex items-center justify-center flex-col text-light-900">
          <p>©2024 Created by Pawl_H</p>
          <a
            className="block max-w-fit hover:text-primary-500 hover:underline hover:underline-offset-2"
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

import { Avatar, Dropdown, MenuProps, Modal } from "antd";
import { ExclamationCircleFilled, UserOutlined } from "@ant-design/icons";

const { confirm } = Modal;

type Props = {
  userLogin: string;
  userPhoto: string;
  logOutCallback: () => void;
};

export const TopProfileLink = ({
  userLogin,
  userPhoto,
  logOutCallback,
}: Props) => {
  const showConfirm = () => {
    confirm({
      title: "Log Out",
      icon: <ExclamationCircleFilled />,
      content: "Are you sure you want to log out?",
      onOk() {
        logOutCallback();
      },
      onCancel() {},
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div onClick={showConfirm}>Log Out</div>,
    },
  ];

  return (
    <div>
      <p className="text-light-900 inline mr-2 cursor-default">{userLogin}</p>
      <Dropdown menu={{ items }} trigger={["hover"]} placement="bottom">
        <Avatar
          size="large"
          src={userPhoto}
          icon={<UserOutlined />}
          className="cursor-pointer bg-primary-500"
        />
      </Dropdown>
    </div>
  );
};

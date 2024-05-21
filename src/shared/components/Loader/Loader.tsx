import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 54 }} spin />} />
    </div>
  );
};

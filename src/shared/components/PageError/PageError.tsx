import { Button, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;
export const PageError = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-primary-500 ">
      <div className="text-light-100 font-medium text-center p-2">
        <Title className="text-9xl mb-10">404</Title>
        <Paragraph className="text-2xl mb-20">
          We couldn’t find the page you were looking for. It may have been
          moved, or it just doesn’t exist.
        </Paragraph>
        <Button type="default" size="large" className="">
          <Link to="/self-profile">Go Back Home</Link>
        </Button>
      </div>
    </div>
  );
};

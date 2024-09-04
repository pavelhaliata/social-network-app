import { Button, Result } from "antd";
import { Link } from "react-router-dom";

export const PageError = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="We couldn’t find the page you were looking for. It may have been
                moved, or it just doesn’t exist."
      extra={
        <Button type="primary">
          {" "}
          <Link to="/self-profile">Back Home</Link>
        </Button>
      }
    />
  );
};

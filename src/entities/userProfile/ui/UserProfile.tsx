import { useParams } from "react-router-dom";
import {
  useGetUserProfileQuery,
  useGetUserStatusQuery,
} from "../service/userProfileApi.ts";
import { Avatar, Flex, Image, Popover, Typography } from "antd";
import { useEffect } from "react";
import {
  FacebookOutlined,
  GithubOutlined,
  InstagramOutlined,
  TwitterOutlined,
  UserOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { defaultUserLogo } from "../../../shared/assets";

type Props = {};

const Text = Typography;

export const UserProfile = ({}: Props) => {
  const { id: userId } = useParams();
  // const navigate = useNavigate();
  const {
    data: user,

    isSuccess,
  } = useGetUserProfileQuery(Number(userId));
  const { data: userStatus } = useGetUserStatusQuery(Number(userId));
  console.log(userStatus);
  useEffect(() => {
    if (isSuccess) {
    }
  }, [isSuccess]);

  return (
    <Flex gap={50}>
      <div className="overflow-hidden">
        <Image
          src={user?.photos.large}
          alt="user logo"
          fallback={defaultUserLogo}
          width={200}
          height={200}
          className="max-w-52 w-full object-cover rounded-lg"
        />
        <Avatar shape="square" size={64} icon={<UserOutlined />} />
        <div>
          <Text className="font-bold">Status: </Text>
          <Text>{userStatus}</Text>
        </div>
      </div>
      <Flex gap={10} className="flex-col">
        <div>
          <Text className="font-bold">Full Name: </Text>
          <Text>{user?.fullName}</Text>
        </div>
        <div>
          <Text className="font-bold">About Me: </Text>
          <Text>{user?.aboutMe}</Text>
        </div>
        <div>
          <Text className="font-bold">Job Description: </Text>
          <Text>{user?.lookingForAJobDescription}</Text>
        </div>
        <div>
          <Text className="font-bold">Social: </Text>
          // TODO: сделать в виде mapa
          <Flex className="gap-x-2">
            <Popover
              placement="bottomLeft"
              title={"Git Hub"}
              content={user?.contacts.github}
            >
              <a
                href={user?.contacts.github}
                target="_blank"
                className="p-1 rounded-md transition ease-in-out delay-150 hover:text-light-100 hover:bg-primary-500"
              >
                {user?.contacts.github && (
                  <GithubOutlined className="text-2xl" />
                )}
              </a>
            </Popover>
            <Popover
              placement="bottomLeft"
              title={"Facebook"}
              content={user?.contacts.facebook}
            >
              <a
                href={user?.contacts.facebook}
                target="_blank"
                className="p-1 rounded-md transition ease-in-out delay-150 hover:text-light-100 hover:bg-primary-500"
              >
                <FacebookOutlined className="text-2xl" />
              </a>
            </Popover>

            <a
              href={user?.contacts.twitter}
              target="_blank"
              className="p-1 rounded-md transition ease-in-out delay-150 hover:text-light-100 hover:bg-primary-500"
            >
              {user?.contacts.twitter && (
                <TwitterOutlined className="text-2xl" />
              )}
            </a>
            <a
              href={user?.contacts.instagram}
              target="_blank"
              className="p-1 rounded-md transition ease-in-out delay-100 hover:text-light-100 hover:bg-primary-500"
            >
              {user?.contacts.instagram && (
                <InstagramOutlined className="text-2xl" />
              )}
            </a>
            <a
              href={user?.contacts.youtube}
              target="_blank"
              className="p-1 rounded-md transition ease-in-out delay-150 hover:text-light-100 hover:bg-primary-500"
            >
              {user?.contacts.youtube && (
                <YoutubeOutlined className="text-2xl" />
              )}
            </a>
          </Flex>
        </div>
      </Flex>
    </Flex>
  );
};

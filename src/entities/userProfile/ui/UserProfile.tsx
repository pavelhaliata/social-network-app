import { useParams } from "react-router-dom";
import {
  useGetUserProfileQuery,
  useGetUserStatusQuery,
} from "../service/userProfileApi.ts";
import { Avatar, Flex, Image, Popover, Typography } from "antd";
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
  const { data: user } = useGetUserProfileQuery(Number(userId));
  const { data: userStatus } = useGetUserStatusQuery(Number(userId));

  // const socialIcons: { key: string; icon: React.ReactNode }[] = [
  //   { key: "github", icon: <GithubOutlined className="text-2xl" /> },
  //   { key: "facebook", icon: <FacebookOutlined className="text-2xl" /> },
  //   { key: "instagram", icon: <InstagramOutlined className="text-2xl" /> },
  //   { key: "twitter", icon: <TwitterOutlined className="text-2xl" /> },
  //   { key: "youtube ", icon: <YoutubeOutlined className="text-2xl" /> },
  // ];

  // const getSocialIcon = (iconKey: string) => {
  //   const obj = socialIcons.find((el) => el.key === iconKey);
  //   if (obj) return obj.icon;
  //   return false;
  // };
  // let key: SocialContacts = {};
  // if (user?.contacts) {
  //   const contacts = Object.entries(user.contacts);
  //   contacts.map((i) => {
  //     key = i[0];
  //     getSocialIcon(key);
  //   });
  // }

  return (
    <Flex gap={50}>
      <div className="overflow-hidden">
        {user?.photos.large ? (
          <Image
            src={user?.photos.large}
            alt="user logo"
            fallback={defaultUserLogo}
            width={200}
            height={200}
            className="max-w-52 w-full object-cover rounded-lg"
          />
        ) : (
          <Avatar shape="square" size={164} icon={<UserOutlined />} />
        )}
        <div>
          <Text className="font-bold">Status: </Text>
          <Text>{userStatus}</Text>
        </div>
      </div>
      <Flex gap={10} className="flex-col">
        <div>
          <Text className="font-bold">Full Name:</Text>
          <Text>{user?.fullName}</Text>
        </div>
        <div>
          <Text className="font-bold">About Me:</Text>
          <Text>{user?.aboutMe}</Text>
        </div>
        <div>
          <Text className="font-bold">Job Description: </Text>
          <Text>{user?.lookingForAJobDescription}</Text>
        </div>
        <div>
          <Text className="font-bold">Social: </Text>
          {/*TODO: сделать map*/}
          <Flex className="gap-x-2">
            {user?.contacts.github && (
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
                  <GithubOutlined className="text-2xl" />
                </a>
              </Popover>
            )}
            {user?.contacts.facebook && (
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
            )}
            {user?.contacts.twitter && (
              <Popover
                placement="bottomLeft"
                title={"Twitter"}
                content={user?.contacts.twitter}
              >
                <a
                  href={user?.contacts.twitter}
                  target="_blank"
                  className="p-1 rounded-md transition ease-in-out delay-150 hover:text-light-100 hover:bg-primary-500"
                >
                  <TwitterOutlined className="text-2xl" />
                </a>
              </Popover>
            )}
            {user?.contacts.instagram && (
              <Popover
                placement="bottomLeft"
                title={"Instagram"}
                content={user?.contacts.instagram}
              >
                <a
                  href={user?.contacts.instagram}
                  target="_blank"
                  className="p-1 rounded-md transition ease-in-out delay-100 hover:text-light-100 hover:bg-primary-500"
                >
                  <InstagramOutlined className="text-2xl" />
                </a>
              </Popover>
            )}
            {user?.contacts.youtube && (
              <Popover
                placement="bottomLeft"
                title={"YouTube"}
                content={user?.contacts.youtube}
              >
                <a
                  href={user?.contacts.youtube}
                  target="_blank"
                  className="p-1 rounded-md transition ease-in-out delay-150 hover:text-light-100 hover:bg-primary-500"
                >
                  <YoutubeOutlined className="text-2xl" />
                </a>
              </Popover>
            )}
          </Flex>
        </div>
      </Flex>
    </Flex>
  );
};

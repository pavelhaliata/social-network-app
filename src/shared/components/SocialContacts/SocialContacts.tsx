import { Popover, Typography } from "antd";
import {
  FacebookOutlined,
  GithubOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { UserSocialContacts } from "../../../entities/userProfile/types/userProfileType.ts";

const { Text } = Typography;

type Props = {
  contacts?: UserSocialContacts;
};

// Соответствие между именами контактов и их иконками
const contactDetails = {
  github: { icon: <GithubOutlined className="text-2xl" />, title: "GitHub" },
  facebook: {
    icon: <FacebookOutlined className="text-2xl" />,
    title: "Facebook",
  },
  twitter: { icon: <TwitterOutlined className="text-2xl" />, title: "Twitter" },
  instagram: {
    icon: <InstagramOutlined className="text-2xl" />,
    title: "Instagram",
  },
  youtube: { icon: <YoutubeOutlined className="text-2xl" />, title: "YouTube" },
};

export const SocialContacts = ({ contacts }: Props) => {
  const availableContacts = Object.keys(contactDetails).filter(
    (key) => contacts && contacts[key as keyof UserSocialContacts],
  );

  return (
    <>
      <Text className="block font-bold">Social: </Text>
      <div className="flex flex-wrap gap-x-2">
        {availableContacts.map((key) => {
          const contactLink = contacts?.[key as keyof UserSocialContacts];
          const { icon, title } =
            contactDetails[key as keyof typeof contactDetails];

          return (
            contactLink && (
              <Popover
                key={key}
                placement="bottomLeft"
                title={title}
                content={contactLink}
              >
                <a
                  href={contactLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 rounded-md transition ease-in-out delay-150 hover:text-light-100 hover:bg-primary-500"
                >
                  {icon}
                </a>
              </Popover>
            )
          );
        })}
      </div>
    </>
  );
};

import { UserProfileContacts } from "../service/types/userProfileTypes.ts";
import { Popover } from "antd";
import {
  FacebookOutlined,
  GithubOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

type Props = {
  contacts: UserProfileContacts | undefined;
};

export const SocialContacts = ({ contacts }: Props) => {
  return (
    <>
      {contacts?.github && (
        <Popover
          placement="bottomLeft"
          title={"Git Hub"}
          content={contacts?.github}
        >
          <a
            href={contacts?.github}
            target="_blank"
            className="p-1 rounded-md transition ease-in-out delay-150 hover:text-light-100 hover:bg-primary-500"
          >
            <GithubOutlined className="text-2xl" />
          </a>
        </Popover>
      )}
      {contacts?.facebook && (
        <Popover
          placement="bottomLeft"
          title={"Facebook"}
          content={contacts?.facebook}
        >
          <a
            href={contacts?.facebook}
            target="_blank"
            className="p-1 rounded-md transition ease-in-out delay-150 hover:text-light-100 hover:bg-primary-500"
          >
            <FacebookOutlined className="text-2xl" />
          </a>
        </Popover>
      )}
      {contacts?.twitter && (
        <Popover
          placement="bottomLeft"
          title={"Twitter"}
          content={contacts?.twitter}
        >
          <a
            href={contacts?.twitter}
            target="_blank"
            className="p-1 rounded-md transition ease-in-out delay-150 hover:text-light-100 hover:bg-primary-500"
          >
            <TwitterOutlined className="text-2xl" />
          </a>
        </Popover>
      )}
      {contacts?.instagram && (
        <Popover
          placement="bottomLeft"
          title={"Instagram"}
          content={contacts?.instagram}
        >
          <a
            href={contacts?.instagram}
            target="_blank"
            className="p-1 rounded-md transition ease-in-out delay-100 hover:text-light-100 hover:bg-primary-500"
          >
            <InstagramOutlined className="text-2xl" />
          </a>
        </Popover>
      )}
      {contacts?.youtube && (
        <Popover
          placement="bottomLeft"
          title={"YouTube"}
          content={contacts?.youtube}
        >
          <a
            href={contacts?.youtube}
            target="_blank"
            className="p-1 rounded-md transition ease-in-out delay-150 hover:text-light-100 hover:bg-primary-500"
          >
            <YoutubeOutlined className="text-2xl" />
          </a>
        </Popover>
      )}
    </>
  );
};

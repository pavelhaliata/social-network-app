import { ChangeEvent, useRef, useState } from "react";
import { Avatar, Button, Dropdown, MenuProps, Modal, Spin } from "antd";
import { EditTwoTone, LoadingOutlined, UserOutlined } from "@ant-design/icons";
import { UserProfile } from "../../users/types/userProfileType.ts";

type Props = {
  userProfile: UserProfile | null;
  isLoadingPhoto: boolean;
  onSubmitPhotoProfile: (
    file: File | Blob | string,
    closeModalCallback: () => void,
  ) => void;
};

export const EditPhotoProfile = ({
  userProfile,
  isLoadingPhoto,
  onSubmitPhotoProfile,
}: Props) => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | Blob | string>("");

  const onSubmitPhotoProfileHandler = () => {
    onSubmitPhotoProfile(file, () => {
      setIsOpenModal(false);
    });
  };

  const uploadPhotoProfileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setFile(event.target.files[0]);
      setProfilePhotoUrl(URL.createObjectURL(event.target.files[0]));
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }
    }
  };

  const showModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setProfilePhotoUrl(null);
  };

  const goBackHandler = () => {
    setProfilePhotoUrl(null);
  };

  const selectImageHandle = () => {
    inputFileRef.current?.click();
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <>
          <div onClick={showModal}>
            <EditTwoTone /> <span>Change profile photo</span>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="cursor-pointer">
      <Dropdown trigger={["hover"]} menu={{ items }} placement="bottom">
        {userProfile?.photos.large ? (
          <img
            src={userProfile.photos.large}
            alt="user logo"
            width={190}
            height={190}
            className="max-w-[200px] w-full object-cover rounded-lg inline"
          />
        ) : (
          <Avatar shape="square" size={164} icon={<UserOutlined />} />
        )}
      </Dropdown>
      <Modal
        title="Uploading a new photo"
        open={isOpenModal}
        onCancel={closeModal}
        footer={null}
        centered
      >
        {isLoadingPhoto && (
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10 rounded-lg flex items-center justify-center">
            <Spin indicator={<LoadingOutlined spin />} size="large" />
          </div>
        )}
        <div className="flex flex-col justify-center items-center gap-y-4 relative z-0">
          {profilePhotoUrl ? (
            <>
              <img
                src={profilePhotoUrl}
                alt="photo profile"
                className="w-60 h-60 object-cover block"
              />
              <div className="flex gap-x-10">
                <Button type="primary" onClick={onSubmitPhotoProfileHandler}>
                  Save changes
                </Button>
                <Button onClick={goBackHandler}>Go Back</Button>
              </div>
            </>
          ) : (
            <>
              <p>
                It will be easier for your friends to recognize you if you
                upload your real photo. You can upload the image in JPG, PNG
                format
              </p>
              <Button type="primary" onClick={selectImageHandle}>
                Select file
              </Button>
            </>
          )}
        </div>
      </Modal>
      <input
        ref={inputFileRef}
        className="hidden"
        type="file"
        accept="image*/,.png,.jpeg"
        onChange={uploadPhotoProfileHandler}
      />
    </div>
  );
};

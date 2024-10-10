import { ChangeEvent, useState } from "react";
import { Input, Popover } from "antd";

type Props = {
  status?: string;
  setStatus: (status: string) => void;
};
export const EditStatus = ({ status, setStatus }: Props) => {
  const [statusValue, setStatusValue] = useState<string>(status || "");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setStatusValue(e.target.value);
  };

  const editHandler = () => {
    setIsEditing(!isEditing);
  };

  const setStatusHandler = () => {
    if (statusValue) {
      setStatus(statusValue);
      setIsEditing(!isEditing);
    }
  };

  return (
    <div className="inline-block">
      {!isEditing ? (
        <Popover title="Click to edit status" placement="top" content={status}>
          <span onClick={editHandler} className="cursor-pointer">
            {statusValue}
          </span>
        </Popover>
      ) : (
        <Input
          value={statusValue}
          onChange={changeHandler}
          onBlur={setStatusHandler}
          type="text"
          autoFocus
        />
      )}
    </div>
  );
};

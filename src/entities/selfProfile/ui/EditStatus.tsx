import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { Input, Popover } from "antd";

type Props = {
  status?: string;
  setStatus: (status: string) => void;
};
export const EditStatus = ({ status, setStatus }: Props) => {
  const [statusValue, setStatusValue] = useState<string>(status || "");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (status) setStatusValue(status);
  }, [status]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setStatusValue(e.target.value);
  };

  const editHandler = () => {
    setIsEditing(!isEditing);
  };

  const keyDownHandler = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      setStatusHandler();
    }
  };

  const setStatusHandler = () => {
    setStatus(statusValue);
    setIsEditing(!isEditing);
  };

  return (
    <div className="inline-block">
      {!isEditing ? (
        <Popover
          title="Click to edit status"
          placement="top"
          content={statusValue}
        >
          <span onClick={editHandler} className="cursor-pointer">
            {statusValue}
          </span>
        </Popover>
      ) : (
        <Input
          variant="filled"
          value={statusValue}
          onChange={changeHandler}
          onBlur={setStatusHandler}
          onKeyDown={keyDownHandler}
          type="text"
          autoFocus
        />
      )}
    </div>
  );
};

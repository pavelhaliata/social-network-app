import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { Popover } from "antd";

const textEmptyStatus = "Enter your status...";

type Props = {
  status?: string;
  setStatus: (status: string) => void;
};
export const EditStatus = ({ status, setStatus }: Props) => {
  const [statusValue, setStatusValue] = useState<string>(
    status || textEmptyStatus,
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (status) setStatusValue(status);
    else setStatusValue(textEmptyStatus);
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
    if (statusValue !== status && statusValue) {
      // TODO: Переписать валидацию
      setStatus(statusValue);
    }
    setIsEditing(!isEditing);
    if (!statusValue) setStatusValue(textEmptyStatus);
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
        <input
          value={statusValue}
          onChange={changeHandler}
          onBlur={setStatusHandler}
          onKeyDown={keyDownHandler}
          type="text"
          autoFocus
          className="focus:outline-none border-b border-primary-700 w-auto bg-light-500 "
        />
      )}
    </div>
  );
};

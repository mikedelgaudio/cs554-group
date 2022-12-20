import { Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const Tag = ({
  style,
  text,
  removable,
  state,
}: {
  style?: string;
  text: string;
  removable: boolean;
  state?: Dispatch<SetStateAction<any>>;
}) => {
  let defaultStyle = style ? style : "text-blue-600 bg-blue-200";
  return (
    <span
      className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${defaultStyle} uppercase last:mr-0 mr-2`}
    >
      {text}
      {removable && (
        <FontAwesomeIcon onClick={state} icon={faXmark} className="ml-2" />
      )}
    </span>
  );
};

import { Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, IconDefinition } from "@fortawesome/free-solid-svg-icons";

export const Tag = ({
  style,
  text,
  removable,
  state,
  icon,
  url,
}: {
  style?: string;
  text: string;
  removable: boolean;
  state?: Dispatch<SetStateAction<any>>;
  icon?: IconDefinition;
  url?: string;
}) => {
  let defaultStyle = style ? style : "text-blue-600 bg-blue-200";
  return (
    <span
      className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${defaultStyle} uppercase last:mr-0 mr-2`}
    >
      {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
      {url ? (
        <a target="_blank" rel="noreferrer" href={url}>
          {text}
        </a>
      ) : (
        text
      )}
      {removable && (
        <FontAwesomeIcon onClick={state} icon={faXmark} className="ml-2" />
      )}
    </span>
  );
};

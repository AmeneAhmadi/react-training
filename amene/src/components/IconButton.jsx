import { useState } from "react";
import PropTypes from "prop-types";

const IconButton = ({ onClick, icon, hoverIcon, altText }) => {
  const [currentIcon, setCurrentIcon] = useState(icon);//handle icon

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setCurrentIcon(hoverIcon)}
      onMouseLeave={() => setCurrentIcon(icon)}
      className=" bg-no-repeat bg-center bg-cover w-[18px] h-[18px]"
      title={altText}
    >
      <img
        src={currentIcon}
        alt={altText}
        className="w-full h-full object-contain"
      />
    </button>
  );
};
export default IconButton;

IconButton.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.string,
  hoverIcon: PropTypes.string,
  altText: PropTypes.string,
};

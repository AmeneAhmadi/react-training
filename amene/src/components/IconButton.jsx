import { useState } from "react";
import PropTypes from "prop-types";

const IconButton = ({ onClick, icon, hoverIcon, altText }) => {
  //=======================================================================
  //state
  const [currentIcon, setCurrentIcon] = useState(icon);
  //=======================================================================

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setCurrentIcon(hoverIcon)}
      onMouseLeave={() => setCurrentIcon(icon)}
      className=" bg-no-repeat bg-center bg-cover w-[18px] h-[18px]"
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

//=======================================================================
//props types
IconButton.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.string,
  hoverIcon: PropTypes.string,
  altText: PropTypes.string,
};

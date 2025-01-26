import PropTypes from "prop-types";

const IconButton = (props) => {
  //=======================================================================
  //props
  const { onClick, icon, hoverIcon } = props;
  //=======================================================================
  
  return (
    <button
      onClick={onClick}
      className={`bg-[url(${icon})] hover:bg-[url(${hoverIcon})] bg-no-repeat bg-center bg-cover w-[18px] h-[18px]`}
    ></button>
  );
};
export default IconButton;
//=======================================================================
//props types
IconButton.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.string,
  hoverIcon: PropTypes.string,
};

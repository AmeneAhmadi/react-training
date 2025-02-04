import PropTypes from "prop-types";

const FilterButton = ({ onClick, value }) => {
  return (
    <button
      onClick={onClick}
      className="text-[#6c63ff] w-full text-left capitalize hover:bg-[#6c63ff] hover:bg-opacity-[0.2] p-1"
    >
      {value}
    </button>
  );
};
export default FilterButton;

FilterButton.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
};

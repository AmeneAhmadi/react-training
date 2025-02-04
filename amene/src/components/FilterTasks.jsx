import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import FilterButton from "./FilterButton";
const FilterTasks = ({ handleFilterChange, filter }) => {
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false); //show or hide filter dropdown
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isFilterDropdownOpen && dropdownRef.current) {
      dropdownRef.current.focus(); // focus on dropdown to enable onBlur event
    }
  }, [isFilterDropdownOpen]);

  const handleFilterClick = (value) => {
    handleFilterChange(value);
    setIsFilterDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsFilterDropdownOpen((prev) => !prev)}
        title="Filter Tasks"
        className="flex justify-between items-center uppercase text-white p-[10px] bg-[#6c63ff] gap-2 w-32 rounded-md hover:shadow-inner hover:bg-[#534cc2]  hover:shadow-[#6c63ff] "
      >
        <span>{filter}</span>
        <img src="./src/assets/icons/chevron-top.svg" alt="chevron" />
      </button>
      {isFilterDropdownOpen && (
        <div
          ref={dropdownRef}
          tabIndex={0}
          onBlur={() => setIsFilterDropdownOpen(false)}
          className="flex flex-col items-start gap-2 absolute top-full border border-[#6c63ff] w-32 bg-white rounded-md z-2"
        >
          <FilterButton value="all" onClick={() => handleFilterClick("all")} />
          <FilterButton
            value="complete"
            onClick={() => handleFilterClick("complete")}
          />
          <FilterButton
            value="incomplete"
            onClick={() => handleFilterClick("incomplete")}
          />
        </div>
      )}
    </div>
  );
};
export default FilterTasks;

FilterTasks.propTypes = {
  handleFilterChange: PropTypes.func,
  filter: PropTypes.string,
};

import { useState, useRef, useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";
import FilterButton from "./FilterButton";

const FilterTasks = () => {
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const { filter, handleFilterChange } = useContext(TaskContext);
  const dropdownRef = useRef(null);

  const handleFilterClick = (value) => {
    handleFilterChange(value);
    setIsFilterDropdownOpen(false);
  };

  return (
    <div
      className="relative"
      onBlur={(e) => {
        if (e.relatedTarget?.parentNode !== dropdownRef.current)
          setIsFilterDropdownOpen(false);
      }}
    >
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
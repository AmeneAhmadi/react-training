import { useState } from "react";
import Search from "./components/SearchTask";
import FilterButton from "./components/FilterButton";
import TaskList from "./components/TaskList";

import "./App.css";

function App() {
  //=======================================================================
  //states
  // const [tasks, setTasks] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false); //theme
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false); //show or hide filter dropdown
  const [filter, setFilter] = useState("all"); //filter tasks
  const [searchText, setSearchText] = useState(""); // search text

  //=======================================================================
  //change theme
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };
  //=======================================================================
  //show and hide filter dropdown
  const showFilterDropdown = () => {
    setIsFilterDropdownOpen((prev) => !prev);
  };
  //=======================================================================
  // change filter
  const handleFilterChange = (value) => {
    setFilter(value);
    setIsFilterDropdownOpen(false); // close dropdown after selection
  };
  //=======================================================================
  // handle search input change
  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  //=======================================================================
  return (
    <div
      className={`${
        isDarkMode ? "bg-[#252525]" : "bg-white"
      } pt-8 relative w-full h-full flex justify-center items-start`}
    >
      <div className="container flex justify-center flex-col gap-4 w-[750px]">
        <h1
          className={`${
            isDarkMode ? "text-white" : "text-black"
          } Kanit-Medium text-[26px] w-full text-center`}
        >
          TODO LIST
        </h1>
        {/* header */}
        <div className="flex justify-between items-center relative">
          <Search isDarkMode={isDarkMode} onSearchChange={handleSearchChange} />
          <div className="relative">
            <button
              onClick={showFilterDropdown}
              className="flex justify-between items-center uppercase text-white p-[10px] bg-[#6c63ff] gap-2 w-32 rounded-md hover:shadow-inner hover:bg-[#534cc2]  hover:shadow-[#6c63ff] "
            >
              <span>{filter}</span>
              <img src="./src/assets/icons/chevron-top.svg" alt="chevron" />
            </button>
            {isFilterDropdownOpen && (
              <div className="flex flex-col items-start gap-2 absolute top-full border border-[#6c63ff] w-32 bg-white rounded-md z-2">
                <FilterButton
                  value="all"
                  onClick={() => handleFilterChange("all")}
                />
                <FilterButton
                  value="complete"
                  onClick={() => handleFilterChange("complete")}
                />
                <FilterButton
                  value="incomplete"
                  onClick={() => handleFilterChange("incomplete")}
                />
              </div>
            )}
          </div>
          <button
            onClick={toggleTheme}
            className="flex justify-center items-center p-[10px] bg-[#6c63ff] hover:bg-[#534cc2]  rounded-md"
          >
            {isDarkMode ? (
              <img src="./src/assets/icons/sun.svg" alt="mode" />
            ) : (
              <img src="./src/assets/icons/moon.svg" alt="mode" />
            )}
          </button>
        </div>
        {/* to do list */}
        <TaskList
          isDarkMode={isDarkMode}
          filter={filter}
          searchText={searchText}
        />
      </div>
    </div>
  );
}

export default App;

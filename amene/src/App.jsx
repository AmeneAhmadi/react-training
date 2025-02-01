import { useState, useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import Search from "./components/SearchTask";
import FilterTasks from "./components/FilterTasks";
import TaskList from "./components/TaskList";

import "./App.css";

function App() {
  //=======================================================================
  //states
  const [filter, setFilter] = useState("all"); //filter tasks
  const [searchText, setSearchText] = useState(""); // search text
  const { isDarkMode, toggleTheme } = useContext(ThemeContext); //theme context
  //=======================================================================
  // change filter
  const handleFilterChange = (value) => {
    setFilter(value);
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
          {/* search */}
          <Search onSearchChange={handleSearchChange} />
          {/* filter */}
          <FilterTasks
            handleFilterChange={handleFilterChange}
            filter={filter}
          />
          {/* theme button */}
          <button
            onClick={toggleTheme}
            title="Change Theme"
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
        <TaskList filter={filter} searchText={searchText} />
      </div>
    </div>
  );
}

export default App;

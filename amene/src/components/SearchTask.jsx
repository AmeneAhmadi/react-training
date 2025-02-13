import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { TaskContext } from "../contexts/TaskContext";

const SearchTask = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { handleSearchChange } = useContext(TaskContext);

  return (
    <div
      className={`${
        isDarkMode ? "border-white" : "border-[#6c63ff]"
      } Kanit-Light w-3/4 flex items-center bg-transparent border py-2 px-4 rounded-md `}
    >
      <input
        id="searchInput"
        onChange={(e) => {
          handleSearchChange(e.target.value);
        }}
        type="text"
        className={`${
          isDarkMode
            ? "text-white placeholder-white caret-white"
            : "text-[#6c63ff] placeholder-[#c3c1e5] caret-[#6c63ff]"
        } w-[96%] outline-none bg-transparent `}
        placeholder="Search note..."
      />
      {isDarkMode ? (
        <img
          src="./src/assets/icons/magnifier-dark-mode.svg"
          alt="search"
          className="cursor-pointer"
        />
      ) : (
        <img
          src="./src/assets/icons/magnifier-light-mode.svg"
          alt="search"
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default SearchTask;

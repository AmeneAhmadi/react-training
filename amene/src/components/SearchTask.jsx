import PropTypes from "prop-types";
const Search = ({ isDarkMode, onSearchChange }) => {
  //=======================================================================
  //send search text to parent when text changes
  const handleInputChange = (e) => {
    onSearchChange(e.target.value);
  };
  //=======================================================================

  // Send search text to parent when the search icon is clicked
  // const handleSearchClick = () => {
  //   const inputElement = document.getElementById("searchInput");
  //   if (inputElement) {
  //     onSearchChange(inputElement.value);
  //   }
  // };
  //=======================================================================
  return (
    <div
      className={`${
        isDarkMode ? "border-white" : "border-[#6c63ff]"
      } Kanit-Light w-3/4 flex items-center bg-transparent border py-2 px-4 rounded-md `}
    >
      <input
        id="searchInput"
        onChange={handleInputChange}
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
          // onClick={handleSearchClick}
          className="cursor-pointer"
        />
      ) : (
        <img
          src="./src/assets/icons/magnifier-light-mode.svg"
          alt="search"
          // onClick={handleSearchClick}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default Search;

//=======================================================================
//props types
Search.propTypes = {
  isDarkMode: PropTypes.bool,
  onSearchChange: PropTypes.func,
};

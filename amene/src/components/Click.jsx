import { useState } from "react";
export const Click = () => {
  const [clickEvent, setClickEvent] = useState("");

  const handleParentClick = () => {
    setClickEvent((prev) => prev + "Parent Clicked!");
  };

  const handleChildClick = (e) => {
    e.stopPropagation();
    setClickEvent((prev) => prev + "Child Clicked!");
  };

  return (
    <>
      <div className="w-full flex justify-center items-center flex-col mb-5">
        <h1 className="mb-5">{clickEvent}</h1>
        <div
          onClick={handleParentClick}
          className="w-80 h-52 bg-sky-500 flex justify-center items-center"
        >
          <div
            onClick={handleChildClick}
            className="w-52 h-24 bg-pink-300 text-center flex items-center justify-center cursor-pointer"
          >
            Click me
          </div>
        </div>
      </div>
    </>
  );
};

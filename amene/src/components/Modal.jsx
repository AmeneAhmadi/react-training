import { useState } from "react";

export const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded border bg-sky-400"
      >
        Open Modal
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-80 bg-white p-6 rounded-md text-center"
          >
            <h2>Modal</h2>
            <p>
              Click inside{" "}
              <span className="underline font-bold">does not close modal.</span>
              In order to close this modal you should
              <span className=" underline font-bold"> click out side(parent div)!</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

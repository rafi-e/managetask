import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import useDarkMode from "../hooks/useDarkMode";
import boardsSlice from "../redux/boardsSlice";
import { TbLayoutBoardSplit, TbMoonFilled, TbSunFilled } from "react-icons/tb";

function HeaderDropDown({ setOpenDropdown, setIsBoardModalOpen }) {
  const dispatch = useDispatch();
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const boards = useSelector((state) => state.boards);

  return (
    <div
      className=" py-5 px-6 absolute left-0 right-0 bottom-[-100vh] top-16 dropdown "
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDropdown(false);
      }}
    >
      {/* DropDown Modal */}

      <div className="w-full md:w-3/4 py-4 md:absolute md:left-24 bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a] rounded-xl">
        <h3 className=" dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 ">
          ALL BOARDS ({boards?.length})
        </h3>

        <div className=" dropdown-borad  ">
          {boards.map((board, index) => (
            <div
              className={` flex items-center space-x-2 px-5 py-4 my-2  ${
                board.isActive &&
                " bg-[#635fc7] rounded-r-full text-white mr-8 "
              } `}
              key={index}
              onClick={() => {
                dispatch(boardsSlice.actions.setBoardActive({ index }));
              }}
            >
              <TbLayoutBoardSplit
                size={25}
                className=" filter-white text-gray-500"
              />{" "}
              <p className=" text-lg font-bold  ">{board.name}</p>
            </div>
          ))}
          <hr className="mx-5" />
          <div
            onClick={() => {
              setIsBoardModalOpen(true);
              setOpenDropdown(false);
            }}
            className=" flex items-center space-x-2  text-[#635fc7] px-5 py-4  "
          >
            <TbLayoutBoardSplit
              size={25}
              className=" filter-white text-gray-500"
            />
            <p className=" text-lg font-bold  ">Create New Board </p>
          </div>

          <div className=" mx-2  p-4  space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
            <TbSunFilled size={25} className=" text-gray-400" />

            <Switch
              checked={darkSide}
              onChange={toggleDarkMode}
              className={`${
                darkSide ? "bg-[#635fc7]" : "bg-gray-200"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  darkSide ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
            <TbMoonFilled size={22} className=" text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderDropDown;

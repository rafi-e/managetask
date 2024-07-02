import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";

import useDarkMode from "../hooks/useDarkMode";
import boardsSlice from "../redux/boardsSlice";
import AddEditBoardModal from "../modals/AddEditBoardModal";

import { FaEye, FaRegEyeSlash } from "react-icons/fa6";
import { TbLayoutBoardSplit, TbMoonFilled, TbSunFilled } from "react-icons/tb";

function Sidebar({ isSideBarOpen, setIsSideBarOpen }) {
  const dispatch = useDispatch();
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
    console.log(colorTheme);
  };

  const boards = useSelector((state) => state.boards);

  const toggleSidebar = () => {
    setIsSideBarOpen((curr) => !curr);
  };

  return (
    <div>
      <div
        className={
          isSideBarOpen
            ? `min-w-[261px] bg-white dark:bg-[#2b2c37]  fixed top-[72px] h-screen  items-center left-0 z-20`
            : ` bg-[#635FC7] dark:bg-[#2b2c37] dark:hover:bg-[#635FC7] top-auto bottom-16 hover:opacity-80 cursor-pointer  p-0 transition duration-300 transform fixed flex w-[56px] h-[48px] rounded-r-full  `
        }
      >
        <div>
          {/* reWrite modal  */}

          {isSideBarOpen && (
            <div className=" bg-white  dark:bg-[#2b2c37]    w-full   py-4 rounded-xl">
              <h3 className=" dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 ">
                ALL BOARDS ({boards?.length})
              </h3>

              <div className="  dropdown-borad flex flex-col h-[65vh]  justify-between ">
                <div>
                  {boards.map((board, index) => (
                    <div
                      className={` flex items-center space-x-2 px-5 mr-8 rounded-r-full duration-500 ease-in-out py-4 cursor-pointer hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white dark:hover:text-[#635fc7] dark:text-white  ${
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
                      <p className=" text-lg font-bold ">{board.name}</p>
                    </div>
                  ))}
                  <hr className="m-5 " />
                  <div
                    className=" flex  items-center space-x-2 mr-8 rounded-r-full duration-500 ease-in-out cursor-pointer text-[#635fc7] px-5 py-4 hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white  "
                    onClick={() => {
                      setIsBoardModalOpen(true);
                    }}
                  >
                    <TbLayoutBoardSplit
                      size={25}
                      className=" filter-white text-gray-500"
                    />
                    <p className=" text-lg font-bold  ">Create New Board </p>
                  </div>
                </div>

                <div className=" mx-2  p-4 relative space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
                <TbSunFilled size={25} className=" text-gray-400" />

                  <Switch
                    checked={darkSide}
                    onChange={toggleDarkMode}
                    className={`${
                      darkSide ? "bg-[#635fc7]" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
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
          )}

          {/* Sidebar hide/show toggle */}
          {isSideBarOpen ? (
            <div
              onClick={() => toggleSidebar()}
              className="mx-2  p-3 relative space-x-2 bg-slate-100 dark:bg-[#2c2d3a] flex justify-center items-center rounded-lg  text-lg font-bold  hover:text-[#635FC7] cursor-pointer hover:bg-[#635fc71a] dark:hover:bg-slate-300  text-gray-500 "
            >
              <FaRegEyeSlash size={25} className=" text-gray-400"/>
              {isSideBarOpen && <p> Hide Sidebar </p>}
            </div>
          ) : (
            <div className=" absolute p-3  " onClick={() => toggleSidebar()}>
              <FaEye size={25} className=" text-gray-400"/>
            </div>
          )}
        </div>
      </div>

      {isBoardModalOpen && (
        <AddEditBoardModal
          type="add"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}

export default Sidebar;

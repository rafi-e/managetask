import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import boardsSlice from "../redux/boardsSlice";
import HeaderDropDown from "./HeaderDropDown";
import ElipsisMenu from "./ElipsisMenu";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import DeleteModal from "../modals/DeleteModal";

import { FaChevronDown, FaChevronUp, FaPlus } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Logo from "../assets/images/logo-mobile.svg";

function Header({ setIsBoardModalOpen, isBoardModalOpen }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
    setIsElipsisMenuOpen(false);
    setBoardType("add");
  };

  const setOpenEditModal = () => {
    setIsBoardModalOpen(true);
    setIsElipsisMenuOpen(false);
  };
  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(boardsSlice.actions.deleteBoard());
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className=" p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0 ">
      <header className=" flex justify-between dark:text-white items-center  ">
        {/* Left Side  */}
        <div className=" flex items-center space-x-2  lg:space-x-4">
          <img src={Logo} alt=" Logo " className=" h-6 w-6" />
          <h3 className=" md:text-3xl  hidden lg:inline-block font-bold font-sans">
            ManageTask
          </h3>
          <div className=" flex items-center ">
            <h3 className=" truncate max-w-[200px] pb-1 md:text-2xl text-xl font-bold lg:ml-10 lg:-mb-2 font-sans lg:border-b-2 rounded-sm ">
              {board.name}
            </h3>
            <button className=" w-3 ml-3 lg:hidden" onClick={onDropdownClick}>
              {openDropdown ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            
          </div>
        </div>

        {/* Right Side */}

        <div className=" flex space-x-4 items-center md:space-x-6 ">
          <button
            className=" button hidden md:flex items-center justify-center text-center "
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
          >
            <FaPlus size={15} className="mx-1" /> Add Task
          </button>
          <button
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
            className=" button py-2 px-2 md:hidden "
          >
            <FaPlus size={15}/>
          </button>

          <HiOutlineDotsVertical
            size={30}
            className=" cursor-pointer text-gray-400"
            onClick={() => {
              setBoardType("edit");
              setOpenDropdown(false);
              setIsElipsisMenuOpen((prevState) => !prevState);
            }}
          />
          {isElipsisMenuOpen && (
            <ElipsisMenu
              type="Boards"
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          )}
        </div>

        {openDropdown && (
          <HeaderDropDown
            setOpenDropdown={setOpenDropdown}
            setIsBoardModalOpen={setIsBoardModalOpen}
          />
        )}
      </header>
      {isTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsTaskModalOpen}
          type="add"
          device="mobile"
        />
      )}

      {isBoardModalOpen && (
        <AddEditBoardModal
          setBoardType={setBoardType}
          type={boardType}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          type="board"
          title={board.name}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
    </div>
  );
}

export default Header;

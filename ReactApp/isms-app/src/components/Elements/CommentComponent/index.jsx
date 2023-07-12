import React from "react";
import classNames from "classnames/bind";
import styles from "./CommentComponent.module.scss";
import image from "../../../assets/images";
import { AiOutlineLock } from "react-icons/ai";

const CommentComponent = ({comment}) => {
  return (
    <div className="flex items-center mt-[0.5rem] mb-[1.5rem]">
      <div className="w-[2.25rem] h-[2.25rem] rounded-full overflow-hidden mr-[0.5rem]">
        <img
          className="w-full h-full object-cover object-center"
          src={comment.image}
          alt=""
        />
      </div>
      <div className="flex flex-col">
        <div className="flex justify-start">
          <span className="font-medium text-[#42526E] w-[7rem]">
            <a href="">{comment.username}</a>
          </span>
          <span className="text-[#747272] ">{comment.time}</span>
          {comment.isPersonal && <div className="ml-[5rem] flex justify-center items-center text-[#747272]">
            <AiOutlineLock className="mr-[0.5rem]" /> Personal
          </div>}
        </div>
        <div className="mt-[0.25rem] text-[#747272]">{comment.content}</div>
      </div>
    </div>
  );
};

export default CommentComponent;

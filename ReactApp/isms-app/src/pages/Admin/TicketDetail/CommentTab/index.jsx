import React, { useState, useRef, useEffect } from "react";
import CommentComponent from "../../../../components/Elements/CommentComponent";
import image from "../../../../assets/images";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { URL } from "../../../../utils/Url";
import { parseISO, format } from "date-fns";
import useAuth from "../../../../hooks/useAuth";

const CommentTab = ({ requestTicketId }) => {
  const [commentData, setCommentData] = useState([]);
  const axiosInstance = useAxiosPrivate();
  const {auth} = useAuth();
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await axiosInstance.get(
          `${URL.COMMENT_URL}/getall/${requestTicketId}`
        );
        console.log("comment");
        console.log(response.data);
        setCommentData(response.data);
      } catch (err) {
        alert("System error, sorry, please contact administrator: ", err);
      }
    };
    fetchComment();
  }, [axiosInstance]);

  const commentRef = useRef();
  const [checkPersonal, setCheckPersonal] = useState(false);
  const changeCommentType = (check) => {
    setCheckPersonal(check);
  };

  const handleClickCreate = () => {
    if (commentRef.current.value === "") return;
    const createComment = async () => {
      try {
        const response = await axiosInstance.post(`${URL.COMMENT_URL}/create`,{
            CommentText: commentRef.current.value,
            CommentBy: auth.userId,
            RequestTicketId: requestTicketId,
            IsInternal: checkPersonal,
        })
        console.log('comment');
        console.log(response.data);
        setCommentData((prev) => [
            response.data,
            ...prev,
          ]);
        commentRef.current.value = "";
      } catch (err) {
        alert("System error, sorry, please contact administrator: ", err);
      }
    };

    createComment()
  };

  return (
    <div>
      <div>
        <div className="w-[full] flex justify-center mt-[1rem]">
          <div
            onClick={(e) => {
              changeCommentType(false);
            }}
            className="cursor-pointer w-[25%] bg-[#42526E] text-center font-medium text-[#fff] rounded-md"
          >
            Customer
          </div>
          <div
            onClick={(e) => {
              changeCommentType(true);
            }}
            className="cursor-pointer ml-[3rem] w-[25%] bg-[#D4DAE4] text-center font-medium text-[#000000] rounded-md"
          >
            Personal
          </div>
        </div>
      </div>
      <div className="w-[full] px-[2rem] py-[0.75rem] ">
        <textarea
          ref={commentRef}
          rows={4}
          className="w-full h-full resize-none px-[0.75rem] py-[0.5rem] border-2 border-[#747272] rounded-md"
          placeholder="@ to tag someone"
        ></textarea>
      </div>

      <div className="flex justify-end px-[2rem]">
        {checkPersonal ? (
          <button
            onClick={handleClickCreate}
            className="px-[1rem] py-[0.25rem] bg-[#043AC5] font-medium text-[#fff]"
          >
            Add Personal
          </button>
        ) : (
          <button
            onClick={handleClickCreate}
            className="px-[1rem] py-[0.25rem] bg-[#043AC5] font-medium text-[#fff]"
          >
            Add Public
          </button>
        )}
        <button className="px-[1rem] py-[0.25rem] bg-[#fff] font-medium text-[#043AC5]">
          Cancel
        </button>
      </div>
      <div className="w-full mt-[1rem] px-[2rem] max-h-[50vh] overflow-y-scroll">
        {commentData.map((item) => (
          <CommentComponent key={item.id} comment={item} />
        ))}
      </div>
    </div>
  );
};

export default CommentTab;

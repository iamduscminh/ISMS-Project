import { React, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { URL } from "../../../utils/Url";
import IconTag from "../IconTag";
import Dropdown from "../Dropdown";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
function RequestComment({
  id,
  isAutoCmt,
  name,
  comment,
  time,
  userId,
  isIndividual,
  authObj,
}) {
  const axiosInstance = useAxiosPrivate();
  const [isMountComment, setIsMountComment] = useState(true);
  const [isUpdateComment, setIsUpdateComment] = useState(false);
  const [openDrdComment, setOpenDrdComment] = useState(false);

  const [commentValue, setCommentValue] = useState(comment);
  const [isValidComment, setIsValidComment] = useState(true);
  const [errorComment, setErrorComment] = useState();

  const commentUrl = `${URL.COMMENT_URL}`;
  const headers = {
    Authorization: `Bearer ${authObj?.accessToken}`,
    "Content-Type": "application/json",
    withCredentials: true,
  };
  const handleOpen = () => {
    setOpenDrdComment(!openDrdComment);
  };

  const handleEditCommentClick = () => {
    setIsUpdateComment(true);
    setOpenDrdComment(false);
  };
  const delComment = async () => {
    const apiDeleteCommentUrl = `${commentUrl}/delete/${id}`;
    const response = await axiosInstance.delete(apiDeleteCommentUrl, {
      headers,
    });
    if (response.data.errorCode == 0) setIsMountComment(false);
  };
  const handleDeleteCommentClick = () => {
    delComment();
    setOpenDrdComment(false);
  };
  const handleChangeComment = (e) => {
    const { value } = e.target;
    if (value.length > 1000) {
      setErrorComment("Comment must not exceed 1000 characters");
      setIsValidComment(false);
    } else {
      setErrorComment("");
      setIsValidComment(true);
      setCommentValue(value);
    }
  };
  const handleUpdateComment = (e) => {
    if (!isValidComment) return;
    try {
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      const apiUpdateCommentUrl = `${commentUrl}/update`;
      const commentDto = {
        commentId: id,
        commentText: commentValue,
      };
      axiosInstance
        .put(apiUpdateCommentUrl, JSON.stringify(commentDto), { headers })
        .then((response) => {
          if (response.data.errorCode == 0) {
            setCommentValue(commentValue);
            setIsUpdateComment(false);
          }
        })
        .catch((error) => {
          const result = Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error}`,
            showCancelButton: true,
            cancelButtonText: "Cancel",
          });
        });

      Swal.close();
    } catch (error) {
      // Handle errors if needed
      console.log(error);
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
    }
  };
  return (
    <>
      {isMountComment && !isUpdateComment && (
        <div className="flex p-2 w-[100%]">
          <div className="text-3xl">
            {isAutoCmt ? (
              <IconTag name={"RiCustomerService2Fill"} />
            ) : (
              <IconTag name={"FaUserCircle"} />
            )}
          </div>
          <div className="w-full mx-2 p-2 flex justify-between rounded-sm border">
            <div className="">
              {isAutoCmt && (
                <h5 className="text-lg font-bold">Automatic response</h5>
              )}
              {!isAutoCmt && (
                <Link className="header-nav-url" to={`/profile/${userId}`}>
                  <h5 className="text-lg font-bold">
                    {isAutoCmt ? "Automatic response" : name}
                  </h5>
                </Link>
              )}

              <p>{commentValue}</p>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">{time}</span>
              {isIndividual && (
                <>
                  <IconTag
                    name={"BsThreeDotsVertical"}
                    onClickHandle={handleOpen}
                    className={"hover:cursor-pointer"}
                  />
                  <Dropdown
                    open={openDrdComment}
                    menu={[
                      <button onClick={handleEditCommentClick}>Edit</button>,
                      <button onClick={handleDeleteCommentClick}>
                        Delete
                      </button>,
                    ]}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {isMountComment && isUpdateComment && (
        <div>
          <div className="w-[full] px-[2rem] py-[0.75rem] flex ">
            <div className="text-3xl">
              <IconTag name={"FaUserCircle"} />
            </div>
            <textarea
              defaultValue={commentValue}
              rows={3}
              className="w-full h-full resize-none mx-2 px-[0.75rem] py-[0.5rem] border-2 border-[#747272] rounded-md"
              placeholder="Typing your comment"
              onChange={handleChangeComment}
            ></textarea>
          </div>
          {errorComment && (
            <p className="w-[full] px-[2rem] py-[0.75rem] mt-2 text-sm text-red-600 ">
              {errorComment}
            </p>
          )}
          <div className="flex justify-end px-[2rem]">
            <button
              onClick={handleUpdateComment}
              className="px-[1rem] py-[0.25rem] mr-1 bg-[#043AC5] font-medium text-[#fff]"
            >
              Save
            </button>
            <button
              onClick={() => setIsUpdateComment(false)}
              className="px-[1rem] py-[0.25rem] bg-[#043AC5] font-medium text-[#fff]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
// onClick={handleOpen}
export default RequestComment;

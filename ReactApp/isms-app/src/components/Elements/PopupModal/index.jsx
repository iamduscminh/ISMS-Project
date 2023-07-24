import React from "react";
import { Modal, Button } from "react-bootstrap";

function ModalDialog({
  title,
  actionText,
  actionHandler,
  triggerComponent,
  children,
}) {
  const [isShow, invokeModal] = React.useState(false);
  const initModal = () => {
    return invokeModal(!isShow);
  };
  const onClickHandle = () => {
    actionHandler();
    invokeModal(!isShow);
  };
  return (
    <>
      <div onClick={initModal}>{triggerComponent}</div>
      <Modal show={isShow}>
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            onClick={actionHandler}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-[1rem] py-[0.5rem] mr-2 mb-2"
          >
            {actionText}
          </button>
          <button
            type="button"
            onClick={initModal}
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-[1rem] py-[0.5rem] text-center mr-2 mb-2 "
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalDialog;

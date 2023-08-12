import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const PromptComponent = (handleConfirm) => {
  const handlePrompt = async () => {
    const result = await MySwal.fire({
      title: "Enter something:",
      input: "text",
      inputPlaceholder: "Type here...",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
    });

    if (result.isConfirmed && result.value) {
      handleConfirm();
    }
  };

  return (
    <div>
      <button onClick={handlePrompt}>Open Prompt</button>
    </div>
  );
};

export default PromptComponent;

import * as Dialog from "@radix-ui/react-dialog";
import React from "react";
import GenerateForm from "./GenerateForm";

const BtnGenerateReport = ({ open, setOpen }) => {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="focus:outline-none">
        <div className="bg-[#DCE4FF] hover:bg-[#cfd3fd] px-[14px] py-3 space-x-1 flex items-center focus:outline-none">
          <span className="text-base">Generate report</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <path
              d="M23.5483 21.0938L19.6665 24.9634L18.5679 23.8647L20.5576 21.875H13.0625V20.3125H20.5576L18.5679 18.3228L19.6665 17.2241L23.5483 21.0938ZM15.3818 23.4375L16.9443 25H0.5625V0H14.1733L20.875 6.70166V15.6616L19.3125 14.0991V7.8125H13.0625V1.5625H2.125V23.4375H15.3818ZM14.625 6.25H18.2017L14.625 2.67334V6.25Z"
              fill="#111111"
            />
          </svg>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[#D9D9D950]" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[1000px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white focus:outline-none flex flex-col">
          <GenerateForm setOpen={setOpen} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default BtnGenerateReport;

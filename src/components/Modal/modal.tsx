import { forwardRef, ComponentProps } from "react";

import styles from "./modal.module.css";
import Button from "../Button/button";

interface ModalProps extends Omit<ComponentProps<"div">, "className"> {
  isOpen?: boolean;
  onHandle?: () => void;
  onClose?: () => void;
  header?: string;
  isHeader?: boolean;
  isFooter?: boolean;
}

const Modal = forwardRef<
  HTMLDivElement,
  ModalProps
>(({ isOpen, onHandle, onClose, header, isHeader = true, isFooter = true, children, ...rest }, ref) => {


  return (
    <>
      {/* <!-- Main modal --> */}
      <div ref={ref} tabIndex={-1} aria-hidden="true" className={`${isOpen ? 'flex' : 'hidden'} fixed top-0 left-0 right-0 z-50 w-full transition duration-200 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center`} {...rest}>
        <div className="relative w-full max-w-md max-h-full">
          {/* <!-- Modal content --> */}
          <div className={`relative bg-white rounded-lg shadow dark:bg-gray-700`}>
            <button type="button" onClick={onClose} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="crypto-modal">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Close modal</span>
            </button>
            {/* <!-- Modal header --> */}
            {isHeader &&
              <div className="px-6 py-4 border-b rounded-t dark:border-gray-600 text-left">
                <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                  {header}
                </h3>
              </div>
            }
            {/* <!-- Modal body --> */}
            <div className="p-6">
              {children}
            </div>

            {/* <!-- Modal footer --> */}
            {isFooter &&
              <div className={styles.modalFooter}>
                <Button colorType='primary' onClick={onHandle}>OK</Button>
                <Button colorType='secondary' onClick={onClose}>Close</Button>
              </div>
            }
          </div>
        </div>
      </div>
      <div className={`bg-gray-900 bg-opacity-50 dark:bg-opacity-90 fixed inset-0 z-40 transition duration-200 ${isOpen ? '' : 'hidden'}`}></div>
    </>
  );
});

export default Modal;

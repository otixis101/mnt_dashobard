/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable indent */
// components/Modal.tsx
// eslint-disable-next-line indent
import React, { ReactNode } from "react";

interface ModalProps {
    children: ReactNode;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => (
    <div className="overlay" onClick={onClose}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="relative bg-white rounded-lg shadow md:w-[600px] ">
                {children}
                <div className="close-icon absolute right-0 top-0" onClick={onClose}>
                    <svg className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </div>
            </div>
        </div>
    </div>



);

export default Modal;

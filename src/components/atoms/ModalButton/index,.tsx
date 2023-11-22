/* eslint-disable indent */
// components/ModalButton.tsx
import React from "react";

interface ModalButtonProps {
    onClick: () => void;
}

const ModalButton: React.FC<ModalButtonProps> = ({ onClick }) => (
    <button
        data-modal-target="default-modal"
        data-modal-toggle="default-modal"
        className="block text-white bg-primary p-3 rounded-lg font-semibold hover:bg-blue-500"
        type="button"
        onClick={onClick}
    >
        + Upload Link
    </button>
);

export default ModalButton;

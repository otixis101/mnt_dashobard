/* eslint-disable indent */
import Button from "@/components/atoms/Button";
import ModalButton from "@/components/atoms/ModalButton/index,";
import Modal from "@/components/molecules/Modal";
import React, { useState } from "react";


const UploadLink = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <ModalButton onClick={() => setIsModalOpen(true)} />
            {isModalOpen && (

                <Modal onClose={handleModalClose}>
                    {/* Modal content goes here */}
                    <div className="w-full flex flex-col justify-center items-center p-10 gap-4">
                        <p className="text-primary text-xl font-extrabold">Upload your File </p>
                        <p className="text-xs w-60">Kindly ensure that the link uploaded is freely accessible by everyone on your family tree. </p>
                        <div className="pt-5">
                            <label htmlFor="file_link" className="block mb-2 text-sm font-medium text-black">
                                <p className="text-sm"> File Link</p>
                            </label>
                            <input
                                type="text"
                                id="file_link"
                                className="bg-0 border-2 md:w-80 border-black p-3 px-3 rounded-lg"
                                placeholder="input file link"
                                required
                            />
                        </div>
                        <div className="flex items-center mb-4">
                            <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 " />
                            <label htmlFor="default-radio-1" className="ms-2 text-sm  w-60 font-medium text-black">Anyone with this link is granted access to view the file in it.</label>
                        </div>
                        <Button className="inline">
                            Upload link to file
                        </Button>

                    </div>

                </Modal>
            )}
        </div>
    );
};

export default UploadLink;

/* eslint-disable indent */
import Button from "@/components/atoms/Button";
import ModalButton from "@/components/atoms/ModalButton/index,";
import Modal from "@/components/molecules/Modal";
import Axios from "axios";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
// import { Formik } from "formik";

const UploadLink = () => {
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ fileLink, setFileLink ] = useState("");
    const [ fileName, setFileName ] = useState("");
    // const [ fileType, setFileType ] = useState("pdf");
    const { data: session } = useSession();

    const router = useRouter();

    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    const handleLinkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileLink(e.target.value);
    };
    const handleFileName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileName(e.target.value);
    };
    // const handleFileType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setFileType(e.target.value);
    // };

    const handleSubmit = async () => {
        try {
            await Axios.post(`${ process.env.NEXT_PUBLIC_API_BASE_URL }/document/upload`, {
                "personId": session?.user.personId,
                "documents": [
                    {
                        "name": fileName,
                        "url": fileLink,
                        "filetype": "pdf"
                    }
                ]
            }, {
                headers: {
                    Authorization: `Bearer ${ session?.user.accessToken }`,
                },
            });
            toast.success("Link uploaded");
            router.reload();
            setIsModalOpen(false);
        } catch (error: any) {
            toast.error(String(error));
        }
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
                        {/* <Formik
                            initialValues={{
                                linkName: "",
                                url: "",
                                type: "",
                            }}
                            validationSchema={CreateUserSchema}
                            onSubmit={handleFormSubmit}
                        >
                            {({
                                handleSubmit,
                                handleChange,
                                values,
                                handleBlur,
                                errors,
                                touched,
                            }) => (
                                <form
                                    onSubmit={handleSubmit}
                                    className="mt-4 flex flex-col gap-4 space-y-1"
                                >

                                </form>
                            )}
                        </Formik> */}
                        <div className="pt-5">
                            <label htmlFor="file_link" className="block mb-2 text-sm font-medium text-black">
                                <p className="text-sm"> File Link</p>
                            </label>
                            <input
                                type="text"
                                id="file_link"
                                value={fileLink}
                                onChange={handleLinkUpload}
                                className="bg-0 border-2 md:w-80 border-black p-3 px-3 rounded-lg"
                                placeholder="input file link"
                                required
                            />
                        </div>
                        <div className="pt-5">
                            <label htmlFor="file_name" className="block mb-2 text-sm font-medium text-black">
                                <p className="text-sm"> File Name</p>
                            </label>
                            <input
                                type="text"
                                id="file_name"
                                value={fileName}
                                onChange={handleFileName}
                                className="bg-0 border-2 md:w-80 border-black p-3 px-3 rounded-lg"
                                placeholder="input file name"
                                required
                            />
                        </div>
                        {/* <div className="pt-5">
                            <label htmlFor="file_link" className="block mb-2 text-sm font-medium text-black">
                                <p className="text-sm"> File type</p>
                            </label>
                            <select
                                className="bg-0 border-2 md:w-80 border-black p-3 px-3 rounded-lg"
                                name="file_type"
                                id="file_type"
                                value={fileType} onChange={handleFileType} >
                                <option value="pdf">PDF</option>
                            </select>
                        </div> */}
                        {/* <div className="flex items-center mb-4">
                            <input id="default-radio-1" checked type="radio" value="" name="default-radio" className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 " />
                            <label htmlFor="default-radio-1" className="ms-2 text-sm  w-60 font-medium text-black">Anyone with this link is granted access to view the file in it.</label>
                        </div> */}
                        <Button onClick={handleSubmit} className="inline">
                            Upload link to file
                        </Button>

                    </div>

                </Modal>
            )}
        </div>
    );
};

export default UploadLink;

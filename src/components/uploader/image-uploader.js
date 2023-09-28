import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiUploadCloud } from 'react-icons/fi';
import './uploader.css';

const Uploader = ({ setImageUrl }) => {
    const [file, setFile] = useState(null);
    const [isUploaded, setIsUploaded] = useState(false); // Track image upload state
    const uploadUrl = "https://api.cloudinary.com/v1_1/daycufjkf/image/upload";
    const upload_Preset = "mod0yxrg";

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setIsUploaded(false); // Reset the upload state when a new file is selected
    };

    useEffect(() => {
        const uploadPreset = upload_Preset;
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', uploadPreset);
            axios({
                url: uploadUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: formData,
            })
                .then((res) => {
                    setImageUrl(res.data.secure_url);
                    setIsUploaded(true); // Set upload state to true after successful upload
                })
                .catch((err) => console.log(err));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file, setImageUrl]);

    return (
        <div className="w-full text-center">
            <label className="cursor-pointer upload-label">
                <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                <span className="upload-box">
                    <FiUploadCloud className="upload-icon" />
                    <p className="upload-text">{isUploaded ? 'Image uploaded' : 'Click to upload an image'}</p>
                    <em className="upload-hint">(Only *.jpeg and *.png images will be accepted)</em>
                </span>
            </label>
        </div>
    );
};

export default Uploader;

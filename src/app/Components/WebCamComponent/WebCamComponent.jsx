"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

import { IoSearchSharp } from "react-icons/io5";
import { MdInsertPhoto } from "react-icons/md";



import "./WebCam.scss";

const WebcamComponent = ({onClose, onImageProcess}) => {

    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [facingMode, setFacingMode] = useState('environment');

    useEffect(() => {
        if (webcamRef.current) {
          const videoTrack = webcamRef.current.video.srcObject?.getVideoTracks()[0];
          if (videoTrack) {
            videoTrack.applyConstraints({ facingMode });
          }
        }
      }, [facingMode]);

    useEffect(() => {
        // Process the captured Image
        if(imgSrc) {
            onImageProcess(imgSrc);
        }
    }, [imgSrc])

    const switchCamera = () => {
        setFacingMode(prevMode => (prevMode === 'user' ? 'environment' : 'user'));
    };

    // create a capture function
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc({
            fileNameWithExtension: `capture.${getImageFormat(imageSrc.split(',')[0])}`,
            baseFormatFile: imageSrc,
            fromCamera: true
        });
    }, [webcamRef]);

    const retake = () => {
        setImgSrc(null);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log('******** Handle file : ', file.name)
        if (file && file.type.startsWith('image/')) {
            // const objectURL = URL.createObjectURL(file);
            // console.log(objectURL);
            // setImgSrc(objectURL);

            const reader = new FileReader();
            reader.onload = function (e) {
                setImgSrc({
                    fileNameWithExtension: file.name,
                    baseFormatFile: e.target.result
                });
            };
            reader.readAsDataURL(file);
        }
    }

    // const handleVideoProps = () => {
    //     setVideoConstraints({
    //         facingMode: videoConstraints.facingMode === "user" ? { exact: "environment" } : "user"
    //     });
    //     console.log('******* Change video props')
    // };
    
    const processImage = () => {
        onImageProcess();
    }

    const getImageFormat = (dataURL) => {

        // Regular expression to match and capture the image format
        const regex = /^data:image\/(\w+);base64/;

        // Execute the regex on the data URL
        const match = dataURL.match(regex);

        // Extract the format if the match is successful
        if (match && match[1]) {
            const imageFormat = match[1];

            return imageFormat;
        } else {
            console.log("No match found or invalid data URL.");
        }
    }

    return (
        <div className="webcam-container">
            {imgSrc ? (
                <img src={imgSrc.baseFormatFile} alt="webcam" className={`custom-webcam ${imgSrc?.fromCamera ? 'camera' : ''}`} />
            ) : (
                <>
                    <Webcam 
                        className="custom-webcam" 
                        videoConstraints={{ facingMode }}
                        ref={webcamRef} />
                    {/* <div className="overlay">
                        <div className="scanner-frame"></div>
                    </div> */}
                    <div className="layer">
                        
                    </div>
                    {/* <button className="secondary" onClick={switchCamera}>Rotate</button> */}
                    
                    {/* <button 
                        className="switch-button" 
                        id="switch-button" 
                        title="Switch Camera"
                        onClick={switchCamera}>
                        &#x21bb;
                    </button> */}
                    {/* <button className="secondary close-btn" onClick={onClose}>&#x2715;</button> */}
                </>
            )}
            <div className="btn-container">
                {imgSrc ? (
                <button onClick={retake}>Retake</button>
                ) : (
                <>
                    {/* <button className="browse-btn" onClick={chooseFile}>
                        <MdInsertPhoto />
                    </button> */}
                    <div className="browse-btn">
                        <input 
                            type="file" 
                            id="file-input" 
                            className="file-input" 
                            accept="image/*" 
                            title="Upload Image"
                            onChange={handleFileChange}
                        >
                        </input>
                        <MdInsertPhoto />
                    </div>
                    <button className="capture-btn" onClick={capture}>
                        <IoSearchSharp />
                    </button>
                </>
                
                )}
            </div>
        </div>
      );
};

export default WebcamComponent;
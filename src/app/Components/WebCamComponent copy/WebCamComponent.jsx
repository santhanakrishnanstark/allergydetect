"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

import "./WebCam.scss";

const WebcamComponent = ({onClose}) => {

    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [facingMode, setFacingMode] = useState('user');

    useEffect(() => {
        if (webcamRef.current) {
          const videoTrack = webcamRef.current.video.srcObject?.getVideoTracks()[0];
          if (videoTrack) {
            videoTrack.applyConstraints({ facingMode });
          }
        }
      }, [facingMode]);

    const switchCamera = () => {
        setFacingMode(prevMode => (prevMode === 'user' ? 'environment' : 'user'));
    };

    // create a capture function
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef]);

    const retake = () => {
        setImgSrc(null);
    };

    // const handleVideoProps = () => {
    //     setVideoConstraints({
    //         facingMode: videoConstraints.facingMode === "user" ? { exact: "environment" } : "user"
    //     });
    //     console.log('******* Change video props')
    // };
    

    return (
        <div className="webcam-container">
            {imgSrc ? (
                <img src={imgSrc} alt="webcam" className="custom-webcam" />
            ) : (
                <>
                    <Webcam 
                        className="custom-webcam" 
                        videoConstraints={{ facingMode }}
                        ref={webcamRef} />
                    <div className="overlay">
                        <div className="scanner-frame"></div>
                    </div>
                    {/* <button className="secondary" onClick={switchCamera}>Rotate</button> */}
                    
                    <button 
                        className="switch-button" 
                        id="switch-button" 
                        title="Switch Camera"
                        onClick={switchCamera}>
                        &#x21bb;
                    </button>
                    <button className="secondary close-btn" onClick={onClose}>&#x2715;</button>
                </>
            )}
            <div className="btn-container">
                {imgSrc ? (
                <button onClick={retake}>Retake photo</button>
                ) : (
                <button onClick={capture}>Capture photo</button>
                )}
            </div>
        </div>
      );
};

export default WebcamComponent;
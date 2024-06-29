"use client"

import Link from 'next/link';
import './dashboard.scss';
import WebcamComponent from '../Components/WebCamComponent/WebCamComponent';
import { useEffect, useState } from 'react';
import RingAnimation from '../Components/RingAnimation/RingAnimation';
import DraggableDrawer from '../Components/DrawerComponent/DragableDrawer';
import axios from 'axios';
import { getJSONFromResponse, extractAndParseJSON, setSessionStorage } from "../utils/index";
import Product from '../Components/Product/Product';

import SERVICE from "../service";

import serverdown from "../assets/server_down.svg";
import { FaRegUser } from "react-icons/fa6";

import { getSessionStorage } from "../utils/index";


const DashboardPage = () => {

    const [openCamera, setOpenCamera] = useState(false);
    
    const [isProcessing, setIsProcessing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState(null);
    const [error, setError] = useState({
        isError: false,
        message: ''
    });

    useEffect(() => {
        console.log('**** Dashboard');

        getUserDetails();
    }, []);

    const getUserDetails = async () => {
        const userID = getSessionStorage("userID");
        const userToken = `Bearer ${getSessionStorage("token")}`;

        const response = await axios.get(`${SERVICE.USER_API}/${userID}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    Authorization: userToken
                },
            }
        );

        setSessionStorage("user", JSON.stringify(response.data?.response));
    }

    const captureImage = () => {
        setOpenCamera(true);
    }

    const uploadImage = async (imageSrc) => {
        setProduct(null);
        if (!imageSrc) {
            alert('Please capture an image first.');
            return;
          }
      
          try {
            
            setIsProcessing(true);
            setIsLoading(true);
            setError({
                isError: false,
                message: ''
            });

            const userID = getSessionStorage("userID");
            const userToken = `Bearer ${getSessionStorage("token")}`;

            // const response = await axios.post(`${SERVICE.UPLOAD_API}`, {
            const response = await axios.post(`${SERVICE.UPLOAD_API}/${userID}`, {
                baseFormatFile: imageSrc.baseFormatFile.split(',')[1],
                fileNameWithExtension: imageSrc.fileNameWithExtension
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    Authorization: userToken
                },
            }
        );

        // setProduct(extractAndParseJSON(response.data));
        setProduct(extractAndParseJSON(response.data?.response));

            console.log('******** Server Response: ', extractAndParseJSON(response.data?.response));
      
            // setIsProcessing(false);
            setIsLoading(false);
          } catch (error) {
            // setIsProcessing(false);
            setIsLoading(false);
            setError({
                isError: true,
                message: error.message
            });
            console.error('Upload error:', error);
          }
    }

    const handleDrawerClose = () => {
        console.log('**** Close Drawer');
        setIsProcessing(false);
    }
    

    return ( 
        <div className="dashboard">
            {/* <WebcamComponent onClose={() => setOpenCamera(false)} /> */}

            <WebcamComponent onImageProcess={uploadImage} />

            <div className="actions">
                <Link className='user-profile' href="/user-profile">
                    <FaRegUser />
                </Link>
            </div>
            
            {
                isProcessing && (
                    <DraggableDrawer onClose={handleDrawerClose}>
                        {/* <div className={`process-container ${isProcessing ? 'processing' : ''}`}> */}
                        <div className={`process-container ${isLoading ? 'on-process': ''}`}>
                            { isLoading && (
                                <>
                                    <RingAnimation />
                                    <p>Processing...</p>
                                </>
                            ) }
                            { error.isError && (
                                <>
                                    {error.message}
                                    <img 
                                        src={serverdown.src}
                                        alt="Logo"
                                        className='error-image'
                                    />
                                </>
                            ) }
                            { product && <Product product={product} /> }
                        </div>
                    </DraggableDrawer>
                )
            }
        </div>
     );
}
 
export default DashboardPage;
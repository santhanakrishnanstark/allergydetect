"use client"

import Link from 'next/link';
import './dashboard.scss';
import WebcamComponent from '../Components/WebCamComponent/WebCamComponent';
import { useState } from 'react';


const DashboardPage = () => {

    const [openCamera, setOpenCamera] = useState(false);

    const captureImage = () => {
        setOpenCamera(true);
    }

    const uploadImage = () => {

    }
    

    return ( 
        <div className="dashboard">
            <h2>Dashboard Page</h2>
            <div className="actions">
                <button className="primary" onClick={captureImage}>Take a Pic</button>
                <button className="secondary" onClick={uploadImage}>Update Image</button>
            </div>
            {
                openCamera && (
                    (
                        <>
                            <WebcamComponent onClose={() => setOpenCamera(false)} />
                        </>
                    )
                ) 
            }
        </div>
     );
}
 
export default DashboardPage;
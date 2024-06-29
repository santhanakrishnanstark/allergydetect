"use client"

import Link from "next/link";
import './homeScreen.scss';
import RingAnimation from "../RingAnimation/RingAnimation";
import AnimateText from "../AnimateText/AnimateText";
import DraggableDrawer from "../DrawerComponent/DragableDrawer";
import { useState } from "react";
import LoginForm from "../Login/LoginForm";

const HomeScreen = () => {

    const [showLogin, setShowLogin] = useState(false);

    const handleDrawerClose = () => {
        console.log('**** Close Drawer');
        setShowLogin(false);
    }

    return ( 
        <div className="home-screen">
            <h1>Baymax </h1>
            <p>Allergen Detection Made Easy, Eat Confidently</p>
            <RingAnimation />
            <AnimateText text="Your Safety Companion..." />
            <div className="actions">
                {/* <Link href="/login" className="primary">Login</Link> */}
                {/* <Link href="/dashboard" className="primary">Dashboard</Link> */}
                <button className="primary" onClick={()=> setShowLogin(true)}>Login</button>
                <Link href="/register" className="secondary">Register</Link>
            </div>

            {
                showLogin && (
                    <DraggableDrawer at="full" onClose={handleDrawerClose}>
                        <LoginForm />
                    </DraggableDrawer>
                )
            }

        </div>
     );
}
 
export default HomeScreen;

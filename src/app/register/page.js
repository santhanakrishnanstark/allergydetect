"use client"

import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import DraggableDrawer from "../Components/DrawerComponent/DragableDrawer";
import LoginForm from "../Components/Login/LoginForm";
import { useEffect, useState } from "react";

import 'react-phone-number-input/style.css'
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input'
import axios from "axios";

import SERVICE from "../service";
import { setSessionStorage } from "../utils/index";

import { useRouter } from 'next/navigation'


const Register = () => {

    const [showLogin, setShowLogin] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState();

    const router = useRouter();

    const [registerFormData, setRegisterFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: {
            number: '',
            country: ''
        },
        dateOfBirth: '',
        gender: '',
        hasAllergies: false,
        allergyList: [],
        allergicSubstances: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});

    useEffect(() => {
        console.log(registerFormData)
    }, [registerFormData]);

    const handleDrawerClose = () => {
        console.log('**** Close Drawer');
        setShowLogin(false);
    }

    const handleFormChange = (e, type) => {
        switch(type) {
            case 'CONFIRM_PASSWORD':
                if(e.target.value !== registerFormData.password) {
                    setError({
                        confirmPassword: 'Password is not Matching!' 
                    });
                }else {
                    setError({});
                }
            break;
            case 'PHONE.NUMBER': 
                setRegisterFormData({...registerFormData, phoneNumber: {
                    number: e,
                    country: e ? parsePhoneNumber(e)?.country : ''
                }});
            break;
            case 'HasAllergies': 
                setRegisterFormData({...registerFormData, [e.target.name]: e.target.value === 'true' });
            break;
            default:
                if(type === 'ARRAY_TYPE') {
                    const values = e.target.value;
                    setRegisterFormData({...registerFormData, [e.target.name]: values.split(',') });
                }else {
                    setRegisterFormData({...registerFormData, [e.target.name]: e.target.value});
                }
        }
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            // const encryptPassword = window.atob(registerFormData.password);

            // const localRegisterFormData = {
            //     ...registerFormData,
            //     password: encryptPassword
            // }
            
            const response = await axios.post(SERVICE.REGISTER_API, JSON.stringify(registerFormData),
                {
                    headers: {
                      'Content-Type': 'application/json',
                      'X-Requested-With': 'XMLHttpRequest',
                    },
                    withCredentials: true,
                  }
            );
      
            // Handle success response
            // Example: save token, redirect, etc.
            console.log('Registeration successful:', response, response.data);

            if(response.data?.statusCode === 201) {
                // storing token to session storage
                setSessionStorage("token", response.data?.response?.token);
                setSessionStorage("userID", response.data?.response?.id);
                
                alert("Account created! Redirecting...")
                router.push('/');          
            }

          } catch (error) {
            setError('Invalid email or password');
            console.error('Registeration error:', error);
          } finally {
            setLoading(false);
          }
    }

    return ( 
        <main className="register-form">
            <header>
                
                <Link href="/"><IoIosArrowBack /></Link>
            </header>

            <h1>Sign Up</h1>
            <div className="sub-text">
                <p>If you already have an account</p>
                <p>You can
                <button className="link" onClick={()=> setShowLogin(true)}>Login here !</button>
                </p>
            </div>

            <form>
                <div className="form-item">
                    <input 
                        type="text" 
                        name="firstName" 
                        id="firstName" 
                        placeholder="Enter your first name"
                        onChange={(e) => handleFormChange(e) } />
                </div>
                <div className="form-item">
                    <input 
                        type="text" 
                        name="lastName" 
                        id="lastName" 
                        placeholder="Enter your last name"
                        onChange={(e) => handleFormChange(e) } />
                </div>
                <div className="form-item">
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="Enter your email" 
                        autoComplete="username"
                        onChange={(e) => handleFormChange(e) } />
                </div>
                <div className="form-item">
                    <input 
                        type="password"
                        name="password" 
                        id="password" 
                        placeholder="Enter your password" 
                        autoComplete="new-password"
                        onChange={(e) => handleFormChange(e) } />
                </div>
                <div className="form-item">
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        id="confirmPassword" 
                        placeholder="Confirm your password" 
                        autoComplete="new-password"
                        onChange={(e) => handleFormChange(e, 'CONFIRM_PASSWORD') } />
                    
                    <p className="error">{error.confirmPassword}</p>
                </div>
                <div className="form-item">
                    {/* <input type="tel" name="phoneNumber" id="phoneNumber" placeholder="Enter your phone number" /> */}

                    <PhoneInput
                        placeholder="Enter phone number"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => handleFormChange(e, 'PHONE.NUMBER')}/>

                </div>
                <div className="form-item">
                    <input 
                        type="date" 
                        name="dateOfBirth" 
                        id="dateOfBirth"
                        onChange={(e) => handleFormChange(e) } />
                </div>
                <div className="form-item">
                    <label>Gender:</label>
                    <div className="d-flex-center">
                        <input 
                            type="radio" 
                            name="gender" 
                            id="male" 
                            value="Male"
                            onChange={(e) => handleFormChange(e) } />
                        <label htmlFor="male">Male</label>
                    </div>
                    <div className="d-flex-center">
                        <input 
                            type="radio" 
                            name="gender" 
                            id="female" 
                            value="Female"
                            onChange={(e) => handleFormChange(e) } />
                        <label htmlFor="female">Female</label>
                    </div>
                    <div className="d-flex-center">
                        <input 
                            type="radio" 
                            name="gender" 
                            id="other" 
                            value="Other"
                            onChange={(e) => handleFormChange(e) } />
                        <label htmlFor="other">Other</label>
                    </div>
                </div>
                <div className="form-item">
                    <label>Do you have any allergies?</label>
                    <div className="d-flex-center">
                        <input 
                            type="radio" 
                            name="hasAllergies" 
                            id="allergiesYes" 
                            value="true"
                            onChange={(e) => handleFormChange(e, 'HasAllergies') } />
                        <label htmlFor="allergiesYes">Yes</label>
                    </div>
                    <div className="d-flex-center">
                        <input 
                            type="radio" 
                            name="hasAllergies" 
                            id="allergiesNo" 
                            value="false"
                            onChange={(e) => handleFormChange(e, 'HasAllergies') } />
                        <label htmlFor="allergiesNo">No</label>
                    </div>
                </div>
                {registerFormData.hasAllergies}
                {
                    registerFormData.hasAllergies && (
                        <>
                            <div className="form-item">
                                <textarea 
                                    name="allergyList" 
                                    id="allergyList" 
                                    placeholder="Please list your allergic substances: (example: specific medications, food additives)"
                                    rows={5}
                                    onChange={(e) => handleFormChange(e, 'ARRAY_TYPE') } ></textarea>
                            </div>
                            <div className="form-item">
                            <label>Are there any specific substances or foods you are allergic to?</label>
                            <textarea 
                                name="allergicSubstances" 
                                id="allergicSubstances" 
                                placeholder="Please list your allergies: (example: Peanuts, Fish, Soy, Shellfish)"
                                rows={5}
                                onChange={(e) => handleFormChange(e, 'ARRAY_TYPE') } ></textarea>
                        </div>
                        </>
                    )
                }

                <div className="form-item mt-30">
                    <button className="primary" onClick={handleRegister} disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </div>
            </form>

            {
                showLogin && (
                    <DraggableDrawer at="full" onClose={handleDrawerClose}>
                        <LoginForm />
                    </DraggableDrawer>
                )
            }
        </main>
     );
}
 
export default Register;
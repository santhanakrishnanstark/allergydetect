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
import { getSessionStorage, toHtmlDateString } from "../utils";


const UserProfilePage = () => {

    const [phoneNumber, setPhoneNumber] = useState();

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
    const [error, setError] = useState('');

    useEffect(() => {
        const user = JSON.parse(getSessionStorage("user"));
        setRegisterFormData({...user});
        setPhoneNumber(user?.phoneNumber?.number);

        if(user.hasAllergies) {
            document.querySelector('#allergiesYes').checked = true;
            document.querySelector('#allergiesNo').checked = false;
        }else {
            document.querySelector('#allergiesYes').checked = false;
            document.querySelector('#allergiesNo').checked = false;
        }
    }, []);

    useEffect(() => {
        console.log(registerFormData);
    }, [registerFormData]);

    const handleFormChange = (e, type) => {
        switch(type) {
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

    const handleUpdate = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            const userID = getSessionStorage("userID");
            const userToken = `Bearer ${getSessionStorage("token")}`;
            
            const response = await axios.put(SERVICE.USER_UPDATE_API, registerFormData, 
                {
                    headers: {
                      'Content-Type': 'application/json',
                      'X-Requested-With': 'XMLHttpRequest',
                      Authorization: userToken
                    },
                    withCredentials: true,
                  }
            );
      
            // Handle success response
            // Example: save token, redirect, etc.
            console.log('Profile update successful:', response, response.data);
            alert("Profile Updated!")
          } catch (error) {
            setError('Invalid email or password');
            console.error('Profile update error:', error);
          } finally {
            setLoading(false);
          }
    }

    return ( 
        <main className="register-form">
            <header>
                
                <Link href="/dashboard"><IoIosArrowBack /></Link>
            </header>

            <h2>Hi {registerFormData.firstName?.toUpperCase()}! </h2>
            <div className="sub-text">
                <p>Keep your details up to date for a seamless experience.</p>
            </div>

            <form>
                <div className="form-item">
                    <input 
                        type="text" 
                        name="firstName" 
                        id="firstName" 
                        placeholder="Enter your firstname"
                        onChange={(e) => handleFormChange(e) }
                        defaultValue={registerFormData.firstName} />
                </div>
                <div className="form-item">
                    <input 
                        type="text" 
                        name="lastName" 
                        id="lastName" 
                        placeholder="Enter your last name"
                        onChange={(e) => handleFormChange(e) }
                        defaultValue={registerFormData.lastName} />
                </div>
                <div className="form-item">
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="Enter your email" 
                        autoComplete="username"
                        disabled
                        onChange={(e) => handleFormChange(e) }
                        defaultValue={registerFormData.email} />
                </div>
                {/* <div className="form-item">
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
                        onChange={(e) => handleFormChange(e) } />
                </div> */}
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
                        onChange={(e) => handleFormChange(e) }
                        defaultValue={toHtmlDateString(registerFormData.dateOfBirth)} />
                </div>
                {/* <div className="form-item">
                    <label>Gender:</label>
                    <div className="d-flex-center">
                        <input 
                            type="radio" 
                            name="gender" 
                            id="male" 
                            value="male"
                            onChange={(e) => handleFormChange(e) } />
                        <label htmlFor="male">Male</label>
                    </div>
                    <div className="d-flex-center">
                        <input 
                            type="radio" 
                            name="gender" 
                            id="female" 
                            value="female"
                            onChange={(e) => handleFormChange(e) } />
                        <label htmlFor="female">Female</label>
                    </div>
                    <div className="d-flex-center">
                        <input 
                            type="radio" 
                            name="gender" 
                            id="other" 
                            value="other"
                            onChange={(e) => handleFormChange(e) } />
                        <label htmlFor="other">Other</label>
                    </div>
                </div> */}
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
                                    placeholder="Please list your allergies: (example: Peanuts, Fish, Soy, Shellfish)"
                                    rows={5}
                                    onChange={(e) => handleFormChange(e, 'ARRAY_TYPE') }
                                    defaultValue={registerFormData.allergyList} ></textarea>
                            </div>
                            <div className="form-item">
                            <label>Are there any specific substances or foods you are allergic to?</label>
                            <textarea 
                                name="allergicSubstances" 
                                id="allergicSubstances" 
                                placeholder="Please list your allergic substances: (example: specific medications, food additives)"
                                rows={5}
                                onChange={(e) => handleFormChange(e, 'ARRAY_TYPE') }
                                defaultValue={registerFormData.allergicSubstances} ></textarea>
                        </div>
                        </>
                    )
                }

                <div className="form-item mt-30">
                    <button className="primary" onClick={handleUpdate} disabled={loading}>
                        {loading ? 'Updating...' : 'Update'}
                    </button>
                </div>
            </form>
        </main>
     );
}
 
export default UserProfilePage;
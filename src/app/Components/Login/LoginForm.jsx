"use client"

import { useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation'

import SERVICE from "../../service";

import { setSessionStorage } from "../../utils/index";

const LoginForm = () => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const router = useRouter();

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        try {
            // const encryptPassword = window.atob(loginData.password);

            const response = await axios.post(SERVICE.LOGIN_API, JSON.stringify(loginData),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            }
            );
      
            // Handle success response
            if(response.status === 200){

                setSessionStorage("token", response.data?.response?.token);
                setSessionStorage("userID", response.data?.response?.id);

                router.push('/dashboard');
            }

          } catch (error) {
            setError('Invalid email or password');
            console.error('Login error:', error);
          } finally {
            setLoading(false);
          }
    }

    return ( 
        <div className="login-form">
            <h2>Login</h2>
            <form>
                {error && <p className="error-text">{error}</p>}
                <div className="form-item">
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="Enter your email" 
                        autoComplete="username"
                        onChange={(e) => setLoginData({...loginData, email: e.target.value}) } />
                    <p className="error"></p>
                    
                </div>
                <div className="form-item">
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="Enter your password" 
                        autoComplete="current-password"
                        onChange={(e) => setLoginData({...loginData, password: e.target.value}) } />
                    <p className="error"></p>
                </div>
                <div className="form-item mt-30">
                    <button className="primary" onClick={handleLogin} disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </div>
            </form>
        </div>
     );
}
 
export default LoginForm;
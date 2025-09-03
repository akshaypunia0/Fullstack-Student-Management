import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = { email, password }
        console.log("Logindata", loginData);

        try {
            const response = await axios.post('api/user/login', loginData,
                {
                    withCredentials: true
                }
            )
            console.log("Login response", response.data);

            localStorage.setItem("isLoggedIn", "true")
            navigate("/admin")



        } catch (error) {
            if (error.response) {
                console.log("Login error..,", error.response.data);
            }
            else console.error('Login error:', error.message);
        }

        // console.log(`Email: ${email}, Password: ${password}`);
    }

    return (
        <>
            <form
                className='w-[30%] min-h-[70%] bg-gray-800 p-10 rounded-3xl flex flex-col'
                onSubmit={handleSubmit}
            >
                <div className='p-10 text-center text-white text-3xl'>Login as Admin</div>

                <Input
                    placeholder='Enter your email'
                    value={email}
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Input
                    placeholder='Enter your password'
                    value={password}
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-4"
                />

                <Button
                    text='Login'
                    type="submit"
                    className=" bg-blue-600"
                />

                <div className="mt-20 text-center text-lg text-gray-300">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-400 hover:underline">
                        Sign up
                    </Link>
                </div>
            </form>

        </>

    );
}

export default Login;

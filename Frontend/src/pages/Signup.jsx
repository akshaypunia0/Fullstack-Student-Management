import React, { useState } from 'react'
import Input from '../components/Input';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Signup = () => {

    const API = import.meta.env.VITE_BACKEND_API_URL;

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Admin")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const signupData = { username, email, password, role }

        try {
            const response = await axios.post(`${API}/api/user/register`, signupData, {
                withCredentials: true
            })

            toast.success(response.data.message)
            navigate("/")

        } catch (error) {
            if (error.response) {
                console.log("Registration error", error.response.data);
                toast.success(error.response.data.message)

            }

            else console.log("Something wrong in registeation", error);
            toast.success(error.message)

        }


        // console.log(`username: ${username}, Email: ${email}, Password: ${password}, role: ${role}`);
    }


    return (
        <form
            className='w-[30%] min-h-[70%] bg-gray-800 p-10 rounded-3xl flex flex-col'
            onSubmit={handleSubmit}
        >
            <div className='p-10 text-center text-white text-3xl'>Create an Admin account</div>

            <Input
                placeholder='Enter your usernamme'
                value={username}
                type='text'
                onChange={(e) => setUsername(e.target.value)}
                required
            />

            <Input
                placeholder='Enter your email'
                value={email}
                type='text'
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <Input
                placeholder='Enter your password'
                value={password}
                type='text'
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-4"
            />

            <Input
                value={role}
                type='text'
                readOnly
                className="mt-4"
            />

            <Button
                text='Sign up'
                type="submit"
                className=" bg-blue-600"
            />

            <div className="mt-6 text-center text-lg text-gray-300">
                Already have an account?{" "}
                <Link to="/" className="text-blue-400 hover:underline">
                    Login
                </Link>
            </div>
        </form>
    )
}

export default Signup
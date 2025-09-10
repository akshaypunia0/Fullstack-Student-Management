import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import axios from 'axios';
import { toast } from 'react-toastify';

const StudentForm = () => {

    const API = import.meta.env.VITE_BACKEND_API_URL;

    let studentData = {
        name: '',
        email: '',
        age: '',
        city: '',
        course: ''
    }

    const [formData, setFormData] = useState(studentData);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        console.log('Student form Data:', formData);

        // API call to add student

        try {
            const createdStudent = await axios.post(`${API}/api/student`, formData, {
                withCredentials: true
            })

            toast.success(createdStudent.data.message)

            console.log("Created Student data", createdStudent);
            

        } catch (error) {
            if(error.response){
                console.log("Error in sending data", error.response.data);
                toast.success(error.response.data.message)
            }
            else console.log("something went wrong while sending student data");
            toast.success(error.message)
            
        }

        // Reset form or show success

        setFormData(studentData)
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl p-6 m-auto rounded-lg shadow-md bg-gray-600">
            <h3 className="text-2xl font-semibold mb-6 text-white">Add New Student</h3>

            <div className="mb-4">
                <label htmlFor="name" className="block text-white font-medium mb-2">
                    Full Name
                </label>
                <Input
                    placeholder='Enter your name'
                    id="name"
                    name="name"
                    value={formData.name}
                    type='text'
                    required
                    onChange={handleChange}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email Address
                </label>
                <Input
                    placeholder='Enter your email'
                    id="email"
                    name="email"
                    value={formData.email}
                    type='text'
                    required
                    onChange={handleChange}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="age" className="block text-white font-medium mb-2">
                    Enter age
                </label>
                <Input
                    placeholder='Enter your age'
                    id="age"
                    name="age"
                    value={formData.age}
                    type='number'
                    required
                    onChange={handleChange}
                />
            </div>

            <div className="mb-6">
                <label htmlFor="city" className="block text-white font-medium mb-2">
                    Enter city
                </label>
                <Input
                    placeholder='Enter your city'
                    id="city"
                    name="city"
                    value={formData.city}
                    type='text'
                    required
                    onChange={handleChange}
                />
            </div>

            <div className="mb-6">
                <label htmlFor="course" className="block text-white font-medium mb-2">
                    Enter course
                </label>
                <Input
                    placeholder='Enter your course'
                    id="course"
                    name="course"
                    value={formData.course}
                    type='text'
                    required
                    onChange={handleChange}
                />
            </div>

            <Button
                text='Add student'
                type="submit"
                className=" bg-blue-600"
            />
        </form>
    );
};

export default StudentForm;

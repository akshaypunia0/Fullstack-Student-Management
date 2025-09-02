import React from 'react';
import Button from './Button';

const StudentCard = ({ student }) => {

    const updateData = async () => {

    }

    const dalateData = async () => {

    }
  return (
    <div className="bg-white p-4 rounded-md shadow hover:shadow-lg transition cursor-pointer">
      <h4 className="text-xl font-semibold text-gray-800">{student.name}</h4>
      <p className="text-gray-600">Email: {student.email}</p>
      <p className="text-gray-600">Age: {student.age}</p>
      <p className="text-gray-600">City: {student.city}</p>
      <p className="text-gray-600">Course: {student.course}</p>
      <div className='flex justify-between'>
        <Button 
        text="Edit"
        type="Button"
        className="bg-yellow-300 hover:bg-yellow-400"
        onClick={updateData}/>
        
        <Button 
        text="Delete"
        type="Button"
        className="bg-red-400 hover:bg-red-500"
        onClick={updateData}/>
      </div>
    </div>
  );
};

export default StudentCard;

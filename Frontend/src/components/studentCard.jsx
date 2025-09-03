import React from 'react';
import Button from './Button';
import axios from 'axios';

const StudentCard = ({ student }) => {

  const onDelete = async (id) => {
    console.log(id)

    try {
      const data = await axios.delete(`api/student/delete/${id}`, 
        {
          withCredentials: true
        }
      )

      console.log("Student deleted", data);

    } catch (error) {
      if (error.response) {
        console.log("Error deleting student", error.response.data);

      }
      else console.log("Something went wrong while deleting student");

    }
  }
  return (
    <div className="bg-white p-4 rounded-md shadow hover:shadow-lg transition cursor-pointer">
      <h4 className="text-xl font-semibold text-gray-800">{student.name}</h4>
      <p className="text-gray-600">Email: {student.email}</p>
      <p className="text-gray-600">Age: {student.age}</p>
      <p className="text-gray-600">City: {student.city}</p>
      <p className="text-gray-600">Course: {student.course}</p>
      <div className='flex justify-between'>
        <button
          className='bg-yellow-300 w-[30%] h-[30px] mt-[10px] rounded hover:bg-yellow-400'
          type='button'
        //  onClick={updateData}
        >Edit</button>


        <button
          className='bg-red-500 w-[30%] h-[30px] mt-[10px] rounded hover:bg-red-600'
          type='button'
          onClick={() => onDelete(student._id)}
        >Delete</button>
      </div>
    </div>
  );
};

export default StudentCard;

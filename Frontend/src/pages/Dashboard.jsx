import { useState, useEffect } from 'react';
import StudentForm from './studentForm';
import StudentCard from '../components/studentCard';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const API = import.meta.env.VITE_BACKEND_API_URL;
    const [activeTab, setActiveTab] = useState('addStudent'); // 'addStudent' or 'allStudents'
    const [students, setStudents] = useState([]);
    const navigate = useNavigate()

    // Fetch all students when tab changes to 'allStudents'
    useEffect(() => {
        if (activeTab === 'allStudents') {
            fetchStudents();
        }
    }, [activeTab]);

    const fetchStudents = async () => {

        try {
            const { data } = await axios.get(`${API}/api/student/all`, {
                withCredentials: true
            })
            console.log("All student data", data.students);
            console.log(typeof(data.students));
            
            setStudents(data.students);

        } catch (error) {
            if (error.response) {
                console.log("Data fetching error", error.response.data);
            }
            else console.log("something went wrong while fetching data");
            
        }
        
    };

    const logout = async() => {

        try {
            const response = await axios.post(`${API}/api/user/logout`, {}, {
                withCredentials: true
            })
            toast.success(response.data.message)
            
        } catch (error) {
            if (error.response) {
                console.log("Logout error", error.response.data);
                toast.success(error.response.data.message)
            }
            else console.log("something went wrong while logout");
            toast.success(error.message)
            
        }
        localStorage.removeItem("isLoggedIn")
        navigate("/")

    }

    const deleteHandler = async (id) => {
        console.log(id)
    
        try {
          const data = await axios.delete(`${API}/api/student/delete/${id}`, 
            {
              withCredentials: true
            }
          )
    
          setStudents((prev) => prev.filter(student => student._id !== id))

          toast.success(data.data.message)
    
          console.log("Student deleted", data);
    
        } catch (error) {
          if (error.response) {
            console.log("Error deleting student", error.response.data);
            toast.success(error.response.data.message)
    
          }
          else console.log("Something went wrong while deleting student");
          toast.success(error.message)
    
        }
      }


    return (
        <div className="w-[100%] min-h-screen flex bg-gray-700">
            {/* Left Sidebar */}
            <div className="w-80 bg-white shadow p-6 flex flex-col space-y-4">
                <h2 className="text-xl font-bold mb-6 text-gray-700">Admin Dashboard</h2>
                <button
                    onClick={() => setActiveTab('addStudent')}
                    className={`py-2 px-4 rounded-md font-semibold transition ${activeTab === 'addStudent' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'
                        }`}
                >
                    Add Student
                </button>
                <button
                    onClick={() => setActiveTab('allStudents')}
                    className={`py-2 px-4 rounded-md font-semibold transition ${activeTab === 'allStudents' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white'
                        }`}
                >
                    All Students
                </button>

                <Button
                    text='Logout'
                    type="button"
                    className=" bg-red-500 hover:bg-red-600"
                    onClick={logout}
                />


            </div>

            {/* Right Content */}
            <div className="flex-1 p-6">
                {activeTab === 'addStudent' && <StudentForm />}
                {activeTab === 'allStudents' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {students.map((student) => (
                            <StudentCard key={student._id} student={student} onDelete={deleteHandler}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;

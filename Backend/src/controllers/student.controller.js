import { Student } from "../models/student.model.js";



const addStudent = async (req, res) => {
    try {
        const { name, email, age, course, city } = req.body;

        if (!name || !email || !age || !course || !city) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const student = await Student.create(req.body);

        return res.status(201).json(
            {
                message: "student created successfully",
                student
            }
        )

    } catch (error) {
        console.log("Add student error", error.message);
        return res.status(400).json({ message: "add student error" })

    }
}


const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        if (!students) {
            return res.status(400).json({ message: "Can't get all students" })
        }

        // res.render("index", students)

        return res.status(200).json({
            message: "Getting all students data success",
            students
        })


    } catch (error) {
        console.log("Error in getAllStudent", error.message);
        return res.status(400).json({ message: "getting all students data error" })

    }
}


const getStudentByEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "please provide email" });
        }

        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(404).json({ message: "Student with this email doesn't exist" });
        }

        return res.status(200).json(
            {
                message: "Student found",
                student
            }
        )

    } catch (error) {
        console.log("Getting error fetching one student", error);
        return res.status(400).json({ message: "One student fetching error" });
    }
}


const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params

        const student = await Student.findByIdAndDelete(id)
        if (!student) {
            return res.status(400).json({ message: "Student not found" })
        }

        return res.status(200).json(
            {
                message: "Student deleted successfully",
                student
            }
        )

    } catch (error) {
        console.log("Something went wrong while deleting student", error.message);
        return res.status(404).json({ message: "Something went wrong while deleting student" })

    }
}


const updateStudent = async (req, res) => {
    try {

        const { id } = req.params

        if (!id) {
            return res.status(400).json({ message: "Student ID is required" });
        }

        const { name, email, age, city, course } = req.body

        const student = await Student.findById(id);

        if (name) student.name = name;
        if (email) student.email = email;
        if (age) student.age = age;
        if (city) student.city = city;
        if (course) student.course = course;

        const updatedStudent = await student.save()

        res.status(200).json(
            {
                message: "student data updated",
                updatedStudent
            }
        )

    } catch (error) {
        console.log("Updating student error", error.message);
        return res.status(404).json({ message: "something went wrong while updating student" })

    }
}


export {
    addStudent,
    getAllStudents,
    getStudentByEmail,
    deleteStudent,
    updateStudent
}
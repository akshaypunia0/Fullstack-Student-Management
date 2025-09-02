import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },
    age: {
        type: Number,
        required: true,
        min: [18, 'Minimum age is 18 required']
    },
    city: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    }

},
    {
        timestamps: true // createdAt & updatedAt fields
    })

export const Student = mongoose.model('Student', studentSchema)
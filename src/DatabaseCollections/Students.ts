import mongoose from "mongoose";

const schema = mongoose.Schema;

const studentSchema = new schema({
    name:{type: String, required: true},
    studentNumber:{type: String, required: true},
    academicYear: {type: String, required: true},
    subjectsEnrolled: [{
        subName:{type: String, required: true},
        courseCode:{type: String, required: true},
        status: {type: String, required: true},
        marks: {type: String, required: true}
    }]
});

const StudentCollections = mongoose.model("Students", studentSchema);

export default StudentCollections;


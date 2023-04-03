import mongoose from "mongoose";

const schema = mongoose.Schema;

const paperSchema = new schema({
    courseCode: {type: String, required: true},
    subjectName: {type: String, required: true},
    teacher: {type: String, required: true},
    dateAndTime: {type: String, required: true},
    instructions: {type: String, required: false},
    timeDuration: {type: String, required: true},
    questions: [{
        index: {type: String, required: true},
        Question: {type: String, required: true},
        answer_one: {type: String, required: true},
        answer_two: {type: String, required: true},
        answer_three: {type: String, required: true},
        answer_four: {type: String, required: true},
        correct_answer: {type: String, required: true}
    }]

});

const PapersCollections = mongoose.model("Papers", paperSchema);
export default PapersCollections;
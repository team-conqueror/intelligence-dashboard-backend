import mongoose from "mongoose";

const Schema = mongoose.Schema;

const collectionSchema = new Schema({
    name: { type: String, required: true },
    teacher: { type: String, required: true },
    timeDuration: {type: String, required: true},
    courseCode: { type: String, required: true },
    dateAndTime: { type: String, required: true },
    questions: [{
        question: {type: String, required: true},
        answerOne: { type: String, required: true },
        answerTwo: { type: String, required: true },
        answerThree: { type: String, required: true },
        answerFour: { type: String, required: true },
        correctAnswer: { type: String, required: true },
    }]
});


const Collections = mongoose.model("ExamPaperTesting", collectionSchema);

export default Collections;

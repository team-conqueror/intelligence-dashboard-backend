import express from 'express';
import StudentCollections from "../DatabaseCollections/Students";
import PapersCollections from "../DatabaseCollections/PapersCollection";

const router = express.Router();

router.route("/getStudents").get((req, res) =>{
    try{
        StudentCollections.find({}, (error:any, students:any) => {
            if(error){
                res.status(500).send(error);
            }else{
                res.status(200).send(students);
            }
        })
    }catch (err){
        res.status(500).json({err});
    }
} )
router.route("/getStudentsCc/:courseCode").get((req, res)=>{
    try{
        const courseCode = req.params.courseCode;

        StudentCollections.find({
            "subjectsEnrolled.courseCode": courseCode
        },(error: any, students: any)=> {
            if(error){
                res.status(500).send(error);
            }else{
                res.status(200).send(students);
            }
        })
    }catch (err){
        res.status(500).json({err});
    }
})

router.route("/getStudentsRr/:name").get((req, res)=>{
    try{
        const name = req.params.name;

        StudentCollections.find({
            "name": name
        },(error: any, students: any)=> {
            if(error){
                res.status(500).send(error);
            }else{
                res.status(200).send(students);
            }
        })
    }catch (err){
        res.status(500).json({err});
    }
})

router.route("/getStudent/:id").get(async (req, res) => {
    try{
        StudentCollections.findById(req.params.id, (error: any, student: any) => {
            if(error){
                res.status(500).send(error);
            }else{
                res.status(200).send(student);
                console.log(student);
            }
        })
    }catch (err){
        res.status(500).json(err);
    }
})

router.route("/addStudent").post(async (req, res) => {
    try{
        console.log(req.body);
        const newStudentCol = new StudentCollections({
            name:req.body.name,
            studentNumber:req.body.studentNumber,
            academicYear: req.body.academicYear,
            subjectsEnrolled: req.body.subjectsEnrolled
        });

        await newStudentCol.save();
        res.status(201).json(newStudentCol);

    }catch (err){
        res.status(500).json(err);
        console.error(err);
    }
})

router.route("/updateStudent/:id").put(async(req, res) => {
    try{
        console.log(req.body);

        const student = await StudentCollections.findById(req.params.id);
        if(!student){
            return res.status(404).json({message: "Student not found"});
        }
        student.name = req.body.name || student.name;
        student.studentNumber = req.body.studentNumber || student.studentNumber;
        student.academicYear = req.body.academicYear || student.academicYear;
        student.subjectsEnrolled = req.body.subjectsEnrolled || student.subjectsEnrolled;

        const updatedStudent = await student.save();
        res.status(200).json(updatedStudent);

    }catch (error){
        console.error(error);
    }
})


router.route("/addPaper").post(async (req, res) => {
    try{
        console.log(req.body);
        const newPaperCol = new PapersCollections({
            courseCode: req.body.courseCode,
            subjectName: req.body.subjectName,
            teacher: req.body.teacher,
            dateAndTime: req.body.dateAndTime,
            instructions: req.body.instructions,
            timeDuration: req.body.timeDuration,
            questions: req.body.questions
        });
        await newPaperCol.save();
        res.status(201).json(newPaperCol);
    }catch (err){
        res.status(500).json(err);
        console.error(err);
    }
})
router.route("/getPapers").get(async (req, res) => {
    try{
        PapersCollections.find({}, (error:any, papers: any) => {
            if(error){
                res.status(500).send(error);
            }else{
                res.status(200).send(papers);
            }
        })
    }catch (err){
        res.status(500).json({err});
    }
})

router.route("/getPaper/:id").get(async (req,res) => {
    try{
        PapersCollections.findById(req.params.id, (error: any, paper: any) => {
            if(error){
                res.status(500).send(error);
            }else{
                res.status(200).send(paper);
            }
        })
    }catch (err){
        res.status(500).json({err});
    }
})

router.route("/getPaperCourseCode/:courseCode").get(async (req, res) => {
    try {
        const paper = await PapersCollections.findOne({ courseCode: req.params.courseCode }).exec();
        if (!paper) {
            return res.status(404).send("Paper not found");
        }
        res.status(200).send(paper);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
});

router.route("/updatePaper/:id").put(async(req, res) => {
    try{

        const paper = await PapersCollections.findById(req.params.id);
        if(!paper){
            return res.status(404).json({message: "Paper not found"});
        }
        paper.courseCode = req.body.courseCode || paper.courseCode;
        paper.subjectName = req.body.subjectName || paper.subjectName;
        paper.teacher = req.body.teacher || paper.teacher;
        paper.dateAndTime = req.body.dateAndTime || paper.dateAndTime;
        paper.timeDuration = req.body.timeDuration || paper.timeDuration;
        paper.questions = req.body.questions || paper.questions;

        const updatedPaper = await paper.save();
        res.status(200).json(updatedPaper);

    }catch (error){
        console.error(error);
    }
})


export default router;
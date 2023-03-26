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


export default router;
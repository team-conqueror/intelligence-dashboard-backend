import express from 'express';
import StudentCollections from "../DatabaseCollections/Students";

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


export default router;
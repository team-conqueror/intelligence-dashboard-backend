import express from 'express';
import mongoose from "mongoose";
import Collections from "./Collections";
import cors from 'cors';
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mongoUrl = "mongodb+srv://testuser:test@cluster0.ldkdk.gcp.mongodb.net/?retryWrites=true&w=majority";
mongoose.set('strictQuery', false);

async function connectDB(){
     try{
         await mongoose.connect(mongoUrl,{retryWrites: true, w: 'majority'});
         console.log("Mongodb connected");

     }catch (error){
         console.error("connection error" + error);
     }
}

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


connectDB();

app.listen(8080, () => {
    console.log('Server running on http://localhost:8080 hello world jeewa');
});

app.post("/addpaper", async (req, res) => {
    try {
        const newCollection = new Collections({
            name: req.body.name,
            teacher: req.body.teacher,
            timeDuration: req.body.timeDuration,
            courseCode: req.body.courseCode,
            dateAndTime: req.body.dateAndTime,
            questions: req.body.questions

        });
        await newCollection.save();
        res.status(201).json({ message: "Document created successfully" });
    } catch (error) {
        res.status(500).json({error});
        console.log(req.body);
    }
});

app.get("/getpapers", async(req, res)=> {
    try{
        Collections.find({},(error:any, papers:any) => {
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

app.get("/getpapers/:id", async(req,res) => {
    Collections.findById(req.params.id, (error:any, paper:any) => {
        if(error){
            res.status(500).send(error);
        }else if(paper){
            res.status(200).send(paper);
        }else{
            res.status(404).send('Paper Not Found')
        }
    });
});
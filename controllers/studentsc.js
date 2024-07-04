import express from "express";
import StModel from '../models/Studentsm.js'
import mongoose from "mongoose";
const router = express.Router();


//get Students
router.get("/",async(req,res)=>{
    try {
        let Studentss = await StModel.find({});
        console.log(Studentss);
        res.status(200).json(Studentss)
    } catch (error) {
        console.log(error);
    }
});
// register new student via /schoold/add
router.post("/add", async(req,res) => {
    try {
        const {Name, Age, Batch} = req.body;
        if(!Name ||!Age || !Batch) {
            res.status(400);
            throw new Error("Enter All Fields");
        }
        const student = await StModel.create({Name, Age, Batch});
        res.status(200).json({student});
    } catch (error) {
        console.log(error);
    }
});

// get specific student via id -  /get/enter age
router.get("/getbyage/:Age", async (req, res) => {
    try{

        let userage = req.params.Age
        const Age = await StModel.find({Age:userage})
        if(!Age) {
            res.status(404);
            throw new Error("Student with that age not found");
        }
        res.status(200).json(Age);
    } catch (err) {
        console.log(err);
    }
});


// get specific Student via id -  /get/id
router.get("/get/:id", async (req, res) => {
    try{
        const st = await StModel.findById(req.params.id);
        if(!st) {
            res.status(404);
            throw new Error("not found");
        }
        res.status(200).json(st);
    } catch (err) {
        console.log(err);
    }
});


router.put("/edit/:id", async (req, res) => {
    try {
        const stu = await StModel.findById(req.params.id);
        if(!stu) {
            res.status(404);
            throw new Error("Student not found");
        }
        const updatedStudent = await StModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({message: updatedStudent});
    } catch(err) {
        console.log(err);
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const stu = await StModel.findById(req.params.id);
        if(!stu) {
            res.status(404);
            throw new Error("Student not found");
        }
        await StModel.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({message: "Student successfully deleted"});
    } catch(err) {
        console.log(err);
    }
});

router.delete("/delall", async(req, res) => {
    try {
        await StModel.deleteMany();
        res.status(200).json({message: "All Students data deleted successfully."});
    } catch(err) {
        console.log(err);
    }
});

router.post("/insertmany", async (req, res) => {
    const docs = req.body;
    if (!Array.isArray(docs)) {
        return res.status(400).send('Input should be an array of Student details');
    }
    try {
        const result = await StModel.insertMany(docs);
        res.status(200).json({message: `Added ${docs.length} new Students.`});
    } catch (err) {
        console.log(err);
    }
});

export default router;
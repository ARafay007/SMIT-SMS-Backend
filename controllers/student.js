

import { dbo } from '../connectDB.js';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { STUDENT_COLLECTION, ADMIN_COLLECTION } from '../config/constant.js';

export const addStudent = async (req, res) => {
    try{
        const { name, email, grade, dob, section, city } = req.body;

        const collection = dbo.collection(STUDENT_COLLECTION);
        const data = await collection.insertOne({ name, email, grade, dob, section, city });

        res.status(200).json({ data });
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            error: error.message
        });
    }
};

export const getStudent = async (req, res) => {
    try{
        const collection = dbo.collection('movies');
        const data = await collection.findOne(
            {title: "Civilization"},
            {
                projection: {
                    _id: 0,
                    title: 1,
                    directors: 1,
                    plot: 1,
                    genres: 1,
                    languages: 1,
                    runtime: 1,
                    year: 1
                }
            }
        );

        res.status(200).json({
            message: 'Student get route',
            data
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            error: error.message
        });
    }
}

export const getAllStudent = async (req, res) => {
    try{
        // const collection = dbo.collection('movies');
        // // const data = await collection.find({},
        // //     {
        // //         projection: {
        // //             _id: 0,
        // //             title: 1,
        // //             plot: 1,
        // //             runtime: 1,
        // //             year: 1
        // //         }
        // //     }
        // // ).limit(5).sort({year: 1}).toArray();

        // const data = await collection.aggregate([
        //     { $limit: 5 },
        //     { $sort: { year: 1 } },
        //     {
        //         $project: {
        //             _id: 0,
        //             title: 1,
        //             plot: 1,
        //             runtime: 1,
        //             year: 1
        //         }
        //     }
        // ]).toArray();

        // const totalMovies = await collection.aggregate([
        //     { $count: 'film' }
        // ]).toArray();

        const collection = dbo.collection(ADMIN_COLLECTION);
        const data = await collection.find().toArray();

        res.status(200).json({
            message: 'Student get route',
            data,
            // totalMovies,
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            error
        });
    }
}

export const updateStudent = async (req, res) => {
    try{
        const { id } = req.params;
        const { name, content, song } = req.body;

        await dbo.collection(ADMIN_COLLECTION).updateOne(
            { _id: new ObjectId(id) },
            {
                $set: { name, content, song }
            }
        );

        res.status(200).json({
            message: 'student data updated successfully',
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            error
        });
    }
}

export const deleteById = async (req, res) => {
    try{
        const { id } = req.params;
        await dbo.collection(ADMIN_COLLECTION).deleteOne({ _id: new ObjectId(id) })

        res.status(200).json({
            message: 'student data deleted successfully'
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            error: error.message
        });
    }
}

export const deleteByName = async (req, res) => {
    try{
        const { name } = req.params;
        await dbo.collection(ADMIN_COLLECTION).deleteOne({ name })

        res.status(200).json({
            message: 'student data deleted successfully',
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            error
        });
    }
}

export const signIn = async (req, res) => {
    try{
        const { name, password } = req.body;

        const collection = dbo.collection(ADMIN_COLLECTION);
        const data = await collection.findOne({ name });

        const passwordMatch = await bcrypt.compare(password, data.password);
        let signinMsg = 'Invalid username or password';
        let token = '';

        if(passwordMatch){
            signinMsg = 'Logged in successfully';

            token = await jwt.sign(
                { data: name },
                process.env.JWT_SECRET,
                { expiresIn: '10m' }
            );
        }


        res.status(200).json({signinMsg, token});
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            error
        });
    }
}

export const signUp = async (req, res) => {
    try{
        const { name, password } = req.body;

        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const collection = dbo.collection(ADMIN_COLLECTION);
        await collection.insertOne({ name, content: "", password: hashedPassword })

        res.status(200).json({
            message: 'User created successfully',
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            error
        });
    }
}
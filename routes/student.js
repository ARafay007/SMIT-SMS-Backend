

// import express from 'express';
// const route = express.Router();

import { Router } from 'express';
import { authorize } from './authorize.js';
import { 
    addStudent,
    deleteById,
    deleteByName,
    getAllStudent, 
    getStudent, 
    signUp, 
    signIn, 
    updateStudent, 
} from '../controllers/student.js';

const route = Router();

route.get('/findOne', authorize, getStudent);

route.get('/findAll', authorize, getAllStudent);

route.post('/addStudent', authorize, addStudent);

route.put('/:id', authorize, updateStudent);

route.delete('/deleteById/:id', deleteById);

route.delete('/deleteByName/:name', deleteByName);

route.post('/signin', signIn);

route.post('/signUp', signUp);

export { route as studentRoutes };
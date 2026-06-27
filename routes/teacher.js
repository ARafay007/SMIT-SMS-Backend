
import { Router } from 'express'

const route = Router();

route.get('/', (req, res) => {
    try{
        res.status(200).json({
            message: 'Teacher get route'
        });
    }
    catch(error){

    }
});

route.post('/', () => {
    try{

    }
    catch(error){

    }
});

route.put('/:id', () => {
    try{

    }
    catch(error){

    }
});

route.delete('/:id', () => {
    try{

    }
    catch(error){

    }
});

route.get('/teacherSalary', () => {
    try{

    }
    catch(error){

    }
});

route.get('/teacherSalary/:id', () => {
    try{

    }
    catch(error){

    }
});

export const teacherRoutes = route;
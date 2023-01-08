import express from 'express';
import cors from 'cors';
import Connection from './database/db.js';

const app = express();
app.use(cors());


const PORT = 8000;

Connection();
app.listen(PORT,()=>{
    console.log(`Your server is running at port ${PORT}`);
})
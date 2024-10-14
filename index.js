import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './src/user.route.js'
import cors from 'cors';

const app = express();

app.use('submit-email', userRouter)

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const uri = process.env.MONGO_URI;

try{

  mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
} catch(err){

  err => console.error('MongoDB connection error:', err)

  
}

const corsOptions = {
  origin: 'https://white-bakana.vercel.app',  
  methods: ['GET', 'POST', 'OPTIONS'],        
  allowedHeaders: ['Content-Type'],           
  credentials: true                           
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/submit-email', userRouter);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//   ],
//   "engines": {
//   "node": "16.x"
// },
// "scripts": {
//   "start": "node --watch index.js",
//   "test": "echo \"Error: no test specified\" && exit 1"
// },
//   "buildCommand": "next build",
//     "installCommand": "npm install"

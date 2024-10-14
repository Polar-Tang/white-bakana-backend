import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

const corsOptions = {
  origin: 'https://white-bakana.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],       
  allowedHeaders: ['Content-Type'],         
  credentials: true                         
};

app.use(cors(corsOptions)); 


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const uri = process.env.MONGO_URI;  // In production, this comes from Vercel

try{

  mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
} catch(err){

  err => console.error('MongoDB connection error:', err)

  
}

const emailSchema = new mongoose.Schema({
  email: { type: String, required: true }
});
const Email = mongoose.model('Email', emailSchema);


app.post('/submit-email', cors(corsOptions), (req, res) => {
  const emailData = new Email({ email: req.body.email });
  
  try{
    emailData.save().then(() => res.send('Email saved successfully!'))
    
    } catch(error){
      console.error('Error saving email:', err);
      res.status(500).json({ success: false, message: 'Error en el servidor' });
      if (!res.headersSent) {
        // Send error response if headers haven't been sent yet
        return res.status(500).send('Error saving email: ' + err.message);
      }
    }
});

app.options('/submit-email', cors(corsOptions));


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

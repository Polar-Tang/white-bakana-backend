import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; 

const app = express();
const corsOptions = {
  origin: 'https://white-bakana.vercel.app/', 
  credentials: true,
  methods: ['GET,OPTIONS,PATCH,DELETE,POST,PUT'],
  allowedHeaders: ['X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version', 'Authorization']
}


app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.options('*', cors(corsOptions));

app.use(express.json());

const uri = process.env.MONGO_URI; 

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


  app.post('/submit-email', (req, res) => {
    const email = req.body.email;
  
    res.header('Access-Control-Allow-Origin', 'https://white-bakana.vercel.app/')
  
    if (!email) {
      return res.status(400).json({ success: false, message: 'El email es requerido' });
    }
  
    try{
      const emailData = new Email({ email });
      emailData.save()
      .then(() => res.send('Email saved successfully!'))
      .catch(err => {
        console.error('Error guardando el email:', err);
        res.status(500).json({ success: false, message: 'Error en el servidor al guardar el email' });
      });
  
      } catch(err){
        console.error('Error saving email:', err);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
      }
  })

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

app.get('ping', (req, res) => {
  res.json('pong')
})

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

import express from 'express'
import cors from 'cors';

const userRouter = express.Router()

userRouter.options('/submit-email', cors(corsOptions));

const corsOptions = {
    origin: 'https://white-bakana.vercel.app',
    methods: ['GET', 'POST', 'OPTIONS'],       
    allowedHeaders: ['Content-Type'],         
    credentials: true                         
  };
  
  app.use(cors(corsOptions)); 

userRouter.post('/submit-email', (req, res) => {
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
}).build()

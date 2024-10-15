import express from 'express'
const userRouter = express.Router()

userRouter.post('/', (req, res) => {
  const emailData = new Email({ email: req.body.email });
  res.header('Access-Control-Allow-Origin', 'https://white-bakana.vercel.app/')
  try{
    emailData.save().then(() => res.send('Email saved successfully!'))
    
    if(res.status(405)){
      alert('request', request.headers.get('origin') )
    }

    } catch(err){
      console.error('Error saving email:', err);
      res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
}).build()

import express from 'express'
const userRouter = express.Router()

userRouter.post('/', (req, res) => {
  const emailData = new Email({ email: req.body.email });
  
  try{
    emailData.save().then(() => res.send('Email saved successfully!'))
    
    if(res.status(405)){
      console.log('request', request.headers.get('origin') )
    }

    } catch(err){
      console.error('Error saving email:', err);
      res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
}).build()

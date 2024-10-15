import express from 'express'
const userRouter = express.Router()

userRouter.post('/', (req, res) => {
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
}).build()

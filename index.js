import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`El servidor se está escuchando en el puerto ${PORT}`);
});

const corsOptions = {
  origin: 'https://white-bakana.vercel.app',  
  methods: ['GET', 'POST', 'OPTIONS'],        
  allowedHeaders: ['Content-Type'],           
  credentials: true                           
};
app.use(cors(corsOptions));
app.options('/submit-email', cors(corsOptions));


const uri = 'mongodb+srv://virtualnautilus:sa99L36dYUyE2nY0@cluster0.6lyks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const emailSchema = new mongoose.Schema({
  email: { type: String, required: true }
});
const Email = mongoose.model('Email', emailSchema);

app.post('/submit-email', (req,res) => {
  res.json("purge")

})


let pong = 'pong'

app.post('/ping', async (req, res) => {
  
  try{
    console.log(req.body)

    console.log(res.body)
     const emailData = new Email({ email: req.body.email });
     await emailData.save().then(() => res.send('Email saved successfully!'))
      res.json("depure")
    } catch(error){       
        console.error('Error saving email:', err);
        // await res.status(500).json({ success: false, message: 'Error en el servidor' });     
   } 
  });
      

mongoose.connect(uri)

const database = mongoose.connection

database.once('open', () =>{
    console.log('Conexion exitosa con MONGO DB')
})

database.on('error', () =>{
    console.error('ERROR MONGO DB')
})

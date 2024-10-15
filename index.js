import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
  console.log(`El servidor se está escuchando en el puerto ${PORT}`);
});

app.use(cors({
  origin: (origin, callback) => {
    const alloworigins = ["http://127.0.0.1:5500/la/white_bakana/index.html", 'http://127.0.0.1:5500', 'https://white-bakana.vercel.app', 'http://localhost:5500/']


    if (alloworigins.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))
app.disable('x-powered-by') // deshabilitar el header X-Powered-By: Express



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
  res.header('Access-Control-Allow-Origin', '*')
  
  try{
    console.log(req.body)
     const emailData = new Email({ email: req.body.email });
     return await emailData.save().then(() => res.send('Email saved successfully!'))
    } catch(error){       
        console.error('Error saving email:', err);
        // await res.status(500).json({ success: false, message: 'Error en el servidor' });     
   } 
  });
      

  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,  // Enable SSL for MongoDB Atlas
    tlsAllowInvalidCertificates: true,  // Bypass invalid certificate (only for development)
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    });
  
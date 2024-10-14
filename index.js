import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

// Adjust the CORS configuration to allow requests from your frontend
app.use(cors({
  origin: 'https://white-bakana.vercel.app', // your Vercel frontend URL
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection (using Atlas)
const uri = 'mongodb+srv://virtualnautilus:sa99L36dYUyE2nY0@cluster0.6lyks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error conectando a MongoDB:', err));

// Email schema
const emailSchema = new mongoose.Schema({
  email: { type: String, required: true },
});

const Email = mongoose.model('Email', emailSchema);

// Handle form submission
app.post('/submit-email', (req, res) => {
  const emailData = new Email({ email: req.body.email });

  emailData.save()
    .then(() => res.send('¡Email guardado con éxito!'))
    .catch(err => res.status(500).send('Error al guardar el email: ' + err));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors({
  origin: 'https://white-bakana.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'], 
  AccessControlAllowOrigin:  'https://white-bakana.vercel.app',
  credentials: true,  
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = 'mongodb+srv://virtualnautilus:sa99L36dYUyE2nY0@cluster0.6lyks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the email schema
const emailSchema = new mongoose.Schema({
  email: { type: String, required: true }
});
const Email = mongoose.model('Email', emailSchema);


app.post('/submit-email', (req, res) => {
  const emailData = new Email({ email: req.body.email });
  
  emailData.save()
    .then(() => res.send('Email saved successfully!'))
    .catch(err => res.status(500).send('Error saving email: ' + err));
});

//app.options('/submit-email', cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

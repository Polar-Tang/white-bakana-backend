import mongoose from 'mongoose';
import express, { request } from 'express';
import bodyParser from "body-parser"
import cors from 'cors'


const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); 

app.use(cors({
  origin: 'https://white-bakana.vercel.app/', // Your frontend's deployed URL
  methods: ['GET', 'POST'], // Allow necessary methods
  credentials: true // Enable credentials if you need them (for cookies, etc.)
}));



// const uri = 'http://localhost:27017';


const uri = 'mongodb+srv://virtualnautilus:sa99L36dYUyE2nY0@cluster0.6lyks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error conectando a MongoDB:', err));

// Middleware para procesar el cuerpo de las solicitudes (formularios)
app.use(bodyParser.urlencoded({ extended: true }));

// Definir un esquema y modelo para los correos electrónicos
const emailSchema = new mongoose.Schema({
  email: { type: String, required: true }
});
const Email = mongoose.model('Email', emailSchema);

// Ruta para servir el formulario
app.get('/', (req, res) => {
  const request =  req.body;

  console.log(request)

  res.send(`
    <form action="/submit-email" method="POST">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
      <button type="submit">Submit</button>
    </form>
  `);

});

// 
// Ruta para manejar el envío del formulario
app.post('/submit-email', (req, res) => {
  const emailData = new Email({ email: req.body.email });

  emailData.save()
    .then(() => {
      res.send('¡Email guardado con éxito!');
    })
    .catch(err => {
      res.status(500).send('Error al guardar el email: ' + err);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
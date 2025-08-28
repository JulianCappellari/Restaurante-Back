import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import sequelize from './config/dbConfig';
import routerApp from './routes/App';
import routerAuth from './routes/Auth';
import cors from 'cors';


// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req: Request, res: Response) => {
  res.send('Servidor Express con TypeScript en funcionamiento!');
});

app.use('/api', routerApp);
app.use('/auth', routerAuth);
// Iniciar conexión con la base de datos y el servidor
sequelize.authenticate()
  .then(() => {
    console.log('Conectado a la base de datos MySQL');
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });

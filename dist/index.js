"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const App_1 = __importDefault(require("./routes/App"));
const Auth_1 = __importDefault(require("./routes/Auth"));
const cors_1 = __importDefault(require("cors"));
// Cargar variables de entorno
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
// Middleware para parsear JSON
app.use(express_1.default.json());
// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor Express con TypeScript en funcionamiento!');
});
app.use('/api', App_1.default);
app.use('/auth', Auth_1.default);
// Iniciar conexión con la base de datos y el servidor
dbConfig_1.default.authenticate()
    .then(() => {
    console.log('Conectado a la base de datos MySQL');
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
});

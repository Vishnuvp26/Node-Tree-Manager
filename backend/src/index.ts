import express from 'express';
import connectDB from './config/db.config';
import validateEnv from './utils/env';
import cors from 'cors'
import { env } from './config/env.config';
import corsOption from './config/cors.config';
import { errorHandler } from './middleware/error.handler';
import nodeRoute from './routes/node.router';

connectDB();
validateEnv();

const app = express();

app.set("trust proxy", true);

app.use(cors(corsOption));
app.use(express.json());

app.use('/api', nodeRoute);

app.use(errorHandler);

const PORT = env.PORT;

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});
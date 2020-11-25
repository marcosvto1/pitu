import express from 'express';
import cors from 'cors';
import linksRouters  from './routes/links';
const app = express();

app.use(express.json());
app.use(cors())
app.use(linksRouters);

export default app;


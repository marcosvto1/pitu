import express from 'express';
import linksRouters  from './routes/links';
const app = express();

app.use(express.json());
app.use(linksRouters);

export default app;

